const express = require("express");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const connectDB = require("./db");
const taskRoutes = require("./routes/tasks");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173",  // Frontend URL
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Generate and set userID cookie if not already set
app.use("/", (req, res, next) => {
    let userID = req.cookies.userID;
    if (!userID) {
        userID = uuidv4();
        res.cookie("userID", userID, {
            httpOnly: true,
            sameSite: 'None',  // Ensures cookies work for same-site requests
            secure: "true",
            maxAge: 1000 * 60 * 60 * 24 * 30,  // 30 days
        });
    }
    next();
});

// Connect to database
connectDB();

// Routes
app.use("/tasks", taskRoutes);


module.exports = app;