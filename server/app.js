const express = require("express");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const connectDB = require("./db");
const taskRoutes = require("./routes/tasks");
require("dotenv").config();

// CopilotKit
const {
  CopilotRuntime,
  OpenAIAdapter,
  copilotRuntimeNodeHttpEndpoint,
} = require("@copilotkit/runtime");

const app = express();

// CORS Options
const corsOptions = {
  origin: "https://fullstack-todo-ai-1.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json()); // Body parsing middleware
app.use(express.urlencoded({ extended: true }));

// Logging Middleware (for debugging requests)
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  console.log("Headers:", req.headers);
  if (req.body) console.log("Body:", req.body);
  next();
});

// Preflight CORS Handling for POST
app.options("/tasks", cors(corsOptions)); // Explicitly handle preflight requests

// Task Routes with Cookie Middleware
app.use(
  "/tasks",
  (req, res, next) => {
    let userID = req.cookies.userID;
    if (!userID) {
      userID = uuidv4();
      res.cookie("userID", userID, {
        httpOnly: false,
        maxAge: 5 * 24 * 60 * 60 * 1000,
        sameSite: "none",
        secure: true,
      });
    }
    next();
  },
  taskRoutes
);

// Database Connection
connectDB();

// CopilotKit Integration
const serviceAdapter = new OpenAIAdapter({
  model: "gpt-3.5-turbo",
  key: process.env.OPENAI_API_KEY,
});

app.use("/copilotkit", (req, res, next) => {
  const runtime = new CopilotRuntime();
  const handler = copilotRuntimeNodeHttpEndpoint({
    endpoint: "/copilotkit",
    runtime,
    serviceAdapter,
  });
  return handler(req, res, next);
});

// Root Route
app.get("/", (req, res) => {
  res.redirect("/tasks");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

// Export App
module.exports = app;