'use client';
import { useState, useEffect } from 'react';
import { BarChart, PieChart, LineChart } from '@/components/Charts';
import StatsCard from '@/components/StatsCard';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard 
          title="Total Messages" 
          value={stats?.messagesCount || 0} 
          icon="message" 
          color="bg-red-100 text-red-600"
        />
        <StatsCard 
          title="Total Bookings" 
          value={stats?.bookingsCount || 0} 
          icon="booking" 
          color="bg-blue-100 text-blue-600"
        />
        <StatsCard 
          title="Total Users" 
          value={stats?.usersCount || 0} 
          icon="user" 
          color="bg-green-100 text-green-600"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Bookings Overview</h2>
          <BarChart />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Service Types</h2>
          <PieChart />
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Revenue Trend</h2>
        <LineChart />
      </div>
    </div>
  );
}