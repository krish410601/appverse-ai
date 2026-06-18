import React from 'react';
import { developerRevenue } from '../../mock';
import { AnalyticsCard } from '../../components/analytics/AnalyticsCard';
import { ChartCard } from '../../components/analytics/ChartCard';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { FiDollarSign, FiAward, FiUsers, FiCreditCard } from 'react-icons/fi';
import { Badge } from '../../components/common/Badge';

export const DevRevenue = () => {
  const summary = developerRevenue.summary;

  const payouts = [
    { id: "pay_501", period: "May 01 - May 31", amount: "$12,410.00", date: "2026-06-01", status: "Paid", bank: "Chase Checking (...4820)" },
    { id: "pay_502", period: "Apr 01 - Apr 30", amount: "$10,850.00", date: "2026-05-01", status: "Paid", bank: "Chase Checking (...4820)" },
    { id: "pay_503", period: "Mar 01 - Mar 31", amount: "$9,200.00", date: "2026-04-01", status: "Paid", bank: "Chase Checking (...4820)" }
  ];

  return (
    <div className="w-full flex flex-col gap-6 p-4 md:p-8 select-none text-left">
      
      {/* Title */}
      <div className="flex flex-col gap-1">
        <h2 className="font-extrabold text-2xl md:text-3xl text-slate-800 dark:text-slate-100 tracking-tight">
          Financial Ledger & Revenue
        </h2>
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Monitor incoming developer license splits, review transaction receipts, and view bank payout schedules.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsCard
          title="Net Revenue Accumulation"
          value="$38,680"
          growth="+11.4%"
          icon={<FiDollarSign className="w-5 h-5 text-emerald-500" />}
          color="success"
        />
        <AnalyticsCard
          title="Active Subscriptions"
          value={summary.activeSubscribers}
          growth="+14.2%"
          icon={<FiUsers className="w-5 h-5 text-primary" />}
          color="primary"
        />
        <AnalyticsCard
          title="Transaction Count"
          value={summary.totalSalesCount}
          growth="+6.1%"
          icon={<FiCreditCard className="w-5 h-5 text-secondary" />}
          color="secondary"
        />
        <AnalyticsCard
          title="Pending Settlement"
          value={summary.unpaidEarnings}
          growth="+0.0%"
          icon={<FiAward className="w-5 h-5 text-accent" />}
          color="accent"
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mt-2">
        
        {/* Earnings chart */}
        <div className="lg:col-span-2">
          <ChartCard
            title="SaaS Revenue growth trend"
            description="License sales, monthly billing renewals, and subscription purchases."
          >
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={developerRevenue.revenueHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDevRevenueLedger" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-800/40" />
                <XAxis dataKey="date" stroke="#94A3B8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="earnings" stroke="#10B981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorDevRevenueLedger)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Payout records */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/45 flex flex-col gap-4 text-left">
          <h4 className="font-bold text-sm text-slate-850 dark:text-slate-100">Settled Payouts History</h4>
          <div className="flex flex-col gap-3">
            {payouts.map(p => (
              <div key={p.id} className="p-3 rounded-xl border border-slate-100 dark:border-slate-800/40 flex flex-col gap-2 bg-slate-50/20 dark:bg-dark-bg/10">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-150">
                  <span>{p.period}</span>
                  <span className="text-emerald-500">{p.amount}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>Cleared: {p.date}</span>
                  <span>{p.bank}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Transaction Audit Table */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/45 flex flex-col gap-4 mt-2">
        <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">Transaction Receipts Log</h4>
        
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200/60 dark:border-slate-800/60 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="pb-3 pr-4">Tx ID</th>
                <th className="pb-3 pr-4">Application</th>
                <th className="pb-3 pr-4">Recipient</th>
                <th className="pb-3 pr-4">Billing Code</th>
                <th className="pb-3 pr-4">License Fee</th>
                <th className="pb-3 pr-4">Date</th>
                <th className="pb-3">Settle Code</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 font-medium text-slate-650 dark:text-slate-300">
              {developerRevenue.transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/20 dark:hover:bg-dark-hover/10">
                  <td className="py-3.5 pr-4 font-bold text-slate-700 dark:text-slate-400">{tx.id}</td>
                  <td className="py-3.5 pr-4">{tx.app}</td>
                  <td className="py-3.5 pr-4">{tx.customer}</td>
                  <td className="py-3.5 pr-4">
                    <Badge variant="accent">{tx.type}</Badge>
                  </td>
                  <td className="py-3.5 pr-4 font-bold text-slate-800 dark:text-white">{tx.amount}</td>
                  <td className="py-3.5 pr-4 text-slate-400">{tx.date}</td>
                  <td className="py-3.5">
                    <Badge variant={tx.status === 'Success' ? 'success' : 'warning'}>
                      {tx.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default DevRevenue;
