"use client";

import { useTheme } from "../../context/ThemeContext"

export default function ThemeToggleBtn() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded bg-gray-200 dark:bg-gray-800 dark:text-white transition"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
