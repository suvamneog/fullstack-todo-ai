const express = require("express");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const connectDB = require("./db");
const taskRoutes = require("./routes/tasks");
require("dotenv").config();

// Import CopilotKit
const { CopilotRuntime, OpenAIAdapter, copilotRuntimeNodeHttpEndpoint } = require('@copilotkit/runtime');

const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", (req, res, next) => {
  let userID = req.cookies.userID;
  if (!userID) {
    userID = uuidv4();
    res.cookie("userID", userID, {
      httpOnly: false,
      maxAge: 5 * 24 * 60 * 60 * 1000,
    });
  }
  next();
});

// Connect to database
connectDB();

// Copilot Runtime Setup
const serviceAdapter = new OpenAIAdapter({
  model: 'gpt-3.5-turbo', // Specify the model explicitly
});

const runtime = new CopilotRuntime();
const handler = copilotRuntimeNodeHttpEndpoint({
  endpoint: '/copilotkit',
  runtime,
  serviceAdapter,
});

// Routes
app.get("/", (req, res) => {
  res.redirect("/tasks");
});

app.use("/tasks", taskRoutes);

const UserApiUsage = require("./models/userApiUsage");

app.use("/copilotkit", async (req, res, next) => {
  const userID = req.cookies.userID;

  // Fetch user's usage data
  let userUsage = await UserApiUsage.findOne({ userID });

  // If no record exists, create one
  if (!userUsage) {
    userUsage = new UserApiUsage({ userID });
    await userUsage.save();
  }

  // Reset quota if a new period has started (e.g., monthly reset)
  const now = new Date();
  const resetPeriod = 30 * 24 * 60 * 60 * 1000; // Monthly reset
  if (now - userUsage.lastReset > resetPeriod) {
    userUsage.requests = 0;
    userUsage.lastReset = now;
    await userUsage.save();
  }

  // Check if the user has exceeded the quota
  if (userUsage.requests >= userUsage.maxQuota) {
    return res.status(429).json({ error: "Quota exceeded. Upgrade your plan to continue." });
  }

  // Increment the request count
  userUsage.requests += 1;
  await userUsage.save();

  // Proceed to the CopilotKit endpoint if quota not exceeded
  handler(req, res, next);
});

module.exports = app;