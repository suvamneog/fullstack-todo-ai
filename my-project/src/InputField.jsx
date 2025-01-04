/* eslint-disable react/prop-types */
import PlaceholdersAndVanishInput from "../src/components/ui/placeholders-and-vanish-input";
const InputField = ({ todos, updateVal, addButton }) => {
  const placeholders = [
    "Add a task",
    "There is no tomorrow!",
    "Enter a new task...",
  ];
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <span role="img" aria-label="pencil">✍️</span>
        My Todos
      </h1>
      <div className="flex gap-2 pr-8">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          value={todos}
          onChange={updateVal}
          onSubmit={addButton}
        />
      </div>
    </div>
  );
};
export default InputField;