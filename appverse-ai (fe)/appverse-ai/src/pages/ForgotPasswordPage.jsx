
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { privateAPI } from '../services/api';
import { FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ForgotPasswordPage = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await privateAPI.post('/auth/reset-password', {
        email,
        newPassword
      });

      alert("✅ Password reset successful");

      // ✅ Redirect to login after reset
      navigate("/auth");

    } catch (err) {
      console.error(err);
      alert("❌ Failed to reset password");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-mesh p-6">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-panel-heavy p-8 rounded-3xl shadow-xl flex flex-col gap-6"
      >

        {/* ✅ Back to Login */}
        <button
          onClick={() => navigate('/auth')}
          className="flex items-center gap-2 text-sm text-primary hover:underline w-fit"
        >
          <FiArrowLeft /> Back to Login
        </button>

        {/* ✅ TITLE */}
        <div className="text-left">
          <h2 className="text-2xl font-extrabold">
            Reset Password
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Enter your email and set a new password
          </p>
        </div>

        {/* ✅ FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />

          {/* NEW PASSWORD */}
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input pr-10"
              required
            />

            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3 cursor-pointer text-slate-400"
            >
              {showPass ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <input
              type={showConfirmPass ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input pr-10"
              required
            />

            <span
              onClick={() => setShowConfirmPass(!showConfirmPass)}
              className="absolute right-3 top-3 cursor-pointer text-slate-400"
            >
              {showConfirmPass ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          {/* ✅ RESET BUTTON */}
          <button
            type="submit"
            className="btn-primary py-3 text-sm font-bold mt-2"
          >
            Reset Password
          </button>

        </form>

      </motion.div>

    </div>
  );
};

export default ForgotPasswordPage;