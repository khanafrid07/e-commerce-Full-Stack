const mongoose = require("mongoose");

const {Schema} = mongoose

const reviewSchema = new Schema({
    username:{
        type: String
    },
    rating: {
        type:Number,
        required: true,
        min: 1,
        max: 5

    } ,
    comment: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Review", reviewSchema)