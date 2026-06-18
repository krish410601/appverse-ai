// import React, { useState, useMemo } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { useApp } from '../context/AppContext';
// import { ReviewCard } from '../components/store/ReviewCard';
// import { AppCard } from '../components/store/AppCard';
// import { Avatar } from '../components/common/Avatar';
// import { FiStar, FiDownload, FiCheck, FiChevronRight, FiFolder, FiMessageSquare, FiTrendingUp } from 'react-icons/fi';
// import { motion } from 'framer-motion';

// export const AppDetailsPage = () => {
//   const { id } = useParams();
//   const { appsList, reviewsList, addReview, installApp, downloadingApps, currentUser } = useApp();

//   const [reviewRating, setReviewRating] = useState(5);
//   const [reviewTitle, setReviewTitle] = useState('');
//   const [reviewComment, setReviewComment] = useState('');
//   const [activeTab, setActiveTab] = useState('description'); // 'description' or 'reviews'

//   // Retrieve app details
//   const app = useMemo(() => {
//     return appsList.find(a => a.id === id);
//   }, [appsList, id]);

//   // Retrieve reviews for this app
//   const appReviews = useMemo(() => {
//     return reviewsList.filter(r => r.appId === id);
//   }, [reviewsList, id]);

//   // Related apps in same category
//   const relatedApps = useMemo(() => {
//     if (!app) return [];
//     return appsList
//       .filter(a => a.category === app.category && a.id !== app.id && a.isApproved)
//       .slice(0, 4);
//   }, [appsList, app]);

//   if (!app) {
//     return (
//       <div className="p-16 text-center select-none">
//         <h3 className="text-xl font-bold text-slate-800 dark:text-white">Application Not Found</h3>
//         <p className="text-xs text-slate-400 mt-2">The requested application does not exist or has been removed.</p>
//         <Link to="/store" className="btn-primary mt-6 inline-flex">Return to Marketplace</Link>
//       </div>
//     );
//   }

//   const isInstalled = currentUser.downloads.includes(app.id);
//   const downloadProgress = downloadingApps[app.id];

//   const handleReviewSubmit = (e) => {
//     e.preventDefault();
//     if (!reviewTitle.trim() || !reviewComment.trim()) return;

//     addReview(app.id, {
//       rating: reviewRating,
//       title: reviewTitle.trim(),
//       comment: reviewComment.trim()
//     });

//     // Clear form
//     setReviewTitle('');
//     setReviewComment('');
//     setReviewRating(5);
//   };

//   const getRatingSummary = () => {
//     if (appReviews.length === 0) return { avg: app.rating, count: 0 };
//     const sum = appReviews.reduce((acc, r) => acc + r.rating, 0);
//     return {
//       avg: parseFloat((sum / appReviews.length).toFixed(1)),
//       count: appReviews.length
//     };
//   };

//   const ratingMetrics = getRatingSummary();

//   return (
//     <div className="w-full flex flex-col p-4 md:p-8 select-none max-w-7xl mx-auto text-left">
      
//       {/* Breadcrumbs */}
//       <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-6">
//         <Link to="/store" className="hover:underline">Marketplace</Link>
//         <FiChevronRight />
//         <Link to={`/store?category=${encodeURIComponent(app.category)}`} className="hover:underline">{app.category}</Link>
//         <FiChevronRight />
//         <span className="text-slate-650 dark:text-slate-350 truncate">{app.name}</span>
//       </div>

//       {/* Hero Banner Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-8">
        
//         {/* Left Columns - Details */}
//         <div className="lg:col-span-2 flex flex-col gap-6">
//           {/* Header Row */}
//           <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
//             <img
//               src={app.logo}
//               alt={app.name}
//               className="w-24 h-24 rounded-3xl object-cover shadow-lg border border-slate-200/40 dark:border-slate-800/45 bg-slate-100 dark:bg-slate-850"
//             />
//             <div className="flex-1 text-left">
//               <h2 className="font-extrabold text-2xl md:text-3xl text-slate-800 dark:text-slate-100 tracking-tight">
//                 {app.name}
//               </h2>
//               <p className="text-xs text-primary font-bold uppercase tracking-wider mt-1">{app.category}</p>
//               <p className="text-xs text-slate-400 mt-2 font-medium">Developer: <span className="text-slate-600 dark:text-slate-300 font-semibold">{app.developer}</span></p>
              
