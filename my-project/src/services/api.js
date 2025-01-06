import axios from "axios";
const API_URL = "http://localhost:5001";

export const fetchTask = async () => {
    const response = await axios.get(`${API_URL}/tasks`, {
        withCredentials: true}  );
    return response.data;
};

export const saveTask = async (taskData) => {
    const response = await axios.post(`${API_URL}/tasks`, taskData,  {
        withCredentials: true}  );
        console.log("Response from backend:", response.data);
    return response.data;
};

export const delTask = async (id) => {
    const response = await axios.delete(`${API_URL}/tasks/${id}`, id, {
        withCredentials: true}  );
        console.log("Response from backend:", response.data);
    return response.data;
    };

    export const upperTask = async (id, task) => {
        try {
          // Send the task in the body as part of the PUT request
          const response = await axios.put(`${API_URL}/tasks/${id}/uppercase`, { task: task });
          console.log("Response from backend:", response.data);
          return response.data;
        } catch (error) {
          console.error("Error in upperTask API:", error);
          throw error; // Rethrow error to be caught in the calling function
        }
      };