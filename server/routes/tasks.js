const express = require("express"); 
const { getTask, saveTask, updateTask, upperCaseTask } = require("../controllers/taskController");
const router = express.Router();


router.get("/", getTask )
router.post("/", saveTask)
router.put("/:taskID", updateTask)
router.put("/:taskID/uppercase", upperCaseTask)


module.exports=router;