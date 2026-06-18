
import React, { useState, useEffect, useMemo } from 'react';
import { privateAPI } from '../../services/api';
import { FiSearch, FiUserX, FiUserCheck, FiAlertCircle } from 'react-icons/fi';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';

export const AdminUsers = () => {

  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  // ✅ LOAD USERS FROM BACKEND
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await privateAPI.get('/users/admin/all');
      setUsers(res.data);
    } catch (err) {
      console.error("User fetch error", err);
    }
  };

  // ✅ BLOCK USER
  const blockUser = async (id) => {
    try {
      await privateAPI.put(`/users/admin/${id}/block`);
      loadUsers(); 
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ UNBLOCK USER
  const unblockUser = async (id) => {
    try {
      await privateAPI.put(`/users/admin/${id}/unblock`);
      loadUsers(); 
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ FILTER USERS
  const filteredUsers = useMemo(() => {
    return users.filter(user => {

      const matchesSearch =
        user.fullName.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase());

      const matchesRole =
        roleFilter === 'All' || user.role === roleFilter.toUpperCase();

      return matchesSearch && matchesRole;
    });
  }, [users, query, roleFilter]);

  return (
    <div className="w-full flex flex-col gap-6 p-4 md:p-8">

      {/* ✅ TITLE */}
      <div>
        <h2 className="text-2xl font-bold">User Management</h2>
        <p className="text-sm text-gray-500">
          Manage user access and status
        </p>
      </div>

      {/* ✅ SEARCH + FILTER */}
      <div className="flex flex-col sm:flex-row gap-4">

        <div className="relative w-full sm:w-72">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 py-2 border rounded-lg"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {["All", "ADMIN", "DEVELOPER", "USER"].map(r => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1 rounded-lg text-sm ${
                roleFilter === r ? "bg-indigo-600 text-white" : "bg-gray-100"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* ✅ USERS TABLE */}
      {filteredUsers.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <FiAlertCircle className="mx-auto mb-2" />
          No users found
        </div>
      ) : (
        <div className="border rounded-xl overflow-hidden">

          <table className="w-full text-sm">

            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="p-3">User</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredUsers.map(user => (
                <tr key={user.id} className="border-t">

                  {/* ✅ USER INFO */}
                  <td className="p-3 flex items-center gap-3">
                    <Avatar name={user.fullName} size="sm" />
                    <div>
                      <p className="font-medium">{user.fullName}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </td>

                  {/* ✅ ROLE */}
                  <td className="p-3">{user.role}</td>

                  {/* ✅ STATUS */}
                  <td className="p-3">
                    <Badge variant={user.isActive ? 'success' : 'error'}>
                      {user.isActive ? 'Active' : 'Blocked'}
                    </Badge>
                  </td>

                  {/* ✅ ACTIONS */}
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">

                      {!user.isActive ? (
                        <button
                          onClick={() => unblockUser(user.id)}
                          className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          <FiUserCheck />
                        </button>
                      ) : (
                        <button
                          onClick={() => blockUser(user.id)}
                          className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                          <FiUserX />
                        </button>
                      )}

                    </div>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}
    </div>
  );
};

export default AdminUsers;
