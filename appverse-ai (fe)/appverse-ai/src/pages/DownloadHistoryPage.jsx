
import React, { useState, useEffect, useMemo } from 'react';
import { privateAPI } from '../services/api';
import { Link } from 'react-router-dom';
import {
  FiDownload, FiCalendar, FiSearch,
  FiCheck, FiRefreshCw, FiExternalLink, FiClock
} from 'react-icons/fi';

export const DownloadHistoryPage = () => {

  // ✅ NEW STATE
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState('');
  const [filterMonth, setFilterMonth] = useState('All');
  const [updatingIds, setUpdatingIds] = useState({});

  // =========================
  // ✅ LOAD FROM BACKEND
  // =========================
  useEffect(() => {
    loadDownloads();
  }, []);

  const loadDownloads = async () => {
    try {
      const res = await privateAPI.get("/downloads/download-history");

      // ✅ map backend → frontend format
      const formatted = res.data.map((item, idx) => {
        const baseDate = new Date();
        baseDate.setDate(baseDate.getDate() - (idx * 2) - 1);

        return {
          id: item.id,
          name: item.appName,
          logo: item.logo,
          category: item.category,

          // ✅ fake timeline UI fields
          installedDate: baseDate.toISOString().split('T')[0],
          installedMonth: baseDate.toLocaleString('default', { month: 'long' }),
          needsUpdate: idx % 3 === 0,
          size: "50MB",
          version: "1.0.0"
        };
      });

      setDownloads(formatted);

    } catch (err) {
      console.error("Download history error", err);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // ✅ FILTER LOGIC
  // =========================
  const filteredTimeline = useMemo(() => {
    return downloads.filter(item => {

      const matchesSearch =
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase());

      const matchesMonth =
        filterMonth === 'All' || item.installedMonth === filterMonth;

      return matchesSearch && matchesMonth;
    });
  }, [downloads, query, filterMonth]);

  // ✅ MONTH FILTERS
  const months = useMemo(() => {
    const list = downloads.map(item => item.installedMonth);
    return ['All', ...new Set(list)];
  }, [downloads]);

  // =========================
  // ✅ UPDATE SIMULATION (UNCHANGED)
  // =========================
  const handleUpdate = (appId, name) => {
    if (updatingIds[appId]) return;

    setUpdatingIds(prev => ({ ...prev, [appId]: 0 }));

    const interval = setInterval(() => {
      setUpdatingIds(prev => {
        const progress = prev[appId];

        if (progress >= 100) {
          clearInterval(interval);
          return { ...prev, [appId]: 'done' };
        }

        return { ...prev, [appId]: progress + 25 };
      });
    }, 600);
  };

  // =========================
  // ✅ LOADING UI
  // =========================
  if (loading) {
    return <div className="p-6">Loading downloads...</div>;
  }

  return (
    <div className="p-6 flex flex-col gap-6">

      <h2 className="text-2xl font-bold flex items-center gap-2">
        <FiDownload /> Installation History
      </h2>

      {downloads.length === 0 ? (

        <div className="text-center mt-10">
          <FiClock className="text-4xl mx-auto mb-2" />
          <p>No downloads yet</p>
          <Link to="/store" className="btn-primary mt-3 inline-block">
            Explore Apps
          </Link>
        </div>

      ) : (

        <>
          {/* ✅ SEARCH */}
          <div className="flex gap-4 items-center">

            <div className="relative">
              <FiSearch className="absolute left-2 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-8 border rounded p-2 text-sm"
              />
            </div>

            {/* ✅ FILTER MONTH */}
            <div className="flex gap-2">
              {months.map(m => (
                <button
                  key={m}
                  onClick={() => setFilterMonth(m)}
                  className={`px-2 py-1 text-xs rounded ${
                    filterMonth === m ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

          </div>

          {/* ✅ TIMELINE */}
          <div className="flex flex-col gap-4">

            {filteredTimeline.map(item => (

              <div key={item.id} className="border p-4 rounded flex justify-between">

                <div className="flex gap-3">
                  <img src={item.logo} className="w-10 h-10" />

                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.category} • {item.installedDate}
                    </p>
                  </div>
                </div>

                <div>
                  {updatingIds[item.id] === 'done' ? (
                    <span className="text-green-500 flex gap-1">
                      <FiCheck /> Updated
                    </span>
                  ) : (
                    <button
                      onClick={() => handleUpdate(item.id, item.name)}
                      className="text-blue-500 text-sm"
                    >
                      Update
                    </button>
                  )}
                </div>

              </div>

            ))}

          </div>

        </>
      )}

    </div>
  );
};

export default DownloadHistoryPage;
