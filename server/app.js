const express = require("express");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const connectDB = require("./db");
const taskRoutes = require("./routes/tasks");
require("dotenv").config();

// (Import-CopilotKit)
const {
  CopilotRuntime,
  OpenAIAdapter,
  copilotRuntimeNodeHttpEndpoint,
} = require("@copilotkit/runtime");

const app = express();

const corsOptions = {
  origin: "https://fullstack-todo-ai.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
};

// Enable CORS
app.use(cors(corsOptions));

// Preflight request handler
app.options("*", cors(corsOptions)); // This ensures preflight requests are handled

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Connect to database
connectDB();

// Copilot Runtime
const serviceAdapter = new OpenAIAdapter({
  model: "gpt-3.5-turbo", // Specify the model explicitly
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

// Routes
app.get("/", (req, res) => {
  res.redirect("/tasks");
});

module.exports = app;