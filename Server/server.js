// server/server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const donationRoutes = require("./routes/donationRoutes");

dotenv.config();
const app = express();

// Database Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/donation", donationRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
