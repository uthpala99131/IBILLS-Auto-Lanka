
import '../app/globals.css';
import Sidebar from '../components/dashboard/Layout/Sidebar';
import Topbar from '../components/dashboard/Layout/Topbar';
import BarChart from '../components/dashboard/Charts/BarChart';
import LineChart from '../components/dashboard/Charts/LineChart';
import PieChart from '../components/dashboard/Charts/PieChart';

const Dashboard = () => {
  const stats = [
    { name: 'Total Bookings', value: '124', change: '+12%', changeType: 'positive' },
    { name: 'Revenue (LKR)', value: '1,240,000', change: '+8.5%', changeType: 'positive' },
    { name: 'Pending Services', value: '18', change: '-2%', changeType: 'negative' },
    { name: 'New Customers', value: '32', change: '+5%', changeType: 'positive' },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Topbar />
        <main className="min-h-screen p-6 bg-gray-50">
          <h1 className="mb-6 text-2xl font-bold text-black">Dashboard Overview</h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="p-6 bg-white rounded-lg shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                    <p className="mt-1 text-3xl font-semibold text-black">{stat.value}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    stat.changeType === 'positive' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="mb-4 text-lg font-semibold text-black">Service Statistics</h2>
              <div className="h-80">
                <BarChart />
              </div>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="mb-4 text-lg font-semibold text-black">Revenue Trend</h2>
              <div className="h-80">
                <LineChart />
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-lg font-semibold text-black">Service Distribution</h2>
            <div className="h-96">
              <PieChart />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;