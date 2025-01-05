const express = require("express"); 
const { getTask, saveTask, updateTask, upperCaseTask, deleteTask } = require("../controllers/taskController");
const router = express.Router();


router.get("/", getTask )
router.post("/", saveTask)
router.put("/:id", updateTask)
router.put("/:id/uppercase", upperCaseTask)
router.delete("/:id", deleteTask)


module.exports=router;