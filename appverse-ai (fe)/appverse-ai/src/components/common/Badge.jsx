import React from 'react';

export const Badge = ({ children, variant = 'neutral', className = '' }) => {
  const getColors = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary/10 text-primary border-primary/20 dark:bg-primary/20 dark:text-primary-light';
      case 'secondary':
        return 'bg-secondary/10 text-secondary border-secondary/20 dark:bg-secondary/20 dark:text-secondary-light';
      case 'accent':
        return 'bg-accent/10 text-accent border-accent/20 dark:bg-accent/25 dark:text-accent-light';
      case 'success':
        return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-400';
      case 'warning':
        return 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:bg-amber-500/20 dark:text-amber-400';
      case 'error':
        return 'bg-rose-500/10 text-rose-600 border-rose-500/20 dark:bg-rose-500/20 dark:text-rose-400';
      case 'neutral':
      default:
        return 'bg-slate-500/10 text-slate-600 border-slate-500/20 dark:bg-slate-500/20 dark:text-slate-400';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getColors()} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
