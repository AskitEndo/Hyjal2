const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    quantity: { type: Number, required: true },
    pincode: { type: Number, required: true },
    waterQuality: { type: String, required: true },
    name: { type: String }, // Optional
    email: { type: String }, // Optional
    uid: { type: String, unique: true, required: true }, // Unique ID for tracking
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema);
