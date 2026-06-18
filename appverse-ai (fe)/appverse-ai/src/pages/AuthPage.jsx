

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff
} from 'react-icons/fi';
import { motion } from 'framer-motion';

export const AuthPage = () => {
  const { login, register } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('login');

  // ✅ LOGIN
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // ✅ REGISTER
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regRole, setRegRole] = useState('USER');

  // ✅ LOGIN
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const user = await login(loginEmail, loginPassword);

    if (user) {
      redirectUser(user.role);
    }
  };

  // ✅ REGISTER (with confirm password validation only)
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (regPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const success = await register(
      regName,
      regEmail,
      regPassword,
      regRole
    );

    if (success) {
      setActiveTab('login');
    }
  };

  // ✅ REDIRECT
  const redirectUser = (role) => {
    const r = role?.toUpperCase();

    if (r === "ADMIN" || r === "ROLE_ADMIN") {
      navigate("/admin");
    } else if (r === "DEVELOPER" || r === "ROLE_DEVELOPER") {
      navigate("/developer");
    } else {
      navigate("/store");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-mesh p-6">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 shadow-xl rounded-3xl p-8 flex flex-col gap-6"
      >

        {/* HEADER */}
        <div className="text-center">
          <h2 className="font-extrabold text-2xl">AppVerse Gate</h2>
          <p className="text-xs text-gray-400">
            Secure login & account access
          </p>
        </div>

        {/* TABS */}
        <div className="flex bg-gray-100 dark:bg-slate-800 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2 rounded-lg text-sm ${
              activeTab === 'login'
                ? 'bg-white dark:bg-slate-700 shadow'
                : ''
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-2 rounded-lg text-sm ${
              activeTab === 'register'
                ? 'bg-white dark:bg-slate-700 shadow'
                : ''
            }`}
          >
            Register
          </button>
        </div>

        {/* ================= LOGIN ================= */}
        {activeTab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">

            {/* EMAIL */}
            <div className="relative">
              <FiMail className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="input pl-10"
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <FiLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type={showLoginPassword ? "text" : "password"}
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="input pl-10 pr-10"
                required
              />

              {/* ✅ Eye toggle */}
              <span
                onClick={() => setShowLoginPassword(!showLoginPassword)}
                className="absolute right-3 top-3 cursor-pointer"
              >
                {showLoginPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            {/* ✅ Forgot password */}
            <div className="text-right">
              <button
                type="button"
                className="text-xs text-blue-500"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </button>
            </div>

            <button type="submit" className="btn-primary">
              Login
            </button>

          </form>
        ) : (

        /* ================= REGISTER ================= */

          <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">

            <input
              type="text"
              placeholder="Full Name"
              value={regName}
              onChange={(e) => setRegName(e.target.value)}
              className="input"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              className="input"
              required
            />

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showRegPassword ? "text" : "password"}
                placeholder="Password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                className="input pr-10"
                required
              />
              <span
                onClick={() => setShowRegPassword(!showRegPassword)}
                className="absolute right-3 top-3 cursor-pointer"
              >
                {showRegPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            {/* ✅ CONFIRM PASSWORD */}
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input"
              required
            />

            <select
              value={regRole}
              onChange={(e) => setRegRole(e.target.value)}
              className="input"
            >
              <option value="USER">User</option>
              <option value="DEVELOPER">Developer</option>
            </select>

            <button type="submit" className="btn-primary">
              Register
            </button>

          </form>
        )}

      </motion.div>

    </div>
  );
};

export default AuthPage;