
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { publicAPI } from '../services/api';
import { AppCard } from '../components/store/AppCard';
import { Carousel } from '../components/common/Carousel';
import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiCpu,
  FiShield,
  FiTrendingUp,
  FiHelpCircle
} from 'react-icons/fi';

/* ✅ CATEGORY LIST – UNCHANGED */
const categoriesList = [
  { name: "AI Tools", icon: "🤖", color: "from-indigo-500/10 to-blue-500/10 hover:from-indigo-500/20 hover:to-blue-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-500/20" },
  { name: "Productivity", icon: "📅", color: "from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 text-orange-600 dark:text-orange-400 border-orange-500/20" },
  { name: "Entertainment", icon: "🎬", color: "from-rose-500/10 to-pink-500/10 hover:from-rose-500/20 hover:to-pink-500/20 text-rose-600 dark:text-rose-400 border-rose-500/20" },
  { name: "Games", icon: "🎮", color: "from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
  { name: "Finance", icon: "💳", color: "from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-500/20" },
  { name: "Creative", icon: "🎨", color: "from-purple-500/10 to-fuchsia-500/10 hover:from-purple-500/20 hover:to-fuchsia-500/20 text-purple-600 dark:text-purple-400 border-purple-500/20" },
  { name: "Utilities", icon: "🔧", color: "from-slate-500/10 to-zinc-500/10 hover:from-slate-500/20 hover:to-zinc-500/20 text-slate-600 dark:text-slate-400 border-slate-500/20" },
  { name: "Health", icon: "❤️", color: "from-red-500/10 to-rose-500/10 hover:from-red-500/20 hover:to-rose-500/20 text-red-600 dark:text-red-400 border-red-500/20" }
];

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "UI Designer",
    comment:
      "The AI Tools on AppVerse completely changed my design flow. Highly recommend Figma Copilot!",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"
  },
  {
    name: "Liam Chen",
    role: "Lead Developer",
    comment:
      "Being able to upload apps and monitor downloads through the Dev Portal is extremely seamless.",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150"
  },
  {
    name: "Alex Rivera",
    role: "Tech Consultant",
    comment:
      "The analytics are stunning. Clean glassmorphic design and extremely fast UI. Impressive project.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
  }
];

