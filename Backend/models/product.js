const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  typeValues: { type: Object, required: true },
  stock: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  images: [{ url: String, fileName: String }],
  thumbnailIndex: { type: Number, default: 0 },
  discount: { type: Number, default: 0 }
});



const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    basePrice: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
    },

    category: {
      main: { type: String, required: true },
      sub: { type: String, required: true },
      gender: { type: String, required: true },
    },
    attributes: {
      skinConcern:{type:String, enum: ["acne", "dry", "oily", "sensitive", "pigmentation", "anti-aging", "dark-spots"]},
       skinType: {
      type: [String],
      enum: ["oily", "dry", "combination", "normal", "all skin"],
      default: ["all skin"],
    },
      material: String,
      fit: String
    },

    images: [
      {
        url: { type: String, required: true },
        isMain: { type: Boolean, default: false },
        fileName: String
      }
    ],

    variants: [variantSchema],
    soldCount:{type: Number, default: 0},

    baseVariant: {
      typeValues: { type: Object, required: true },
      price: Number,
      stock: Number
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    discount:Number,
    featured: { type: Boolean, default: false }
  },
  
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
