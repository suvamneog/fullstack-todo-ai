const express = require("express"); 
const { getTask, saveTask, updateTask, upperCaseTask, deleteTask } = require("../controllers/taskController");
const router = express.Router();


router.get("/", getTask )
router.post("/", saveTask)
router.put("/:taskID", updateTask)
router.put("/:taskID/uppercase", upperCaseTask)
router.delete("/:taskID", deleteTask)


module.exports=router;