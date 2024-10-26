// server/controllers/collectionController.js
const Collection = require("../models/collectionModel");
const { v4: uuidv4 } = require("uuid");

// Add a new collection
const addCollection = async (req, res) => {
  try {
    const collection = new Collection({
      ...req.body,
      uid: uuidv4(), // Generate a unique ID
    });
    await collection.save();
    res
      .status(201)
      .json({ message: "Collection added successfully", collection });
  } catch (error) {
    res.status(500).json({ message: "Error adding collection", error });
  }
};

// Get all collections
const getCollections = async (req, res) => {
  try {
    const collections = await Collection.find();
    res.status(200).json(collections);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving collections", error });
  }
};

// Get collections by pincode
const getCollectionsByPinCode = async (req, res) => {
  const { pinCode } = req.params;
  try {
    const collections = await Collection.find({ pincode: pinCode });
    res.status(200).json(collections);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving collections by pincode", error });
  }
};

module.exports = { addCollection, getCollections, getCollectionsByPinCode };
