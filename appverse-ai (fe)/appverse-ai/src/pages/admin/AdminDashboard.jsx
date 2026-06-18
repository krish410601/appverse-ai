
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { privateAPI } from '../../services/api';
import { AnalyticsCard } from '../../components/analytics/AnalyticsCard';
import {
  FiPackage,
  FiUsers,
  FiGrid,
  FiAlertOctagon
} from 'react-icons/fi';

export const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalApps: 0,
    totalUsers: 0,
    pendingApps: 0,
    fakeReviews: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  // ✅ LOAD REAL ADMIN DASHBOARD STATS
  const loadStats = async () => {
    try {
      const res = await privateAPI.get('/admin/dashboard/stats');
      setStats(res.data);
    } catch (err) {
      console.error('Failed to load admin dashboard stats', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 p-4 md:p-8 text-left">

      {/* ✅ TITLE */}
      <div>
        <h2 className="font-extrabold text-2xl md:text-3xl text-slate-800 dark:text-slate-100">
          Admin Management Panel
        </h2>
        <p className="text-xs text-slate-400">
          Monitor apps, users, approvals, and reviews
        </p>
      </div>

      {/* ✅ KPI CARDS */}
      {loading ? (
        <p className="text-sm text-slate-400">Loading dashboard data...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* ✅ TOTAL APPS */}
          <div
            onClick={() => navigate('/admin/apps')}
            className="cursor-pointer hover:scale-[1.02] transition-transform"
          >
            <AnalyticsCard
              title="Marketplace Apps"
              value={stats.totalApps}
              icon={<FiPackage className="w-5 h-5" />}
            />
          </div>

          {/* ✅ TOTAL USERS */}
          <div
            onClick={() => navigate('/admin/users')}
            className="cursor-pointer hover:scale-[1.02] transition-transform"
          >
            <AnalyticsCard
              title="Registered Users"
              value={stats.totalUsers}
              icon={<FiUsers className="w-5 h-5" />}
            />
          </div>

          {/* ✅ PENDING APPS */}
          <div
            onClick={() => navigate('/admin/pending')}
            className="cursor-pointer hover:scale-[1.02] transition-transform"
          >
            <AnalyticsCard
              title="Pending Apps"
              value={stats.pendingApps}
              icon={<FiGrid className="w-5 h-5" />}
            />
          </div>

          {/* ✅ FAKE REVIEWS */}
          <div
            onClick={() => navigate('/admin/reviews')}
            className="cursor-pointer hover:scale-[1.02] transition-transform"
          >
            <AnalyticsCard
              title="Fake Reviews"
              value={stats.fakeReviews}
              icon={<FiAlertOctagon className="w-5 h-5 text-rose-500" />}
            />
          </div>

        </div>
      )}
    </div>
  );
};

export default AdminDashboard;