//               <div className="flex flex-wrap items-center gap-4 mt-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
//                 <div className="flex items-center gap-1 text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-lg">
//                   <FiStar className="w-4 h-4 fill-current" />
//                   <span>{ratingMetrics.avg} ({ratingMetrics.count} reviews)</span>
//                 </div>
//                 <div>Size: <span className="text-slate-700 dark:text-slate-200">{app.size}</span></div>
//                 <div>Version: <span className="text-slate-700 dark:text-slate-200">{app.version}</span></div>
//               </div>
//             </div>
//           </div>

//           {/* Action Row */}
//           <div className="glass-panel p-4 rounded-2xl flex items-center justify-between border border-slate-200/50 dark:border-slate-800/45 gap-4">
//             <div className="flex flex-col text-left">
//               <span className="text-[10px] uppercase font-bold text-slate-400">Price Tier</span>
//               <span className="text-lg font-bold text-slate-800 dark:text-white mt-0.5">{app.price}</span>
//             </div>

//             {downloadProgress !== undefined ? (
//               <div className="flex flex-col gap-1 items-end w-48">
//                 <span className="text-[10px] font-bold text-primary animate-pulse">Installing {downloadProgress}%</span>
//                 <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
//                   <div className="h-full bg-primary" style={{ width: `${downloadProgress}%` }} />
//                 </div>
//               </div>
//             ) : isInstalled ? (
//               <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-bold">
//                 <FiCheck className="w-4.5 h-4.5" /> Installed
//               </div>
//             ) : (
//               <button
//                 onClick={() => installApp(app.id)}
//                 className="btn-primary px-8 py-3 text-sm"
//               >
//                 <FiDownload className="w-4.5 h-4.5" /> Download App
//               </button>
//             )}
//           </div>

//           {/* Screenshots Slider */}
//           <div className="flex flex-col gap-3">
//             <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">Product Interface Screenshots</h4>
//             <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
//               {app.screenshots.map((src, i) => (
//                 <img
//                   key={i}
//                   src={src}
//                   alt={`Screenshot ${i + 1}`}
//                   className="w-72 h-44 object-cover rounded-xl border border-slate-200/30 dark:border-slate-800/30 bg-slate-100 dark:bg-slate-800 shadow-sm flex-shrink-0"
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Tabs Navigation */}
//           <div className="flex border-b border-slate-200 dark:border-slate-800/60 mt-4">
//             <button
//               onClick={() => setActiveTab('description')}
//               className={`px-6 py-2.5 text-xs font-bold border-b-2 transition-all ${
//                 activeTab === 'description' ? 'border-primary text-primary' : 'border-transparent text-slate-450 hover:text-slate-750'
//               }`}
//             >
//               Overview Details
//             </button>
//             <button
//               onClick={() => setActiveTab('reviews')}
//               className={`px-6 py-2.5 text-xs font-bold border-b-2 transition-all ${
//                 activeTab === 'reviews' ? 'border-primary text-primary' : 'border-transparent text-slate-450 hover:text-slate-750'
//               }`}
//             >
//               Reviews ({ratingMetrics.count})
//             </button>
//           </div>

//           {/* Tabs Content */}
//           <div className="min-h-[160px] text-slate-600 dark:text-slate-350 text-xs leading-relaxed text-left">
//             {activeTab === 'description' ? (
//               <div className="flex flex-col gap-4">
//                 <p>{app.description}</p>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-850 pt-4 mt-2">
//                   <div className="flex flex-col gap-1">
//                     <span className="font-bold text-slate-800 dark:text-slate-200">System Requirements:</span>
//                     <span>{app.requirements || "Windows 10/11 or macOS 12+"}</span>
//                   </div>
//                   <div className="flex flex-col gap-1">
//                     <span className="font-bold text-slate-800 dark:text-slate-200">Release Notes (v{app.version}):</span>
//                     <span>{app.releaseNotes || "Performance enhancements and minor bug fixes."}</span>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               /* Reviews tab list */
//               <div className="flex flex-col gap-4">
//                 {appReviews.length === 0 ? (
//                   <div className="text-center py-6 text-slate-400">No reviews yet. Be the first to review!</div>
//                 ) : (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {appReviews.map((rev) => (
//                       <ReviewCard key={rev.id} review={rev} />
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Right Sidebar - Review Creation & Related */}
//         <div className="flex flex-col gap-6">
//           {/* Write a review form */}
//           <div className="glass-panel p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 text-left">
//             <h4 className="font-bold text-sm text-slate-800 dark:text-slate-150 mb-4 flex items-center gap-2">
//               <FiMessageSquare className="text-primary w-4.5 h-4.5" /> Submit a Review
//             </h4>
//             <form onSubmit={handleReviewSubmit} className="flex flex-col gap-3">
//               <div>
//                 <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Rating Star</label>
//                 <div className="flex items-center gap-1">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <button
//                       key={star}
//                       type="button"
//                       onClick={() => setReviewRating(star)}
//                       className={`text-lg transition-transform hover:scale-110 ${star <= reviewRating ? 'text-amber-500' : 'text-slate-200 dark:text-slate-800'}`}
//                     >
//                       ★
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Review Title</label>
//                 <input
//                   type="text"
//                   placeholder="Summarize your experience..."
//                   value={reviewTitle}
//                   onChange={(e) => setReviewTitle(e.target.value)}
//                   className="w-full glass-input text-xs"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Detailed Feedback</label>
//                 <textarea
//                   rows="3"
//                   placeholder="What did you like or dislike?"
//                   value={reviewComment}
//                   onChange={(e) => setReviewComment(e.target.value)}
//                   className="w-full glass-input text-xs resize-none"
//                   required
//                 />
//               </div>

