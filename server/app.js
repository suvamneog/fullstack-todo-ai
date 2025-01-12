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

app.use(function (req, res, next) {
  // Read allowed origins from the .env file
  const allowedOrigins = [process.env.FRONTEND_URL, process.env.BACKEND_URL, `${process.env.BACKEND_URL}/copilotkit`];
  const origin = req.headers.origin;

  // If the origin is allowed, set the header
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  // Allow credentials, headers, and methods
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");

  // Handle preflight (OPTIONS) requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});



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
  key : process.env.OPENAI_API_KEY,
});

app.use('/copilotkit', (req, res, next) => {
  const runtime = new CopilotRuntime();
  const handler = copilotRuntimeNodeHttpEndpoint({
    endpoint: '/copilotkit',
    runtime,
    serviceAdapter,
  });

  return handler(req, res, next);
});

// Routes
app.get("/", (req, res) => {
  res.redirect("/tasks");
});

app.use("/tasks", taskRoutes);


module.exports = app;