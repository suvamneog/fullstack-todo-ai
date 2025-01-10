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
  const [quotaExceeded, setQuotaExceeded] = useState(false); // State to check if quota is exceeded
  const userID = Cookies.get("userID");

  // Fetch quota usage
  useEffect(() => {
    fetch("/api/usage")
      .then((res) => res.json())
      .then((data) => {
        if (data.remaining === 0) {
          setQuotaExceeded(true); // Set the state to true if quota is 0
        }
      });
  }, []);

  useCopilotReadable({
    description: "The state of the todo list",
    value: JSON.stringify(addTodo),
  });

  // CopilotKit action for adding a task
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
      if (task.trim() !== "" && !quotaExceeded) { // Disable if quota is exceeded
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
      } else if (quotaExceeded) {
        alert("Quota exceeded! Upgrade your plan to use CopilotKit.");
      }
    },
  });

  // CopilotKit action for deleting a task
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
      if (!quotaExceeded) { // Disable if quota is exceeded
        try {
          await delTask(id);
          setAddTodo((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
        } catch (error) {
          console.error("Error deleting task:", error);
        }
      } else if (quotaExceeded) {
        alert("Quota exceeded! Upgrade your plan to use CopilotKit.");
      }
    },
  });

  // Other CopilotKit actions...

  useEffect(() => {
    const getTasks = async () => {
      try {
        const tasks = await fetchTask();
        setAddTodo(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    getTasks();
  }, [userID]);

  const addButton = async () => {
    if (todos.trim() !== "" && userID && !quotaExceeded) { // Disable if quota is exceeded
      const newData = {
        userID: userID,
        task: todos,
        completed: false,
      };
      try {
        const savedTask = await saveTask(newData);
        setAddTodo((prevTodo) => [...prevTodo, savedTask]);
        setTodos("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    } else if (quotaExceeded) {
      alert("Quota exceeded! Upgrade your plan to use CopilotKit.");
    }
  };

  const delButton = async (id) => {
    try {
      const deletedTask = await delTask(id);
      setAddTodo((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
      console.log(deletedTask);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const upperCaseOne = async (id, task) => {
    try {
      const upperCaseTask = await upperTask(id, task);
      setAddTodo((prevTodo) =>
        prevTodo.map((todo) =>
          todo.id === id ? { ...todo, task: upperCaseTask.task } : todo
        )
      );
    } catch (error) {
      console.error("Error uppercase task:", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const updateTask = await completedTask(id);
      setAddTodo((prevTodo) =>
        prevTodo.map((todo) =>
          todo.id === id ? { ...todo, completed: updateTask.completed } : todo
        )
      );
    } catch (error) {
      console.error("Error uppercase task:", error);
    }
  };

  const copyToClipboard = (task) => {
    navigator.clipboard.writeText(task).catch((err) => {
      console.error("Failed to copy: ", err);
    });
  };

  const editTodo = async (id, task) => {
    try {
      const updateTask = await updatedTask(id, task);
      setAddTodo((prevTodo) =>
        prevTodo.map((todo) =>
          todo.id === id ? { ...todo, task: updateTask.task } : todo
        )
      );
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
        instructions={"You are assisting the user as best as you can. Answer in the best way possible given the data you have."}
        labels={{
          title: "Popup Assistant",
          initial: "Need any help?",
        }}
      />
    </div>
  );
};

export default App;