//               <button type="submit" className="btn-primary w-full text-xs py-2 mt-2">
//                 Submit Review
//               </button>
//             </form>
//           </div>

//           {/* Related applications */}
//           {relatedApps.length > 0 && (
//             <div className="flex flex-col gap-4 text-left">
//               <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
//                 <FiTrendingUp className="text-secondary w-4.5 h-4.5" /> Related Products
//               </h4>
//               <div className="flex flex-col gap-4">
//                 {relatedApps.map(rel => (
//                   <Link
//                     key={rel.id}
//                     to={`/app/${rel.id}`}
//                     className="glass-panel p-3 rounded-xl flex gap-3 items-center hover:bg-slate-50 dark:hover:bg-dark-hover border border-slate-200/30 dark:border-slate-800/30 transition-all"
//                   >
//                     <img src={rel.logo} alt={rel.name} className="w-10 h-10 rounded-lg object-cover" />
//                     <div className="flex-1 min-w-0">
//                       <p className="font-bold text-xs text-slate-800 dark:text-slate-100 truncate">{rel.name}</p>
//                       <p className="text-[9px] text-slate-400 mt-0.5">{rel.price}</p>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//     </div>
//   );
// };

// export default AppDetailsPage;

// import React, { useState, useMemo, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { privateAPI } from '../services/api';
// import { useApp } from '../context/AppContext';
// import { ReviewCard } from '../components/store/ReviewCard';
// import { AppCard } from '../components/store/AppCard';
// import { FiStar, FiDownload, FiCheck, FiChevronRight, FiMessageSquare, FiTrendingUp } from 'react-icons/fi';

// export const AppDetailsPage = () => {

//   const { id } = useParams();
//   const { appsList, currentUser, addToast } = useApp();

//   // ✅ NEW STATES
//   const [reviewsList, setReviewsList] = useState([]);
//   const [installedApps, setInstalledApps] = useState([]);

//   const [reviewRating, setReviewRating] = useState(5);
//   const [reviewTitle, setReviewTitle] = useState('');
//   const [reviewComment, setReviewComment] = useState('');
//   const [activeTab, setActiveTab] = useState('description');

//   // =========================
//   // ✅ FIND APP
//   // =========================
//   // const app = useMemo(() => {
//   //   return appsList.find(a => String(a.id) === id);
//   // }, [appsList, id]);

//   const app = useMemo(() => {
//   return appsList.find(a => a.id === Number(id));
// }, [appsList, id]);

//   // =========================
//   // ✅ LOAD REVIEWS FROM BACKEND
//   // =========================
//   useEffect(() => {
//     loadReviews();
//   }, [id]);

//   const loadReviews = async () => {
//     try {
//       const res = await privateAPI.get(`/reviews/app/${id}`);
//       setReviewsList(res.data);
//     } catch (err) {
//       console.error("Error loading reviews", err);
//     }
//   };

//   // =========================
//   // ✅ FILTER REVIEWS (already app specific)
//   // =========================
//   const appReviews = useMemo(() => {
//     return reviewsList;
//   }, [reviewsList]);

