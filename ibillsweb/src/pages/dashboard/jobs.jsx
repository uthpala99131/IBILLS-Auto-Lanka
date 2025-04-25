import '../../app/globals.css';
import Sidebar from '../../components/dashboard/Layout/Sidebar';
import Topbar from '../../components/dashboard/Layout/Topbar';

const JobsPage = () => {
  const jobs = [
    { id: 1, vehicle: 'Toyota Corolla', service: 'Oil Change', technician: 'Sam Perera', status: 'In Progress', startDate: '2023-06-15', endDate: '2023-06-15' },
    { id: 2, vehicle: 'Honda Civic', service: 'Brake Replacement', technician: 'Alex Fernando', status: 'Pending', startDate: '2023-06-16', endDate: '2023-06-16' },
    { id: 3, vehicle: 'Nissan Sunny', service: 'AC Repair', technician: 'Chris Silva', status: 'Completed', startDate: '2023-06-14', endDate: '2023-06-14' },
    { id: 4, vehicle: 'Mitsubishi Lancer', service: 'Engine Diagnostics', technician: 'Sam Perera', status: 'In Progress', startDate: '2023-06-15', endDate: '2023-06-16' },
    { id: 5, vehicle: 'Suzuki Swift', service: 'Tire Rotation', technician: 'Alex Fernando', status: 'Pending', startDate: '2023-06-17', endDate: '2023-06-17' },
  ];

  // Count jobs by status
  const statusCounts = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Topbar />
        <main className="min-h-screen p-6 bg-gray-50">
          <h1 className="mb-6 text-2xl font-bold text-black">Service Jobs</h1>
          
          {/* Status Cards */}
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
            <div className="p-6 bg-white border-t-4 border-red-500 rounded-lg shadow">
              <h2 className="mb-2 text-lg font-semibold text-black">Pending</h2>
              <p className="text-3xl font-bold text-red-500">{statusCounts['Pending'] || 0}</p>
              <p className="mt-1 text-sm text-gray-500">Awaiting service</p>
            </div>
            <div className="p-6 bg-white border-t-4 border-yellow-500 rounded-lg shadow">
              <h2 className="mb-2 text-lg font-semibold text-black">In Progress</h2>
              <p className="text-3xl font-bold text-yellow-500">{statusCounts['In Progress'] || 0}</p>
              <p className="mt-1 text-sm text-gray-500">Currently being serviced</p>
            </div>
            <div className="p-6 bg-white border-t-4 border-green-500 rounded-lg shadow">
              <h2 className="mb-2 text-lg font-semibold text-black">Completed</h2>
              <p className="text-3xl font-bold text-green-500">{statusCounts['Completed'] || 0}</p>
              <p className="mt-1 text-sm text-gray-500">Finished jobs</p>
            </div>
          </div>
          
          {/* Jobs Table */}
          <div className="p-6 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-black">All Service Jobs</h2>
              <button className="px-4 py-2 text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600">
                + Add New Job
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="text-white bg-black">
                  <tr>
                    <th className="px-4 py-3 text-left">ID</th>
                    <th className="px-4 py-3 text-left">Vehicle</th>
                    <th className="px-4 py-3 text-left">Service</th>
                    <th className="px-4 py-3 text-left">Technician</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Dates</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {jobs.map((job) => (
                    <tr key={job.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3">{job.id}</td>
                      <td className="px-4 py-3 font-medium">{job.vehicle}</td>
                      <td className="px-4 py-3">{job.service}</td>
                      <td className="px-4 py-3">{job.technician}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          job.status === 'Pending' ? 'bg-red-100 text-red-800' :
                          job.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span>Start: {job.startDate}</span>
                          {job.endDate && <span>End: {job.endDate}</span>}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <button className="mr-2 text-red-500 hover:text-red-700">Update</button>
                        <button className="text-black hover:text-gray-700">Details</button>
                      </td>
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

export default JobsPage;