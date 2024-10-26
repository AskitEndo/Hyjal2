// server/models/collectionModel.js
const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
  pincode: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false, // Optional
  },
  email: {
    type: String,
    required: false, // Optional
    match: /.+\@.+\..+/, // Validate email format
  },
  paymentMode: {
    type: String,
    required: true,
    enum: ["COD", "Online"], // Only allow these payment modes
  },
  waterQuality: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1, // Minimum quantity of water
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Collection", collectionSchema);
