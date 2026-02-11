const express = require("express")
const jwt  = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const verifyToken = require("../middlewares/verifyUser.js");
const router = express.Router()
const {userSchema} = require("../joi.js")
const validateSchema = require("../middlewares/validate.js")


router.post("/register",validateSchema(userSchema), async(req, res)=>{
    const {name, email, password} = req.body;
    try{

        const existingUser = await  User.findOne({email})
        if(existingUser){
          return  res.status(409).json({message: "User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user  = new User({name, email, password:hashedPassword})
        await user.save()
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"})
        res.status(201).json({user, token})
    }catch(err){
        res.status(500).json({message: err})
    }

})


router.post("/login", async (req, res) => {
    let {email, password} = req.body;
    try{
        let user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message: "Invalid Credentials"})
        }
        let isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(401).json({message: "Invalid Credentials"})
        }
       
        let token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"})
        res.status(201).json({user, token})
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

router.get("/fetchUser", async (req, res) => {
  try {
    const authHeader = req.headers.authorization; // "Bearer <token>"
    if (!authHeader) return res.status(401).json({ message: "No token" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

router.post("/address",verifyToken, async(req, res)=>{
  try{
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    console.log(`${firstName} ${lastName}`)
    let user = await User.findById(req.userId)

    if(!user){
      return res.status(404).json({message: "USer not found"})
    }
    
    user.addresses.push({...req.body, addressName: `${firstName} ${lastName}`})
    const newAddress = user.addresses[user.addresses.length-1]
    await user.save()
    console.log("added")
    return res.status(201).json({message: "ADress added successfully", address: newAddress})
  }catch(err){
    return res.status(500).json({message: "Internal Server error"})
  }

})

module.exports =  router