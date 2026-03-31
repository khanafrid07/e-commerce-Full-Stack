const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    
    title: {
      type: String,
      trim: true,
    },
    heading: {
      type: String,
      trim: true,
    },
    subHeading: {
      type: String,
      trim: true,
    },

   
    image: {
      type: String, // URL
      required: true,
    },

    ctaText: {
      type: String,
      trim: true,
    },
    ctaLink: {
      type: String,
      trim: true,
    },

   
    type: {
      type: String,
      enum: ["hero", "promo", "category"],
      required: true,
    },

    placement: {
      type: String,
      enum: ["home_top", "home_middle", "home_bottom"],
    },

   category:String,

    
    template: {
      type: String,
      enum: [
        "none",
        "light-overlay",
        "dark-overlay",
        "left-dark",
        "center-light",
        "overlay-gradient",
        "gradient-right",
        "card-overlay",
        "minimal",
      ],
      required: true,
    },

    priority: {
      type: Number,
      default: 0,
    },

    startDate: Date,
    endDate: Date,

    // Status
    isActive: {
      type: Boolean,
      default: true,
    },

    // 🎨 TEXT STYLING (Lightweight options)
    textColor: {
      type: String,
      enum: ["white", "dark", "gray"],
      default: "white",
    },
    ctaButtonColor: {
      type: String,
      enum: ["blue", "red", "green", "purple", "black"],
      default: "blue",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banner", bannerSchema);