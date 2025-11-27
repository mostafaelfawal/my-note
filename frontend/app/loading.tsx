import LoadingSpinner from "@/components/LoadingSpinner";

export default function Loading() {
  return (
    <div className="bg-linear-to-br from-teal-950 to-teal-400 h-screen flex flex-col gap-3 justify-center items-center">
      <LoadingSpinner />
      <p className="text-lg text-white font-semibold animate-pulse">
        The page is loading, please wait...
      </p>
    </div>
  );
}
