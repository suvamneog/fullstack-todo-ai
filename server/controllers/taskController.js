const dataModel = require("../models/Data");

module.exports.getTask = async(req,res) => {
    const tasks = await dataModel.find();
    res.send(tasks);
}

module.exports.saveTask = async(req, res) => {
    const {task,userID,taskID} = req.body;
dataModel.create({task,userID,taskID}).then((data) => {
    console.log("task saved");
    console.log(data);
    res.send(task);
})
}