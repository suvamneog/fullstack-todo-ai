const dataModel = require("../models/Data");

// Show all tasks
const getTask = async (req, res) => {
  const userID = req.cookies.userID;

  try {
    const tasks = await dataModel.find({ userID });
    if (!tasks.length) {
      return res.status(404).send({ message: "No tasks found for this user." });
    }
    res.send(tasks);
  } catch (error) {
    res.status(500).send({ message: "Error fetching tasks", error: error.message });
  }
};

// Add & save a new task
const saveTask = async (req, res) => {
  const { task } = req.body;
  const userID = req.cookies.userID;
  console.log(userID);

  if (!userID) {
    return res.status(400).send({ message: "User ID is missing in cookies." });
  }

  if (!task || task.trim() === "") {
    return res.status(400).send({ message: "Task content is required." });
  }

  try {
    const newTask = await dataModel.create({ task, userID, completed: false });
    console.log("Task saved:", { task, userID });
    res.status(201).send(newTask);
  } catch (error) {
    res.status(500).send({ message: "Error saving task", error: error.message });
  }
};

// Update a task
const updateTask = async (req, res) => {
  const { task } = req.body;
  const { id } = req.params;

  if (!task || task.trim() === "") {
    return res.status(400).send({ message: "Task content is required to update." });
  }

  try {
    const updatedTask = await dataModel.findOneAndUpdate(
      { id },
      { task },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).send({ message: "Task not found." });
    }
    res.send(updatedTask);
  } catch (error) {
    res.status(500).send({ message: "Error updating task", error: error.message });
  }
};

// Convert task content to uppercase
const upperCaseTask = async (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  if (!task || task.trim() === "") {
    return res.status(400).send({ message: "Task content is required to update." });
  }

  try {
    const newTask = await dataModel.findOneAndUpdate(
      { id },
      { $set: { task: task.toUpperCase() } },
      { new: true }
    );
    if (!newTask) {
      return res.status(404).send({ message: "Task not found." });
    }
    res.send(newTask);
  } catch (error) {
    res.status(500).send({ message: "Error updating task", error: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const delTask = await dataModel.findOneAndDelete({ id });
    if (!delTask) {
      return res.status(404).send({ message: "Task not found." });
    }
    res.send(delTask);
  } catch (error) {
    res.status(500).send({ message: "Error deleting task", error: error.message });
  }
};

// Mark task as completed or incomplete
const completedTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await dataModel.findOne({ id });
    if (!task) {
      return res.status(404).send({ message: "Task not found." });
    }

    const updatedTask = await dataModel.findOneAndUpdate(
      { id },
      { completed: !task.completed },
      { new: true }
    );
    res.send(updatedTask);
  } catch (error) {
    res.status(500).send({ message: "Error updating task completion status", error: error.message });
  }
};

module.exports = {
  getTask,
  saveTask,
  updateTask,
  upperCaseTask,
  deleteTask,
  completedTask
};