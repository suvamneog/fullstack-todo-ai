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