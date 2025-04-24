import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Services Completed',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
      },
      {
        label: 'New Customers',
        data: [8, 15, 7, 12, 9, 5],
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Service Statistics',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;