const express = require("express")
const stripe = require("../config/stripe.js")
const router = express.Router();


router.post("/create-intent", async(req, res)=>{
    try{
        const {amount} = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "inr"
        })
        res.json({clientSecret: paymentIntent.client_secret})
    }catch(err){
        res.status(500).json({message: err.message || err})
    }
})

module.exports = router