//   // =========================
//   // ✅ DOWNLOAD APP
//   // =========================
//   const handleDownload = async () => {
//     try {
//       await privateAPI.post(`/downloads/${app.id}`);

//       addToast("App installed ✅", "success");

//       setInstalledApps(prev => [...prev, app.id]);

//     } catch (err) {
//       console.error(err);
//       addToast("Download failed", "error");
//     }
//   };

//   // =========================
//   // ✅ SUBMIT REVIEW (BACKEND)
//   // =========================
//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await privateAPI.post("/reviews", {
//         rating: reviewRating,
//         reviewText: reviewComment,
//         appId: app.id
//       });

//       addToast("Review added ✅", "success");

//       setReviewTitle('');
//       setReviewComment('');
//       setReviewRating(5);

//       loadReviews(); // ✅ refresh

//     } catch (err) {
//       console.error(err);
//       addToast("Error submitting review", "error");
//     }
//   };

//   // =========================
//   // ✅ RATING CALC
//   // =========================
//   const ratingMetrics = useMemo(() => {
//     if (appReviews.length === 0) {
//       return { avg: app?.rating || 0, count: 0 };
//     }

//     const sum = appReviews.reduce((acc, r) => acc + r.rating, 0);

//     return {
//       avg: parseFloat((sum / appReviews.length).toFixed(1)),
//       count: appReviews.length
//     };
//   }, [appReviews, app]);

//   if (!app) return <div>App not found</div>;

//   const isInstalled = installedApps.includes(app.id);

//   return (
//     <div className="p-6 flex flex-col gap-6">

//       {/* ✅ SUMMARY */}
//       <h2 className="text-2xl font-bold">{app.name}</h2>
//       <p>⭐ {ratingMetrics.avg} ({ratingMetrics.count} reviews)</p>

//       {/* ✅ DOWNLOAD */}
//       {isInstalled ? (
//         <div className="text-green-500 flex items-center gap-2">
//           <FiCheck /> Installed
//         </div>
//       ) : (
//         <button onClick={handleDownload} className="btn-primary">
//           <FiDownload /> Install
//         </button>
//       )}

//       {/* ✅ TABS */}
//       <div className="flex gap-4 mt-4">
//         <button onClick={() => setActiveTab('description')}>
//           Description
//         </button>
//         <button onClick={() => setActiveTab('reviews')}>
//           Reviews ({ratingMetrics.count})
//         </button>
//       </div>

//       {/* ✅ CONTENT */}
//       {activeTab === 'description' ? (

//         <p>{app.description}</p>

//       ) : (

//         <div className="flex flex-col gap-4">

//           {/* REVIEW LIST */}
//           {appReviews.map(r => (
//             <ReviewCard key={r.id} review={r} />
//           ))}

//         </div>

//       )}

//       {/* ✅ REVIEW FORM */}
//       {currentUser && (
//         <form onSubmit={handleReviewSubmit} className="flex flex-col gap-3 mt-6">

//           <h4>Write Review</h4>

//           <div>
//             {[1,2,3,4,5].map(star => (
//               <button
//                 key={star}
//                 type="button"
//                 onClick={() => setReviewRating(star)}
//               >
//                 ★
//               </button>
//             ))}
//           </div>

//           <textarea
//             value={reviewComment}
//             onChange={(e) => setReviewComment(e.target.value)}
//             placeholder="Write review..."
//           />

//           <button type="submit" className="btn-primary">
//             Submit Review
//           </button>

//         </form>
//       )}

//     </div>
//   );
// };

// export default AppDetailsPage;

import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { privateAPI } from '../services/api';
import { useApp } from '../context/AppContext';
import { FiDownload, FiCheck, FiStar } from 'react-icons/fi';

