import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

export default function TagsInput({
  value,
  onChange,
}: {
  value: string[];
  onChange: (newTags: string[]) => void;
}) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue.trim() && !value.includes(inputValue.trim())) {
        onChange([...value, inputValue.trim()]);
        setInputValue("");
      }
    }

    if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div className="max-w-87 flex flex-wrap gap-2 my-1 border border-gray-200 dark:border-gray-600 rounded-lg p-2 shadow-sm bg-white dark:bg-gray-700">
      {value.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 bg-teal-100 dark:bg-teal-700 text-teal-700 dark:text-white px-2 py-1 rounded-full text-sm shadow"
        >
          {tag}
          <button
            onClick={() => removeTag(tag)}
            className="text-teal-600 dark:text-white hover:text-red-500 dark:hover:text-red-400 text-lg"
          >
            <IoCloseOutline />
          </button>
        </span>
      ))}

      <input
        type="text"
        className="p-1 border-none focus:outline-none bg-transparent dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
        placeholder="Add tags and press Enter..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
