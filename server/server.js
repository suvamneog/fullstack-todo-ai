const express = require("express");
const app = express();
require ("dotenv").config();
const connectDB = require("./db"); 
const taskRoutes = require("./routes/tasks");
const port = process.env.port || 5001;
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true })); // To handle form-urlencoded data
app.use(bodyParser.json()); // To handle JSON data


connectDB();


// app.get('/', (req, res) => {
//     res.json({message: "Welcome to the server!"});
//   })

// app.post('/', (req, res) => {
//   const data = req.body;
//     res.json({ receivedData: data });
//   })

//   app.delete('/:id', (req, res) => {
//     const {id} = req.params;
//     res.json({deleted : id});
//   })

app.use(taskRoutes);



  app.listen(port, () => {
    console.log(`server is listening to port ${port}`);
  });
  