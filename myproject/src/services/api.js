import axios from "axios";
const API_URL = "https://fullstacktodoai.onrender.com";

export const fetchTask = async () => {
    const response = await axios.get(`${API_URL}`, {
        withCredentials: true}  );
    return response.data;
};


export const saveTask = async (task) => {
    const response = await axios.post(`${API_URL}/tasks`, task,  {
        withCredentials: true}  );
        console.log("Response from backend:", response.data);
    return response.data;
};

export const delTask = async (id) => {
    const response = await axios.delete(`${API_URL}/tasks/${id}`, {
        withCredentials: true}  );
        console.log("Response from backend:", response.data);
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
