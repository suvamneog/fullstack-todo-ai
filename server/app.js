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
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
}));


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/", (req, res, next) => {
    let userID = req.cookies.userID;
    if (!userID) {
        userID = uuidv4();
        res.cookie("userID", userID, {
            httpOnly: false,  // Change to false so it's accessible via JavaScript
            maxAge: 5 * 24 * 60 * 60 * 1000,
            secure: false,    // Change to false for local development
            sameSite: 'Lax',
            path: "/",
        });
    }
    next();
});

// Connect to database
connectDB();

app.get("/", (req,res) => {
    res.redirect("/tasks");
});
// Routes
app.use("/tasks", taskRoutes);


app.get("/", (req,res) => {
    res.redirect("/tasks");
});

module.exports = app;