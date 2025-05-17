'use client';
import { useState } from 'react';

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    notifications: true,
    darkMode: false,
    email: 'admin@ibills.lk'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle settings update
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow max-w-2xl">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.notifications}
              onChange={(e) => setFormData({...formData, notifications: e.target.checked})}
              className="mr-2"
            />
            Enable Notifications
          </label>
        </div>

        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}