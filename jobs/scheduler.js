const cron = require("node-cron");
const Crypto = require("../models/Crypto");
const fetchCryptoData = require("./fetchCryptoData");

cron.schedule("0 */2 * * *", async () => {
    console.log("Fetching cryptocurrency data...");
    try {
        const data = await fetchCryptoData();

        const records = Object.entries(data).map(([coin, details]) => ({
            coin,
            price: details.usd,
            marketCap: details.usd_market_cap || 0,
            change24h: details.usd_24h_change || 0,
        }));

        await Crypto.insertMany(records);
        console.log("Data stored successfully.");
    } catch (error) {
        console.error("Error in background job:", error.message);
    }
});
