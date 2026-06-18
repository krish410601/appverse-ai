import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { AppCard } from '../components/store/AppCard';
import { FiHeart, FiFrown } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const FavoritesPage = () => {
  const { appsList, currentUser } = useApp();

  const favoriteApps = useMemo(() => {
    return appsList.filter(app => currentUser?.favorites?.includes(app.id) || false);
  }, [appsList, currentUser?.favorites]);

  return (
    <div className="w-full flex flex-col gap-6 p-4 md:p-8 select-none max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col gap-1 text-left">
        <h2 className="font-extrabold text-2xl md:text-3xl text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
          <FiHeart className="text-rose-500 fill-current w-7.5 h-7.5" /> Bookmarked Wish List
        </h2>
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Review or install applications you have bookmarked for later.
        </p>
      </div>

      {favoriteApps.length === 0 ? (
        <div className="glass-panel p-16 rounded-2xl flex flex-col items-center justify-center gap-4 text-center border border-slate-200/50 dark:border-slate-800/40">
          <div className="p-4 bg-rose-500/10 rounded-2xl text-rose-500">
            <FiFrown className="w-8 h-8" />
          </div>
          <div className="max-w-xs flex flex-col gap-1">
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">Wish list is empty</h4>
            <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
              Explore the marketplace and click on the heart icons to bookmark applications you'd like to save.
            </p>
          </div>
          <Link to="/store" className="btn-primary text-xs px-6 py-2.5 mt-2">
            Browse Store
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteApps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
