const mongoose = require("mongoose");

const userApiUsageSchema = new mongoose.Schema({
  userID: { type: String, unique: true }, // The user's unique ID (added unique constraint)
  requests: { type: Number, default: 0 }, // Count of API requests
  lastReset: { type: Date, default: Date.now }, // Last reset date
  maxQuota: { type: Number, default: 100 }, // Max requests allowed per period (monthly)
});

const UserApiUsage = mongoose.model("UserApiUsage", userApiUsageSchema);

module.exports = UserApiUsage;