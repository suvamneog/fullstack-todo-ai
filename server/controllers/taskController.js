const dataModel = require("../models/Data");

//showAll
const getTask = async (req, res) => {
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
const saveTask = async (req, res) => {
  let { task, id } = req.body;
  const userID = req.cookies.userID;
  const newTask = await dataModel.create({ task, userID, completed: false});
    console.log("task saved");
    console.log({ task, userID});
    res.send(newTask);
  };

//update
const updateTask = async (req, res) => {
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
const upperCaseTask = async (req, res) => {
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
const deleteTask = async (req, res) => {
  const { id } = req.params;
  const delTask = await dataModel.findOneAndDelete({ id });
  if (!delTask) {
    return res.status(404).send({ message: "Task not found." });
  }
  res.send(delTask);
  console.log(delTask);
};


const completedTask = async (req, res) => {
  const { id } = req.params;
  const task = await dataModel.findOne({ id });
  const updatedTask = await dataModel.findOneAndUpdate(
    { id },
    {completed: !task.completed},
    { new: true }
  );
  if (!updatedTask) {
    return res.status(404).send({ message: "Task not found." });
  }
  res.send(updatedTask);
  console.log(updatedTask);
};

module.exports = {
  getTask,
  saveTask,
  updateTask,
  upperCaseTask,
  deleteTask,
  completedTask
};