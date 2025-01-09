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



  useCopilotAction({
    name: "getTasks",
    description: "Sets the status of a task",
    parameters: [
      {
        name: "id",
        type: "string",
        description: "The ID of the task",
        required: true,
      },
      {
        name: "addButton",
        type: "string",
        description: "The status of the task (completed/incomplete)",
        enum: ['true', 'false'],
        required: true,
      },
    ],
    handler: ({ id, status }) => {
      // Update task status (true for completed, false for incomplete)
      addButton(id, status === 'true');
    },
  });
  











  useEffect(() => {
    const getTasks = async () => {
      try {
        const tasks = await fetchTask();
        // console.log("Fetched tasks:", tasks);
        setAddTodo(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    getTasks();
  }, [userID]);
      

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
    if (todos.trim() !== "" && userID) {
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
