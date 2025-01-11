const express = require("express");
const mongoose = require("mongoose");
const statsRoute = require("./routes/stats");
const deviationRoute = require("./routes/deviation");
const fetchCryptoData = require("./jobs/fetchCryptoData");
require("./jobs/scheduler"); // Start cron job

const app = express();

// Middleware
app.use(express.json());

// Use routes
app.use("", statsRoute);
app.use("", deviationRoute);

// MongoDB connection
mongoose
    .connect("mongodb+srv://Ambar:ambar@cluster0.g8id6nx.mongodb.net/crypto-stats?retryWrites=true&w=majority&appName=Cluster0")
    .then(async () => {
        console.log("Connected to MongoDB");

        // Insert initial data if database is empty
        const Crypto = require("./models/Crypto");
        const cryptoData = [
            { coin: "bitcoin", price: 40000, marketCap: 800000000, change24h: 3.4 },
            { coin: "ethereum", price: 2500, marketCap: 250000000, change24h: 2.8 },
            { coin: "matic-network", price: 1.5, marketCap: 1500000000, change24h: 1.2 },
        ];

        const existingData = await Crypto.find({});
        if (existingData.length === 0) {
            await Crypto.insertMany(cryptoData);
            console.log("Initial data inserted.");
        }
    })
    .catch((err) => console.error("Failed to connect to MongoDB", err));

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
