const express = require("express");
const bodyParser = require('body-parser');
const connectDB = require("./db"); 
const taskRoutes = require("./routes/tasks");
const cookieParser = require('cookie-parser')
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cookieParser())




app.use("/", (req, res, next) => {
    let userID = req.cookies.userID;
    if(!userID) {
        userID = uuidv4();
        res.cookie("userID", userID), {
            httpOnly: true,  // Cookie cannot be accessed by frontend JavaScript
      maxAge: 1000 * 60 * 60 * 24 * 30  // 30 days
        }
    }
    next();
})


require ("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.use("/tasks",taskRoutes);


module.exports = app;