const express = require("express")
const Banner = require("../models/banner.js")
const router = express.Router()
const upload = require("../config/multer.js")

// GET all banners
router.get("/", async(req, res)=>{
    try{
        const banners = await Banner.find().sort({type: 1, category: 1})
        res.status(200).json(banners)
    }catch(err){
        console.log(err, "error fetching banners")
        res.status(500).json({message: "Error fetching banners", error: err?.message})
    }
})

// GET banner by id
router.get("/:id", async(req, res)=>{
    try{
        const banner = await Banner.findById(req.params.id)
        if(!banner){
            return res.status(404).json({message: "Banner not found"})
        }
        res.status(200).json(banner)
    }catch(err){
        console.log(err, "error fetching banner")
        res.status(500).json({message: "Error fetching banner", error: err?.message})
    }
})

// CREATE banner
router.post("/", upload.single("img"), async(req, res)=>{
    const {data, category} = req.body
    const parsedData = JSON.parse(data)
    console.log(req.file)
    console.log(data, "bannerData")
    if(!data || !req.file){
        res.json({message: "Banner Data not found"})
        return
    }
    try{
        const banner  = new Banner({
            titleBottom: parsedData.titleBottom,
            titleMiddle:parsedData.titleMiddle,
            titleTop:parsedData.titleTop,
            category,
            type: parsedData.type,
            image: {url: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`}

        })
        await banner.save()
        res.status(201).json({message: "Banner added successfully", banner})

    }catch(err){
        console.log(err,"error occured creating banner")
        res.status(500).json({message: "Error Creating Banner", error: err?.message})
    }
})

// UPDATE banner status (isActive)
router.put("/:id",upload.single("img"), async(req, res)=>{
    try{
        const {isActive} = req.body
        const banner = await Banner.findByIdAndUpdate(
            req.params.id, 
            {isActive},
            {new: true}
        )
        if(!banner){
            return res.status(404).json({message: "Banner not found"})
        }
        res.status(200).json({message: "Banner updated successfully", banner})
    }catch(err){
        console.log(err, "error updating banner")
        res.status(500).json({message: "Error updating banner", error: err?.message})
    }
})

// DELETE banner
router.delete("/:id", async(req, res)=>{
    try{
        const banner = await Banner.findByIdAndDelete(req.params.id)
        if(!banner){
            return res.status(404).json({message: "Banner not found"})
        }
        res.status(200).json({message: "Banner deleted successfully"})
    }catch(err){
        console.log(err, "error deleting banner")
        res.status(500).json({message: "Error deleting banner", error: err?.message})
    }
})


module.exports = router