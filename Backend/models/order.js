const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      status: {
        type: String,
        enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
        default: "Pending",
      },
      variants: {type: Object},
      cancelReason: String,
      cancelledAt: Date,
      createdAt: { type: Date, default: Date.now },
    },
  ],

  status: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },

  totalPrice: {
    type: Number,
    required: true,
  },

  paymentMethod: {
    type: String,
    enum: ["Cash", "Card", "Online"],
    default: "Cash",
  },

  shippingAddress: {
    type: Object,
    required: true,
  },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
