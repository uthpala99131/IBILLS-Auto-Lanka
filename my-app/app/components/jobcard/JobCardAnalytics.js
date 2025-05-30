'use client';
import { useState, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function JobCardAnalytics() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/jobcards/analytics/all');
        if (!response.ok) throw new Error('Failed to fetch analytics');
        const data = await response.json();
        setAnalyticsData(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (isLoading) return <div className="text-center py-8">Loading analytics...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;

  const makeDistributionData = {
    labels: Object.keys(analyticsData.makeDistribution),
    datasets: [
      {
        label: 'Vehicle Makes',
        data: Object.values(analyticsData.makeDistribution),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const serviceFrequencyData = {
    labels: Object.keys(analyticsData.serviceFrequency),
    datasets: [
      {
        label: 'Service Frequency',
        data: Object.values(analyticsData.serviceFrequency),
        backgroundColor: 'rgba(220, 53, 69, 0.7)',
        borderColor: 'rgba(220, 53, 69, 1)',
        borderWidth: 1,
      },
    ],
  };

  const monthlyRevenueData = {
    labels: Object.keys(analyticsData.monthlyRevenue),
    datasets: [
      {
        label: 'Monthly Revenue (LKR)',
        data: Object.values(analyticsData.monthlyRevenue),
        fill: false,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderColor: 'rgba(0, 0, 0, 1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold text-red-600 mb-4">Vehicle Make Distribution</h2>
        <div className="h-80">
          <Pie 
            data={makeDistributionData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'right',
                },
              },
            }}
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold text-red-600 mb-4">Service Frequency</h2>
        <div className="h-80">
          <Bar
            data={serviceFrequencyData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Number of Services',
                  },
                },
              },
            }}
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold text-red-600 mb-4">Monthly Revenue</h2>
        <div className="h-80">
          <Line
            data={monthlyRevenueData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Revenue (LKR)',
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}