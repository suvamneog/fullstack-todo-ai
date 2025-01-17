const dataModel = require("../models/Data");

// Show all tasks
const getTask = async (req, res) => {
  const userID = req.cookies.userID;
  try {
    const tasks = await dataModel.find({ userID });
    res.send(tasks);
  } catch (error) {
    res.status(500).send({ message: "Error fetching tasks", error: error.message });
  }
};

// Add & save a new task
const saveTask = async (taskData) => {
  console.log('Attempting to save task with data:', taskData);
  
  try {
    const response = await axios.post(`${API_URL}/tasks`, taskData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Server response:', response);
    return response.data;
  } catch (error) {
    console.error('Save task error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      requestData: error.config?.data
    });
    throw error;
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
    console.log("Request received to save task:", {updateTask}); 
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