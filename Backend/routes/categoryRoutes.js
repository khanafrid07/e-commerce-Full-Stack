const express = require("express")
const Category = require("../models/categorySchema")
const router = express.Router()

router.get("/", async (req, res) => {
    const categories = await Category.find({})
    console.log("categories", categories)
    res.status(201).json(categories)
})

module.exports = router