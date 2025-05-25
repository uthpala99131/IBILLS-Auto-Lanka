import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Analytics = ({ jobCards }) => {
  // Process data for charts
  const getVehicleMakeData = () => {
    const makeCount = {};
    jobCards.forEach(card => {
      const make = card.vehicle.make;
      makeCount[make] = (makeCount[make] || 0) + 1;
    });
    return Object.entries(makeCount).map(([name, value]) => ({ name, value }));
  };

  const getServiceTypeData = () => {
    const serviceCount = {};
    jobCards.forEach(card => {
      card.services.forEach(service => {
        const type = service.description.split(' ')[0]; // Simple extraction of service type
        serviceCount[type] = (serviceCount[type] || 0) + 1;
      });
    });
    return Object.entries(serviceCount).map(([name, value]) => ({ name, value }));
  };

  const getRevenueData = () => {
    const monthlyRevenue = {};
    jobCards.forEach(card => {
      const month = new Date(card.date).toLocaleString('default', { month: 'short' });
      monthlyRevenue[month] = (monthlyRevenue[month] || 0) + (card.bill?.total || 0);
    });
    return Object.entries(monthlyRevenue).map(([name, revenue]) => ({ name, revenue }));
  };

  const vehicleMakeData = getVehicleMakeData();
  const serviceTypeData = getServiceTypeData();
  const revenueData = getRevenueData();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4 text-black">Service Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-black">Vehicle Makes</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={vehicleMakeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {vehicleMakeData.map((entry, index) => (
                    <Pie key={`pie-${index}`} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 text-black">Service Types</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serviceTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" name="Service Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2 text-black">Monthly Revenue</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`LKR ${value.toFixed(2)}`, 'Revenue']} />
              <Legend />
              <Bar dataKey="revenue" fill="#ff7300" name="Revenue (LKR)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;