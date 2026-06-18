import React from 'react';
import { useApp } from '../context/AppContext';
import { FiBell, FiTrash2, FiMail, FiCheckSquare } from 'react-icons/fi';
import { Badge } from '../components/common/Badge';

export const NotificationsPage = () => {
  const { notificationsList, markNotificationAsRead, clearAllNotifications } = useApp();

  return (
    <div className="w-full flex flex-col gap-6 p-4 md:p-8 select-none max-w-3xl mx-auto text-left">
      
      {/* Title */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-extrabold text-2xl md:text-3xl text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <FiBell className="text-primary w-7.5 h-7.5" /> Notifications Center
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Read store notifications, version updates and developer portal messages.
          </p>
        </div>

        {notificationsList.length > 0 && (
          <button
            onClick={clearAllNotifications}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border border-rose-500/20 text-rose-500 bg-rose-500/5 hover:bg-rose-500 hover:text-white transition-all shadow-sm"
          >
            <FiTrash2 className="w-4 h-4" /> Clear All
          </button>
        )}
      </div>

      {notificationsList.length === 0 ? (
        <div className="glass-panel p-16 rounded-2xl flex flex-col items-center justify-center gap-4 text-center border border-slate-200/50 dark:border-slate-800/40 mt-4">
          <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-400">
            <FiMail className="w-8 h-8" />
          </div>
          <div className="max-w-xs flex flex-col gap-1">
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">Inbox is empty</h4>
            <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
              No new alerts or system updates recorded for this account. Keep coding!
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-2">
          {notificationsList.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationAsRead(notif.id)}
              className={`glass-panel p-4.5 rounded-2xl border flex gap-4 items-start transition-all cursor-pointer relative overflow-hidden ${
                !notif.read
                  ? 'bg-primary/5 dark:bg-primary/10 border-primary/20 hover:border-primary/30'
                  : 'border-slate-200/50 dark:border-slate-800/40 hover:border-slate-350 dark:hover:border-slate-700/60'
              }`}
            >
              {/* Left Accent Bar */}
              {!notif.read && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
              )}

              {/* Status Dot */}
              <div className="mt-1 flex-shrink-0">
                <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                  notif.type === 'update' ? 'bg-indigo-500' :
                  notif.type === 'alert' ? 'bg-rose-500' : 'bg-cyan-500'
                }`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="font-bold text-xs md:text-sm text-slate-800 dark:text-slate-100 tracking-tight">
                    {notif.title}
                  </h4>
                  <Badge variant={notif.type === 'update' ? 'primary' : notif.type === 'alert' ? 'error' : 'accent'}>
                    {notif.type}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-2.5">
                  {notif.message}
                </p>
                <div className="flex items-center justify-between mt-3 text-[10px] text-slate-400 font-semibold">
                  <span>Received: {notif.date}</span>
                  {!notif.read && (
                    <span className="text-primary flex items-center gap-1.5 font-bold">
                      <FiCheckSquare className="w-3.5 h-3.5" /> Mark read
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default NotificationsPage;
