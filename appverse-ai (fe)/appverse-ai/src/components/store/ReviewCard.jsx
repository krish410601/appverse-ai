import React from 'react';
import { FiStar, FiThumbsUp, FiAlertCircle } from 'react-icons/fi';
import { Avatar } from '../common/Avatar';

export const ReviewCard = ({ review, onFlag, onDelete, isAdmin = false }) => {
  return (
    <div className="glass-panel p-4 rounded-2xl flex flex-col gap-3 relative select-none border border-slate-200/50 dark:border-slate-800/40">
      {/* Reviewer Meta */}
      <div className="flex items-center gap-3">
        <Avatar src={review.userAvatar} name={review.userName} size="sm" />
        <div className="flex-1 min-w-0">
          <p className="font-bold text-xs text-slate-800 dark:text-slate-200 truncate">
            {review.userName}
          </p>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            {review.date}
          </span>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-0.5 text-amber-500">
          {[...Array(5)].map((_, i) => (
            <FiStar
              key={i}
              className={`w-3.5 h-3.5 ${
                i < review.rating ? 'fill-current text-amber-500' : 'text-slate-200 dark:text-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Review Content */}
      <div className="flex flex-col gap-1">
        <h5 className="font-bold text-xs text-slate-800 dark:text-slate-100">
          {review.title}
        </h5>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          {review.reviewText}
        </p>
      </div>

      {/* Footer Metrics */}
      <div className="flex items-center justify-between mt-1 pt-2 border-t border-slate-100 dark:border-slate-800/30">
        <button className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-primary transition-colors">
          <FiThumbsUp className="w-3.5 h-3.5" />
          Helpful ({review.helpful || 0})
        </button>

        {/* Admin Moderation Panel inline */}
        {isAdmin && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onFlag && onFlag(review.id)}
              className={`px-2 py-1 rounded-lg border text-[9px] font-bold transition-colors ${
                review.isFlagged
                  ? 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-dark-card dark:hover:bg-dark-hover border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400'
              }`}
            >
              {review.isFlagged ? 'Flagged' : 'Flag'}
            </button>
            <button
              onClick={() => onDelete && onDelete(review.id)}
              className="px-2 py-1 rounded-lg border border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500 hover:text-white transition-colors text-[9px] font-bold"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
