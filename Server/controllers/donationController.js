// server/controllers/donationController.js
const Donation = require("../models/Donation");

// Add new donation
exports.addDonation = async (req, res) => {
  const { quantity, pinCode, waterQuality, donorName, donorContact } = req.body;

  if (!quantity || !pinCode || !waterQuality) {
    return res
      .status(400)
      .json({ error: "Quantity, pin code, and water quality are required." });
  }

  try {
    const donation = new Donation({
      quantity,
      pinCode,
      waterQuality,
      donorName: donorName || "Anonymous",
      donorContact,
    });
    await donation.save();
    res.status(201).json(donation);
  } catch (error) {
    res.status(400).json({ error: "Unable to add donation" });
  }
};

// Get all donations
exports.getDonations = async (req, res) => {
  try {
    const donations = await Donation.find();
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch donations" });
  }
};

// Get donations by pin code
exports.getDonationsByPinCode = async (req, res) => {
  const { pinCode } = req.params;

  try {
    const donations = await Donation.find({ pinCode });
    if (donations.length === 0) {
      return res
        .status(404)
        .json({ message: `No donations found for pin code ${pinCode}` });
    }
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch donations" });
  }
};
