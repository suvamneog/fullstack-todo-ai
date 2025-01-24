const express = require("express")
const cors = require("cors")
const connectDB = require("./db")
const taskRoutes = require("./routes/tasks")
require("dotenv").config()

// (CopilotKit-AI)
const { CopilotRuntime, OpenAIAdapter, copilotRuntimeNodeHttpEndpoint } = require("@copilotkit/runtime")

const app = express()

const corsOptions = {
  origin: "https://fullstack-todo-ai.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
}

app.use(cors(corsOptions))

// Add OPTIONS handling for preflight requests
app.options("*", cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/tasks", taskRoutes)

// Connect to database
connectDB()

// Copilot-Runtime
const serviceAdapter = new OpenAIAdapter({
  model: "gpt-3.5-turbo", // Specify the model explicitly
  key: process.env.OPENAI_API_KEY,
})

app.use("/copilotkit", (req, res, next) => {
  console.log("Request received at /copilotkit", req.headers);
  const runtime = new CopilotRuntime()
  const handler = copilotRuntimeNodeHttpEndpoint({
    endpoint: "/copilotkit",
    runtime,
    serviceAdapter,
  })

  return handler(req, res, next);
})

app.get("/", (req, res) => {
  res.redirect("/tasks")
})

module.exports = app

