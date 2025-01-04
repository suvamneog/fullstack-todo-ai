/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Clipboard, Edit2, Check } from 'lucide-react';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskItem = ({ todo, delButton, upperCaseOne, toggleComplete, index, copyToClipboard, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.task);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTodo(todo.id, editedTask);
    setIsEditing(false);
  };

  return (
    <div className="group flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <div className="flex-grow">
        <div className={`flex items-center gap-2 ${todo.completed ? "text-gray-400" : "text-gray-700"}`}>
          <span className="text-sm text-gray-400">TASK-{index + 1}</span>
          {isEditing ? (
            <input
              type="text"
              value={editedTask}
              onChange={(e) => setEditedTask(e.target.value)}
              className="border-b border-gray-300 focus:outline-none focus:border-blue-500 px-1 py-0.5"
            />
          ) : (
            <span className={todo.completed ? "line-through" : ""}>
              {todo.task}
            </span>
          )}
        </div>
      </div>
      {isEditing ? (
        <button
          onClick={handleSave}
          className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-gray-600 transition-all"
        >
          <Check className="h-4 w-4" />
        </button>
      ) : (
        <button
          onClick={handleEdit}
          className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-gray-600 transition-all"
        >
          <Edit2 className="h-4 w-4" />
        </button>
      )}
      <button
        onClick={() => delButton(todo.id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-gray-600 transition-all"
      >
        <DeleteIcon />
      </button>
      <button
        onClick={() => upperCaseOne(todo.id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-gray-600 transition-all"
      >
        Uppercase
      </button>
      <button
        onClick={() => copyToClipboard(todo.task)}
        className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-gray-600 transition-all"
      >
        <Clipboard className="h-4 w-4" />
      </button>
    </div>
  );
};

export default TaskItem;

