const mongoose = require("mongoose");
const { Schema } = mongoose;

const tempUserSchema = new Schema(
    {
        email: { type: String, required: true, },

        name: { type: String, required: true },

        password: { type: String, required: true },

        otp: { type: String, required: true },

        expiresAt: {
            type: Date,
            default: () => Date.now() + 10 * 60 * 1000,
            expires: 0,
        },
    },
    { timestamps: true }
);

const TempUser = mongoose.model("TempUser", tempUserSchema);

module.exports = TempUser;