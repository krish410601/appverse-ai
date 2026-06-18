import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-dark-card dark:hover:bg-dark-hover border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 transition-colors duration-200 focus:outline-none relative overflow-hidden"
      aria-label="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-5 h-5 flex items-center justify-center"
      >
        {theme === 'dark' ? (
          <FiSun className="w-5 h-5 text-amber-400" />
        ) : (
          <FiMoon className="w-5 h-5 text-indigo-600" />
        )}
      </motion.div>
    </button>
  );
};
export default ThemeSwitcher;
