import React from 'react';

export const ChartCard = ({ title, description, children, className = '' }) => {
  return (
    <div className={`glass-panel p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/45 flex flex-col gap-4 select-none ${className}`}>
      <div className="flex flex-col">
        <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 tracking-tight">
          {title}
        </h4>
        {description && (
          <p className="text-[11px] text-slate-450 dark:text-slate-500 mt-0.5 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <div className="flex-1 w-full min-h-[260px] flex items-center justify-center relative">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
