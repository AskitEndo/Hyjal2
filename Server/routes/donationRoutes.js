// server/routes/donationRoutes.js
const express = require("express");
const {
  addDonation,
  getDonations,
  getDonationsByPinCode,
} = require("../controllers/donationController");

const router = express.Router();

router.post("/add", addDonation); // POST /donation/add
router.get("/all", getDonations); // GET /donation/all
router.get("/:pinCode", getDonationsByPinCode); // GET /donation/:pinCode

module.exports = router;
