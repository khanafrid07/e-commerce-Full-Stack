const express = require("express");
const router = express.Router();
const Review = require("../models/review.js")
const Product = require("../models/product.js")
const User = require("../models/user.js")
const verifyUser = require("../middlewares/verifyUser.js")
<<<<<<< HEAD
const validateSchema = require("../middlewares/validate.js")
const { reviewSchema} =require("../joi.js")
router.post("/",verifyUser,validateSchema(reviewSchema), async(req, res)=>{
=======
router.post("/",verifyUser, async(req, res)=>{
>>>>>>> 1a7b0e643b2f8ff447119d1baaa740f2bd406485
    try{
        let {rating,comment, productId} = req.body
        const reviewedUser = await User.findById(req.userId)
        
        let reviewProduct = await Product.findById(productId)
        let review = new Review({username: reviewedUser.name, rating, comment})
        reviewProduct.reviews.push(review._id)
        await review.save()
        await reviewProduct.save()
       console.log(review)
       res.status(200).json({message:"Review Added Successful", review})

    }catch(err){
        res.status(500).json({message:"Failed to add Review"})
    }


})


module.exports = router