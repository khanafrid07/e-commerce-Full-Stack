const express = require("express")
const Banner = require("../models/banner.js")
const Category = require("../models/categorySchema.js")
const router = express.Router()
const upload = require("../config/multer.js");
router.get("/", async (req, res) => {
    try {
        const { type, categoryId } = req.query;
        console.log(req.query)

        const filter = {};


        if (type) filter.type = type;
        if (categoryId) filter.categoryId = categoryId;

        const banners = await Banner.find(filter)
            .populate("categoryId")


        res.status(200).json(banners);
        console.log("vanner", banners)
    } catch (err) {
        console.error("error fetching banners", err);
        res.status(500).json({ message: "Error fetching banners" });
    }
});

router.post("/", upload.single("img"), async (req, res) => {

    const { data } = req.body;
    const { title, heading, subHeading, ctaText, ctaLink, type, placement, position, vertical, isActive, categoryId, priority } = JSON.parse(data);
    const img = req.file;

    if (!img) {
        return res.status(400).json({ message: "Image is required" })
    }
    const banner = new Banner({
        title,
        heading,
        subHeading,
        ctaText,
        ctaLink,
        type,
        placement,
        position,
        vertical,
        isActive,
        categoryId,
        priority: priority || 0,
        image: `${req.protocol}://${req.get("host")}/uploads/${img.filename}`
    })
    await banner.save()
    console.log(banner)
    res.status(201).json({ message: "Banner created successfully", banner })
})

module.exports = router
