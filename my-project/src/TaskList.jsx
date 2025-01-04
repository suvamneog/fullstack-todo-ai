/* eslint-disable react/prop-types */
import TaskItem from "./TaskItem";
const TaskList = ({ addTodo, delButton, upperCaseOne, toggleComplete, copyToClipboard, editTodo}) => {
  return (
    <div className="space-y-1">
      {addTodo.map((todo, index) => (
        <TaskItem
          key={todo.id}
          todo={todo}
          delButton={delButton}
          upperCaseOne={upperCaseOne}
          toggleComplete={toggleComplete}
          index={index}
          copyToClipboard={copyToClipboard}
          editTodo={editTodo}
        />
      ))}
    </div>
  );
};

export default TaskList;

