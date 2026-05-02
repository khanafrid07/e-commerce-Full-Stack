const mongoose = require("mongoose");
let Schema = mongoose.Schema


let userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,

  },
  addresses: [
    {
      addressName: { type: String },
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
      country: { type: String, default: "India" },
      phone: { type: String },
      isDefault: { type: Boolean, default: false },
    },

  ],
  provider: {
    type: String,
    enum: ["local", "google"],
    default: "local"
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }


}, { timestamps: true })

let User = mongoose.model("User", userSchema)
module.exports = User