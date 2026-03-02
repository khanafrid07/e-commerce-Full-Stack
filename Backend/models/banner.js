const mongoose = require("mongoose")

const bannerSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["hero", "category"],
      required: true,
    },

    category: {
      type: String, 
      default: null,
    },

    titleTop: {
      type: String,
    },

    titleMiddle: {
      type: String,
    },

    titleBottom: {
      type: String,
    },

    image: {
      url: { type: String },
      public_id: { type: String },
    },

    link: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // position: {
    //   type: String,
    //   enum: ["home_top", "home_middle", "home_bottom"],
    //   default: "home_top",
    // },

    priority: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports =  mongoose.model("Banner", bannerSchema);