const API_URL = "https://fullstack-todo-ai-1.onrender.com";

// Fetch tasks
export const fetchTask = async () => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "GET",
    credentials: "include", // Sends cookies with the request
  });
  
  if (!response.ok) {
    throw new Error(`Error fetching tasks: ${response.statusText}`);
  }
  return response.json();
};

// Save a task
export const saveTask = async (task) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error(`Error saving task: ${response.statusText}`);
  }
  const data = await response.json();
  console.log("Response from backend:", data);
  return data;
};

// Delete a task
export const delTask = async (id) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Error deleting task: ${response.statusText}`);
  }
  return response.json();
};

// Convert task to uppercase
export const upperTask = async (id, task) => {
  const response = await fetch(`${API_URL}/tasks/${id}/uppercase`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task }),
  });

  if (!response.ok) {
    throw new Error(`Error updating task to uppercase: ${response.statusText}`);
  }
  return response.json();
};

// Update a task
export const updatedTask = async (id, task) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task }),
  });

  if (!response.ok) {
    throw new Error(`Error updating task: ${response.statusText}`);
  }
  const data = await response.json();
  console.log("Response from backend:", data);
  return data;
};

// Mark a task as completed
export const completedTask = async (id) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PATCH",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Error marking task as completed: ${response.statusText}`);
  }
  return response.json();
};