export const LandingPage = () => {

  /* ✅ KEEP CONTEXT – REQUIRED FOR HERO SECTION */
  const { isAuthenticated, currentUser } = useApp();

  /* ✅ ONLY NEW STATE – FOR 3 CAROUSELS */
  const [trendingApps, setTrendingApps] = useState([]);
  const [aiApps, setAiApps] = useState([]);
  const [editorsChoice, setEditorsChoice] = useState([]);

  useEffect(() => {
    loadLandingApps();
  }, []);

  /* ✅ ONLY BACKEND INTEGRATION LOGIC */
  const loadLandingApps = async () => {
    try {
      const [trendingRes, aiRes, editorsRes] = await Promise.all([
        publicAPI.get('/apps/trending'),
        publicAPI.get('/apps/top-ai'),
        publicAPI.get('/apps/editors-choice')
      ]);

      setTrendingApps(trendingRes.data || []);
      setAiApps(aiRes.data || []);
      setEditorsChoice(editorsRes.data || []);

    } catch (err) {
      console.error('Failed to load landing apps', err);
    }
  };

  return (
    <div className="w-full flex flex-col min-h-screen select-none relative overflow-hidden bg-gradient-mesh bg-grid-pattern">

      {/* ✅ HERO SECTION – UNCHANGED */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 text-left"
        >
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20 w-fit uppercase tracking-wider">
            Now Live: AppVerse.Ai
          </span>

          <h1 className="font-extrabold text-4xl md:text-6xl text-slate-800 dark:text-white">
            Discover The <span className="text-gradient-primary">Future</span> Of Applications
          </h1>

          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-lg">
            AppVerse AI is the ultimate marketplace tailored for Artificial Intelligence tools,
            productivity accelerators, and high-performance developer software.
          </p>

          <div className="flex gap-4">
            <Link
              to={
                isAuthenticated && currentUser
                  ? currentUser.role === 'Admin'
                    ? '/admin'
                    : currentUser.role === 'Developer'
                    ? '/developer'
                    : '/store'
                  : '/auth'
              }
              className="btn-primary py-3 px-8 text-sm"
            >
              Explore Store <FiArrowRight />
            </Link>
          </div>
        </motion.div>
        <motion.div
  initial={{ opacity: 0, x: 30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
  className="hidden lg:flex justify-center items-center"
>
  <img
    src="/images/image.png"
    alt="hero"
    className="w-full max-w-xs object-contain drop-shadow-xl"

  />
</motion.div>
      </section>

      {/* ✅ FEATURED SHOWCASE – ONLY DATA SOURCE CHANGED */}
      <section className="px-6 md:px-12 py-12 max-w-7xl mx-auto w-full flex flex-col gap-10">

        <Carousel
          title="Trending Applications"
          subtitle="Highly requested items inside our global marketplace this week."
        >
          {trendingApps.map(app => (
            <AppCard key={app.id} app={app} />
          ))}
        </Carousel>

        <Carousel
          title="Top AI Models & Utilities"
          subtitle="Explore advanced language modeling, visual generation and speech translation tools."
        >
          {aiApps.map(app => (
            <AppCard key={app.id} app={app} />
          ))}
        </Carousel>

        <Carousel
          title="Editor's Choice Recommendations"
          subtitle="Hand-picked for design beauty, efficiency and clean performance."
        >
          {editorsChoice.map(app => (
            <AppCard key={app.id} app={app} />
          ))}
        </Carousel>

      </section>

      {/* ✅ EVERYTHING BELOW (FEATURES / TESTIMONIALS / FAQ) REMAINS UNCHANGED */}

      
      {/* Features Section */}
      <section className="px-6 md:px-12 py-16 max-w-7xl mx-auto w-full text-center">
        <h2 className="font-extrabold text-2xl md:text-3xl text-slate-800 dark:text-white mb-2">
          Designed For Modern Performance
        </h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 max-w-md mx-auto mb-12">
          Enjoy complete security, sandboxed installations, real-time downloads, and modular integrations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel card-glow-indigo p-6 rounded-2xl flex flex-col items-center gap-3 border border-slate-200/40 dark:border-slate-800/40">
            <FiCpu className="w-8 h-8 text-primary" />
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">AI Centric Marketplace</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Curated directories optimized for state-of-the-art NLP models, stable diffusion filters, and automation tools.
            </p>
          </div>
          <div className="glass-panel card-glow-violet p-6 rounded-2xl flex flex-col items-center gap-3 border border-slate-200/40 dark:border-slate-800/40">
            <FiShield className="w-8 h-8 text-secondary" />
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">Sandboxed Sandboxes</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Every app package goes through automatic integrity checks before appearing in the store queue.
            </p>
          </div>
          <div className="glass-panel card-glow-cyan p-6 rounded-2xl flex flex-col items-center gap-3 border border-slate-200/40 dark:border-slate-800/40">
            <FiTrendingUp className="w-8 h-8 text-accent" />
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">High Growth Analytics</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Track customer traffic, click-through-rates, monthly subscriptions, and user retention curves instantly.
            </p>
          </div>
        </div>

      </section>

      {/* Testimonials */}
      <section className="px-6 md:px-12 py-16 bg-slate-100/50 dark:bg-dark-card/25 border-y border-slate-200/40 dark:border-slate-800/30">
        <div className="max-w-7xl mx-auto flex flex-col gap-10 items-center">
          <h3 className="font-extrabold text-2xl text-slate-800 dark:text-white text-center">Loved By Teams Globally</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {testimonials.map((t, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl text-left border border-slate-200/40 dark:border-slate-800/40 flex flex-col justify-between">
                <p className="text-xs text-slate-500 dark:text-slate-400 italic leading-relaxed">"{t.comment}"</p>
                <div className="flex items-center gap-3 mt-5">
                  <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <h5 className="font-bold text-xs text-slate-800 dark:text-slate-200">{t.name}</h5>
                    <p className="text-[10px] text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 md:px-12 py-16 max-w-3xl mx-auto w-full flex flex-col gap-6">
        <div className="flex items-center gap-2 justify-center mb-6">
          <FiHelpCircle className="w-5 h-5 text-primary" />
          <h2 className="font-extrabold text-2xl text-slate-800 dark:text-white">Frequently Asked Questions</h2>
        </div>
        <div className="flex flex-col gap-4">
          <div className="glass-panel p-4 rounded-xl border border-slate-200/40 dark:border-slate-800/40 text-left">
            <h4 className="font-bold text-xs text-slate-800 dark:text-slate-150">How do I download/install an app?</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Navigate to the app details page or hover over the app card and click "Get". AppVerse simulates a local background download and adds the app to your Download History.
            </p>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-slate-200/40 dark:border-slate-800/40 text-left">
            <h4 className="font-bold text-xs text-slate-800 dark:text-slate-150">Does this require server integration?</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              No. This frontend client runs 100% locally using reactive state models, mock data files and LocalStorage persistence.
            </p>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-slate-200/40 dark:border-slate-800/40 text-left">
            <h4 className="font-bold text-xs text-slate-800 dark:text-slate-150">How do I access developer analytics?</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Click on your avatar dropdown at the top-right and select "Developer Portal" or "Admin Console" to explore enterprise charts.
            </p>
          </div>
        </div>
      </section>
      

    </div>
  );
};

export default LandingPage;
