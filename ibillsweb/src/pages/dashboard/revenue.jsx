import Sidebar from '../../components/dashboard/Layout/Sidebar';
import Topbar from '../../components/dashboard/Layout/Topbar';
import LineChart from '../../components/dashboard/Charts/LineChart';
import BarChart from '../../components/dashboard/Charts/BarChart';
import '../../app/globals.css';

const RevenuePage = () => {
  const revenueData = [
    { month: 'January', revenue: 1200000, expenses: 800000, profit: 400000 },
    { month: 'February', revenue: 1500000, expenses: 900000, profit: 600000 },
    { month: 'March', revenue: 1800000, expenses: 1000000, profit: 800000 },
    { month: 'April', revenue: 1400000, expenses: 850000, profit: 550000 },
    { month: 'May', revenue: 1600000, expenses: 950000, profit: 650000 },
    { month: 'June', revenue: 2000000, expenses: 1100000, profit: 900000 },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Topbar />
        <main className="min-h-screen p-6 bg-gray-50">
          <h1 className="mb-6 text-2xl font-bold text-black">Revenue Analytics</h1>
          
          <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="mb-2 text-lg font-semibold text-black">Total Revenue</h2>
              <p className="text-3xl font-bold text-red-500">LKR 9,500,000</p>
              <p className="mt-1 text-sm text-gray-500">Last 6 months</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="mb-2 text-lg font-semibold text-black">Total Expenses</h2>
              <p className="text-3xl font-bold text-black">LKR 5,600,000</p>
              <p className="mt-1 text-sm text-gray-500">Last 6 months</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="mb-2 text-lg font-semibold text-black">Net Profit</h2>
              <p className="text-3xl font-bold text-green-500">LKR 3,900,000</p>
              <p className="mt-1 text-sm text-gray-500">Last 6 months</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6 mb-8">
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="mb-4 text-lg font-semibold text-black">Revenue & Profit Trend</h2>
              <div className="h-80">
                <LineChart />
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-lg font-semibold text-black">Monthly Financial Summary</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="text-white bg-black">
                  <tr>
                    <th className="px-4 py-3 text-left">Month</th>
                    <th className="px-4 py-3 text-left">Revenue (LKR)</th>
                    <th className="px-4 py-3 text-left">Expenses (LKR)</th>
                    <th className="px-4 py-3 text-left">Profit (LKR)</th>
                    <th className="px-4 py-3 text-left">Margin</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {revenueData.map((item) => (
                    <tr key={item.month} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3">{item.month}</td>
                      <td className="px-4 py-3">{item.revenue.toLocaleString()}</td>
                      <td className="px-4 py-3">{item.expenses.toLocaleString()}</td>
                      <td className="px-4 py-3">{item.profit.toLocaleString()}</td>
                      <td className="px-4 py-3">{((item.profit / item.revenue) * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RevenuePage;