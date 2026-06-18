

import React, { useEffect, useState } from 'react';
import { privateAPI } from '../services/api';
import { AppCard } from '../components/store/AppCard';
import { Carousel } from '../components/common/Carousel';
import { FiCpu } from 'react-icons/fi';

export const RecommendationsPage = () => {

  const [recommendedApps, setRecommendedApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      const res = await privateAPI.get("/recommend");

      // ✅ USE BACKEND DATA DIRECTLY (NO MAPPING)
      setRecommendedApps(res.data || []);

    } catch (err) {
      console.error("Recommendation load error", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading recommendations...</div>;
  }

  return (
    <div className="w-full flex flex-col gap-8 p-6 max-w-7xl mx-auto">

      {/* ✅ TITLE */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FiCpu className="text-primary" />
          AI Recommendations
        </h2>
        <p className="text-sm text-gray-500">
          Personalized recommendations from backend AI engine
        </p>
      </div>

      {/* ✅ CAROUSEL */}
      <Carousel
        title="Recommended For You"
        subtitle="Suggested apps based on your activity"
      >
        {recommendedApps.length === 0 ? (
          <p className="text-gray-400">No recommendations available</p>
        ) : (
          recommendedApps.map(app => (
            <AppCard key={app.id} app={app} />
          ))
        )}
      </Carousel>

    </div>
  );
};

export default RecommendationsPage;