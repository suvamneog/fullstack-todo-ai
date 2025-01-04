const dataModel = require("../models/Data");

module.exports.getTask = async(req,res) => {
    const tasks = await dataModel.find({});
    res.send(tasks);
}

module.exports.saveTask = async(req, res) => {
    let { task, taskID } = req.body;
    const userID = req.cookies.userID;
dataModel.create({task,userID,taskID}).then((data) => {
    console.log("task saved");
    console.log({ task, userID, taskID });
    res.send(task);
})
};

module.exports.updateTask = async(req, res) => {
    let {task} = req.body;
    const {taskID} = req.params;
    console.log("Updating task with taskID:", taskID, "and task:", task);
    const updatedTask = await dataModel.findOneAndUpdate(
        {taskID},
        {task},
        {new : true}
    );
    if(!updatedTask){
            return res.status(404).send({ message: "Task not found." });
          }
          res.send(updatedTask);
          console.log(updatedTask);
    }
    
module.exports.upperCaseTask = async(req, res) => {
    let {task} = req.body;
    const {taskID} = req.params;
    const newTask = await dataModel.findOneAndUpdate(
        {taskID},
       { $set: {task: task.toUpperCase(),
        completed : true}},
        {new : true}
    );
    if(!newTask){
        return res.status(404).send({ message: "Task not found." });
      }
      res.send(newTask);
      console.log(newTask);
}


