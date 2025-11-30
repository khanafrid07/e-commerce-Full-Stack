const express = require("express");
const router = express.Router()
const Product = require("../models/product.js")
const verifyToken = require("../middlewares/verifyUser.js")
const multer = require("multer")
const upload = require("../config/multer.js")
router.get("/", async (req, res) => {
  try {
    let allProducts = await Product.find()
    return res.status(200).json({ allProducts })
  } catch (err) {
    return res.status(500).json({ message: "ERROR FETCHING PRODUCTS", error: err.message })
  }

})

//fetching single product
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product Not Found!" });
    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ message: "Error fetching product", error: err.message }); 8
  }
});
router.post("/", verifyToken, upload.array("images", 5), async (req, res) => {
  try {
    const { title, description, basePrice, stock, category, variants } = req.body;
    console.log(variants)
    // Parse JSON fields
    const parsedCategory = JSON.parse(category);
    const parsedVariants = JSON.parse(variants);


    // Files from multer
    const images = req.files; // <-- This will NOT be undefined now

    if (!images || images.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Build image URLs
    const imageUrls = images.map((file, index) => ({
      url: `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,
      isMain: index === 0,
      fileName: `${file.fieldname}${index}`
    }));

    // Save product
    const newProduct = new Product({
      title,
      description,
      basePrice,
      stock,
      category: parsedCategory,
      variants: parsedVariants,
      featured: false,
      images: imageUrls
    });

    await newProduct.save();

    res.status(201).json({ message: "Product added successfully", product: newProduct });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding product" });
  }
});

// ---------------- UPDATE product ----------------
router.put("/:id", verifyToken, upload.array("images", 5), async (req, res) => {
  try {
    const {
      title,
      description,
      basePrice,
      stock,
      category,
      variants,
      existingImages,
      featured
    } = req.body;
    console.log(featured)

    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    // Parse JSON fields safely
    const parsedFeatured = featured === "true" || featured === true;
    const parsedCategory = category ? JSON.parse(category) : {};
    const parsedVariants = variants ? JSON.parse(variants) : [];
    const parsedExistingImages = existingImages ? JSON.parse(existingImages) : [];


    // Update basic fields
    product.title = title || product.title;
    product.description = description || product.description;
    product.basePrice = Number(basePrice) || 0;
    product.stock = Number(stock) || 0;
    product.category = parsedCategory;
    product.variants = parsedVariants;
    product.featured = parsedFeatured

    // Handle new uploaded images
    const newImages = (req.files || []).map(file => ({
      url: `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,
      isMain: false,
      fileName: file.filename,
    }));

    // Merge new and existing images safely
    let images = [...parsedExistingImages, ...newImages].slice(0, 5);

    // Ensure one main image
    if (!images.some(img => img.isMain) && images.length) images[0].isMain = true;

    product.images = images;

    await product.save();

    res.json({ message: "Product updated successfully", product });
  } catch (err) {
    console.error("Update product error:", err);
    res.status(500).json({
      message: "Error updating product",
      error: err.message,
    });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id)
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" })
    }
    return res.status(200).json({ message: "Product deleted successfully" })
  } catch (err) {
    return res.status(500).json({ message: "Error deleting Product", error: err.message })
  }
})

module.exports = router