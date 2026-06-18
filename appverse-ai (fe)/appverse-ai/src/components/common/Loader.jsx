import React from 'react';
import { motion } from 'framer-motion';

export const Loader = ({ fullPage = false, message = "Loading AppVerse..." }) => {
  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50/90 dark:bg-dark-bg/90 backdrop-blur-md">
        <div className="relative flex items-center justify-center mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary"
          />
          <motion.div
            animate={{ scale: [0.8, 1.1, 0.8] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-secondary to-accent"
          />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-sm font-semibold tracking-wider text-gradient-primary uppercase"
        >
          {message}
        </motion.p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 w-full">
      <div className="spinner mb-3"></div>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{message}</p>
    </div>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="glass-panel p-4 rounded-2xl flex flex-col gap-3 h-52">
      <div className="flex gap-3">
        <div className="w-14 h-14 skeleton rounded-xl flex-shrink-0" />
        <div className="flex-1 flex flex-col gap-2 mt-1">
          <div className="h-4 w-3/4 skeleton" />
          <div className="h-3 w-1/2 skeleton" />
        </div>
      </div>
      <div className="h-10 skeleton w-full mt-auto" />
    </div>
  );
};
