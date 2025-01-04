const express = require("express"); 
const { getTask, saveTask } = require("../controllers/taskController");
const router = express.Router();


router.get("/", getTask )
router.post("/", saveTask)

// router.post("/", (req,res) => {
//     console.log(req.body);
//     let data = req.body;
//     res.json({receivedData: data})
// })

// router.delete("/:id", (req,res) => {
//     let {id} = req.params;
//     res.json({deleted: id})
// })

module.exports=router;