import { Moon, Sun } from "lucide-react";
import React from "react";
import { useDarkMode } from "../Context/ThemeContext";

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="fixed bottom-5 right-5 bg-white dark:bg-gray-800 border dark:border-gray-600 border-gray-300 shadow-lg p-3 rounded-full transition-all duration-300 z-50"
    >
      {darkMode ? (
        <Sun className="text-yellow-400 w-5 h-5" />
      ) : (
        <Moon className="text-gray-800 w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
