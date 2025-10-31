const express = require("express");
const Order = require("../models/order");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allOrders = await Order.find();
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

router.post("/", async (req, res) => {
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
      shippingAddress
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


router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true, // ✅ Return updated document
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
