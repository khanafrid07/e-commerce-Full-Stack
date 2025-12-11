const express = require("express");
const Cart = require("../models/cart");
const Product = require("../models/product");
const verifyToken = require("../middlewares/verifyUser");
const router = express.Router();
router.get("/", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userId })
      .populate("items.product");

    if (!cart) return res.status(200).json({ items: [], totalPrice: 0 });

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart", error: err.message });
  }
});


router.post("/add", verifyToken, async (req, res) => {
  try {
    const { productId, quantity = 1, variants = {}, price } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    
    if (!price || price <= 0) {
      return res.status(400).json({ message: "Invalid price" });
    }

    let cart = await Cart.findOne({ user: req.userId });

    if (!cart) {
      cart = new Cart({
        user: req.userId,
        items: [],
        totalPrice: 0,
      });
    }

    
    const existingItem = cart.items.find((item) => {
      if (item.product.toString() !== productId) return false;
      return JSON.stringify(item.variant || {}) === JSON.stringify(variants || {});
    });

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ 
        product: productId, 
        quantity, 
        variant: variants,
        price: price
      });
    }

  
    cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    await cart.save();
    await cart.populate("items.product");
    
    res.status(201).json(cart);

  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ message: "Error adding to cart", error: err.message });
  }
});


router.put("/update/:id", verifyToken, async (req, res) => {
  try {
    const { quantity, variant = {} } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cart = await Cart.findOne({ user: req.userId }).populate("items.product");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (i) =>
        i.product &&
        i.product._id.toString() === req.params.id &&
        JSON.stringify(i.variant || {}) === JSON.stringify(variant)
    );

    if (!item) return res.status(404).json({ message: "Item not in cart" });

    item.quantity = quantity;

    // Recalculate total
    cart.totalPrice = cart.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);

    await cart.save();
    res.json({ updatedItem: item, totalPrice: cart.totalPrice });

  } catch (err) {
    console.error("Error updating cart item:", err);
    res.status(500).json({ message: "Error updating cart item", error: err.message });
  }
});


router.delete("/remove/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { variant = {} } = req.body;

    const cart = await Cart.findOne({ user: req.userId }).populate("items.product");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    
    cart.items = cart.items.filter((item) => {
      if (!item.product) return true;
      const sameProduct = item.product._id.toString() === id;
      const sameVariant = JSON.stringify(item.variant || {}) === JSON.stringify(variant || {});
      return !(sameProduct && sameVariant);
    });

    
    cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    await cart.save();

    res.json({ message: "Item removed successfully", cart });

  } catch (error) {
    console.error("Remove Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


router.delete("/clear", verifyToken, async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.userId });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: "Error clearing cart", error: err.message });
  }
});

module.exports = router;
