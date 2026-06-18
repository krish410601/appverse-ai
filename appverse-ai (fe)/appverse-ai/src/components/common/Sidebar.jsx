
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { privateAPI } from '../../services/api';
import {
  FiCompass, FiHome, FiCpu, FiTrendingUp,
  FiHeart, FiClock, FiBell, FiChevronRight
} from 'react-icons/fi';

// ✅ Optional icon mapping
const CATEGORY_ICONS = {
  SOCIAL: "💬",
  ENTERTAINMENT: "🎬",
  GAMES: "🎮",
  FINANCE: "💳",
  PRODUCTIVITY: "📅",
  CREATIVE: "🎨",
  UTILITIES: "🔧",
  HEALTH: "❤️",
  "AI TOOLS": "🤖"
};

export const Sidebar = () => {

  const [categories, setCategories] = useState([]);
  const [loaded, setLoaded] = useState(false); // ✅ prevents loops

  const mainNav = [
    { name: 'Discover', path: '/', icon: <FiCompass className="w-5 h-5" /> },
    { name: 'Marketplace', path: '/store', icon: <FiHome className="w-5 h-5" /> },
    { name: 'AI Recommender', path: '/recommendations', icon: <FiCpu className="w-5 h-5" /> },
    //{ name: 'Store Analytics', path: '/analytics', icon: <FiTrendingUp className="w-5 h-5" /> },
    { name: 'Wish List', path: '/favorites', icon: <FiHeart className="w-5 h-5" /> },
    { name: 'Downloads', path: '/history', icon: <FiClock className="w-5 h-5" /> },
    //{ name: 'Notifications', path: '/notifications', icon: <FiBell className="w-5 h-5" /> }
  ];

  /* ✅ LOAD CATEGORIES ONLY ONCE + ONLY WITH TOKEN */
  useEffect(() => {
    if (loaded) return;

    const token = localStorage.getItem("token");
    if (!token) return; // ✅ user not logged in yet

    loadCategories();
  }, [loaded]);

  const loadCategories = async () => {
    try {
      setLoaded(true);

      const res = await privateAPI.get('/apps/categories');
      setCategories(res.data || []);

    } catch (err) {
      // ✅ Silence 401/403 (expected on logout / token expiry)
      if (err.response?.status !== 401 && err.response?.status !== 403) {
        console.error('Failed to load categories', err);
      }
    }
  };

  return (
    <aside className="w-64 h-[calc(100vh-73px)] sticky top-[73px] hidden lg:flex flex-col border-r border-slate-200/50 dark:border-slate-800/50 bg-slate-50/20 dark:bg-dark-bg/10 backdrop-blur-sm p-4 overflow-y-auto shrink-0">

      {/* ✅ NAVIGATION */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
          Navigation
        </span>

        {mainNav.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                isActive
                  ? 'bg-gradient-to-r from-primary/10 text-primary border-l-4 border-primary'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </div>

      {/* ✅ CATEGORIES */}
      <div className="flex flex-col gap-1 mt-6">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
          Browse Categories
        </span>

        {categories.map(cat => (
          <NavLink
            key={cat}
            to={`/store?category=${encodeURIComponent(cat)}`}
            className={({ isActive }) =>
              `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                isActive
                  ? 'bg-slate-200 text-primary font-bold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
              }`
            }
          >
            <div className="flex items-center gap-3">
              <span className="text-sm">{CATEGORY_ICONS[cat] || "📦"}</span>
              <span>{cat}</span>
            </div>
            <FiChevronRight className="w-3.5 h-3.5 opacity-40" />
          </NavLink>
        ))}

      </div>
    </aside>
  );
};

export default Sidebar;