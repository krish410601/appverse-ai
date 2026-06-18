

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { privateAPI } from '../../services/api';
import {
  FiStar,
  FiDownloadCloud,
  FiHeart,
  FiCheck
} from 'react-icons/fi';
import { motion } from 'framer-motion';

export const AppCard = ({ app }) => {

  const { currentUser, toggleFavorite, addToast } = useApp();
  const navigate = useNavigate();

  const [installedApps, setInstalledApps] = React.useState([]);
  const [progressMap, setProgressMap] = React.useState({});

  const isFavorited = currentUser
    ? currentUser.favorites?.includes(app.id)
    : false;

  const isInstalled = installedApps.includes(app.id);
  const downloadProgress = progressMap[app.id];

  const formatDownloads = (num = 0) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num;
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!currentUser) {
      addToast('Please login to install applications', 'warning');
      navigate('/auth');
      return;
    }

    let progress = 0;

    const interval = setInterval(() => {
      progress += 5;

      setProgressMap(prev => ({
        ...prev,
        [app.id]: progress
      }));

      if (progress >= 100) clearInterval(interval);
    }, 200);

    try {
      await privateAPI.post(`/downloads/${app.id}`);

      clearInterval(interval);

      setInstalledApps(prev => [...prev, app.id]);

      addToast(`${app.appName} installed successfully`, 'success');

      setProgressMap(prev => {
        const copy = { ...prev };
        delete copy[app.id];
        return copy;
      });

    } catch (err) {
      clearInterval(interval);
      addToast('Download failed', 'error');
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      className="glass-panel hover:bg-white dark:hover:bg-dark-card rounded-2xl p-4 flex flex-col gap-3 relative select-none"
    >

      {/* ✅ FAVORITE */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          if (!currentUser) {
            addToast('Please login to bookmark applications', 'warning');
            navigate('/auth');
            return;
          }

          toggleFavorite(app.id);
        }}
        className="absolute top-3 right-3"
      >
        <FiHeart
          className={`w-4 h-4 ${
            isFavorited ? 'fill-current text-red-500' : ''
          }`}
        />
      </button>

      {/* ✅ APP INFO */}
      <Link to={`/app/${app.id}`} className="flex gap-3.5">

        {/* ✅ IMAGE */}
        <div className="relative w-14 h-14 shrink-0">
          <img
            src={app.appLogoUrl}
            alt={app.appName}
            className="w-14 h-14 rounded-2xl object-contain bg-white"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                'https://dummyimage.com/56x56/eee/999.png&text=App';
            }}
          />

          {/* ✅ LOADER RING */}
          {downloadProgress != null && !isInstalled && (
            <svg className="absolute top-0 left-0 w-full h-full rotate-[-90deg]">
              <circle
                cx="28"
                cy="28"
                r="25"
                stroke="#e5e7eb"
                strokeWidth="3"
                fill="none"
              />
              <circle
                cx="28"
                cy="28"
                r="25"
                stroke="#3b82f6"
                strokeWidth="3"
                fill="none"
                strokeDasharray="157"
                strokeDashoffset={
                  157 - (157 * downloadProgress) / 100
                }
                style={{ transition: 'stroke-dashoffset 0.2s ease' }}
              />
            </svg>
          )}
        </div>

        {/* ✅ TEXT */}
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm truncate">
            {app.appName}
          </h4>

          <p className="text-xs text-slate-400">
            {app.category}
          </p>

          <div className="flex gap-2 text-xs mt-1">
            <FiStar className="text-amber-500" />
            {app.averageRating ?? 0}
            <FiDownloadCloud />
            {formatDownloads(app.totalDownloads)}
          </div>
        </div>
      </Link>

      {/* ✅ DESCRIPTION */}
      <p className="text-xs text-slate-500 line-clamp-2">
        {app.appDescription}
      </p>

      {/* ✅ FOOTER */}
      <div className="flex justify-between mt-auto">

        <span className="text-xs text-slate-400">
          Free
        </span>

        {downloadProgress != null && !isInstalled ? (
          <span className="text-blue-500 text-xs">
            Installing {downloadProgress}%
          </span>
        ) : isInstalled ? (
          <div className="flex items-center gap-1 text-green-500 text-xs font-bold">
            <FiCheck /> Installed
          </div>
        ) : (
          <button
            onClick={handleDownload}
            className="bg-primary text-white px-3 py-1 rounded text-xs font-bold"
          >
            Get
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default AppCard;
