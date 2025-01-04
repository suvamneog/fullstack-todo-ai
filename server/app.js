const express = require("express");
const bodyParser = require('body-parser');
const connectDB = require("./db"); 
const taskRoutes = require("./routes/tasks");

require ("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.use("/tasks",taskRoutes);

module.exports = app;