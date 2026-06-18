import React, { useEffect, useState } from 'react';
import { privateAPI } from '../../services/api';
import { Badge } from '../../components/common/Badge';
import { FiCheck, FiX } from 'react-icons/fi';

export const AdminPendingApps = () => {

  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPendingApps();
  }, []);

  // ✅ LOAD PENDING APPS
  const loadPendingApps = async () => {
    try {
      const res = await privateAPI.get('/apps/admin/pending');
      setApps(res.data);
    } catch (err) {
      console.error("Error loading pending apps", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (appId) => {
  try {
    await privateAPI.put(`/apps/${appId}/reject`);

    // ✅ remove from UI instantly (same as approve)
    setApps(prev => prev.filter(app => app.id !== appId));

  } catch (err) {
    console.error(err);
    alert("Rejection failed ❌");
  }
};

  // ✅ APPROVE APP (API INTEGRATED ✅)
  const handleApprove = async (appId) => {
    try {
      await privateAPI.put(`/apps/${appId}/approve`); 

      // ✅ remove from UI instantly
      setApps(prev => prev.filter(app => app.id !== appId));

    } catch (err) {
      console.error(err);
      alert("Approval failed ❌");
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 p-4 md:p-8">

      {/* ✅ TITLE */}
      <div>
        <h2 className="text-2xl font-bold">Pending Apps</h2>
        <p className="text-sm text-gray-500">
          Review and approve submitted apps
        </p>
      </div>

      {/* ✅ LOADING */}
      {loading ? (
        <div className="text-center text-gray-500 py-10">
          Loading apps...
        </div>
      ) : apps.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No pending apps ✅
        </div>
      ) : (

        /* ✅ GRID */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {apps.map(app => (
            <div
              key={app.id}
              className="p-4 border rounded-xl shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >

              {/* ✅ TOP INFO */}
              <div className="flex items-center gap-3">

                {/* ✅ LOGO */}
                <img
                  src={app.appLogoUrl}
                  alt={app.appName}
                  className="w-12 h-12 rounded-md object-cover"
                />

                <div>
                  <p className="font-semibold">{app.appName}</p>
                  <p className="text-xs text-gray-500">
                    v{app.appVersion}
                  </p>
                </div>
              </div>

              {/* ✅ DESCRIPTION */}
              <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                {app.appDescription}
              </p>

              {/* ✅ CATEGORY */}
              <p className="text-xs text-gray-500 mt-2">
                Category: {app.category || "N/A"}
              </p>

              {/* ✅ STATUS */}
              <div className="mt-3">
                <Badge variant="warning">
                  {app.status}
                </Badge>
              </div>

              {/* ✅ ACTIONS */}
              <div className="flex gap-2 mt-4">

                {/* ✅ APPROVE */}
                <button
                  onClick={() => handleApprove(app.id)}
                  className="flex-1 bg-green-500 text-white py-2 rounded flex items-center justify-center gap-1 hover:bg-green-600 transition"
                >
                  <FiCheck size={16} /> Approve
                </button>

                {/* ✅ REJECT (UI READY) */}
                {/* <button
                  className="flex-1 bg-red-500 text-white py-2 rounded flex items-center justify-center gap-1 hover:bg-red-600 transition"
                >
                  <FiX size={16} /> Reject
                </button> */}

                <button
  onClick={() => handleReject(app.id)}
  className="flex-1 bg-red-500 text-white py-2 rounded flex items-center justify-center gap-1 hover:bg-red-600 transition"
>
  <FiX size={16} /> Reject
</button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default AdminPendingApps;