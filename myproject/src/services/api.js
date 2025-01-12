import axios from "axios";
const API_URL = "https://fullstack-todo-ai-1.onrender.com";

// Fetch tasks
export const fetchTask = async () => {
    try {
        const response = await axios.get(`${API_URL}/tasks`, {
            withCredentials: true
        });
        console.log("Fetched tasks:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error; // You can return a fallback or handle differently based on your needs
    }
};

// Save new task
export const saveTask = async (taskData) => {
    try {
        console.log("saveTask function triggered", taskData);
        const response = await axios.post(`${API_URL}/tasks`, taskData, {
            withCredentials: true
        });
        console.log("Task saved:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error saving task:", error);
        throw error; // You can handle or display errors to the user
    }
};

// Delete task
export const delTask = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/tasks/${id}`, {
            withCredentials: true
        });
        console.log("Task deleted:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
};

// Update task to uppercase
export const upperTask = async (id, task) => {
    try {
        const response = await axios.put(`${API_URL}/tasks/${id}/uppercase`, { task: task }, {
            withCredentials: true
        });
        console.log("Task updated to uppercase:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
};

// Update task content
export const updatedTask = async (id, task) => {
    try {
        const response = await axios.put(`${API_URL}/tasks/${id}`, { task: task }, {
            withCredentials: true
        });
        console.log("Task updated:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
};

// Toggle task completion
export const completedTask = async (id) => {
    try {
        const response = await axios.patch(`${API_URL}/tasks/${id}`, {
            withCredentials: true
        });
        console.log("Task completion updated:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating task completion:", error);
        throw error;
    }
};