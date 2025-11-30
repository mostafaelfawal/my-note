import Modal from "@/components/Modal";
import { BiTrash } from "react-icons/bi";
import { CgDanger } from "react-icons/cg";
import { FiX } from "react-icons/fi";
import handleDeleteNote from "../../utils/CRUD/handleDeleteNote";
import toast from "react-hot-toast";

export default function LogoutModal({
  closeModal,
  noteId,
}: {
  closeModal: () => void;
  noteId: string;
}) {
  const deleteSubmit = () => {
    closeModal();
    toast.promise(handleDeleteNote(noteId), {
      loading: "Deleting your note...",
      success: (result) => result.message,
      error: (result) => result.error,
    });
  };

  return (
    <Modal
      closeModal={closeModal}
      title="Delete Note"
      icon={<BiTrash className="text-red-500 text-2xl" />}
    >
      <div className="text-center py-2">
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <CgDanger className="text-red-500 text-2xl" />
        </div>

        <p className="font-bold text-2xl text-gray-800 dark:text-white mb-2">Delete</p>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Are you sure you want to delete this note?
        </p>

        <div className="flex justify-between gap-3">
          <button
            onClick={closeModal}
            className="w-full rounded-lg hover:opacity-90 transition-all duration-200 bg-gray-100 dark:bg-gray-500 dark:text-white text-gray-700 py-3 font-semibold flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-400"
          >
            <FiX size={18} />
            Cancel
          </button>
          <button
            onClick={deleteSubmit}
            className="w-full rounded-lg hover:opacity-90 transition-all duration-200 bg-red-500 text-white py-3 font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:bg-red-600"
          >
            <BiTrash size={18} />
            Yes, Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
