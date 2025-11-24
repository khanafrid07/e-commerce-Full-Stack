// sampleProducts.js
const mongoose = require("mongoose");
const Product = require("../models/product.js");

const sampleProducts = [
  {
    title: "Wireless Headphones",
    description: ["High‑quality wireless headphones with noise cancellation."],
    price: 2999,
    stock: 50,
    category: "Electronics",
    images: [
      {
        url: "https://images.pexels.com/photos/9546248/pexels-photo-9546248.jpeg",
        filename: "headphones-main.jpg",
        isMain: true
      },
      {
        url: "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg",
        filename: "headphones-1.jpg",
        isMain: false
      },
      {
        url: "https://images.pexels.com/photos/159853/headphones-dj-music-159853.jpeg",
        filename: "headphones-2.jpg",
        isMain: false
      }
    ]
  },
  {
    title: "Men's Sneakers",
    description: ["Comfortable and stylish sneakers for everyday wear."],
    price: 1999,
    stock: 100,
    category: "Fashion",
    images: [
      {
        url: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
        filename: "sneakers-main.jpg",
        isMain: true
      },
      {
        url: "https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg",
        filename: "sneakers-1.jpg",
        isMain: false
      }
    ]
  },
  {
    title: "Smart Watch",
    description: ["Smart watch with heart‑rate monitor, GPS, and notifications."],
    price: 4999,
    stock: 75,
    category: "Electronics",
    images: [
      {
        url: "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg",
        filename: "watch-main.jpg",
        isMain: true
      },
      {
        url: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg",
        filename: "watch-1.jpg",
        isMain: false
      }
    ]
  },
  {
    title: "Leather Backpack",
    description: ["Durable leather backpack suitable for work or travel."],
    price: 3499,
    stock: 40,
    category: "Fashion",
    images: [
      {
        url: "https://images.pexels.com/photos/374906/pexels-photo-374906.jpeg",
        filename: "backpack-main.jpg",
        isMain: true
      },
      {
        url: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg",
        filename: "backpack-1.jpg",
        isMain: false
      }
    ]
  }
];

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
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log("Sample products inserted");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error inserting data:", err);
  }
}
