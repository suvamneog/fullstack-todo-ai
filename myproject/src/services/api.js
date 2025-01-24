import { openDB } from "idb"
const getUserID = async () => {
    const db = await openDB("TodoApp", 1)
    return db.get("keyval", "userID")
  }
  
  import axios from "axios"
  const API_URL = "https://fullstacktodoai.onrender.com"
  
  export const fetchTask = async () => {
    const userID = await getUserID()
    const response = await axios.get(`${API_URL}/tasks`, {
      withCredentials: true,
      headers: { "X-User-ID": userID },
    })
    return response.data
  }
  
  
  export const saveTask = async (task) => {
    const userID = await getUserID()
    const response = await axios.post(`${API_URL}/tasks`, task, {
      withCredentials: true,
      headers: { "X-User-ID": userID },
    })
    console.log("Response from backend:", response.data)
    return response.data
  }
  
  export const delTask = async (id) => {
    const userID = await getUserID()
    const response = await axios.delete(`${API_URL}/tasks/${id}`, {
      withCredentials: true,
      headers: { "X-User-ID": userID },
    })
    // console.log("Response from backend:", response.data);
    return response.data
  }
  
  export const upperTask = async (id, task) => {
    const userID = await getUserID()
    const response = await axios.put(
      `${API_URL}/tasks/${id}/uppercase`,
      { task: task },
      {
        withCredentials: true,
        headers: { "X-User-ID": userID },
      },
    )
    //   console.log("Response from backend:", response.data);
    return response.data
  }
  
  export const updatedTask = async (id, task) => {
    const userID = await getUserID()
    const response = await axios.put(
      `${API_URL}/tasks/${id}`,
      { task: task },
      {
        withCredentials: true,
        headers: { "X-User-ID": userID },
      },
    )
    console.log("Response from backend:", response.data)
    return response.data
  }
  
  export const completedTask = async (id) => {
    const userID = await getUserID()
    const response = await axios.patch(`${API_URL}/tasks/${id}`, {
      withCredentials: true,
      headers: { "X-User-ID": userID },
    })
    // console.log("Response from backend:", response.data);
    return response.data
  }
  
  