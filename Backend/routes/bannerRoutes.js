const express = require("express")
const Banner = require("../models/banner.js")
const router = express.Router()
const upload = require("../config/multer.js");
const wrapAsync = require("../middlewares/wrapAsync.js");
const expressError = require("../middlewares/expressError.js");

// GET all banners with optional filters
router.get("/", wrapAsync(async (req, res) => {
    const { type, category, isAdmin } = req.query;
    
    const filter = {};
    
    if (type) filter.type = type;
    if (category) filter.category = category;
    
    // If not admin, only show active banners
    if (!isAdmin) filter.isActive = true;

    let banners = await Banner.find(filter).sort({ priority: -1, createdAt: -1 });
    
    // Add default template to old banners that don't have one
    banners = banners.map(banner => {
        const bannerObj = banner.toObject();
        if (!bannerObj.template) {
            bannerObj.template = "left-dark";
        }
        return bannerObj;
    });
    
    res.status(200).json(banners);
}));

// GET banner by ID
router.get("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    
    let banner = await Banner.findById(id);
    
    if (!banner) {
        throw new expressError(404, "Banner not found");
    }
    
    // Add default template to old banners that don't have one
    const bannerObj = banner.toObject();
    if (!bannerObj.template) {
        bannerObj.template = "left-dark";
    }
    
    res.status(200).json(bannerObj);
}));

// CREATE new banner
router.post("/", upload.single("img"), wrapAsync(async (req, res) => {
    const { data } = req.body;
    const { title, heading, subHeading, ctaText, ctaLink, type, placement, categoryId, template, priority, isActive, startDate, endDate, textColor, ctaButtonColor } = JSON.parse(data);
    const img = req.file;

    if (!img) {
        throw new expressError(400, "Image is required");
    }

    if (!type || !template) {
        throw new expressError(400, "Type and template are required");
    }

    const banner = new Banner({
        title,
        heading,
        subHeading,
        ctaText,
        ctaLink,
        type,
        placement,
        categoryId,
        template,
        priority: priority || 0,
        isActive: isActive !== undefined ? isActive : true,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        textColor: textColor || "white",
        ctaButtonColor: ctaButtonColor || "blue",
        image: `${req.protocol}://${req.get("host")}/uploads/${img.filename}`
    });

    await banner.save();
    
    res.status(201).json({ 
        message: "Banner created successfully", 
        banner 
    });
}));

// UPDATE banner
router.put("/:id", upload.single("img"), wrapAsync(async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const banner = await Banner.findById(id);
    if (!banner) {
        throw new expressError(404, "Banner not found");
    }

    // Parse data from request
    const parsedData = data ? JSON.parse(data) : {};
    const { title, heading, subHeading, ctaText, ctaLink, type, placement, categoryId, template, priority, isActive, startDate, endDate, textColor, ctaButtonColor } = parsedData;

    // If new image is uploaded
    if (req.file) {
        Object.assign(banner, {
            title,
            heading,
            subHeading,
            ctaText,
            ctaLink,
            type,
            placement,
            categoryId,
            template,
            priority: priority || 0,
            isActive: isActive !== undefined ? isActive : true,
            startDate: startDate ? new Date(startDate) : null,
            endDate: endDate ? new Date(endDate) : null,
            textColor: textColor || "white",
            ctaButtonColor: ctaButtonColor || "blue",
            image: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
        });
    } else {
        // Update without image
        Object.assign(banner, {
            title,
            heading,
            subHeading,
            ctaText,
            ctaLink,
            type,
            placement,
            categoryId,
            template,
            priority: priority || 0,
            isActive: isActive !== undefined ? isActive : true,
            startDate: startDate ? new Date(startDate) : banner.startDate,
            endDate: endDate ? new Date(endDate) : banner.endDate,
            textColor: textColor || banner.textColor || "white",
            ctaButtonColor: ctaButtonColor || banner.ctaButtonColor || "blue",
        });
    }

    await banner.save();

    res.status(200).json({ 
        message: "Banner updated successfully", 
        banner 
    });
}));

// DELETE banner
router.delete("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;

    const banner = await Banner.findByIdAndDelete(id);

    if (!banner) {
        throw new expressError(404, "Banner not found");
    }

    res.status(200).json({ 
        message: "Banner deleted successfully" 
    });
}));

// UPDATE banner status (isActive)
router.patch("/:id/status", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const { isActive } = req.body;

    const banner = await Banner.findByIdAndUpdate(
        id,
        { isActive },
        { new: true, runValidators: true }
    );

    if (!banner) {
        throw new expressError(404, "Banner not found");
    }

    res.status(200).json({ 
        message: "Banner status updated successfully", 
        banner 
    });
}));

module.exports = router
