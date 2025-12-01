import { FaPen, FaTrash } from "react-icons/fa";
import { NoteType } from "../types/NoteType";
import { useState } from "react";
import NoteAddEditModal from "./Modals/NoteAddEditModal";
import NoteDeleteModal from "./Modals/NoteDeleteModal";

export default function NoteCard(
  props: NoteType & {
    onUpdate?: (note: NoteType) => void;
    onDelete?: (id: string) => void;
  }
) {
  const { _id, title, content, tags, createdAt, onUpdate, onDelete } = props;
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <div className="group/title border hover:border-teal-500 duration-200 transition-colors border-gray-200 dark:border-gray-700 shadow rounded-lg flex flex-col justify-between bg-white dark:bg-gray-800">
      {/* محتوى البطاقة */}
      <div className="p-6 space-y-2">
        <h3 className="group-hover/title:text-teal-500 dark:group-hover/title:text-teal-400 transition-colors duration-200 font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>

        <p className="text-gray-500 dark:text-gray-300 line-clamp-3">
          {content}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags?.map((tag, i) => (
            <span
              key={i}
              className="text-sm text-teal-600 dark:text-teal-300 rounded-full px-2 py-0.5 bg-teal-100 dark:bg-teal-900"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-t-gray-200 dark:border-t-gray-700 mt-auto"></div>

      {/* الـ Actions دايمًا تحت */}
      <div className="p-6 space-y-2 pt-2">
        <p className="text-sm text-gray-500 dark:text-gray-300">{createdAt}</p>

        <div className="flex justify-between gap-3">
          <button
            onClick={() => setEditModal(true)}
            className="w-full flex gap-2 justify-center items-center text-teal-500 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-700 hover:text-black dark:hover:text-white rounded transition-colors duration-200 py-1"
          >
            <FaPen />
            Edit
          </button>

          <button
            onClick={() => setDeleteModal(true)}
            className="w-full flex gap-2 justify-center items-center text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-700 hover:text-black dark:hover:text-white rounded transition-colors duration-200 py-1"
          >
            <FaTrash />
            Delete
          </button>
        </div>
      </div>

      {editModal && (
        <NoteAddEditModal
          noteId={_id}
          defaultTags={tags}
          defaultTitle={title}
          defaultContent={content}
          closeModal={() => setEditModal(false)}
          onSuccess={(updated) => onUpdate?.(updated)}
        />
      )}
      {deleteModal && (
        <NoteDeleteModal
          noteId={_id!}
          closeModal={() => setDeleteModal(false)}
          onSuccess={(id) => onDelete?.(id)}
        />
      )}
    </div>
  );
}
