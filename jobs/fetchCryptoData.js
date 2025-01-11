const axios = require("axios");

async function fetchCryptoData() {
    const url = "https://api.coingecko.com/api/v3/simple/price";
    const params = {
        ids: "bitcoin,ethereum,matic-network",
        vs_currencies: "usd",
        include_market_cap: "true",
        include_24hr_change: "true",
    };

    try {
        const response = await axios.get(url, { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching data from CoinGecko:", error.message);
        throw error;
    }
}

module.exports = fetchCryptoData;
