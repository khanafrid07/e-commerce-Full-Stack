const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: [{ type: String }],
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // status: { type: String, enum: ["Pending", "Shipped", "Delivered", "Cancelled"], default: "Pending" },

  images: [
    {
      url: String,       // image URL (main + previews all together)
      filename: String,
      isMain: { type: Boolean, default: false } // mark the main image
    },
  ],
});



productSchema.path("images").validate(function (images) {
  return images.every((img) => !img.previewImages || img.previewImages.length <= 5);
}, "Each image can have up to 5 preview images only.");

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
