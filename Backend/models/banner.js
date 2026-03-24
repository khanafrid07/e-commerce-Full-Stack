const mongoose = require("mongoose")

const bannerSchema = new mongoose.Schema({
  title: String,

  image: String,


  heading: String,
  subHeading: String,

  ctaText: String,
  ctaLink: String,

  type: {
    type: String,
    enum: ["hero", "category", "promo"]
  },

  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },

  placement: {
    type: String,
    enum: ["home_top", "home_middle", "home_bottom"],
    default: "home_top"
  },

  position: {
    type: String,
    enum: ["left", "center", "right"],
    default: "left"
  },

  vertical: {
    type: String,
    enum: ["top", "center", "bottom"],
    default: "center"
  },

  priority: Number,

  startDate: Date,
  endDate: Date,

  isActive: {
    type: Boolean,
    default: true
  }
});
const Banner = mongoose.model("Banner", bannerSchema);
module.exports = Banner