"use client";
import "./ThemeToggleBtn.css";
import { useTheme } from "../../context/ThemeContext"


export default function ThemeToggleBtn() {
  const { theme, toggleTheme } = useTheme();
  const style = {
    background: theme === "dark" ?  "#fff" : "#000"
    
}
  return (
    <button
    style={style}
      onClick={toggleTheme}
      className="p-2 rounded bg-gray-200 dark:bg-gray-800 dark:text-white transition toggleBtn"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
