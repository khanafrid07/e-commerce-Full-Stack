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
router.post("/", upload.any(), async (req, res) => {
  try {
    const parsedCategory = JSON.parse(req.body.category);
    const parsedVariants = JSON.parse(req.body.variants);
    const parsedBaseVariant = JSON.parse(req.body.baseVariant);

    // MAIN PRODUCT IMAGES (These are Base Variant images)
    const mainImages = req.files
      .filter(f => f.fieldname === "images")
      .map((file, index) => ({
        url: `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,
        fileName: file.originalname,
        isMain: index === 0,
      }));

    // ADDITIONAL VARIANT IMAGES ONLY
    parsedVariants.forEach((variant, i) => {
      const variantFiles = req.files.filter(
        f => f.fieldname === `variantImages_${i}`
      );

      variant.images = variantFiles.map((file) => ({
        url: `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,
        fileName: file.originalname
      }));

      if (!variant.typeValues) {
        throw new Error("typeValues missing for a variant");
      }
    });

    const newProduct = new Product({
      title: req.body.title,
      description: req.body.description,
      basePrice: req.body.basePrice,
      stock: req.body.stock,
      discount: req.body.discount || 0,
      category: parsedCategory,
      images: mainImages,
      variants: parsedVariants,
      baseVariant: parsedBaseVariant,
      featured: req.body.featured === "true" || req.body.featured === true
    });

    await newProduct.save();

    res.json({ success: true, product: newProduct });
  } catch (err) {
    console.error("Add product error:", err);
    res.status(500).json({ error: err.message });
  }
});


// ============================================
// UPDATE PRODUCT ROUTE - ⚠️ NEEDS FIXES
// ============================================
router.put("/:id", verifyToken, upload.any(), async (req, res) => {
  try {
    const {
      title,
      description,
      basePrice,
      stock,
      discount,
      category,
      variants,
      existingImages,
      featured,
      baseVariant,
    } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Parse JSON fields
    const parsedCategory = category ? JSON.parse(category) : product.category || {};
    const parsedVariants = variants ? JSON.parse(variants) : product.variants || [];
    const parsedExistingImages = existingImages ? JSON.parse(existingImages) : [];
    const parsedBaseVariant = baseVariant
      ? JSON.parse(baseVariant)
      : product.baseVariant || { typeValues: {}, price: 0, stock: 0 };
    const parsedFeatured = featured === "true" || featured === true;

    // Update basic fields
    product.title = title ?? product.title;
    product.description = description ?? product.description;
    product.basePrice = Number(basePrice) || product.basePrice;
    product.stock = Number(stock) || product.stock;
    product.discount = Number(discount) || 0;
    product.category = parsedCategory;
    product.baseVariant = parsedBaseVariant;
    product.featured = parsedFeatured;

    // ============================================
    // HANDLE MAIN PRODUCT IMAGES
    // ============================================
    const newMainImages = req.files
      .filter(f => f.fieldname === "images")
      .map((file) => ({
        url: `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,
        isMain: false,
        fileName: file.originalname,
      }));

    // Merge existing + new images
    let mergedImages = [...parsedExistingImages, ...newMainImages].slice(0, 5);

    // Ensure at least one main image
    if (!mergedImages.some((img) => img.isMain) && mergedImages.length) {
      mergedImages[0].isMain = true;
    }

    product.images = mergedImages;

    // ============================================
    // HANDLE VARIANT IMAGES
    // ============================================
    parsedVariants.forEach((variant, i) => {
      // Get new files for this variant
      const newVariantFiles = req.files.filter(
        f => f.fieldname === `variantImages_${i}`
      );

      // Convert new files to image objects
      const newVariantImages = newVariantFiles.map((file) => ({
        url: `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,
        fileName: file.originalname
      }));

      // Merge existing variant images + new ones
      const existingVariantImages = variant.images || [];
      variant.images = [...existingVariantImages, ...newVariantImages].slice(0, 5);
    });

    product.variants = parsedVariants;

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