const express = require("express"); 
const router = express.Router();
router.get("/", (req,res) => {
    res.json({message: "Hi"})
})

router.post("/", (req,res) => {
    let data = req.body;
    res.json({receivedData: data})
})

module.exports=router;