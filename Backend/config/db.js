const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
    console.log("Db connected Successfully");
  } catch (err) {
    console.log("Error connecting to DB:", err);
    process.exit(1); // stop server if DB fails
  }
}

module.exports = connectDB;
