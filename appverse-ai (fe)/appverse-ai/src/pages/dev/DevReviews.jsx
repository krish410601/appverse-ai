import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ReviewCard } from '../../components/store/ReviewCard';
import { FiMessageSquare, FiTrendingUp } from 'react-icons/fi';

export const DevReviews = () => {
  const { appsList, reviewsList } = useApp();

  // Retrieve app ids owned by dev_self
  const devAppIds = useMemo(() => {
    return appsList.filter(a => a.developerId === 'dev_self').map(a => a.id);
  }, [appsList]);

  // Retrieve reviews written for those developer app ids
  const devAppReviews = useMemo(() => {
    return reviewsList.filter(r => devAppIds.includes(r.appId));
  }, [reviewsList, devAppIds]);

  return (
    <div className="w-full flex flex-col gap-6 p-4 md:p-8 select-none text-left">
      
      {/* Title */}
      <div className="flex flex-col gap-1">
        <h2 className="font-extrabold text-2xl md:text-3xl text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
          <FiMessageSquare className="text-secondary w-7.5 h-7.5" /> User Feedbacks
        </h2>
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Inspect star ratings, read written reviews, and analyze customer satisfaction metrics for your catalog.
        </p>
      </div>

      {/* Ratings details */}
      {devAppReviews.length === 0 ? (
        <div className="glass-panel p-16 rounded-2xl flex flex-col items-center justify-center gap-4 text-center border border-slate-200/50 dark:border-slate-800/40 mt-4">
          <p className="text-sm font-semibold text-slate-400">No review ratings received yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
          {devAppReviews.map(rev => (
            <div key={rev.id} className="relative flex flex-col">
              <div className="absolute top-3.5 right-4 z-10 px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-[9px] font-bold text-primary dark:bg-primary/20 dark:text-primary-light uppercase tracking-wider">
                {rev.appName}
              </div>
              <ReviewCard review={rev} />
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default DevReviews;
