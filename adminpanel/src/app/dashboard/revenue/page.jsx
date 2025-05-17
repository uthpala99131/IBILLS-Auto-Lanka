'use client';
import { LineChart } from '@/components/Charts';
import { useState, useEffect } from 'react';

export default function RevenuePage() {
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    // Fetch revenue data from API
    const fetchData = async () => {
      const response = await fetch('/api/revenue');
      const data = await response.json();
      setRevenueData(data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Revenue Analysis</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
          <LineChart data={revenueData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Revenue Breakdown</h2>
          {/* Add additional charts here */}
        </div>
      </div>
    </div>
  );
}