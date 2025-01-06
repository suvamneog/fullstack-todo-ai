const express = require("express"); 
const { getTask, saveTask, updateTask, upperCaseTask, deleteTask, completedTask } = require("../controllers/taskController");
const router = express.Router();


router.get("/", getTask )
router.post("/", saveTask)
router.put("/:id", updateTask)
router.put("/:id/uppercase", upperCaseTask)
router.delete("/:id", deleteTask)
// router.patch("/:id",completedTask)


module.exports=router;