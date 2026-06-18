

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { privateAPI } from '../services/api';
import { AppCard } from '../components/store/AppCard';
import { SearchBar } from '../components/store/SearchBar';
import { FilterBar } from '../components/store/FilterBar';
import { CardSkeleton } from '../components/common/Loader';
import { FiGrid, FiList } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export const HomePage = () => {

  // ✅ BACKEND DATA (RAW)
  const [appsList, setAppsList] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const [searchVal, setSearchVal] = useState(() => searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(() => searchParams.get('category') || 'All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  // ✅ LOAD APPS (NO MAPPING ❗)
  useEffect(() => {
    loadApps();
  }, []);

  const loadApps = async () => {
    try {
      const res = await privateAPI.get('/apps');
      setAppsList(res.data || []);
    } catch (err) {
      console.error('Apps load error:', err);
    }
  };

  // ✅ DYNAMIC CATEGORIES
  const categories = useMemo(() => {
    const unique = new Set(appsList.map(app => app.category));
    return ['All', ...unique];
  }, [appsList]);

  // ✅ QUERY PARAM SYNC
  useEffect(() => {
    const params = {};
    if (searchVal) params.search = searchVal;
    if (selectedCategory !== 'All') params.category = selectedCategory;
    setSearchParams(params);
  }, [searchVal, selectedCategory]);

  useEffect(() => {
    const s = searchParams.get('search');
    const c = searchParams.get('category');
    if (s !== null) setSearchVal(s);
    if (c !== null) setSelectedCategory(c);
  }, [searchParams]);

  // ✅ FILTER LOGIC (UPDATED FIELD NAMES)
  const filteredApps = useMemo(() => {
    return appsList.filter(app => {

      if (app.status !== 'APPROVED') return false;

      const query = searchVal.toLowerCase().trim();

      const matchesSearch =
        query === '' ||
        app.appName.toLowerCase().includes(query) ||
        app.appDescription?.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === 'All' ||
        app.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [appsList, searchVal, selectedCategory]);

  const displayedApps = useMemo(() => {
    return filteredApps.slice(0, visibleCount);
  }, [filteredApps, visibleCount]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 12);
      setIsLoadingMore(false);
    }, 1200);
  };

  return (
    <div className="w-full flex flex-col gap-6 p-4 md:p-8 select-none max-w-7xl mx-auto">

      {/* Title */}
      <div className="flex flex-col gap-1 text-left">
        <h2 className="font-extrabold text-2xl md:text-3xl">
          Application Marketplace
        </h2>
        <p className="text-xs text-slate-400">
          Catalog of {appsList.length} apps
        </p>
      </div>

      {/* Filters */}
      <div className="glass-panel p-5 rounded-2xl flex flex-col gap-4">

        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">

          <div className="w-full sm:w-80">
            <SearchBar
              value={searchVal}
              onChange={setSearchVal}
              placeholder="Search apps..."
            />
          </div>

          <div className="flex gap-2">
            <button onClick={() => setViewMode('grid')}><FiGrid /></button>
            <button onClick={() => setViewMode('list')}><FiList /></button>
          </div>

        </div>

        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={(cat) => {
            setSelectedCategory(cat);
            setVisibleCount(12);
          }}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
        />
      </div>

      {/* Apps Grid */}
      <AnimatePresence mode="popLayout">
        {displayedApps.length === 0 ? (
          <div className="text-center">No apps found</div>
        ) : (
          <motion.div
            layout
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'flex flex-col gap-4'
            }
          >
            {displayedApps.map(app => (
              <AppCard key={app.id} app={app} />
            ))}

            {isLoadingMore && (
              <>
                <CardSkeleton />
                <CardSkeleton />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Load More */}
      {filteredApps.length > visibleCount && !isLoadingMore && (
        <div className="flex justify-center mt-6">
          <button onClick={handleLoadMore} className="btn-secondary">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;