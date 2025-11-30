export default function LoadingNoteCard() {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse p-4 border border-gray-200 rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-700 h-40 space-y-2"
        >
          <div className="bg-gray-500 dark:bg-gray-400 rounded-full w-1/2 h-2"></div>
          <div className="bg-gray-300 dark:bg-gray-600 rounded-full w-3/4 h-1"></div>
          <div className="bg-gray-300 dark:bg-gray-600 rounded-full w-3/4 h-1"></div>
          <div className="bg-gray-300 dark:bg-gray-600 rounded-full w-3/4 h-1"></div>
          <div className="bg-gray-300 dark:bg-gray-600 rounded-full w-3/4 h-1"></div>
          <div className="flex gap-3">
            <div className="rounded-full bg-gray-500 dark:bg-gray-500 w-10 h-4"></div>
            <div className="rounded-full bg-gray-500 dark:bg-gray-500 w-10 h-4"></div>
            <div className="rounded-full bg-gray-500 dark:bg-gray-500 w-10 h-4"></div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 h-px"></div>
          <div className="bg-gray-300 dark:bg-gray-600 rounded-full w-9 h-1"></div>
          <div className="flex justify-between gap-4">
            <div className="w-full h-5 bg-teal-200 dark:bg-teal-700 rounded-lg"></div>
            <div className="w-full h-5 bg-red-200 dark:bg-red-700 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
