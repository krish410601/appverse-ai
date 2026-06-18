
import React, { useEffect, useState } from 'react';
import { privateAPI } from '../../services/api';
import { FiSearch } from 'react-icons/fi';

export const AdminApps = () => {

  const [apps, setApps] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const [selectedApp, setSelectedApp] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [versions, setVersions] = useState([]);

  // ✅ INITIAL LOAD
  useEffect(() => {
    loadApps();
    loadCategories();
  }, []);

  useEffect(() => {
    filterApps();
  }, [apps, selectedCategory, search]);

  // ✅ LOAD APPS
  const loadApps = async () => {
    try {
      const res = await privateAPI.get('/apps');
      setApps(res.data);
    } catch (err) {
      console.error("App load error:", err);
    }
  };

  // ✅ LOAD CATEGORIES
  const loadCategories = async () => {
    try {
      const res = await privateAPI.get('/apps/categories');
      setCategories(["All", ...res.data]);
    } catch (err) {
      console.error("Category error:", err);
    }
  };

  // ✅ FILTER LOGIC
  const filterApps = () => {
    let temp = [...apps];

    if (search) {
      temp = temp.filter(app =>
        app.appName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      temp = temp.filter(app => app.category === selectedCategory);
    }

    setFilteredApps(temp);
  };

  // ✅ CLICK APP → LOAD ANALYTICS + VERSIONS
  const handleAppClick = async (app) => {
    try {
      setSelectedApp(app);

      // ✅ analytics
      const analyticsRes = await privateAPI.get(`/analytics/app/${app.id}`);
      setAnalytics(analyticsRes.data);

      // ✅ versions
      const versionRes = await privateAPI.get(
        `/appversion/app/${app.id}/versions`
      );
      setVersions(versionRes.data);

    } catch (err) {
      console.error("Data fetch error:", err);
      setAnalytics(null);
      setVersions([]);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 p-4 md:p-8">

      {/* ✅ TITLE */}
      <div>
        <h2 className="text-2xl font-bold">App Catalog</h2>
        <p className="text-sm text-gray-500">
          Click any app to view analytics & version history
        </p>
      </div>

      {/* ✅ SEARCH */}
      <div className="relative w-full md:w-80">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search apps..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 px-3 py-2 border rounded-lg"
        />
      </div>

      {/* ✅ CATEGORY FILTER */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
              selectedCategory === cat
                ? "bg-indigo-600 text-white shadow"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ✅ APP GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        {filteredApps.map(app => (
          <div
            key={app.id}
            onClick={() => handleAppClick(app)}
            className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md cursor-pointer transition flex flex-col gap-3"
          >

            <div className="flex gap-3 items-center">
              <img
                src={app.appLogoUrl}
                alt={app.appName}
                className="w-10 h-10 rounded-md"
              />

              <div>
                <h3 className="font-semibold">{app.appName}</h3>
                <p className="text-xs text-gray-500">v{app.appVersion}</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 line-clamp-2">
              {app.appDescription}
            </p>

          </div>
        ))}

      </div>

      {/* ✅ INSIGHTS SECTION */}
      {selectedApp && analytics && (
        <div className="mt-8 p-6 rounded-xl border bg-white flex flex-col gap-6">

          {/* ✅ HEADER */}
          <h3 className="text-xl font-bold">
            {selectedApp.appName} Insights
          </h3>

          {/* ✅ ANALYTICS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">

            <div className="p-4 border rounded-lg">
              <p className="text-gray-500 text-sm">Downloads</p>
              <p className="text-xl font-bold">{analytics.totalDownloads}</p>
            </div>

            <div className="p-4 border rounded-lg">
              <p className="text-gray-500 text-sm">Reviews</p>
              <p className="text-xl font-bold">{analytics.totalReviews}</p>
            </div>

            <div className="p-4 border rounded-lg">
              <p className="text-gray-500 text-sm">Rating</p>
              <p className="text-xl font-bold">
                ⭐ {analytics.averageRating}
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <p className="text-gray-500 text-sm">Positive</p>
              <p className="text-green-600 font-bold">
                {analytics.positiveReviewCount}
              </p>
            </div>

          </div>

          {/* ✅ VERSION LIST */}
          <div>
            <h4 className="text-lg font-semibold mb-3">
              Version History
            </h4>

            {versions.length === 0 ? (
              <p className="text-gray-500 text-sm">
                No versions available
              </p>
            ) : (
              <div className="flex flex-col gap-3">

                {versions.map(v => (
                  <div
                    key={v.id}
                    className="p-4 border rounded-lg"
                  >
                    <div className="flex justify-between">
                      <p className="font-semibold">
                        v{v.versionNumber}
                      </p>
                      <span className="text-xs text-gray-400">
                        {new Date(v.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mt-1">
                      {v.releaseNotes}
                    </p>
                  </div>
                ))}

              </div>
            )}
          </div>

        </div>
      )}

      {/* ✅ EMPTY STATE */}
      {filteredApps.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No apps found
        </div>
      )}

    </div>
  );
};

export default AdminApps;