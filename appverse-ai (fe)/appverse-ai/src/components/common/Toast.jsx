import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';

export const Toast = () => {
  const { toasts, removeToast } = useApp();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'error':
        return <FiAlertCircle className="w-5 h-5 text-rose-500" />;
      case 'warning':
        return <FiAlertCircle className="w-5 h-5 text-amber-500" />;
      case 'info':
      default:
        return <FiInfo className="w-5 h-5 text-cyan-500" />;
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
            className="glass-panel-heavy p-4 rounded-xl flex items-start gap-3 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden relative"
          >
            {/* Left accent color bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${
              toast.type === 'success' ? 'bg-emerald-500' :
              toast.type === 'error' ? 'bg-rose-500' :
              toast.type === 'warning' ? 'bg-amber-500' : 'bg-cyan-500'
            }`} />

            <div className="mt-0.5">{getIcon(toast.type)}</div>
            <div className="flex-1 text-sm font-medium text-slate-800 dark:text-slate-200">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <FiX className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
