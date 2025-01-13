import axios from "axios";

// Determine the API base URL based on the environment
const API_URL = import.meta.env.MODE === "production"
  ? "https://fullstack-todo-ai-1.onrender.com" // Production backend URL
  : "/api"; // Use proxy for development

// Create an Axios instance with common configurations
const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Include cookies in requests
  headers: {
    "Content-Type": "application/json", // Set default content type
  },
});

// API functions using the Axios instance
export const fetchTask = async () => {
  const response = await apiClient.get("/tasks");
  return response.data;
};

export const saveTask = async (taskData) => {
  const response = await apiClient.post("/tasks", taskData);
  console.log("Response from backend:", response.data); // Log response for debugging
  return response.data;
};

export const delTask = async (id) => {
  const response = await apiClient.delete(`/tasks/${id}`);
  return response.data;
};

export const upperTask = async (id, task) => {
  const response = await apiClient.put(`/tasks/${id}/uppercase`, { task });
  return response.data;
};

export const updatedTask = async (id, task) => {
  const response = await apiClient.put(`/tasks/${id}`, { task });
  return response.data;
};

export const completedTask = async (id) => {
  const response = await apiClient.patch(`/tasks/${id}`);
  return response.data;
};

export default apiClient;