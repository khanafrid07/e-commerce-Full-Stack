const express = require("express");
const router = express.Router();
const verifyUser = require("../middlewares/verifyUser");
const Order = require("../models/order");
const Product = require("../models/product");

// ✅ Get all orders of logged-in user
router.get("/", verifyUser, async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ user: userId })
      .populate("products.product")
      .populate("user");

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
});

// ✅ Get single order by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id)
      .populate("products.product")
      .populate("user");

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: "Error fetching order", error: err.message });
  }
});


router.post("/", verifyUser, async (req, res) => {
  try {
    const { products, paymentMethod, totalPrice, shippingAddress } = req.body;
    console.log(products)
    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products supplied" });
    }
    const newOrder = new Order({ products: products, paymentMethod, totalPrice, shippingAddress, user: req.userId })
    await newOrder.save()
    console.log(newOrder)

    res.status(201).json({ msg: "ORder creatd successfully", newOrder });

  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "FAiled to create Order", message: err })
  }

});


router.put("/cancel-product/:orderId/:productId", async (req, res) => {
  try {
    const { orderId, productId } = req.params;

    const order = await Order.findById(orderId).populate("products.product");
    if (!order) return res.status(404).json({ message: "Order not found" });

    const productItem = order.products.find(p => p._id.toString() === productId);
    if (!productItem) return res.status(404).json({ message: "Product not found in order" });

    if (productItem.status === "Cancelled") {
      return res.status(400).json({ message: "Product is already cancelled" });
    }

    // Restore stock
    const product = await Product.findById(productItem.product._id);
    if (productItem.variants && Object.keys(productItem.variants).length > 0) {
      const variantObj = product.variants.find(v => {
        const vMap = v.typeValues instanceof Map ? Object.fromEntries(v.typeValues) : v.typeValues;
        return Object.entries(productItem.variants).every(([k, val]) => vMap[k] === val);
      });
      if (variantObj) variantObj.stock += productItem.quantity;
    } else {
      product.stock += productItem.quantity;
    }
    await product.save();

    // Update product status
    productItem.status = "Cancelled";
    productItem.cancelledAt = new Date();
    productItem.cancelReason = "No reason provided";

    // Update order status if all cancelled
    const allCancelled = order.products.every(p => p.status === "Cancelled");
    if (allCancelled) order.status = "Cancelled";

    await order.save();
    res.status(200).json({ message: "Product cancelled successfully", order });
  } catch (err) {
    res.status(500).json({ message: "Failed to cancel product", error: err.message });
  }
});

// ✅ Update product status in an order
router.put("/:orderId/:productId", async (req, res) => {
  try {
    const { orderId, productId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId).populate("products.product");
    if (!order) return res.status(404).json({ message: "Order not found" });

    const productItem = order.products.find(p => p._id.toString() === productId);
    if (!productItem) return res.status(404).json({ message: "Product not found in order" });

    productItem.status = status;

    // Recalculate overall order status
    const activeProducts = order.products.filter(p => p.status !== "Cancelled");
    if (activeProducts.length && activeProducts.every(p => p.status === "Delivered")) order.status = "Delivered";
    else if (order.products.every(p => p.status === "Cancelled")) order.status = "Cancelled";
    else if (order.products.some(p => p.status === "Shipped")) order.status = "Shipped";
    else order.status = "Pending";

    await order.save();
    res.status(200).json({ message: "Product status updated", order });
  } catch (err) {
    res.status(500).json({ message: "Failed to update product status", error: err.message });
  }
});

// ✅ Delete an order
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order deleted successfully", deletedOrder });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete order", error: err.message });
  }
});

module.exports = router;
