export default function formatDate(date: string) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-EG", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
