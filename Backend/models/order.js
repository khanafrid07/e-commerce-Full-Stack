
const mongoose = require("mongoose")



let orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    products: [
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products"
            },
            quantity:{
                type: Number,
                default: 1

            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
        default: "Pending"
    },
    paymentMethod: {
        type: String,
        enum: ["Cash", "Card", "Online"],
        default: "Cash"
    },
    shippingAddress: {
    type: Object, 
    required: true
  },
}, {timestamps:true})

let Order =  mongoose.model("Order", orderSchema)

module.exports = Order