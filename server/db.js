const mongoose = require("mongoose");
require("dotenv").config();

const connectDBWithRetry = async () => {
  const maxRetries = 3;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      console.log('Attempting to connect to MongoDB Atlas...');
      await mongoose.connect(process.env.MONGODB_URL, {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        maxTimeMS: 5000
      });
      
      console.log("✅ MongoDB Atlas connected successfully");
      return;
    } catch (err) {
      retries++;
      console.error(`❌ MongoDB Atlas connection attempt ${retries} failed:`, err.message);
      
      if (retries === maxRetries) {
        console.error("\n🔴 MongoDB Atlas Connection Troubleshooting:");
        console.log("1. Check your network connection");
        console.log("2. Verify MongoDB Atlas credentials");
        console.log("3. Ensure IP address is whitelisted in Atlas");
        console.log("4. Confirm cluster is active");
        process.exit(1);
      }
      
      console.log(`Retrying in 2 seconds...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
};

module.exports = connectDBWithRetry;