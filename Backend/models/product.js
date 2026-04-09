const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  attributes: {
    type: Object, // flexible for all product types
    required: true,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },

  stock: {
    type: Number,
    required: true,
    min: 0,
  },

  images: [
    {
      url: String,
      fileName: String,
    },
  ],
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

    category: {
      main: String,
      sub: String,
      gender: String,
    },

    images: [
      {
        url: { type: String, required: true },
        isMain: { type: Boolean, default: false },
      },
    ],

    variants: [variantSchema],

    isActive: {
      type: Boolean,
      default: true,
    },

    soldCount: {
      type: Number,
      default: 0,
    },

    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);