
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { privateAPI } from '../../services/api';
import { FiPlusCircle } from 'react-icons/fi';

export const DevCreateApp = () => {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('AI');
  const [price, setPrice] = useState('0');
  const [version, setVersion] = useState('1.0.0');
  const [requirements, setRequirements] = useState('Windows 10/11 or macOS 12+');
  const [releaseNotes, setReleaseNotes] = useState('Initial app submission.');
  const [logoUrl, setLogoUrl] = useState('');

  // =========================
  // ✅ API CALL INSTEAD OF CONTEXT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !description.trim()) return;

    try {
      await privateAPI.post("/apps/create-app", {
        appName: name.trim(),
        appDescription: description.trim(),
        appVersion: version,
        appLogoUrl: logoUrl.trim() ||
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100",
        appFileUrl: "https://example.com/app.apk", // ✅ static for now
        category: category
      });

      alert("App submitted successfully ✅");

      navigate('/developer/apps');

    } catch (err) {
      console.error(err);
      alert("Error creating app ❌");
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 p-4 md:p-8 max-w-2xl mx-auto">

      {/* Title */}
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <FiPlusCircle /> Submit App Package
      </h2>

      <div className="p-6 border rounded-xl">

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Name + Category */}
          <div className="grid grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="App Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2"
              required
            />

            {/* ✅ CATEGORY LIST FIXED */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-2"
            >
              {[
                "EDUCATION",
                "PRODUCTIVITY",
                "BUSINESS",
                "ENTERTAINMENT",
                "HEALTH",
                "GAMING",
                "SOCIAL",
                "FINANCE",
                "AI",
                "EDITORS_CHOICE"
              ].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

          </div>

          {/* Tagline */}
          <input
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="Tagline"
            className="border p-2"
          />

          {/* Description */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="border p-2"
            required
          />

          {/* Version + Price + Logo */}
          <div className="grid grid-cols-3 gap-4">

            <input
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              placeholder="Version"
              className="border p-2"
            />

            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border p-2"
            />

            <input
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="Logo URL"
              className="border p-2"
            />

          </div>

          {/* Submit */}
          <button className="bg-blue-500 text-white py-2 rounded">
            Submit App
          </button>

        </form>
      </div>

    </div>
  );
};

export default DevCreateApp;