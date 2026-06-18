import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Avatar } from './Avatar';
import { FiSearch, FiBell, FiChevronDown, FiUser, FiDownload, FiLayers, FiSettings, FiGrid } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const { notificationsList, markNotificationAsRead, clearAllNotifications, currentUser, isAuthenticated, logout } = useApp();
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const navigate = useNavigate();
  const unreadNotifs = notificationsList.filter(n => !n.read);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/store?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/store');
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/50 dark:border-slate-800/50 px-4 md:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary via-secondary to-accent flex items-center justify-center shadow-lg shadow-primary/20 transform group-hover:rotate-12 transition-transform duration-300">
          <svg className="w-5.5 h-5.5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 22h20L12 2zm0 3.99L19.53 19H4.47L12 5.99zm-1 5v3h2v-3h-2zm0 4h2v2h-2v-2z" />
          </svg>
        </div>
        <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent hidden sm:inline-block">
          AppVerse<span className="text-primary">.AI</span>
        </span>
      </Link>

      {/* Global Search Bar */}
      <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md relative hidden md:block">
        <input
          type="text"
          placeholder="Search apps, categories, developers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full glass-input pr-10 pl-4 text-sm focus:ring-1 focus:ring-primary/50"
        />
        <button type="submit" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors">
          <FiSearch className="w-4 h-4" />
        </button>
      </form>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Mobile Search Button */}
        <Link to="/store" className="md:hidden p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-dark-hover text-slate-600 dark:text-slate-300 transition-colors">
          <FiSearch className="w-5 h-5" />
        </Link>

        {/* Theme Toggler */}
        <ThemeSwitcher />

        {isAuthenticated && currentUser ? (
          <>
            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifDropdown(!showNotifDropdown);
                  setShowProfileDropdown(false);
                }}
                className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-dark-hover text-slate-600 dark:text-slate-300 transition-colors relative"
              >
                <FiBell className="w-5 h-5" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
                    {unreadNotifs.length}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifDropdown && (
                  <>
                    {/* Overlay backdrop to dismiss */}
                    <div className="fixed inset-0 z-40" onClick={() => setShowNotifDropdown(false)} />
                    
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2.5 w-80 max-h-[420px] overflow-hidden glass-panel-heavy border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 flex flex-col"
                    >
                      <div className="p-4 border-b border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between bg-slate-50/55 dark:bg-dark-card/40">
                        <span className="font-semibold text-sm text-slate-800 dark:text-slate-100">Notifications</span>
                        {notificationsList.length > 0 && (
                          <button onClick={clearAllNotifications} className="text-xs text-primary hover:underline font-medium">
                            Clear all
                          </button>
                        )}
                      </div>
                      
                      <div className="flex-1 overflow-y-auto max-h-72 divide-y divide-slate-100 dark:divide-slate-800/40">
                        {notificationsList.length === 0 ? (
                          <div className="p-6 text-center text-xs text-slate-400">No new notifications</div>
                        ) : (
                          notificationsList.slice(0, 5).map((n) => (
                            <div
                              key={n.id}
                              onClick={() => {
                                markNotificationAsRead(n.id);
                                setShowNotifDropdown(false);
                                navigate('/notifications');
                              }}
                              className={`p-3.5 hover:bg-slate-50 dark:hover:bg-dark-hover/40 transition-colors cursor-pointer text-left flex gap-2.5 ${!n.read ? 'bg-primary/5 dark:bg-primary/10' : ''}`}
                            >
                              <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.type === 'update' ? 'bg-indigo-500' : n.type === 'alert' ? 'bg-rose-500' : 'bg-cyan-500'}`} />
                              <div>
                                <p className="font-semibold text-xs text-slate-700 dark:text-slate-200">{n.title}</p>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">{n.message}</p>
                                <span className="text-[9px] text-slate-400 block mt-1">{n.date}</span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      <Link
                        to="/notifications"
                        onClick={() => setShowNotifDropdown(false)}
                        className="p-3 border-t border-slate-200/60 dark:border-slate-800/60 text-center text-xs text-primary hover:underline font-semibold bg-slate-50/55 dark:bg-dark-card/40 block"
                      >
                        View all notifications
                      </Link>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* User Account Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileDropdown(!showProfileDropdown);
                  setShowNotifDropdown(false);
                }}
                className="flex items-center gap-1.5 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-dark-hover transition-colors"
              >
                <Avatar src={currentUser.avatar} name={currentUser.username} size="sm" />
                <FiChevronDown className="w-4 h-4 text-slate-500 hidden sm:block" />
              </button>

              <AnimatePresence>
                {showProfileDropdown && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowProfileDropdown(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2.5 w-60 glass-panel-heavy border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
                    >
                      <div className="p-4 border-b border-slate-200/60 dark:border-slate-800/60 bg-slate-50/55 dark:bg-dark-card/40 text-left">
                        <p className="font-bold text-sm text-slate-800 dark:text-slate-100 truncate">{currentUser.username}</p>
                        <p className="text-xs text-slate-500 truncate mt-0.5">{currentUser.email}</p>
                        <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light">
                          {currentUser.role}
                        </span>
                      </div>

                      <div className="p-1.5 flex flex-col gap-0.5">
                        <Link
                          to="/profile"
                          onClick={() => setShowProfileDropdown(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-hover transition-colors text-left"
                        >
                          <FiUser className="w-4 h-4" /> Profile Details
                        </Link>
                        <Link
                          to="/history"
                          onClick={() => setShowProfileDropdown(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-hover transition-colors text-left"
                        >
                          <FiDownload className="w-4 h-4" /> Downloads Timeline
                        </Link>
                        <Link
                          to="/developer"
                          onClick={() => setShowProfileDropdown(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-hover transition-colors text-left"
                        >
                          <FiLayers className="w-4 h-4" /> Developer Portal
                        </Link>
                        <Link
                          to="/admin"
                          onClick={() => setShowProfileDropdown(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-hover transition-colors text-left"
                        >
                          <FiGrid className="w-4 h-4" /> Admin Console
                        </Link>
                      </div>

                      <div className="p-1.5 border-t border-slate-200/60 dark:border-slate-800/60">
                        <button
                          onClick={() => {
                            setShowProfileDropdown(false);
                            logout();
                            navigate('/');
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-50/50 dark:hover:bg-rose-950/20 transition-colors text-left"
                        >
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </>
        ) : (
          <Link
            to="/auth"
            className="btn-primary text-xs py-2.5 px-5 font-bold shadow-md"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

