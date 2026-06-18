import React from 'react';
import { storeAnalytics } from '../mock';
import { AnalyticsCard } from '../components/analytics/AnalyticsCard';
import { ChartCard } from '../components/analytics/ChartCard';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line 
} from 'recharts';
import { FiTrendingUp, FiUsers, FiDollarSign, FiAward } from 'react-icons/fi';

export const AnalyticsPage = () => {
  const kpis = storeAnalytics.kpis;
  const COLORS = ['#6366F1', '#8B5CF6', '#06B6D4', '#E2E8F0', '#F43F5E', '#10B981'];

  return (
    <div className="w-full flex flex-col gap-6 p-4 md:p-8 select-none max-w-7xl mx-auto">
      
      {/* Title */}
      <div className="flex flex-col gap-1 text-left">
        <h2 className="font-extrabold text-2xl md:text-3xl text-slate-800 dark:text-slate-100 tracking-tight">
          Marketplace Analytics
        </h2>
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Real-time metrics, growth trends, downloads distribution, and customer session charts.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsCard
          title="Total Store Downloads"
          value={kpis.totalDownloads}
          growth={kpis.downloadGrowth}
          icon={<FiTrendingUp className="w-5 h-5 text-primary" />}
          color="primary"
        />
        <br className="hidden" /> {/* Grid spacer helpers */}
        <AnalyticsCard
          title="Monthly Active Users"
          value={kpis.activeUsers}
          growth={kpis.activeUserGrowth}
          icon={<FiUsers className="w-5 h-5 text-secondary" />}
          color="secondary"
        />
        <AnalyticsCard
          title="Premium Subscriptions"
          value={kpis.premiumSubscriptions}
          growth={kpis.subscriptionGrowth}
          icon={<FiAward className="w-5 h-5 text-accent" />}
          color="accent"
        />
        <AnalyticsCard
          title="Accumulated Sales"
          value={kpis.totalRevenue}
          growth={kpis.revenueGrowth}
          icon={<FiDollarSign className="w-5 h-5 text-emerald-500" />}
          color="success"
        />
      </div>

      {/* Charts Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
        {/* Downloads Over Time */}
        <ChartCard
          title="App Download Growth"
          description="Total installation rates mapped month-over-month globally."
        >
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={storeAnalytics.downloadsHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorDownloads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-800/40" />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={10} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  color: '#1E293B',
                  fontSize: '11px'
                }}
              />
              <Area type="monotone" dataKey="downloads" stroke="#6366F1" strokeWidth={2} fillOpacity={1} fill="url(#colorDownloads)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Category Splits */}
        <ChartCard
          title="Downloads By Category"
          description="Percentage distribution of application downloads across main sectors."
        >
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={storeAnalytics.categoryDistribution}
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {storeAnalytics.categoryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  fontSize: '11px',
                  boxShadow: '0 2px 4px rgb(0 0 0 / 0.08)'
                }}
              />
              {/* Manual legend list inside responsive container */}
              <text x="50%" y="95%" textAnchor="middle" fontSize={10} fill="#94A3B8">
                🤖 AI • 🎮 Games • 📅 Productive • 🎨 Creative • 💳 Finance
              </text>
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Ratings Breakdown */}
        <ChartCard
          title="Star Rating Distribution"
          description="Aggregated user rating values collected across all application comments."
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={storeAnalytics.ratingDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-800/40" />
              <XAxis dataKey="star" stroke="#94A3B8" fontSize={10} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  fontSize: '11px'
                }}
              />
              <Bar dataKey="count" fill="#8B5CF6" radius={[6, 6, 0, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Sessions & activity */}
        <ChartCard
          title="Weekly Store Activity"
          description="Comparison of hourly user sessions and package installation triggers."
        >
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={storeAnalytics.userActivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-800/40" />
              <XAxis dataKey="day" stroke="#94A3B8" fontSize={10} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  fontSize: '11px'
                }}
              />
              <Line type="monotone" dataKey="sessions" stroke="#06B6D4" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="downloads" stroke="#6366F1" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

export default AnalyticsPage;
