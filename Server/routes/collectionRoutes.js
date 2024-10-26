// server/routes/collectionRoutes.js
const express = require("express");
const {
  addCollection,
  getCollections,
  getCollectionsByPinCode,
} = require("../controllers/collectionController");

const router = express.Router();

router.post("/add", addCollection); // POST /collection/add
router.get("/all", getCollections); // GET /collection/all
router.get("/:pinCode", getCollectionsByPinCode); // GET /collection/:pinCode

module.exports = router;
