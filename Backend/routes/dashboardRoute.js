const mongoose = require("mongoose")
const express = require("express")
const Order = require("../models/order")
const User = require("../models/user")
const Product = require("../models/product")
const Cart = require("../models/cart")
const router = express.Router()
const Banner = require("../models/banner")

router.get("/stats", async (req, res) => {
    try {
        const last30day = new Date();
        last30day.setDate(last30day.getDate() - 30);

        const [
            totalUser,
            totalProducts,
            totalOrders,
            recentOrder,
            topSellingProducts,
            pendingDelivery,
            cartCount,
            countBanner,
            revenue30days
        ] = await Promise.all([
            User.countDocuments(),
            Product.countDocuments(),
            Order.countDocuments(),
            Order.find().sort({ createdAt: -1 }).limit(5).populate("user", "name email"),
            Product.find().sort({ soldCount: -1 }).limit(10),
            Order.countDocuments({ $or: [{ status: "Pending" }, { status: "Shipped" }] }),
            Cart.countDocuments(),
            Banner.aggregate([
                { $group: { _id: "$type", count: { $sum: 1 } } }
            ]),
            Order.aggregate([
                { $match: { createdAt: { $gte: last30day } } },
                { $group: { _id: null, revenue: { $sum: "$totalPrice" } } }
            ])
        ]);

        const bannersCount = countBanner.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
        }, {});

        res.status(200).json({
            totalOrders,
            totalProducts,
            totalUser,
            pendingDelivery,
            revenue30days: revenue30days[0]?.revenue || 0,
            recentOrder,
            topSellingProducts,
            cartCount,
            bannersCount
        });

    } catch (err) {
        console.log("Error occured in stats", err);
        res.status(500).json({
            message: "Error occurred in finding stats",
            error: err?.message
        });
    }
});
module.exports = router