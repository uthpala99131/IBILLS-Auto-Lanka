'use client';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';

ChartJS.register(
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement
);

export function BarChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Recovery Bookings',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
      },
      {
        label: 'Service Bookings',
        data: [8, 15, 7, 12, 9, 10],
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export function PieChart() {
  const data = {
    labels: ['Oil Change', 'Tire Service', 'Battery Check', 'Engine Repair'],
    datasets: [
      {
        data: [30, 25, 20, 25],
        backgroundColor: [
          'rgba(239, 68, 68, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
}

export function LineChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue (LKR)',
        data: [125000, 190000, 80000, 150000, 120000, 180000],
        borderColor: 'rgba(239, 68, 68, 0.7)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return <Line data={data} options={options} />;
}