const express = require("express");
const router = express.Router();
const Crypto = require("../models/Crypto");

router.get("/deviation", async (req, res) => {
    const { coin } = req.query;

    try {
        // Fetch the latest 100 records for the specified coin
        const records = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);

        if (records.length === 0) {
            return res.status(404).json({ message: "No data available for the specified coin." });
        }

        if (records.length === 1) {
            return res.json({ deviation: 0.0 }); // Standard deviation is 0 if there's only one price
        }

        // Extract prices from the records
        const prices = records.map(record => record.price);

        // Calculate mean
        const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;

        // Calculate variance
        const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;

        // Calculate standard deviation
        const deviation = Math.sqrt(variance);

        console.log({ prices, mean, variance, deviation }); // Debugging output

        res.json({ deviation: parseFloat(deviation.toFixed(2)) });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
