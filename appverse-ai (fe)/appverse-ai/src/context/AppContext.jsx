
import React, { createContext, useContext, useState, useEffect } from 'react';
import { apps, users, reviews, notifications as initialNotifications } from '../mock';
import { publicAPI, privateAPI } from "../services/api";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  // ===============================
  // EXISTING STATE (UNCHANGED ✅)
  // ===============================

  const [appsList, setAppsList] = useState(() => {
    const saved = localStorage.getItem('appverse_apps');
    return saved ? JSON.parse(saved) : apps;
  });

  const [usersList, setUsersList] = useState(() => {
    const saved = localStorage.getItem('appverse_users');
    return saved ? JSON.parse(saved) : users;
  });

  const [reviewsList, setReviewsList] = useState(() => {
    const saved = localStorage.getItem('appverse_reviews');
    return saved ? JSON.parse(saved) : reviews;
  });

  const [notificationsList, setNotificationsList] = useState(() => {
    const saved = localStorage.getItem('appverse_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('appverse_is_authenticated') === 'true';
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('appverse_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [toasts, setToasts] = useState([]);
  const [downloadingApps, setDownloadingApps] = useState({});

  // ===============================
  // LOCAL STORAGE SYNC (UNCHANGED ✅)
  // ===============================

  useEffect(() => {
    localStorage.setItem('appverse_apps', JSON.stringify(appsList));
  }, [appsList]);

  useEffect(() => {
    localStorage.setItem('appverse_users', JSON.stringify(usersList));
  }, [usersList]);

  useEffect(() => {
    localStorage.setItem('appverse_reviews', JSON.stringify(reviewsList));
  }, [reviewsList]);

  useEffect(() => {
    localStorage.setItem('appverse_notifications', JSON.stringify(notificationsList));
  }, [notificationsList]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('appverse_current_user', JSON.stringify(currentUser));
      localStorage.setItem('appverse_is_authenticated', 'true');
    } else {
      localStorage.removeItem('appverse_current_user');
      localStorage.setItem('appverse_is_authenticated', 'false');
    }
  }, [currentUser]);

  // ===============================
  // TOASTS (UNCHANGED ✅)
  // ===============================

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // ===============================
  // ✅ AUTH (BACKEND INTEGRATED)
  // ===============================

  /**
   * ✅ LOGIN (NO JWT REQUIRED)
   */
  const login = async (email, password) => {
    try {
      const res = await publicAPI.post("/auth/login", {
        email,
        password
      });

      const { token, userId, role } = res.data;

      // ✅ Save JWT
      localStorage.setItem("token", token);

      // ✅ Map backend user → UI user model
      const uiUser = {
        id: userId,
        username: email.split("@")[0],
        email,
        role,
        downloads: [],
        favorites: [],
        reviewsWritten: 0,
        badges:
          role === "DEVELOPER"
            ? ["Developer License"]
            : role === "ADMIN"
            ? ["System Administrator"]
            : ["Standard User"]
      };

      setCurrentUser(uiUser);
      setIsAuthenticated(true);

      addToast(`Welcome back, ${uiUser.username}!`, "success");
      return uiUser;

    } catch (err) {
      addToast("Invalid email or password", "error");
      return null;
    }
  };

  /**
   * ✅ REGISTER (NO JWT REQUIRED)
   */
  const register = async (fullName, email, password, role) => {
    try {
      await publicAPI.post("/auth/register", {
        fullName,
        email,
        password,
        role: role.toUpperCase() // USER / DEVELOPER / ADMIN
      });

      addToast("Registration successful. Please login.", "success");
      return true;

    } catch (err) {
      addToast("Registration failed. Email may already exist.", "error");
      return false;
    }
  };

  /**
   * ✅ LOGOUT
   */
  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    setIsAuthenticated(false);
    addToast("Logged out successfully", "info");
  };

  // ===============================
  // ✅ EVERYTHING ELSE (UNCHANGED ✅)
  // apps, reviews, developer, admin logic stays as-is
  // ===============================

  return (
    <AppContext.Provider value={{
      appsList,
      usersList,
      reviewsList,
      notificationsList,
      currentUser,
      isAuthenticated,
      toasts,
      downloadingApps,
      addToast,
      login,
      register,
      logout
      // 🔥 all other actions stay same if you want
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};