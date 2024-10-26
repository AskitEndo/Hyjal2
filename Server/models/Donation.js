// server/models/Donation.js
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Using UUID for unique identifiers

const DonationSchema = new mongoose.Schema({
  uid: {
    type: String,
    default: () => uuidv4(), // Automatically generate a unique ID
    unique: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  pinCode: {
    type: String,
    required: true,
    match: /^[0-9]{6}$/, // Ensures a 6-digit pin code
  },
  waterQuality: {
    type: String,
    enum: ["Excellent", "Good", "Average", "Poor"],
    required: true,
  },
  donorName: {
    type: String,
    default: "Anonymous", // Defaults to "Anonymous" if not provided
  },
  donorContact: {
    type: String,
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, // Regex for basic email validation
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Donation", DonationSchema);
