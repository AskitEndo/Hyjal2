// server/controllers/collectionController.js
const Collection = require("../models/collectionModel.js");

// Add a new collection
const addCollection = async (req, res) => {
  try {
    const { pincode, name, email, paymentMode, waterQuality, quantity } =
      req.body;
    const newCollection = new Collection({
      pincode,
      name,
      email,
      paymentMode,
      waterQuality,
      quantity,
    });

    await newCollection.save();
    res
      .status(201)
      .json({ message: "Collection added successfully", data: newCollection });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding collection", error: error.message });
  }
};

// Get all collections
const getCollections = async (req, res) => {
  try {
    const collections = await Collection.find();
    res.status(200).json(collections);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching collections", error: error.message });
  }
};

// Get collections by pincode
const getCollectionsByPinCode = async (req, res) => {
  try {
    const { pinCode } = req.params;
    const collections = await Collection.find({ pincode: pinCode });
    res.status(200).json(collections);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching collections", error: error.message });
  }
};

module.exports = { addCollection, getCollections, getCollectionsByPinCode };
