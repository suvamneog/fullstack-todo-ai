import { useState, useEffect } from "react";
import TaskList from "./TaskList";
import InputField from "./InputField";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import { useCopilotReadable, useCopilotAction } from "@copilotkit/react-core";
import {
  fetchTask,
  saveTask,
  delTask,
  upperTask,
  updatedTask,
  completedTask,
} from "../src/services/api";
import Cookies from "js-cookie";

const App = () => {
  const [todos, setTodos] = useState("");
  const [addTodo, setAddTodo] = useState([]);

  const userID = Cookies.get("userID");
  
  useCopilotReadable({
    description: "The state of the todo list",
    value:  JSON.stringify(addTodo)
  });


  useEffect(() => {
    const getTasks = async () => {
      try {
        const tasks = await fetchTask();
        console.log("Fetched tasks:", tasks);
        setAddTodo(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    getTasks();
  }, []);
      


  useCopilotAction({
    name: "addTask",
    description: "Add a new task to the to-do list",
    parameters: [
      {
        name: "task",
        type: "string",
        description: "The task to be added",
        required: true,
      },
    ],
    handler: async ({ task }) => {
      if (task.trim() !== "") {
        const newData = {
          userID,
          task,
          completed: false,
        };
        try {
          const savedTask = await saveTask(newData);
          setAddTodo((prevTodo) => [...prevTodo, savedTask]);
        } catch (error) {
          console.error("Error adding task:", error);
        }
      }
    },
  });
  useCopilotAction({
  name: "deleteTask",
  description: "Delete a task from the to-do list",
  parameters: [
    {
      name: "id",
      type: "string",
      description: "The ID of the task to be deleted",
      required: true,
    },
  ],
  handler: async ({ id }) => {
    try {
      await delTask(id);
      setAddTodo((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  },
});

useCopilotAction({
  name: "uppercaseTask",
  description: "Convert a task to uppercase",
  parameters: [
    {
      name: "id",
      type: "string",
      description: "The ID of the task to convert",
      required: true,
    },
    {
      name: "task",
      type: "string",
      description: "The task to be converted to uppercase",
      required: true,
    },
  ],
  handler: async ({ id, task }) => {
    try {
      const upperCaseTask = await upperTask(id, task);
      setAddTodo((prevTodo) =>
        prevTodo.map((todo) =>
          todo.id === id ? { ...todo, task: upperCaseTask.task } : todo
        )
      );
    } catch (error) {
      console.error("Error converting task to uppercase:", error);
    }
  },
});

useCopilotAction({
  name: "updateTask",
  description: "Update the content of a task",
  parameters: [
    {
      name: "id",
      type: "string",
      description: "The ID of the task to update",
      required: true,
    },
    {
      name: "task",
      type: "string",
      description: "The new content for the task",
      required: true,
    },
  ],
  handler: async ({ id, task }) => {
    try {
      const updateTask = await updatedTask(id, task);
      setAddTodo((prevTodo) =>
        prevTodo.map((todo) =>
          todo.id === id ? { ...todo, task: updateTask.task } : todo
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  },
});
  
useCopilotAction({
  name: "toggleTaskCompletion",
  description: "Toggles the completion status of a task. Sets completed to true when checked, otherwise false.",
  parameters: [
    {
      name: "id",
      type: "string",
      description: "The ID of the task to be toggled.",
      required: true,
    },
    {
      name: "checked",
      type: "boolean",
      description: "Whether the task is checked (true for completed, false for incomplete).",
      required: true,
    },
  ],
  handler: async ({ id, checked }) => {
    try {
      const updatedTask = await completedTask(id, checked); // Pass new completed state to the backend
      setAddTodo((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: updatedTask.completed } : todo
        )
      );
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  },
});



  // const addButton = () => {
  //   if (todos.trim() !== "") {
  //     setAddTodo((prevTodo) => [
  //       ...prevTodo,
  //       { task: todos, id: uuidv4(), completed: false },
  //     ]);
  //     setTodos("");
  //   }
  // };

  //ADD
  const addButton = async () => {
    console.log("addButton called"); // Debug log 1
    if (todos.trim() !== "" && userID) {
      console.log("Conditions met, userID:", userID); // Debug log 2
      const newData = {
        userID: userID,
        task: todos,
        completed: false,
      };
      console.log("Sending data:", newData); // Debug log 3
      try {
        const savedTask = await saveTask(newData);
        console.log("Response from saveTask:", savedTask); // Debug log 4
  
        setAddTodo((prevTodo) => [...prevTodo, savedTask]);
        setTodos("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };
  

  // const delButton = (id) => {
  //   setAddTodo((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  // };

  //DELETE
  const delButton = async (id) => {
    try {
      const deletedTask = await delTask(id);
      setAddTodo((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
      console.log(deletedTask);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  //UPPERCASE
  const upperCaseOne = async (id, task) => {
    try {
      const upperCaseTask = await upperTask(id, task);
      setAddTodo((prevTodo) =>
        prevTodo.map((todo) =>
          todo.id === id ? { ...todo, task: upperCaseTask.task } : todo
        )
      );
      // console.log(upperCaseTask);
    } catch (error) {
      console.error("Error uppercase task:", error);
    }
  };

  // const toggleComplete = (id) => {
  //   setAddTodo((prevTodo) =>
  //     prevTodo.map((todo) =>
  //       todo.id === id ? { ...todo, completed: !todo.completed } : todo
  //     )
  //   );
  // }

  //COMPLETED
  const toggleComplete = async (id) => {
    try {
      const updateTask = await completedTask(id);
      setAddTodo((prevTodo) =>
        prevTodo.map((todo) =>
          todo.id === id ? { ...todo, completed: updateTask.completed } : todo
        )
      );
      // console.log(updateTask);
    } catch (error) {
      console.error("Error uppercase task:", error);
    }
  };

  //COPY
  const copyToClipboard = (task) => {
    navigator.clipboard.writeText(task).catch((err) => {
      console.error("Failed to copy: ", err);
    });
  };

  // const editTodo = (id, newTask) => {
  //   setAddTodo((prevTodo) =>
  //     prevTodo.map((todo) =>
  //       todo.id === id ? { ...todo, task: newTask } : todo
  //     )
  //   );
  // };

  //EDIT
  const editTodo = async (id, task) => {
    try {
      const updateTask = await updatedTask(id, task);
      setAddTodo((prevTodo) =>
        prevTodo.map((todo) =>
          todo.id === id ? { ...todo, task: updateTask.task } : todo
        )
      );
      // console.log(updateTask);
    } catch (error) {
      console.error("Error update task:", error);
    }
  };

  return (
    <div
      className="max-w-2xl mx-auto p-8"
      style={{
        "--copilot-kit-primary-color": "#000000",
      }}
    >
      <style>{`.copilotKitDevConsole { display: none !important; }`}</style>
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
        editTodo={editTodo}
      />
      <CopilotPopup 
      nstructions={"You are assisting the user as best as you can. Answer in the best way possible given the data you have."}
      labels={{
        title: "Popup Assistant",
        initial: "Need any help?",
      }} />
    </div>
  );
};

export default App;
