import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskList from "./TaskList";
import InputField from "./InputField";

const App = () => {
  const [todos, setTodos] = useState("");
  const [addTodo, setAddTodo] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(addTodo));
  }, [addTodo]);

  const addButton = () => {
    if (todos.trim() !== "") {
      setAddTodo((prevTodo) => [
        ...prevTodo,
        { task: todos, id: uuidv4(), completed: false },
      ]);
      setTodos(""); // Clear the input after adding
    }
  };

  const delButton = (id) => {
    setAddTodo((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  };

  const upperCaseOne = (id) => {
    setAddTodo((prevTodo) =>
      prevTodo.map((todo) =>
        todo.id === id ? { ...todo, task: todo.task.toUpperCase() } : todo
      )
    );
  };

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

