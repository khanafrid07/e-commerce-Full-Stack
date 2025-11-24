const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  typeValues: { type: Object, required: true }, // { Size: "M" }
  stock: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
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

    images: [
      {
        url: {type: String, required: true},
        isMain: {type: Boolean, default:false},
        fileName: String
      }
    ],

    variants: [variantSchema],

    details: [{
      type: Object,
      default: {},
    }],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
