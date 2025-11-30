export function toggleTheme() {
  const HTMLElement = document.documentElement;
  const isDark = HTMLElement.classList.contains("dark");
  HTMLElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "light" : "dark");
}