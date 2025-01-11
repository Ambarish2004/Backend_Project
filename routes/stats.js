const express = require("express");
const router = express.Router();
const Crypto = require("../models/Crypto");

// GET /api/stats
router.get("/stats", async (req, res) => {
    const { coin } = req.query;

    try {
        const latestData = await Crypto.findOne({ coin }).sort({ timestamp: -1 });
        if (!latestData) {
            return res.status(404).json({ message: "Data not found" });
        }

        res.json({
            price: latestData.price,
            marketCap: latestData.marketCap,
            "24hChange": latestData.change24h,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;