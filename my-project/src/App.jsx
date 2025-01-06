import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskList from "./TaskList";
import InputField from "./InputField";
import { fetchTask, saveTask, delTask, upperTask } from "../src/services/api";
import Cookies from "js-cookie";

const App = () => {
  const [todos, setTodos] = useState("");
  const [addTodo, setAddTodo] = useState([]);

  const userID = Cookies.get("userID");
useEffect(() => {
  const getTasks = async() => {
    try {
    const tasks = await fetchTask();
    console.log("Fetched tasks:", tasks);
    setAddTodo(tasks);
  }
  catch (error) {
    console.error("Error fetching tasks:", error);
}};
getTasks();
},[userID]);



  // const addButton = () => {
  //   if (todos.trim() !== "") {
  //     setAddTodo((prevTodo) => [
  //       ...prevTodo,
  //       { task: todos, id: uuidv4(), completed: false },
  //     ]);
  //     setTodos(""); 
  //   }
  // };

  const addButton = async () => {
    if (todos.trim() !== "" && userID) {
      const newData = {
        userID: userID,
        id: uuidv4(),
        task: todos,
        completed: false,
      };
      try {
        // Save the new task to the backend
        const savedTask = await saveTask(newData);
        
        // Immediately update the local state with the new task
        setAddTodo((prevTodo) => [...prevTodo, savedTask]);
  
        // Clear the input field after saving the task
        setTodos(""); 
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };



  // const delButton = (id) => {
  //   setAddTodo((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  // };

  const delButton = async (id) => {
    try {
      const deletedTask = await delTask(id);
      setAddTodo((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
      console.log(deletedTask);
    }
    catch (error) {
      console.error("Error deleting task:", error);
    }
  };



  const upperCaseOne = async (id,task) => {
    try {
      const upperCaseTask = await upperTask(id,task);
    setAddTodo((prevTodo) =>
      prevTodo.map((todo) =>
        todo.id === id ? { ...todo, task: upperCaseTask.task } : todo)
      )
      console.log(upperCaseTask);
    }
      catch (error) {
        console.error("Error uppercase task:", error);
      }
  }

  const toggleComplete = (id) => {
    setAddTodo((prevTodo) =>
      prevTodo.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const copyToClipboard = (task) => {
    navigator.clipboard.writeText(task).catch((err) => {
      console.error("Failed to copy: ", err);
      
    });
  };

  // Add this new function
  const editTodo = (id, newTask) => {
    setAddTodo((prevTodo) =>
      prevTodo.map((todo) =>
        todo.id === id ? { ...todo, task: newTask } : todo
      )
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <InputField
        todos={todos}
        updateVal={(e) => setTodos(e.target.value)}
        addButton={addButton}
      />

      <TaskList
        addTodo={addTodo}
        delButton={delButton}
        upperCaseOne={upperCaseOne}
        toggleComplete={toggleComplete}
        copyToClipboard={copyToClipboard}
        editTodo={editTodo} // Pass the new editTodo function
      />
    </div>
  );
};

export default App;

