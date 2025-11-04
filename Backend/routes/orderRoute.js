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

    const allOrders = await Order.find({ user: userId }).populate("products.product");
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
    const singleOrder = await Order.findById(id); 

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

router.post("/",verifyUser, async (req, res) => {
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
    productItem.cancelReason =  "No reason provided";
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





router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrder)
      return res.status(404).json({ message: "Order not found" });

    return res
      .status(200)
      .json({ message: "Order updated successfully", updatedOrder });
  } catch (err) {
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
