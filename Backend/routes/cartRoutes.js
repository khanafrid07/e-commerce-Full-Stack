const express = require("express");
const Cart = require("../models/cart");
const Product = require("../models/product");
const verifyToken = require("../middlewares/verifyUser"); // protect routes
const router = express.Router();

// 🧩 Get user cart
router.get("/", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userId }).populate("items.product").populate("user");
    if (!cart) return res.status(200).json({ items: [], totalPrice: 0 });
    console.log(cart)
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart", error: err.message });
  }
});

router.post("/add", verifyToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.userId });
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // 🛒 If user has no cart yet
    if (!cart) {
      cart = new Cart({
        user: req.userId,
        items: [],
        totalPrice: 0,
      });
    }

    // 🔍 Check if product already exists in cart
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        
      });
    }

    // 🧮 Recalculate total correctly
    cart.totalPrice = 0;
    for (const item of cart.items) {
      const itemProduct = await Product.findById(item.product);
      if (itemProduct) {
        cart.totalPrice += item.quantity * itemProduct.price;
      }
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ message: "Error adding to cart", error: err.message });
  }
});


router.delete("/remove/:id", verifyToken, async (req, res) => {
  try {
    console.log("➡️ Product ID to remove:", req.params.id);
    let cart = await Cart.findOne({ user: req.userId }).populate("items.product");
    console.log("🛒 Found cart:", cart ? "Yes" : "No");

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    console.log("📦 Items before:", cart.items.map(i => i.product._id.toString()));

    cart.items = cart.items.filter(
      (i) => i.product._id.toString() !== req.params.id
    );

    console.log("📦 Items after:", cart.items.map(i => i.product._id.toString()));

    cart.totalPrice = cart.items.reduce(
      (sum, i) => sum + i.quantity * i.product.price,
      0
    );

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error("❌ Error removing item:", err);
    res.status(500).json({ message: "Error removing item", error: err.message });
  }
});

router.put("/update/:id", verifyToken, async (req, res) => {
  try {
    const quantity = Number(req.body.quantity);
    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cart = await Cart.findOne({ user: req.userId }).populate("items.product");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((i) => i.product._id.toString() === req.params.id);
    if (!item) return res.status(404).json({ message: "Item not in cart" });

    item.quantity = quantity;
    cart.totalPrice = cart.items.reduce(
      (sum, i) => sum + i.quantity * i.product.price,
      0
    );

    await cart.save();
    res.json({ updatedItem: item, totalPrice: cart.totalPrice });
  } catch (err) {
    console.error("Error updating quantity:", err);
    res.status(500).json({ message: "Error updating quantity", error: err.message });
  }
});


// 🧹 Clear cart
router.delete("/clear",verifyToken, async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.userId });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: "Error clearing cart", error: err.message });
  }
});

module.exports = router;
