import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiAlertCircle } from 'react-icons/fi';

export const NotFoundPage = () => {
  return (
    <div className="w-full min-h-[calc(100vh-140px)] flex flex-col items-center justify-center p-6 text-center select-none bg-gradient-mesh">
      <div className="p-5 bg-rose-500/10 text-rose-500 rounded-3xl mb-4 border border-rose-500/20">
        <FiAlertCircle className="w-12 h-12" />
      </div>
      <h1 className="font-extrabold text-5xl text-slate-800 dark:text-white tracking-tight">404</h1>
      <h3 className="font-bold text-lg text-slate-700 dark:text-slate-200 mt-2">Page Not Found</h3>
      <p className="text-xs text-slate-450 dark:text-slate-500 max-w-xs leading-relaxed mt-2.5">
        The route you are trying to access does not exist. It might have been moved or deleted.
      </p>
      
      <Link to="/" className="btn-primary text-xs px-8 py-3 mt-8">
        <FiHome className="w-4 h-4" /> Back to Storefront
      </Link>
    </div>
  );
};

export default NotFoundPage;
