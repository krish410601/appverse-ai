import React from 'react';

const CATEGORIES = ["All", "AI Tools", "Productivity", "Entertainment", "Games", "Finance", "Creative", "Utilities", "Health"];

export const FilterBar = ({ selectedCategory, setSelectedCategory, selectedPrice, setSelectedPrice }) => {
  return (
    <div className="flex flex-col gap-4 w-full select-none">
     

      {/* Price Selection Bar */}
      <div className="flex items-center gap-2 border-t border-slate-200/30 dark:border-slate-800/20 pt-3">
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 mr-2">Filter price:</span>
        {["All", "Free", "Paid"].map((p) => (
          <button
            key={p}
            onClick={() => setSelectedPrice(p)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-all duration-200 ${
              selectedPrice === p
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 border-slate-900 dark:border-white shadow-sm'
                : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
