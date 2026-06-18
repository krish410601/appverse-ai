import React from 'react';
import { Routes, Route, Link, NavLink, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import Footer from './components/common/Footer';
import DevSidebar from './components/developer/DevSidebar';
import { useApp } from './context/AppContext';

// Page Imports
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AppDetailsPage from './pages/AppDetailsPage';
import RecommendationsPage from './pages/RecommendationsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ProfilePage from './pages/ProfilePage';
import FavoritesPage from './pages/FavoritesPage';
import DownloadHistoryPage from './pages/DownloadHistoryPage';
import NotificationsPage from './pages/NotificationsPage';
import NotFoundPage from './pages/404Page';
import AuthPage from './pages/AuthPage';


// Developer Page Imports
import DevDashboard from './pages/dev/DevDashboard';
import DevMyApps from './pages/dev/DevMyApps';
import DevCreateApp from './pages/dev/DevCreateApp';
import DevAnalytics from './pages/dev/DevAnalytics';
import DevRevenue from './pages/dev/DevRevenue';
import DevReviews from './pages/dev/DevReviews';

// Admin Page Imports
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminApps from './pages/admin/AdminApps';
import AdminReviews from './pages/admin/AdminReviews';
import AdminPendingApps from './pages/admin/AdminPendingApps'; 

// Layout 1: Store layout (Default storefront header & side catalog panel)
const StoreLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
      <Navbar />
      <div className="flex-1 flex items-start">
        <Sidebar />
        <main className="flex-1 min-h-[calc(100vh-73px)] w-full overflow-y-auto">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

// Layout 2: Developer portal layout
const DeveloperLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
      <Navbar />
      <div className="flex-1 flex items-start">
        <DevSidebar />
        <main className="flex-1 min-h-[calc(100vh-73px)] w-full overflow-y-auto">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

// Layout 3: Admin Console Layout with its own inline sidebar
const AdminLayout = ({ children }) => {
  const adminNav = [
    { name: 'Admin Overview', path: '/admin', end: true },
    { name: 'Accounts Registry', path: '/admin/users' },
    { name: 'App Moderation', path: '/admin/apps' },
      { name: 'Pending Apps', path: '/admin/pending' },
    { name: 'Flagged Comments', path: '/admin/reviews' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
      <Navbar />
      <div className="flex-1 flex items-start">
        {/* Admin Side navigation bar */}
        <aside className="w-64 h-[calc(100vh-73px)] sticky top-[73px] hidden lg:flex flex-col border-r border-slate-200/50 dark:border-slate-800/50 bg-slate-50/20 dark:bg-dark-bg/10 backdrop-blur-sm p-4 overflow-y-auto shrink-0 select-none">
          <div className="mb-6">
            <Link to="/" className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-500 hover:text-primary transition-colors">
              ← Back to Storefront
            </Link>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 mb-2 block">
              Admin Console
            </span>
            {adminNav.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary/10 to-accent/15 text-primary border-l-4 border-primary dark:from-primary/20 dark:text-primary-light'
                      : 'text-slate-650 dark:text-slate-400 hover:bg-slate-100/60 dark:hover:bg-dark-hover/40 hover:text-slate-850 dark:hover:text-slate-200'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </aside>
        
        {/* Admin main content panel */}
        <main className="flex-1 min-h-[calc(100vh-73px)] w-full overflow-y-auto">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

// Auth Route guard to restrict dashboard access to logged out users
const AuthRoute = ({ children }) => {
  const { isAuthenticated, currentUser } = useApp();

  if (isAuthenticated && currentUser) {
    if (currentUser.role === 'Admin') return <Navigate to="/admin" replace />;
    if (currentUser.role === 'Developer') return <Navigate to="/developer" replace />;
    return <Navigate to="/store" replace />;
  }

  return children;
};

// Protected Route guard to check user roles
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, currentUser } = useApp();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  const role = currentUser?.role?.toUpperCase();  // ✅ normalize backend role
  const allowed = allowedRoles?.map(r => r.toUpperCase()); // ✅ normalize allowed roles

  if (allowed && !allowed.includes(role)) {
    if (role === 'ADMIN') return <Navigate to="/admin" replace />;
    if (role === 'DEVELOPER') return <Navigate to="/developer" replace />;
    return <Navigate to="/store" replace />;
  }

  return children;
};

export const AppRouter = () => {
  return (
    <Routes>
      {/* Public Landing Route */}
      <Route path="/" element={<StoreLayout><LandingPage /></StoreLayout>} />
      
      {/* Auth Gate Route */}
      <Route path="/auth" element={<AuthRoute><AuthPage /></AuthRoute>} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />


      {/* Store Marketplace Routes */}
      <Route path="/store" element={<ProtectedRoute><StoreLayout><HomePage /></StoreLayout></ProtectedRoute>} />
      <Route path="/app/:id" element={<ProtectedRoute><StoreLayout><AppDetailsPage /></StoreLayout></ProtectedRoute>} />
      <Route path="/recommendations" element={<ProtectedRoute><StoreLayout><RecommendationsPage /></StoreLayout></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><StoreLayout><AnalyticsPage /></StoreLayout></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><StoreLayout><ProfilePage /></StoreLayout></ProtectedRoute>} />
      <Route path="/favorites" element={<ProtectedRoute><StoreLayout><FavoritesPage /></StoreLayout></ProtectedRoute>} />
      <Route path="/history" element={<ProtectedRoute><StoreLayout><DownloadHistoryPage /></StoreLayout></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><StoreLayout><NotificationsPage /></StoreLayout></ProtectedRoute>} />

      {/* Developer Portal Route group */}
      <Route path="/developer" element={<ProtectedRoute allowedRoles={['Developer', 'Admin']}><DeveloperLayout><DevDashboard /></DeveloperLayout></ProtectedRoute>} />
      <Route path="/developer/apps" element={<ProtectedRoute allowedRoles={['Developer', 'Admin']}><DeveloperLayout><DevMyApps /></DeveloperLayout></ProtectedRoute>} />
      <Route path="/developer/create" element={<ProtectedRoute allowedRoles={['Developer', 'Admin']}><DeveloperLayout><DevCreateApp /></DeveloperLayout></ProtectedRoute>} />
      <Route path="/developer/analytics" element={<ProtectedRoute allowedRoles={['Developer', 'Admin']}><DeveloperLayout><DevAnalytics /></DeveloperLayout></ProtectedRoute>} />
      <Route path="/developer/revenue" element={<ProtectedRoute allowedRoles={['Developer', 'Admin']}><DeveloperLayout><DevRevenue /></DeveloperLayout></ProtectedRoute>} />
      <Route path="/developer/reviews" element={<ProtectedRoute allowedRoles={['Developer', 'Admin']}><DeveloperLayout><DevReviews /></DeveloperLayout></ProtectedRoute>} />

      {/* Admin Panel Route group */}
      <Route path="/admin" element={<ProtectedRoute allowedRoles={['Admin']}><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['Admin']}><AdminLayout><AdminUsers /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/apps" element={<ProtectedRoute allowedRoles={['Admin']}><AdminLayout><AdminApps /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/reviews" element={<ProtectedRoute allowedRoles={['Admin']}><AdminLayout><AdminReviews /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/pending" element={
  <ProtectedRoute allowedRoles={['Admin']}>
    <AdminLayout>
      <AdminPendingApps /> 
    </AdminLayout>
  </ProtectedRoute>
} />


      {/* 404 Route */}
      <Route path="*" element={<StoreLayout><NotFoundPage /></StoreLayout>} />
    </Routes>
  );
};


export default AppRouter;
