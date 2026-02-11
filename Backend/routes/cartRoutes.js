
const express = require("express");
const Cart = require("../models/cart");
const Product = require("../models/product");
const verifyToken = require("../middlewares/verifyUser");
const router = express.Router();

function variantsMatch(variant1, variant2) {
  const v1 = variant1 || {};
  const v2 = variant2 || {};

  const keys1 = Object.keys(v1).sort();
  const keys2 = Object.keys(v2).sort();

  if (keys1.length !== keys2.length) return false;

  return keys1.every(key => v1[key] === v2[key]);
}


router.get("/", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userId }).populate("items.product");

    if (!cart) return res.status(200).json({ items: [], totalPrice: 0 });

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart", error: err.message });
  }
});

router.post("/add", verifyToken, async (req, res) => {
  try {
    const { productId, quantity = 1, variants = {}, price } = req.body;

    console.log(" Adding to cart:", { productId, quantity, variants, price });

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


    let variantImages = product.images || [];

    const isBaseVariant = product.baseVariant &&
      Object.entries(variants).every(([k, v]) => product.baseVariant.typeValues?.[k] === v);

    if (!isBaseVariant && product.variants?.length > 0) {

      const matchedVariant = product.variants.find(v =>
        Object.entries(variants).every(([k, val]) => v.typeValues?.[k] === val)
      );

      if (matchedVariant && matchedVariant.images?.length > 0) {
        variantImages = matchedVariant.images;
      }
    }


    const existingItem = cart.items.find((item) => {
      if (item.product.toString() !== productId) return false;
      return variantsMatch(item.variant, variants);
    });

    if (existingItem) {
  
      existingItem.quantity += quantity;
    } else {

      cart.items.push({
        product: productId,
        quantity,
        variant: variants,
        price: price,
        variantImages: variantImages.slice(0, 1)
      });
    }




    cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    await cart.save();
    await cart.populate("items.product");

    res.status(201).json(cart);


    
    cart.items.forEach((item, idx) => {
      console.log(`   Item ${idx}:`, {
        productId: item.product.toString(),
        variant: item.variant,
        variantsMatch: variantsMatch(item.variant, variants)
      });
    });

    if (existingItem) {
      console.log(" Found existing item:", existingItem.variant);
    } else {
      console.log(" No existing item found, creating new");
    }

  } catch (err) {
    console.error(" Error adding to cart:", err);
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

    const item = cart.items.find((i) => {
      if (!i.product || i.product._id.toString() !== req.params.id) return false;
      return variantsMatch(i.variant, variant);
    });

    if (!item) return res.status(404).json({ message: "Item not in cart" });

    item.quantity = quantity;
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

    console.log(" Removing item:", { id, variant });

    const cart = await Cart.findOne({ user: req.userId }).populate("items.product");
    if (!cart) return res.status(404).json({ message: "Cart not found" });


    const initialLength = cart.items.length;
    cart.items = cart.items.filter((item) => {
      if (!item.product) return true;
      const sameProduct = item.product._id.toString() === id;
      const sameVariant = variantsMatch(item.variant, variant);
      return !(sameProduct && sameVariant);
    });

    if (cart.items.length === initialLength) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    await cart.save();
    console.log("✅ Item removed successfully");
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



