// sampleProducts.js
const mongoose = require("mongoose");

const Product = require("../models/product.js")
 const sampleProducts = [
  {
    title: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation.",
    price: 2999,
    stock: 50,
    category: "Electronics",
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDC68IT8fKJuEWgiT5OxBe8-_-iADu0BD2fA&s",
        filename: "headphones-main.jpg",
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLfQYVl9EhwW4UMUXto_GVpwi_29pWVTWZLQ&s",
        filename: "headphones-1.jpg",
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLfQYVl9EhwW4UMUXto_GVpwi_29pWVTWZLQ&s",
        filename: "headphones-2.jpg",
      }
    ]
  },
  {
    title: "Men's Sneakers",
    description: "Comfortable and stylish sneakers for everyday wear.",
    price: 1999,
    stock: 100,
    category: "Fashion",
    images: [
      {
        url: "/uploads/sneakers-main.jpg",
        filename: "sneakers-main.jpg",
      },
      {
        url: "/uploads/sneakers-1.jpg",
        filename: "sneakers-1.jpg",
      }
    ]
  },
  {
    title: "Smart Watch",
    description: "Smart watch with heart-rate monitor, GPS, and notifications.",
    price: 4999,
    stock: 75,
    category: "Electronics",
    images: [
      {
        url: "/uploads/watch-main.jpg",
        filename: "watch-main.jpg",
      },
      {
        url: "/uploads/watch-1.jpg",
        filename: "watch-1.jpg",
      }
    ]
  },
  {
    title: "Leather Backpack",
    description: "Durable leather backpack suitable for work or travel.",
    price: 3499,
    stock: 40,
    category: "Fashion",
    images: [
      {
        url: "/uploads/backpack-main.jpg",
        filename: "backpack-main.jpg",
      },
      {
        url: "/uploads/backpack-1.jpg",
        filename: "backpack-1.jpg",
      }
    ]
  }
]




mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB connected");
  addData();
})
.catch(err => console.log(err));

async function addData() {
  try {
    await Product.deleteMany();
    await Product.insertMany(sampleProducts);
    console.log("Sample products inserted");
    mongoose.connection.close(); 
  } catch (err) {
    console.error("Error inserting data:", err);
  }
}
