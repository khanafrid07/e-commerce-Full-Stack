const express = require("express");
const router = express.Router()
const Product = require("../models/product.js")
const verifyToken = require("../middlewares/verifyUser.js")
const multer = require("multer")
const upload = multer({ dest: 'uploads/' })
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

router.post(
  "/",
  verifyToken,
  upload.fields([
    { name: "image", maxCount: 1 },          // main image
    { name: "previewImages", maxCount: 5 },  // preview images
  ]),
  async (req, res) => {
    try {
      const { title, description, price, stock, category } = req.body;

      const images = [];

      // Main image
      if (req.files["image"] && req.files["image"][0]) {
        const mainImage = req.files["image"][0];
        images.push({
          url: `${req.protocol}://${req.get("host")}/${mainImage.path.replace(/\\/g, "/")}`,
          filename: mainImage.filename,
          isMain: true,
        });
      } else {
        images.push({
          url: `${req.protocol}://${req.get("host")}/${file.path.replace(/\\/g, "/")}`,
          filename: "default",
          isMain: true,
        });
      }

      // Preview images
      if (req.files["previewImages"]) {
        req.files["previewImages"].forEach((file) => {
          images.push({
            url: `${req.protocol}://${req.get("host")}/${file.path.replace(/\\/g, "/")}`,
            filename: file.filename,
            isMain: false,
          });
        });
      }

      const product = new Product({
        title,
        description,
        price,
        stock,
        category,
        images,
        user: req.user?._id,
      });

      await product.save();
      res.status(201).json({ message: "✅ Product created", product });
    } catch (err) {
      console.error("🔥 Error creating product:", err);
      res.status(500).json({ message: "Error adding product", error: err.message });
    }
  }
);

router.put("/:id", upload.array("images"), async (req, res) => {
  try {
    const { id } = req.params;

    // 🧱 1️⃣ Handle uploaded images safely
    const uploadedImages = (req.files || []).map((file, idx) => ({
      url: `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,
      isMain: req.body[`isMain_${idx}`] === "true",
    }));

    // 🧱 2️⃣ Handle existing images safely
    let existingImages = [];
    if (req.body.existingImages) {
      try {
        existingImages = JSON.parse(req.body.existingImages);
      } catch (err) {
        console.warn("⚠️ Failed to parse existingImages:", err.message);
        existingImages = [];
      }
    }

    // 🧱 3️⃣ Combine both
    const allImages = [...existingImages, ...uploadedImages];

    // 🧱 4️⃣ Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        category: req.body.category,
        images: allImages,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "✅ Product updated", product: updatedProduct });
  } catch (err) {
    console.error("🔥 Error updating product:", err);
    res.status(500).json({ message: "Error updating product", error: err.message });
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