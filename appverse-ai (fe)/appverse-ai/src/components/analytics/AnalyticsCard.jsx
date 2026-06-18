
import React from 'react';

export const AnalyticsCard = ({
  title,
  value,
  growth = '',     // ✅ DEFAULT VALUE
  icon,
  color = 'primary'
}) => {

  const getGrowthStyles = () => {
    if (!growth) return ''; // ✅ PREVENT CRASH

    if (growth.startsWith('+')) {
      return 'text-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/20';
    }
    if (growth.startsWith('-')) {
      return 'text-rose-500 bg-rose-500/10 dark:bg-rose-500/20';
    }
    return 'text-slate-400 bg-slate-100 dark:bg-slate-800';
  };

  const getIconColor = () => {
    switch (color) {
      case 'secondary':
        return 'text-secondary bg-secondary/10 dark:bg-secondary/20';
      case 'accent':
        return 'text-accent bg-accent/10 dark:bg-accent/20';
      case 'success':
        return 'text-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/20';
      case 'primary':
      default:
        return 'text-primary bg-primary/10 dark:bg-primary/20';
    }
  };

  return (
    <div className="glass-panel p-5 rounded-2xl flex items-center justify-between border border-slate-200/50 dark:border-slate-800/40 select-none">

      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          {title}
        </span>

        <span className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
          {value}
        </span>

        {/* ✅ ONLY SHOW GROWTH IF PROVIDED */}
        {growth && (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-bold w-fit ${getGrowthStyles()}`}
          >
            {growth} vs last month
          </span>
        )}
      </div>

      <div className={`p-4 rounded-xl flex items-center justify-center ${getIconColor()}`}>
        {icon}
      </div>
    </div>
  );
};

export default AnalyticsCard;