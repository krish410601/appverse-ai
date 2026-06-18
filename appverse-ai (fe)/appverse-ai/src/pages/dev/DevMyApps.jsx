

import React, { useState, useEffect, useMemo } from 'react';
import { privateAPI } from '../../services/api';
import { FiEdit, FiX, FiCheck } from 'react-icons/fi';
import { Badge } from '../../components/common/Badge';
import { motion, AnimatePresence } from 'framer-motion';

export const DevMyApps = () => {

  const [appsList, setAppsList] = useState([]);

  const [editingApp, setEditingApp] = useState(null);
  const [editName, setEditName] = useState('');
  const [editTagline, setEditTagline] = useState('');
  const [editVersion, setEditVersion] = useState('');
  const [editLogoUrl, setEditLogoUrl] = useState('');
  const [editNotes, setEditNotes] = useState('');

  // =========================
  // LOAD APPS
  // =========================
  useEffect(() => {
    loadMyApps();
  }, []);

  const loadMyApps = async () => {
    try {
      const res = await privateAPI.get('/apps/developer/apps');

      const formatted = res.data.map(app => ({
        id: app.id,
        name: app.appName,
        tagline: app.appDescription,
        logo: app.appLogoUrl,
        version: app.appVersion,
        downloads: app.totalDownloads || 0,
        status: app.status,
        category: app.category,
      }));

      setAppsList(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  const myApps = useMemo(() => appsList, [appsList]);

  // =========================
  // OPEN EDIT MODAL
  // =========================
  const openEditModal = (app) => {
    setEditingApp(app);
    setEditName(app.name);
    setEditTagline(app.tagline || '');
    setEditVersion(app.version);
    setEditLogoUrl(app.logo || '');
    setEditNotes('');
  };

  // =========================
  // ✅ UPDATE APP + VERSION
  // =========================
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editingApp) return;

    try {
      // ✅ 1. Update main app record
      await privateAPI.put(
        `/apps/developer/updateapp/${editingApp.id}`,
        {
          appName: editName.trim(),
          appDescription: editTagline.trim(),
          appVersion: editVersion,
          appLogoUrl: editLogoUrl,
          appFileUrl: 'https://example.com/app.apk',
          category: editingApp.category
        }
      );

      // ✅ 2. Insert version history
      if (editVersion !== editingApp.version) {
        await privateAPI.post(
          `/appversion/developer/${editingApp.id}/add-versions`,
          {
            versionNumber: editVersion,
            releaseNotes: editNotes || 'Version update'
          }
        );
      }

      

      alert('App & version updated successfully ✅');
      setEditingApp(null);
      loadMyApps();

    } catch (err) {
      console.error(err);
      alert('Update failed ❌');
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 p-4 md:p-8">

      <h2 className="text-2xl font-bold">Manage Applications</h2>

      <div className="rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Logo</th>
              <th className="p-4">App</th>
              <th className="p-4">Version</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myApps.map(app => (
              <tr key={app.id} className="border-t">
                <td className="p-4">
                  <img
                    src={app.logo}
                    alt={app.name}
                    className="w-10 h-10 rounded"
                    onError={(e) =>
                      e.target.src = 'https://cdn-icons-png.flaticon.com/512/847/847969.png'
                    }
                  />
                </td>
                <td className="p-4">
                  <p className="font-semibold">{app.name}</p>
                  <p className="text-xs text-gray-500">{app.tagline}</p>
                </td>
                <td className="p-4">v{app.version}</td>
                <td className="p-4">
                  <Badge variant={app.status === 'APPROVED' ? 'success' : 'warning'}>
                    {app.status}
                  </Badge>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => openEditModal(app)}
                    className="p-2 bg-gray-100 rounded"
                  >
                    <FiEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ EDIT MODAL */}
      <AnimatePresence>
        {editingApp && (
          <>
            <div className="fixed inset-0 bg-black/40" onClick={() => setEditingApp(null)} />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed top-1 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl w-full max-w-sm"
            >
              <h3 className="font-semibold mb-4">
                Edit {editingApp.name}
              </h3>

              <form onSubmit={handleUpdateSubmit} className="flex flex-col gap-3">

                <input value={editName} onChange={e => setEditName(e.target.value)} className="border p-2 rounded" placeholder="App Name" />
                <input value={editTagline} onChange={e => setEditTagline(e.target.value)} className="border p-2 rounded" placeholder="Description" />
                <input value={editVersion} onChange={e => setEditVersion(e.target.value)} className="border p-2 rounded" placeholder="Version" />
                <input value={editLogoUrl} onChange={e => setEditLogoUrl(e.target.value)} className="border p-2 rounded" placeholder="Logo URL" />
                <textarea value={editNotes} onChange={e => setEditNotes(e.target.value)} className="border p-2 rounded" placeholder="Release Notes" />

                <button className="bg-blue-500 text-white py-2 rounded flex items-center gap-2 justify-center">
                  <FiCheck /> Save Changes
                </button>

              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};

export default DevMyApps;