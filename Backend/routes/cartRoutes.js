const express = require("express");
const Cart = require("../models/cart");
const Product = require("../models/product");
const verifyToken = require("../middlewares/verifyUser");
const router = express.Router();

/* ------------------------------------------------------ */
/*                   GET USER CART                        */
/* ------------------------------------------------------ */
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

/* ------------------------------------------------------ */
/*                 ADD ITEM TO CART                       */
/* ------------------------------------------------------ */
router.post("/add", verifyToken, async (req, res) => {
  try {
    const { productId, quantity = 1, variant = {} } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ user: req.userId });

    if (!cart) {
      cart = new Cart({
        user: req.userId,
        items: [],
        totalPrice: 0,
      });
    }

    // Check if same product + variant exists
    const existingItem = cart.items.find((item) => {
      if (item.product.toString() !== productId) return false;
      
      return JSON.stringify(item.variant || {}) === JSON.stringify(variant || {});
    });

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, variant });
    }

    // Recalculate total
    let total = 0;
    for (const item of cart.items) {
      const itemProduct = await Product.findById(item.product);
      if (!itemProduct) continue;

      let price = itemProduct.basePrice || 0;

      if (item.variant && Object.keys(item.variant).length > 0) {
        const matchedVariant = (itemProduct.variants || []).find((v) => {
          const vObj =
            v.typeValues instanceof Map
              ? Object.fromEntries(v.typeValues)
              : v.typeValues;

          return Object.entries(item.variant).every(
            ([key, val]) => vObj[key] === val
          );
        });

        if (matchedVariant) price = matchedVariant.price;
      }

      item.price = price;
      total += price * item.quantity;
    }

    cart.totalPrice = total;

    await cart.save();
    res.status(201).json(cart);

  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ message: "Error adding to cart", error: err.message });
  }
});

/* ------------------------------------------------------ */
/*                UPDATE ITEM QUANTITY                    */
/* ------------------------------------------------------ */
router.put("/update/:id", verifyToken, async (req, res) => {
  try {
    const { quantity, variant = {} } = req.body;

    if (!quantity || quantity < 1)
      return res
        .status(400)
        .json({ message: "Quantity must be at least 1" });

    const cart = await Cart.findOne({ user: req.userId })
      .populate("items.product");

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
    let total = 0;
    for (const i of cart.items) {
      const p = await Product.findById(i.product);
      if (!p) continue;

      let price = p.basePrice || 0;

      if (i.variant && Object.keys(i.variant).length > 0) {
        const matchedVariant = (p.variants || []).find((v) => {
          const vObj =
            v.typeValues instanceof Map
              ? Object.fromEntries(v.typeValues)
              : v.typeValues;

          return Object.entries(i.variant).every(
            ([k, val]) => vObj[k] === val
          );
        });

        if (matchedVariant) price = matchedVariant.price;
      }

      i.price = price;
      total += price * i.quantity;
    }

    cart.totalPrice = total;

    await cart.save();
    res.json({ updatedItem: item, totalPrice: cart.totalPrice });

  } catch (err) {
    console.error("Error updating cart item:", err);
    res.status(500).json({ message: "Error updating cart item", error: err.message });
  }
});

/* ------------------------------------------------------ */
/*                REMOVE ITEM (variant-safe)              */
/* ------------------------------------------------------ */
router.delete("/remove/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { variant = {} } = req.body;

    const cart = await Cart.findOne({ user: req.userId }).populate("items.product");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Match product + variant
    const targetItem = cart.items.find((item) => {
      if (!item.product) return false;

      const sameProduct = item.product._id.toString() === id;
      const sameVariant =
        JSON.stringify(item.variant || {}) === JSON.stringify(variant || {});

      return sameProduct && sameVariant;
    });

    if (!targetItem)
      return res.status(404).json({ message: "Item not found in cart" });

    // Remove only the matched product+variant
    cart.items = cart.items.filter((item) => {
      if (!item.product) return true;

      const sameProduct = item.product._id.toString() === id;
      const sameVariant =
        JSON.stringify(item.variant || {}) === JSON.stringify(variant || {});

      return !(sameProduct && sameVariant);
    });

    // Recalculate total
    let total = 0;

    for (const item of cart.items) {
      const p = await Product.findById(item.product);
      if (!p) continue;

      let price = p.basePrice || 0;

      if (item.variant && Object.keys(item.variant).length > 0) {
        const matchedVariant = (p.variants || []).find((v) => {
          const vObj =
            v.typeValues instanceof Map
              ? Object.fromEntries(v.typeValues)
              : v.typeValues;

          return Object.entries(item.variant).every(
            ([k, val]) => vObj[k] === val
          );
        });

        if (matchedVariant) price = matchedVariant.price;
      }

      total += price * item.quantity;
    }

    cart.totalPrice = total;
    await cart.save();

    res.json({ message: "Item removed successfully", cart });

  } catch (error) {
    console.error("Remove Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/* ------------------------------------------------------ */
/*                   CLEAR CART                           */
/* ------------------------------------------------------ */
router.delete("/clear", verifyToken, async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.userId });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: "Error clearing cart", error: err.message });
  }
});

module.exports = router;
