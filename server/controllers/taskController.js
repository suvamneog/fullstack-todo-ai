const dataModel = require("../models/Data");

//showAll
module.exports.getTask = async (req, res) => {
    const userID = req.cookies.userID;
    try {
  const tasks = await dataModel.find({userID});
  res.send(tasks);
}
catch (error) {
    res.status(500).send({ message: "Error fetching tasks", error });
  }
};

//add & save
module.exports.saveTask = async (req, res) => {
  let { task, id } = req.body;
  const userID = req.cookies.userID;
  const newTask = await dataModel.create({ task, userID, id,  completed: false});
    console.log("task saved");
    console.log({ task, userID, id });
    res.send(newTask);
  };

//update
module.exports.updateTask = async (req, res) => {
  let { task } = req.body;
  const { id } = req.params;
  // console.log("Updating task with taskID:", id, "and task:", task);
  const updatedTask = await dataModel.findOneAndUpdate(
    { id },
    { task },
    { new: true }
  );
  if (!updatedTask) {
    return res.status(404).send({ message: "Task not found." });
  }
  res.send(updatedTask);
  console.log(updatedTask);
};

//uppercase
module.exports.upperCaseTask = async (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  let { task } = req.body;
  const newTask = await dataModel.findOneAndUpdate(
    { id },
    { $set: { task: task.toUpperCase()} },
    { new: true }
  );
  if (!newTask) {
    return res.status(404).send({ message: "Task not found." });
  }
  res.send(newTask);
  console.log(newTask);
};

//delete
module.exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const delTask = await dataModel.findOneAndDelete({ id });
  if (!delTask) {
    return res.status(404).send({ message: "Task not found." });
  }
  res.send(delTask);
  console.log(delTask);
};
