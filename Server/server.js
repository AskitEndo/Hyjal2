// server/server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const donationRoutes = require("./routes/donationRoutes");
const collectionRoutes = require("./routes/collectionRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use the donation routes with the '/donation' path
app.use("/donation", donationRoutes);

// Use the collection routes with the '/collection' path
app.use("/collection", collectionRoutes); // Add this line

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
