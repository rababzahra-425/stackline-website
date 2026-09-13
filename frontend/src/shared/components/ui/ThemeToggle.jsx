import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="relative flex items-center w-16 h-8 bg-black/80 dark:bg-white/20 backdrop-blur-md rounded-full p-1 border border-white/20 transition-all duration-300 shadow-lg group hover:scale-105 cursor-pointer"
    >
      <div
        className={`w-6 h-6 rounded-full bg-white dark:bg-black text-black dark:text-white flex items-center justify-center shadow-md transition-transform duration-300 transform ${
          theme === 'dark' ? 'translate-x-8' : 'translate-x-0'
        }`}
      >
        {theme === 'dark' ? (
          <Moon className="w-3.5 h-3.5 fill-current" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-black" />
        )}
      </div>
    </button>
  );
};
