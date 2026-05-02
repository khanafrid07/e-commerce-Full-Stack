const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },

  title: String, // snapshot

  quantity: Number,

  variantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "cancelled"],
    default: "active",
  },

  variantLabel: String, // 🔥 important

  price: Number, // snapshot

  image: String, // snapshot
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    items: [orderItemSchema],

    shippingAddress: {
      addressName: String,
      email: String,
      phone: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },

    paymentMethod: {
      type: String,
      enum: ["Cash", "Card", "Online"],
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    subtotal: Number,

    shipping: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    totalPrice: Number,

    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);