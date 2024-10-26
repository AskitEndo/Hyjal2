// server/controllers/donationController.js
const Donation = require("../models/Donation");
const { v4: uuidv4 } = require("uuid");

// Add a new donation
const addDonation = async (req, res) => {
  try {
    const donation = new Donation({
      ...req.body,
      uid: uuidv4(), // Generate a unique ID
    });
    await donation.save();
    res.status(201).json({ message: "Donation added successfully", donation });
  } catch (error) {
    res.status(500).json({ message: "Error adding donation", error });
  }
};

// Get all donations
const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find();
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving donations", error });
  }
};

// Get donations by pincode
const getDonationsByPinCode = async (req, res) => {
  const { pinCode } = req.params;
  try {
    const donations = await Donation.find({ pincode: pinCode });
    res.status(200).json(donations);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving donations by pincode", error });
  }
};

module.exports = { addDonation, getDonations, getDonationsByPinCode };
