import axios from "axios";
const API_URL = "https://fullstack-todo-ai-1.onrender.com";

export const fetchTask = async () => {
    const response = await axios.get(`${API_URL}/tasks`, {
        withCredentials: true}  );
    return response.data;
};


export const saveTask = async (task) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, task, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Response from backend:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      throw error;
    }
  };
  

export const delTask = async (id) => {
    const response = await axios.delete(`${API_URL}/tasks/${id}`, {
        withCredentials: true}  );
        // console.log("Response from backend:", response.data);
    return response.data;
    };

export const upperTask = async (id, task) => {
          const response = await axios.put(`${API_URL}/tasks/${id}/uppercase`, { task: task },{
            withCredentials: true});
        //   console.log("Response from backend:", response.data);
          return response.data;
    };
        
export const updatedTask = async(id, task) => {
    const response = await axios.put(`${API_URL}/tasks/${id}`, { task: task },{
        withCredentials: true});
    console.log("Response from backend:", response.data);
    return response.data;
};

export const completedTask = async(id) => {
    const response = await axios.patch(`${API_URL}/tasks/${id}`,{
        withCredentials: true});
    // console.log("Response from backend:", response.data);
    return response.data;
};
