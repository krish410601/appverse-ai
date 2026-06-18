

import React, { useEffect, useState } from 'react';
import { privateAPI } from '../../services/api';
import { FiAlertOctagon, FiX } from 'react-icons/fi';
import { Badge } from '../../components/common/Badge';
import { ReviewCard } from '../../components/store/ReviewCard';

const AdminReviews = () => {

  const [apps, setApps] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [query, setQuery] = useState('');

  // =========================
  // ✅ LOAD ONLY APPS WITH REVIEWS
  // =========================
  useEffect(() => {
    loadApps();
  }, []);

  const loadApps = async () => {
    try {
      const res = await privateAPI.get('/apps');

      const appsWithReviews = res.data
        .filter(app => (app.totalReviews ?? 0) > 0) // ✅ IMPORTANT
        .sort((a, b) => b.totalReviews - a.totalReviews);

      setApps(appsWithReviews);

    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // ✅ LOAD REVIEWS
  // =========================
  const loadReviews = async (appId) => {
    try {
      const res = await privateAPI.get(`/reviews/app/${appId}`);
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // ✅ CLICK APP
  // =========================
  const handleAppClick = (app) => {
    setSelectedApp(app);
    setQuery('');
    loadReviews(app.id);
  };

  // =========================
  // ✅ DELETE REVIEW
  // =========================
  const deleteReview = async (id) => {
    try {
      await privateAPI.delete(`/reviews/admin/${id}`);
      setReviews(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // ✅ MARK FAKE
  // =========================
  const markFake = async (id) => {
    try {
      await privateAPI.put(`/reviews/${id}/mark-fake`);

      setReviews(prev =>
        prev.map(r =>
          r.id === id ? { ...r, isFake: true } : r
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // ✅ FILTER REVIEWS
  // =========================
  const filteredReviews = reviews.filter(r =>
    (r.reviewText || "").toLowerCase().includes(query.toLowerCase()) ||
    (r.userName || "").toLowerCase().includes(query.toLowerCase())
  );

  // =========================
  // ✅ UI
  // =========================
  return (
    <div className="w-full flex gap-6 p-4 md:p-8">

      {/* ✅ LEFT: APPS */}
      <div className="flex-1 flex flex-col gap-6">

        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiAlertOctagon className="text-red-500" />
            Review Moderation
          </h2>
          <p className="text-sm text-gray-500">
            Click an app to manage reviews
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {apps.map(app => (
            <div
              key={app.id}
              onClick={() => handleAppClick(app)}
              className={`p-3 border rounded-lg cursor-pointer hover:shadow flex flex-col items-center text-center gap-2 transition ${
                selectedApp?.id === app.id
                  ? "bg-blue-50 border-blue-400"
                  : ""
              }`}
            >

              {/* ✅ IMAGE */}
              <img
                src={app.appLogoUrl}
                alt={app.appName}
                className="w-14 h-14 object-contain rounded-lg"
                onError={(e) => {
                  e.target.src =
                    "https://cdn-icons-png.flaticon.com/512/847/847969.png";
                }}
              />

              <p className="text-sm font-medium">
                {app.appName}
              </p>

              {/* ✅ REVIEW COUNT */}
              <p className="text-xs text-gray-500">
                {app.totalReviews} Reviews
              </p>

            </div>
          ))}

        </div>

      </div>

      {/* ✅ RIGHT: REVIEW PANEL */}
      {selectedApp && (
        <div className="w-[380px] bg-white border rounded-xl shadow-lg p-4 flex flex-col">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold">
              {selectedApp.appName}
            </h3>

            <button onClick={() => setSelectedApp(null)}>
              <FiX />
            </button>
          </div>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search reviews..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-3 py-2 border rounded mb-3"
          />

          {/* REVIEWS */}
          {filteredReviews.length === 0 ? (
            <p className="text-gray-500">No reviews found</p>
          ) : (
            <div className="flex flex-col gap-3 overflow-y-auto max-h-[70vh]">

              {filteredReviews.map(review => (
                <div key={review.id} className="border rounded-lg p-3">

                  <ReviewCard review={review} />

                  <div className="mt-2">
                    <Badge variant={review.isFake ? 'error' : 'success'}>
                      {review.isFake ? "Fake ⚠️" : "Valid"}
                    </Badge>
                  </div>

                  <div className="flex gap-2 mt-2">

                    {!review.isFake && (
                      <button
                        onClick={() => markFake(review.id)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                      >
                        Mark Fake
                      </button>
                    )}

                    <button
                      onClick={() => deleteReview(review.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Delete
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default AdminReviews;
