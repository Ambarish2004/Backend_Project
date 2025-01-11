Here is a detailed guide summarizing everything we've done to create and run your **Crypto Stats API Project**. You can add this to your `README.md` file for reference.

---

# **Crypto Stats API**

This project is a cryptocurrency stats API that fetches data about cryptocurrencies and provides endpoints for fetching the latest stats and calculating the standard deviation of prices. The project uses **Node.js**, **Express**, and **MongoDB (Atlas)**.

---

## **Features**
- Fetch the latest cryptocurrency stats (`/stats`).
- Calculate the standard deviation of cryptocurrency prices for the last 100 records (`/deviation`).
- Scheduled background service to fetch and store crypto data periodically.

---

## **Technologies Used**
- **Node.js**: Backend runtime environment.
- **Express.js**: Framework for building APIs.
- **MongoDB Atlas**: Cloud-based NoSQL database.
- **Mongoose**: ODM for MongoDB.
- **Node-cron**: To schedule periodic tasks.

---

## **Setup and Installation**

### 1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/crypto-stats.git
cd crypto-stats
```

### 2. **Install Dependencies**
Run the following command to install all required packages:
```bash
npm install
```

### 3. **Environment Setup**
Create a `.env` file to store sensitive data such as your MongoDB connection string. Add the following:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.g8id6nx.mongodb.net/crypto-stats?retryWrites=true&w=majority
```
Replace `<username>` and `<password>` with your MongoDB Atlas credentials.

### 4. **Database Setup**
1. **MongoDB Atlas**: Set up a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas).
2. **IP Whitelisting**: Add your current IP address to the cluster's whitelist.
3. **Initial Data**: The app will insert initial data if the database is empty.

---

## **How to Run the Project**

### 1. **Start the Server**
Use the following command:
```bash
npm start
```
The server will run at `http://localhost:3000`.

---

## **API Endpoints**

### **1. Fetch Latest Cryptocurrency Stats**
**Endpoint**: `/api/stats`  
**Query Params**:  
`coin`: The cryptocurrency name (e.g., `bitcoin`, `ethereum`, `matic-network`).  

**Example Request**:
```
GET /api/stats?coin=bitcoin
```

**Sample Response**:
```json
{
  "price": 40000,
  "marketCap": 800000000,
  "24hChange": 3.4
}
```

---

### **2. Fetch Standard Deviation of Prices**
**Endpoint**: `/api/deviation`  
**Query Params**:  
`coin`: The cryptocurrency name (e.g., `bitcoin`, `ethereum`, `matic-network`).  

**Example Request**:
```
GET /api/deviation?coin=bitcoin
```

**Sample Response**:
```json
{
  "deviation": 4082.48
}
```

---

## **Background Services**

- **Scheduled Data Fetching**:
  A cron job is implemented using `node-cron` to periodically fetch and store the latest cryptocurrency data in the database.

---

## **Project Structure**
```
crypto-stats/
├── jobs/
│   ├── fetchCryptoData.js   # Fetches cryptocurrency data
│   ├── scheduler.js         # Schedules background tasks
├── models/
│   ├── Crypto.js            # Mongoose schema for crypto data
├── routes/
│   ├── stats.js             # Routes for fetching latest stats
│   ├── deviation.js         # Routes for standard deviation
├── server.js                # Main server entry point
├── package.json             # Project metadata and dependencies
├── .env                     # Environment variables
├── .gitignore               # Ignored files/folders
└── README.md                # Project documentation
```

---

## **Sample Initial Data**
Upon the first run, the following data is added to the database:
```json
[
  { "coin": "bitcoin", "price": 40000, "marketCap": 800000000, "change24h": 3.4 },
  { "coin": "ethereum", "price": 2500, "marketCap": 250000000, "change24h": 2.8 },
  { "coin": "matic-network", "price": 1.5, "marketCap": 1500000000, "change24h": 1.2 }
]
```

---

## **Development Steps**

### 1. Create the Project and Set Up Server
- Installed `express`, `mongoose`, and other dependencies.
- Set up `server.js` with MongoDB connection and routes.

### 2. Define the Mongoose Schema
- Created `Crypto.js` in the `models/` directory.

### 3. Implement API Endpoints
- `/stats`: Fetch the latest cryptocurrency data.
- `/deviation`: Calculate the standard deviation of prices.

### 4. Add Background Job
- Created a job to fetch crypto data periodically using `node-cron`.

---

## **Future Enhancements**
- Add more cryptocurrencies and dynamic data fetching.
- Implement authentication for API access.
- Improve data visualization and create a frontend dashboard.

---

Feel free to modify this as needed. Let me know if you need further refinements!
