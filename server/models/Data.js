const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const todoSchema = new mongoose.Schema({
    userID: {
        type: String,
      },
      id: {
        type: String,
        required: true, 
       default: () => uuidv4() // Unique task identifier
      },
      task: {
        type: String,
        required: true,  // Task description
      },
      completed: {
        type: Boolean,
        default: false,  // Tasks are incomplete by default
      },
      createdAt: {
        type: Date,
        default: Date.now,  // Automatically set creation time
      }
});

module.exports= mongoose.model("Data", todoSchema);