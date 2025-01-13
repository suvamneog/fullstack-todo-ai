/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Clipboard, Edit2, Check } from 'lucide-react';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskItem = ({ todo, delButton, upperCaseOne, toggleComplete, index, copyToClipboard, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.task);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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
      className={`group flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 hover:bg-gray-200 rounded-lg transition-all transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } hover:scale-105 w-full`}
      style={{
        marginRight: { sm: '40px' },
        transitionDuration: '400ms',
        transitionTimingFunction: 'ease-out',
      }}
    >
      <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
          className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 flex-shrink-0"
        />
        <div className="flex-grow min-w-0">
          <div className={`flex items-center gap-2 sm:gap-4 ${todo.completed ? 'text-gray-400' : 'text-gray-700'}`}>
            <span className="text-xs sm:text-sm text-gray-400 font-bold whitespace-nowrap">TASK-{index + 1}</span>
            {isEditing ? (
              <input
                type="text"
                value={editedTask}
                onChange={(e) => setEditedTask(e.target.value)}
                className="border-b border-gray-300 focus:outline-none focus:border-blue-500 px-1 py-0.5 w-full"
              />
            ) : (
              <span className={`${todo.completed ? 'line-through text-gray-400' : 'text-gray-500 font-bold'} truncate`}>
                {todo.task}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-0 ml-auto">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="opacity-100 sm:opacity-0 group-hover:opacity-100 p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 transition-all"
          >
            <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="opacity-100 sm:opacity-0 group-hover:opacity-100 p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 transition-all"
          >
            <Edit2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        )}
        <button
          onClick={() => delButton(todo.id)}
          className="opacity-100 sm:opacity-0 group-hover:opacity-100 p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 transition-all"
        >
          <DeleteIcon sx={{ fontSize: { xs: '18px', sm: '24px' } }} />
        </button>
        <button
          onClick={() => upperCaseOne(todo.id, todo.task)}
          className="opacity-100 sm:opacity-0 group-hover:opacity-100 p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 transition-all"
        >
          <span className="text-xs sm:text-sm">Uppercase</span>
        </button>
        <button
          onClick={() => copyToClipboard(todo.task)}
          className="opacity-100 sm:opacity-0 group-hover:opacity-100 p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 transition-all"
        >
          <Clipboard className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;

