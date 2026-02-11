const Joi = require("joi")


const userSchema = Joi.object({
    username: Joi.string().min(3).max(15).trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})

const productSchema = Joi.object({
  title: Joi.string().min(5).required(),
  description: Joi.string().min(6).required(),
  price: Joi.number().min(1).required(),
  stock: Joi.number().min(1).required(),
  images: Joi.array().items(Joi.object()).min(1).required(),
  category: Joi.object({
    main: Joi.string().required(),
    sub: Joi.string().required(),
    gender: Joi.string().valid("male", "female", "unisex").required(),
  }).required(),
});


const reviewSchema = Joi.object({
   productId: Joi.string(),
    rating: Joi.number().min(1).required(),
    comment: Joi.string().required()
})

module.exports ={productSchema, userSchema, reviewSchema}