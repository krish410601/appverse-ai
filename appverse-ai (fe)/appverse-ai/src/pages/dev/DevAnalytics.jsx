
import React, { useEffect, useState } from "react";
import { privateAPI } from "../../services/api";
import { ChartCard } from "../../components/analytics/ChartCard";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export const DevAnalytics = () => {

  const [chartData, setChartData] = useState([]);
  const [appStats, setAppStats] = useState([]);

  useEffect(() => {
    loadAnalytics();
  }, []);

  // ✅ LOAD BOTH APIs
  const loadAnalytics = async () => {
    try {
      const res = await privateAPI.get("/apps/developer/apps");
      const apps = res.data;

      const results = await Promise.all(
        apps.map(async (app) => {
          try {
            // ✅ API 1: analytics
            const analytics = await privateAPI.get(`/analytics/app/${app.id}`);

            // ✅ API 2: downloads
            const downloads = await privateAPI.get(
              `/downloads/developer/${app.id}/getdownloadcount`
            );

            return {
              name: app.appName,
              logo: app.appLogoUrl,

              downloads: downloads.data,
              reviews: analytics.data.totalReviews,
              rating: analytics.data.averageRating
            };

          } catch (err) {
            console.error("Error for app:", app.id, err);
            return {
              name: app.appName,
              logo: app.appLogoUrl,
              downloads: 0,
              reviews: 0,
              rating: 0
            };
          }
        })
      );

      console.log("FINAL DATA ✅", results);

      setAppStats(results);
      setChartData([...results]); // ✅ force re-render

    } catch (err) {
      console.error("Analytics load failed", err);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 p-4 md:p-8 text-left">

      {/* ✅ TITLE */}
      <div>
        <h2 className="text-2xl font-bold">
          Developer Analytics
        </h2>
        <p className="text-sm text-gray-500">
          Real insights for your apps
        </p>
      </div>

      {/* ✅ SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {appStats.map((app) => (
          <div
            key={app.name}
            className="p-4 rounded-xl border shadow-sm flex items-center gap-3"
          >
            <img src={app.logo} className="w-12 h-12 rounded-lg" />

            <div>
              <p className="font-semibold">{app.name}</p>
              <p className="text-xs text-gray-500">
                ⭐ {app.rating} | 📥 {app.downloads} | 💬 {app.reviews}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ BAR CHART */}
      <ChartCard
        title="Downloads vs Reviews"
        description="Live analytics per app"
      >
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            key={JSON.stringify(chartData)}  // ✅ important
            data={chartData}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar dataKey="downloads" fill="#6366F1" name="Downloads" />
            <Bar dataKey="reviews" fill="#06B6D4" name="Reviews" />

          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

    </div>
  );
};

export default DevAnalytics;