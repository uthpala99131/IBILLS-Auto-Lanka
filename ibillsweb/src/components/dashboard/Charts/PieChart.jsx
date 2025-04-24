import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ['Oil Change', 'Tire Service', 'Brake Service', 'Engine Repair', 'Other'],
    datasets: [
      {
        label: 'Services',
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(0, 0, 0, 0.8)',
          'rgba(239, 68, 68, 0.6)',
          'rgba(0, 0, 0, 0.6)',
          'rgba(239, 68, 68, 0.4)',
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;