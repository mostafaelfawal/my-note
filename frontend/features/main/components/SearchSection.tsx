import { FaSearch } from "react-icons/fa";
import { TagType } from "../types/TagType";
import { motion } from "framer-motion";

export default function SearchSection({
  tags,
  notesLength,
  search,
  selectedTag,
  setSearch,
  setSelectedTag,
}: {
  tags: TagType;
  notesLength: number;
  search: string;
  setSearch: (v: string) => void;
  selectedTag: string;
  setSelectedTag: (v: string) => void;
}) {
  const tagsArray = tags ? Object.entries(tags) : [];

  return (
    <motion.section
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="px-6 py-8 space-y-3 border-b border-b-gray-200 dark:border-b-gray-600"
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search notes by title or content..."
        className="w-full border border-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white rounded-lg py-2 pl-12 pr-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-shadow"
      />
      <div className="relative">
        <FaSearch className="absolute -top-10 left-4 text-gray-400" />
      </div>
      <p className="dark:text-white">Filter by Tags</p>
      {tagsArray.length == 0 ? (
        <p className="text-sm text-teal-800 dark:text-teal-500">
          no tags yet !
        </p>
      ) : (
        tagsArray.map(([name, number]) => (
          <button
            key={name}
            onClick={() => setSelectedTag(name)}
            className={`rounded-full 
             bg-teal-50 dark:bg-gray-700 ${
               name === selectedTag
                 ? "bg-teal-100 dark:bg-teal-500"
                 : "hover:bg-teal-100 dark:hover:bg-teal-600"
             }
             text-gray-900 dark:text-white 
             transition-colors 
             border border-gray-200 dark:border-gray-500 
             px-3 py-1 mr-2`}
          >
            {name}{" "}
            <span className="text-gray-500 dark:text-gray-300">({number})</span>
          </button>
        ))
      )}
      <button
        onClick={() => setSelectedTag("")}
        className={`rounded-full 
        bg-teal-50 dark:bg-gray-700 ${
          "" === selectedTag
            ? "bg-teal-100 dark:bg-teal-500"
            : "hover:bg-teal-100 dark:hover:bg-teal-600"
        }
        text-gray-900 dark:text-white 
        transition-colors 
        border border-gray-200 dark:border-gray-500 
        px-3 py-1 mr-2`}
      >
        All{" "}
        <span className="text-gray-500 dark:text-gray-300">
          ({notesLength})
        </span>
      </button>
    </motion.section>
  );
}