export const AppDetailsPage = () => {

  const { id } = useParams();
  const { appsList, currentUser, addToast } = useApp();

  // ✅ STATES
  const [app, setApp] = useState(null);
  const [reviewsList, setReviewsList] = useState([]);
  const [installedApps, setInstalledApps] = useState([]);
  const [loading, setLoading] = useState(true);

  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [activeTab, setActiveTab] = useState('description');

  // =========================
  // ✅ LOAD DATA
  // =========================
  useEffect(() => {
    loadApp();
    loadReviews();
  }, [id]);

  // ✅ AUTO SWITCH TO REVIEWS
  useEffect(() => {
    if (reviewsList.length > 0) {
      setActiveTab('reviews');
    }
  }, [reviewsList]);

  const loadApp = async () => {
    try {
      let found = appsList.find(a => a.id === Number(id));

      if (!found) {
        const res = await privateAPI.get("/apps");

        found = res.data.find(a => a.id === Number(id));

        if (found) {
          found = {
            id: found.id,
            name: found.appName,
            description: found.appDescription,
            category: found.category,
            rating: found.averageRating || 0,
            logo: found.appLogoUrl,
            price: "Free"
          };
        }
      }

      setApp(found || null);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async () => {
    try {
      const res = await privateAPI.get(`/reviews/app/${id}`);
      setReviewsList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ MEMO
  const appReviews = useMemo(() => reviewsList, [reviewsList]);

  const ratingMetrics = useMemo(() => {
    if (!app || appReviews.length === 0) {
      return { avg: 0, count: 0 };
    }

    const total = appReviews.reduce((sum, r) => sum + r.rating, 0);

    return {
      avg: (total / appReviews.length).toFixed(1),
      count: appReviews.length
    };
  }, [appReviews, app]);

  const isInstalled = app ? installedApps.includes(app.id) : false;

  // ✅ LOADING STATES
  if (loading) return <div>Loading app...</div>;
  if (!app) return <div>App not found</div>;

  // =========================
  // ✅ DOWNLOAD
  // =========================
  const handleDownload = async () => {
    try {
      await privateAPI.post(`/downloads/${app.id}`);
      addToast("App installed ✅", "success");
      setInstalledApps(prev => [...prev, app.id]);
    } catch (err) {
      console.error(err);
      addToast("Download failed", "error");
    }
  };

  // =========================
  // ✅ SUBMIT REVIEW
  // =========================
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!reviewComment.trim()) return;

    try {
      await privateAPI.post("/reviews", {
        rating: reviewRating,
        reviewText: reviewComment,
        appId: app.id
      });

      addToast("Review added ✅", "success");

      setReviewComment('');
      setReviewRating(5);

      loadReviews();

    } catch (err) {
      console.error(err);
      addToast("Error submitting review", "error");
    }
  };

  return (
    <div className="p-6 flex flex-col gap-6">

      {/* ✅ HEADER */}
      <h2 className="text-2xl font-bold">{app.name}</h2>

      <p className="flex items-center gap-2">
        <FiStar className="text-yellow-500" />
        {ratingMetrics.avg} ({ratingMetrics.count} reviews)
      </p>

      {/* ✅ DOWNLOAD */}
      {isInstalled ? (
        <div className="text-green-500 flex items-center gap-2">
          <FiCheck /> Installed
        </div>
      ) : (
        <button onClick={handleDownload} className="btn-primary flex gap-2 items-center w-fit">
          <FiDownload /> Install
        </button>
      )}

      {/* ✅ TABS (HIGHLIGHTED ✅) */}
      <div className="flex gap-6 mt-4 border-b pb-2">

        <button
          onClick={() => setActiveTab('description')}
          className={`pb-1 font-semibold ${
            activeTab === 'description'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500'
          }`}
        >
          Description
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`pb-1 font-semibold ${
            activeTab === 'reviews'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500'
          }`}
        >
          Reviews ({ratingMetrics.count})
        </button>

      </div>

      {/* ✅ CONTENT */}
      {activeTab === 'description' ? (

        <p>{app.description}</p>

      ) : (

        <div className="flex flex-col gap-4">

          {appReviews.length === 0 ? (
            <p>No reviews yet</p>
          ) : (
            appReviews.map(r => (
              <div key={r.id} className="border p-3 rounded">
                <p className="text-yellow-500 font-bold">⭐ {r.rating}</p>
                <p>{r.reviewText}</p>
              </div>
            ))
          )}

        </div>

      )}

      {/* ✅ REVIEW FORM */}
      {currentUser && (
        <form onSubmit={handleReviewSubmit} className="flex flex-col gap-3 mt-6">

          <h4 className="font-bold">Write Review</h4>

          <div className="flex gap-2 text-lg">
            {[1,2,3,4,5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => setReviewRating(star)}
                className={star <= reviewRating ? 'text-yellow-500' : 'text-gray-300'}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            placeholder="Write your review..."
            className="border p-2 rounded"
          />

          <button type="submit" className="btn-primary w-fit px-4 py-2">
            Submit Review
          </button>

        </form>
      )}

    </div>
  );
};

export default AppDetailsPage;
