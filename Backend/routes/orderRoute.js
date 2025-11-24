const express = require("express");
const Order = require("../models/order");
const router = express.Router();
const verifyUser = require("../middlewares/verifyUser");
const Product = require("../models/product");
router.get("/", verifyUser, async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID found" });
    }

    const allOrders = await Order.find({ user: userId }).populate("products.product").populate("user");
    console.log(allOrders)

    return res.status(200).json(allOrders);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch orders",
      error: err.message,
    });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const singleOrder = await Order.findById(id).populate("user").populate("products.product");

    if (!singleOrder)
      return res.status(404).json({ message: "Order not found" });

    return res.status(200).json(singleOrder);
  } catch (err) {
    return res.status(500).json({
      message: "Error fetching order",
      error: err.message,
    });
  }
});

router.post("/", verifyUser, async (req, res) => {
  try {
    const { products, paymentMethod, status, totalPrice, shippingAddress } = req.body;
    console.log(products, totalPrice)
    if (!products || !totalPrice) {
      return res
        .status(400)
        .json({ message: "Products and total price are required" });
    }

    const newOrder = new Order({
      products,
      paymentMethod,
      status,
      totalPrice,
      shippingAddress,
      user: req.userId
    });

    const savedOrder = await newOrder.save();
    return res
      .status(201)
      .json({ message: "Order created successfully", order: savedOrder });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error creating order", error: err.message });
  }
});


router.put("/cancel-product/:orderId/:productId", async (req, res) => {
  const { orderId, productId } = req.params;

  try {
    if (!orderId || !productId) {
      return res.status(400).json({ message: "Order ID and Product ID are required." });
    }

    const order = await Order.findById(orderId).populate("products.product");
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }


    const productItem = order.products.find(
      (item) => item.product._id.toString() === productId
    )

    if (!productItem) {
      return res.status(404).json({ message: "Product not found in this order." });
    }


    productItem.status = "Cancelled";
    productItem.cancelReason = "No reason provided";
    productItem.cancelledAt = new Date();


    const allCancelled = order.products.every(p => p.status === "Cancelled");
    if (allCancelled) {
      order.status = "Cancelled";
    }

    await order.save();

    return res.status(200).json({
      message: "Product cancelled successfully.",
      order
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to cancel the order.", error: err.message });
  }
});


// Update a single product's status and recalculate overall order status
router.put("/:orderId/:productId", async (req, res) => {
  try {
    const { orderId, productId } = req.params;
    const { status } = req.body; // New status for the product

    const order = await Order.findById(orderId).populate("products.product");
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Find the product in the order
    const productItem = order.products.find(
      (p) => p.product._id.toString() === productId
    );
    if (!productItem)
      return res.status(404).json({ message: "Product not found in this order." });

    // Update the product status
    productItem.status = status;

    const activeProducts = order.products.filter(p => p.status !== "Cancelled");
    const allDelivered = activeProducts.length > 0 && activeProducts.every(p => p.status === "Delivered");

    if (allDelivered) {
      order.status = "Delivered";
    } else if (order.products.every(p => p.status === "Cancelled")) {
      order.status = "Cancelled";
    } else if (order.products.some(p => p.status === "Shipped")) {
      order.status = "Shipped";
    } else {
      order.status = "Pending";
    }


    await order.save();

    return res.status(200).json({
      message: "Product and order status updated successfully",
      order,
    });
  } catch (err) {
    console.error("Error updating order:", err);
    return res.status(500).json({
      message: "Failed to update order",
      error: err.message,
    });
  }
});



router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder)
      return res.status(404).json({ message: "Order not found" });

    return res
      .status(200)
      .json({ message: "Order deleted successfully", deletedOrder });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to delete order",
      error: err.message,
    });
  }
});

module.exports = router;
