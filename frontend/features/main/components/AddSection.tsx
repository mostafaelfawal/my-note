import { useState } from "react";
import NoteAddEditModal from "./Modals/NoteAddEditModal";
import { FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";

export default function AddSection({
  notesCount,
  loggedIn,
}: {
  notesCount: number;
  loggedIn: boolean;
}) {
  const [modal, setModal] = useState(false);

  return (
    <section className="px-6 py-8 border-b dark:bg-gray-700 border-b-gray-200 dark:border-b-gray-700 flex justify-between items-center">
      <div>
        <h2 className="text-3xl font-bold dark:text-white">My Notes</h2>
        <p className="text-gray-400">{notesCount} notes</p>
      </div>
      <button
        onClick={() => {
          if (!loggedIn) return toast.error("Login or signup first");
          setModal(true);
        }}
        className="rounded-md text-white bg-teal-500 hover:opacity-90 transition-opacity flex gap-2 items-center px-4 py-2 shadow"
      >
        <FiPlus /> Add New Note
      </button>
      {modal && (
        <NoteAddEditModal closeModal={() => setModal(false)} modalIsAdd />
      )}
    </section>
  );
}
