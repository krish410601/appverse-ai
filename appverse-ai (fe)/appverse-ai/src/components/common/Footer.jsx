import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiGlobe, FiDatabase } from 'react-icons/fi';

export const Footer = () => {
  return (
    <footer className="w-full bg-slate-100 dark:bg-dark-bg/60 border-t border-slate-200/50 dark:border-slate-800/50 py-10 px-4 md:px-8 mt-auto select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 22h20L12 2zm0 3.99L19.53 19H4.47L12 5.99zm-1 5v3h2v-3h-2zm0 4h2v2h-2v-2z" />
              </svg>
            </div>
            <span className="font-bold text-lg text-slate-850 dark:text-white">AppVerse<span className="text-primary">.AI</span></span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
            Discover the future of applications. Explore, download, and review top-tier artificial intelligence products and services under one seamless dashboard.
          </p>
          <div className="flex items-center gap-3 mt-1">
            <a href="#" className="p-2 rounded-lg bg-slate-200/50 hover:bg-slate-200 dark:bg-dark-card dark:hover:bg-dark-hover text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
              <FiTwitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-slate-200/50 hover:bg-slate-200 dark:bg-dark-card dark:hover:bg-dark-hover text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
              <FiGithub className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-slate-200/50 hover:bg-slate-200 dark:bg-dark-card dark:hover:bg-dark-hover text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
              <FiGlobe className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Explore Links */}
        <div>
          <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4">Marketplace</h4>
          <ul className="flex flex-col gap-2.5 text-xs text-slate-500 dark:text-slate-400">
            <li><Link to="/store" className="hover:text-primary transition-colors">Trending Apps</Link></li>
            <li><Link to="/store?category=AI%20Tools" className="hover:text-primary transition-colors">AI Models & Tools</Link></li>
            <li><Link to="/recommendations" className="hover:text-primary transition-colors">Personalized Picks</Link></li>
            <li><Link to="/store?category=Games" className="hover:text-primary transition-colors">Gaming Section</Link></li>
          </ul>
        </div>

        {/* Dashboards */}
        <div>
          <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4">Dashboards</h4>
          <ul className="flex flex-col gap-2.5 text-xs text-slate-500 dark:text-slate-400">
            <li><Link to="/developer" className="hover:text-primary transition-colors">Developer Dashboard</Link></li>
            <li><Link to="/admin" className="hover:text-primary transition-colors">Admin Portal</Link></li>
            <li><Link to="/analytics" className="hover:text-primary transition-colors">Marketplace Analytics</Link></li>
            <li><Link to="/profile" className="hover:text-primary transition-colors">User Profiles</Link></li>
          </ul>
        </div>

        {/* Legals */}
        <div>
          <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4">Resources</h4>
          <ul className="flex flex-col gap-2.5 text-xs text-slate-500 dark:text-slate-400">
            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Developer Agreement</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">API Docs (Mock)</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-200/50 dark:border-slate-800/40 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <span>© 2026 AppVerse AI Inc. Built for design excellence.</span>
        <div className="flex items-center gap-2">
          <FiDatabase className="w-3.5 h-3.5" />
          <span>Local Mock Database Active</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
