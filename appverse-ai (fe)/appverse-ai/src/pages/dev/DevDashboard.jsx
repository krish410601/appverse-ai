

import React, { useEffect, useState } from 'react';
import { privateAPI } from '../../services/api';
import { Link } from 'react-router-dom';
import { FiPlusCircle, FiX } from 'react-icons/fi';
import { Badge } from '../../components/common/Badge';

export const DevDashboard = () => {

  const [apps, setApps] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    loadApps();
  }, []);

  // ✅ LOAD APPS
  const loadApps = async () => {
    try {
      const res = await privateAPI.get('/apps/developer/apps');
      setApps(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ LOAD VERSIONS WHEN APP CLICKED
  const handleAppClick = async (app) => {
    setSelectedApp(app);

    try {
      const res = await privateAPI.get(
        `/appversion/developer/${app.id}/versions`
      );

      setVersions(res.data);

    } catch (err) {
      console.error("Version fetch failed", err);
      setVersions([]);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 p-4 md:p-8">

      {/* ✅ TITLE */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Developer Console</h2>
          <p className="text-sm text-gray-500">
            Manage apps & versions
          </p>
        </div>

        <Link to="/developer/create" className="btn-primary text-sm">
          <FiPlusCircle className="inline mr-1" />
          Publish App
        </Link>
      </div>

      {/* ✅ APP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        {apps.map(app => (
          <div
            key={app.id}
            onClick={() => handleAppClick(app)}
            className="p-4 border rounded-xl shadow-sm hover:shadow-md cursor-pointer transition"
          >

            <div className="flex items-center gap-3">

              <img
                src={app.appLogoUrl}
                alt={app.appName}
                className="w-12 h-12 rounded-lg"
              />

              <div>
                <p className="font-semibold">{app.appName}</p>
                <p className="text-xs text-gray-500">
                  v{app.appVersion}
                </p>
              </div>

            </div>

            <div className="flex justify-between items-center mt-3">

              <Badge
                variant={
                  app.status === "APPROVED"
                    ? "success"
                    : app.status === "REJECTED"
                      ? "error"
                      : "warning"
                }
              >
                {app.status}
              </Badge>

              <span className="text-xs text-gray-400">
                Click to view versions →
              </span>

            </div>

          </div>
        ))}

      </div>

      {/* ✅ VERSION MODAL */}
      {selectedApp && (
        <>
          {/* BACKDROP */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setSelectedApp(null)}
          />

          {/* MODAL */}
          <div className="fixed top-1/2 left-1/2 z-50 w-full max-w-lg 
                          -translate-x-1/2 -translate-y-1/2 
                          bg-white p-6 rounded-xl shadow-lg 
                          max-h-[85vh] overflow-y-auto">

            {/* HEADER */}
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold text-lg">
                {selectedApp.appName} Versions
              </h3>

              <button onClick={() => setSelectedApp(null)}>
                <FiX />
              </button>
            </div>

            {/* VERSION LIST */}
            <div className="flex flex-col gap-3">

              {versions.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No versions available
                </p>
              ) : (
                versions.map(v => (
                  <div
                    key={v.id}
                    className="p-3 border rounded-lg"
                  >
                    <p className="font-semibold">
                      Version {v.versionNumber}
                    </p>

                    <p className="text-xs text-gray-500">
                      {new Date(v.createdAt).toLocaleString()}
                    </p>

                    <p className="text-sm mt-1">
                      {v.releaseNotes}
                    </p>
                  </div>
                ))
              )}

            </div>

          </div>
        </>
      )}

    </div>
  );
};

export default DevDashboard;