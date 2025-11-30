import { ReactNode } from "react";
import { IoCloseOutline } from "react-icons/io5";

export default function Modal({
  closeModal,
  title,
  icon,
  children,
}: {
  closeModal: () => void;
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 min-h-screen bg-black/40 flex justify-center items-center transition-all duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-2xl transform transition-transform duration-300 min-w-100 border border-gray-100 dark:border-gray-500 max-h-screen overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2 items-center">
            {icon}
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h3>
          </div>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-500"
          >
            <IoCloseOutline size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
