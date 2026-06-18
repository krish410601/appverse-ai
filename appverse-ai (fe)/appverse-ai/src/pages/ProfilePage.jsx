import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import { FiUser, FiInfo, FiAward, FiSettings, FiCheckCircle } from 'react-icons/fi';

export const ProfilePage = () => {
  const { currentUser, updateProfile } = useApp();

  const [username, setUsername] = useState(currentUser?.username || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [avatar, setAvatar] = useState(currentUser?.avatar || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      username: username.trim(),
      bio: bio.trim(),
      avatar: avatar.trim()
    });
  };

  const achievementsList = [
    { title: "First Flight", desc: "Installed your first application on AppVerse AI.", unlocked: true, icon: "🚀" },
    { title: "Critique Critic", desc: "Wrote at least one app store review.", unlocked: (currentUser?.reviewsWritten || 0) > 0, icon: "✍️" },
    { title: "Dev Innovator", desc: "Authorized developer license tier active.", unlocked: currentUser?.badges?.includes("Developer License") || false, icon: "💻" },
    { title: "Collector", desc: "Bookmarked 3 or more apps in your Wishlist.", unlocked: (currentUser?.favorites?.length || 0) >= 3, icon: "📦" }
  ];

  return (
    <div className="w-full flex flex-col gap-6 p-4 md:p-8 select-none max-w-7xl mx-auto">
      
      {/* Title */}
      <div className="flex flex-col gap-1 text-left">
        <h2 className="font-extrabold text-2xl md:text-3xl text-slate-800 dark:text-slate-100 tracking-tight">
          User Settings & Profile
        </h2>
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Modify your avatar image, bio metrics, credentials and review achievement trophies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Card - Metadata */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200/50 dark:border-slate-800/40 text-center flex flex-col items-center gap-4">
          <Avatar src={currentUser.avatar} name={currentUser.username} size="xxl" className="border-4 border-primary/20 shadow-xl" />
          
          <div className="text-center">
            <h3 className="font-extrabold text-lg text-slate-800 dark:text-slate-100">{currentUser.username}</h3>
            <p className="text-xs text-slate-400 mt-1">{currentUser?.email}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2">
            {currentUser?.badges?.map((b, idx) => (
              <Badge key={idx} variant={idx % 2 === 0 ? 'primary' : 'accent'}>{b}</Badge>
            ))}
          </div>

          <div className="w-full grid grid-cols-3 gap-3 border-t border-slate-150/40 dark:border-slate-800/30 pt-5 mt-3 text-center">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-450">Installs</span>
              <span className="text-base font-bold text-slate-800 dark:text-slate-100 mt-0.5">{currentUser?.downloads?.length || 0}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-450">Wishlist</span>
              <span className="text-base font-bold text-slate-800 dark:text-slate-100 mt-0.5">{currentUser?.favorites?.length || 0}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-450">Reviews</span>
              <span className="text-base font-bold text-slate-800 dark:text-slate-100 mt-0.5">{currentUser?.reviewsWritten || 0}</span>
            </div>
          </div>

          {currentUser?.bio && (
            <p className="text-xs text-slate-500 dark:text-slate-400 italic leading-relaxed border-t border-slate-150/40 dark:border-slate-800/30 pt-4 mt-1 max-w-xs text-center w-full">
              "{currentUser.bio}"
            </p>
          )}
        </div>

        {/* Center Card - Modification Form */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200/50 dark:border-slate-800/40 text-left flex flex-col gap-4">
          <h4 className="font-bold text-sm text-slate-850 dark:text-slate-100 flex items-center gap-2 mb-2">
            <FiSettings className="text-primary w-4.5 h-4.5" /> Edit Profile Credentials
          </h4>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-400">Display Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full glass-input text-xs"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-400">Avatar Image Link</label>
              <input
                type="url"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="w-full glass-input text-xs"
                placeholder="https://example.com/image.png"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-400">Bio Narrative</label>
              <textarea
                rows="4"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full glass-input text-xs resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>

            <button type="submit" className="btn-primary text-xs py-2.5 mt-2 self-start px-6">
              Save Profile Changes
            </button>
          </form>
        </div>

        {/* Right Card - Achievements Trophies */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200/50 dark:border-slate-800/40 text-left flex flex-col gap-4">
          <h4 className="font-bold text-sm text-slate-850 dark:text-slate-100 flex items-center gap-2 mb-2">
            <FiAward className="text-secondary w-4.5 h-4.5" /> Achievement Trophies
          </h4>
          
          <div className="flex flex-col gap-4">
            {achievementsList.map((item, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border flex gap-3.5 items-center transition-all ${
                  item.unlocked
                    ? 'bg-emerald-500/5 border-emerald-500/15 text-slate-700 dark:text-slate-350'
                    : 'bg-slate-100/50 dark:bg-dark-bg/20 border-slate-200/20 dark:border-slate-800/30 opacity-60'
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-xs text-slate-800 dark:text-slate-200">{item.title}</p>
                    {item.unlocked && <FiCheckCircle className="w-4 h-4 text-emerald-500" />}
                  </div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProfilePage;
