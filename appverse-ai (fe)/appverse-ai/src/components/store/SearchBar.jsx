import React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

export const SearchBar = ({ value, onChange, placeholder = "Search for apps..." }) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
        <FiSearch className="w-5 h-5" />
      </div>
      <input
        type="text"
        className="w-full glass-input pl-11 pr-10 py-3 text-sm focus:ring-2 focus:ring-primary/45"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <FiX className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
