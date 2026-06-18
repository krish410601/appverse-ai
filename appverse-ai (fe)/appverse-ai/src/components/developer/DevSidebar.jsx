import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  FiGrid, FiPackage, FiPlusCircle, FiTrendingUp, FiDollarSign, FiMessageSquare, FiSettings, FiArrowLeft 
} from 'react-icons/fi';

export const DevSidebar = () => {
  const navItems = [
    { name: 'Console Home', path: '/developer', icon: <FiGrid className="w-5 h-5" />, end: true },
    { name: 'My Applications', path: '/developer/apps', icon: <FiPackage className="w-5 h-5" /> },
    { name: 'Submit New App', path: '/developer/create', icon: <FiPlusCircle className="w-5 h-5" /> },
    { name: 'Usage Analytics', path: '/developer/analytics', icon: <FiTrendingUp className="w-5 h-5" /> },

  ];

  return (
    <aside className="w-64 h-[calc(100vh-73px)] sticky top-[73px] hidden lg:flex flex-col border-r border-slate-200/50 dark:border-slate-800/50 bg-slate-50/20 dark:bg-dark-bg/10 backdrop-blur-sm p-4 overflow-y-auto shrink-0 select-none">
      {/* Return to Store */}
      <div className="mb-6">
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-500 hover:text-primary dark:text-slate-450 dark:hover:text-primary-light transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" /> Back to Storefront
        </Link>
      </div>

      {/* Dev Navigation Links */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 mb-2 block">
          Developer Suite
        </span>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-secondary/15 via-primary/10 to-accent/10 text-secondary border-l-4 border-secondary dark:from-secondary/20 dark:text-secondary-light'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/60 dark:hover:bg-dark-hover/40 hover:text-slate-800 dark:hover:text-slate-200'
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </div>

      {/* Settings Footer link */}
      <div className="mt-auto border-t border-slate-200/30 dark:border-slate-800/25 pt-4">
        <Link
          to="/profile"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-450 hover:bg-slate-100/60 dark:hover:bg-dark-hover/40 hover:text-slate-850 dark:hover:text-slate-250 transition-all duration-200"
        >
          <FiSettings className="w-5 h-5" />
          Settings Profile
        </Link>
      </div>
    </aside>
  );
};

export default DevSidebar;
