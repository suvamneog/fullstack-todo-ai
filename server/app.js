const express = require("express");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const connectDB = require("./db");
const taskRoutes = require("./routes/tasks");
require("dotenv").config();

// Import CopilotKit
const { CopilotRuntime, AnthropicAdapter, copilotRuntimeNodeHttpEndpoint } = require('@copilotkit/runtime');

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
const serviceAdapter = new AnthropicAdapter();

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

// You can uncomment the below lines for logging purposes
// app.use((req, res, next) => {
//     console.log(`Incoming Request: ${req.method} ${req.url}`);
//     console.log("Body:", req.body);
//     console.log("Cookies:", req.cookies);
//     next();
// });

module.exports = app;