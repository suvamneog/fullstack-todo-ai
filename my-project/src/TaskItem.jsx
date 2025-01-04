/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Clipboard, Edit2, Check } from 'lucide-react';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskItem = ({ todo, delButton, upperCaseOne, toggleComplete, index, copyToClipboard, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.task);
  const [isVisible, setIsVisible] = useState(false); // state to handle task visibility

  useEffect(() => {
    // Set the task to visible after mounting for the fade-in effect
    setIsVisible(true);
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTodo(todo.id, editedTask);
    setIsEditing(false);
  };

  return (
    <div
      className={`group flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-200 rounded-lg transition-all transform ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDuration: '500ms', transitionTimingFunction: 'ease-out' }}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <div className="flex-grow">
        <div className={`flex items-center gap-4 ${todo.completed ? 'text-gray-400' : 'text-gray-700'}`}>
          <span className="text-sm text-gray-400 font-bold">TASK-{index + 1}</span>
          {isEditing ? (
            <input
              type="text"
              value={editedTask}
              onChange={(e) => setEditedTask(e.target.value)}
              className="border-b border-gray-300 focus:outline-none focus:border-blue-500 px-1 py-0.5"
            />
          ) : (
            <span className={todo.completed ? 'line-through text-gray-400' : 'text-gray-500'}>
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