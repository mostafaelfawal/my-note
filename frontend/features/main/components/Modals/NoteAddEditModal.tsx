import Modal from "@/components/Modal";
import { BiSave } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NoteSchema, NoteSchemaType } from "../../schemas/NoteSchema";
import { CgDanger } from "react-icons/cg";
import handleCreateNote from "../../utils/CRUD/handleCreateNote";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import TagsInput from "../TagsInput";
import handleUpdateNote from "../../utils/CRUD/handleUpdateNote";

export default function NoteAddEditModal({
  modalIsAdd = false,
  closeModal,
  noteId,
  defaultTitle,
  defaultContent,
  defaultTags,
}: {
  modalIsAdd?: boolean;
  closeModal: () => void;
  defaultTitle?: string;
  defaultContent?: string;
  defaultTags?: string[];
  noteId?: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<NoteSchemaType>({
    resolver: zodResolver(NoteSchema),
    defaultValues: {
      title: defaultTitle || "",
      content: defaultContent || "",
      tags: defaultTags || [],
    },
  });
  const content = watch("content");
  const tags = watch("tags");

  const formSubmit = async (data: NoteSchemaType) => {
    if (modalIsAdd) {
      toast.promise(
        handleCreateNote({
          title: data.title.trim(),
          content: content.trim(),
          tags: data.tags,
        }),
        {
          loading: "Adding new note...",
          success: (result) => result.message!,
          error: (result) => result.error,
        }
      );
    } else {
      toast.promise(
        handleUpdateNote({
          _id: noteId,
          title: data.title.trim(),
          content: content.trim(),
          tags: tags,
        }),
        {
          loading: "Updating your note...",
          success: (result) => result.message!,
          error: (result) => result.error,
        }
      );
    }
    closeModal();
  };

  return (
    <Modal
      closeModal={closeModal}
      icon={modalIsAdd ? <FaPlus color="teal" /> : <FiEdit color="teal" />}
      title={modalIsAdd ? "Create New Note" : "Edit Note"}
    >
      <form onSubmit={handleSubmit(formSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="dark:text-white">
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title")}
            placeholder="Enter note title..."
            className="my-1 w-full border border-gray-200 dark:border-gray-600 rounded-lg p-2 shadow-sm bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-shadow"
          />
          {errors.title && (
            <p className="flex gap-2 items-center text-sm text-red-500">
              <CgDanger />
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="content" className="dark:text-white">
            Content
          </label>
          <textarea
            rows={6}
            id="content"
            {...register("content")}
            placeholder="Write your content here..."
            className="my-1 w-full border border-gray-200 dark:border-gray-600 rounded-lg p-2 shadow-sm bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-shadow"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {(content && content.length) || 0} characters
          </p>
          {errors.content && (
            <p className="flex gap-2 items-center text-sm text-red-500">
              <CgDanger />
              {errors.content.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="tags" className="dark:text-white">
            Tags
          </label>
          <TagsInput
            value={tags}
            onChange={(newTags) =>
              setValue("tags", newTags, { shouldValidate: true })
            }
          />
          {errors.tags && (
            <p className="flex gap-2 items-center text-sm text-red-500">
              <CgDanger />
              {errors.tags.message}
            </p>
          )}
        </div>

        <div className="flex gap-4 flex-row-reverse">
          <button
            type="submit"
            className="py-1 px-5 flex items-center gap-2 text-white rounded bg-teal-500 hover:opacity-90 transition-opacity"
          >
            {modalIsAdd ? (
              <>
                <BiSave />
                Save Note
              </>
            ) : (
              <>
                <FiEdit /> Save Change
              </>
            )}
          </button>

          <button
            type="button"
            onClick={closeModal}
            className="py-1 px-5 flex items-center gap-2 rounded border border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors dark:text-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
