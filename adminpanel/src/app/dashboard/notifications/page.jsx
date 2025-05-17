'use client';
import { useState, useEffect } from 'react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications from API
    const fetchNotifications = async () => {
      const response = await fetch('/api/notifications');
      const data = await response.json();
      setNotifications(data);
    };
    fetchNotifications();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {notifications.map(notification => (
          <div key={notification.id} className="p-4 border-b hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{notification.title}</h3>
                <p className="text-sm text-gray-600">{notification.message}</p>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(notification.date).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}