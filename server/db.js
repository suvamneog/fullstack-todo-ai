const mongoose = require("mongoose");
require("dotenv").config();

const connectDBWithRetry = async () => {
  const maxRetries = parseInt(process.env.MAX_RETRIES || "3", 10);
  const retryDelay = parseInt(process.env.RETRY_DELAY || "2000", 10);
  let retries = 0;

  if (!process.env.MONGODB_URL) {
    console.error("❌ Missing MONGODB_URL in environment variables");
    process.exit(1);
  }

  while (retries < maxRetries) {
    try {
      console.log("Attempting to connect to MongoDB Atlas...");
      
      await mongoose.connect(process.env.MONGODB_URL, {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      console.log("✅ MongoDB Atlas connected successfully");
      return;
    } catch (err) {
      retries++;
      console.error(`❌ MongoDB Atlas connection attempt ${retries} failed: ${err.message}`);
      
      if (retries === maxRetries) {
        console.error("\n🔴 MongoDB Atlas Connection Troubleshooting:");
        console.error("1. Check your network connection");
        console.error("2. Verify MongoDB Atlas credentials in your .env file");
        console.error("3. Ensure your IP address is whitelisted in MongoDB Atlas");
        console.error("4. Confirm your MongoDB cluster is active and running");
        process.exit(1);
      }

      console.log(`Retrying in ${retryDelay / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
};

module.exports = connectDBWithRetry;