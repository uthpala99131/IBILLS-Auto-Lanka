const JobsTable = () => {
    const jobs = [
      { id: 1, technician: 'Sam Perera', vehicle: 'Toyota Corolla', service: 'Oil Change', status: 'In Progress', startTime: '09:00 AM', estimatedCompletion: '11:00 AM' },
      { id: 2, technician: 'Alex Fernando', vehicle: 'Honda Civic', service: 'Brake Replacement', status: 'Not Started', startTime: '10:30 AM', estimatedCompletion: '01:30 PM' },
      { id: 3, technician: 'Chris Silva', vehicle: 'Nissan Sunny', service: 'AC Repair', status: 'Completed', startTime: '08:00 AM', estimatedCompletion: '10:00 AM' },
      { id: 4, technician: 'Sam Perera', vehicle: 'Mitsubishi Lancer', service: 'Engine Diagnostics', status: 'In Progress', startTime: '11:00 AM', estimatedCompletion: '02:00 PM' },
      { id: 5, technician: 'Alex Fernando', vehicle: 'Suzuki Swift', service: 'Tire Rotation', status: 'Pending Parts', startTime: '02:00 PM', estimatedCompletion: '03:00 PM' },
    ];
  
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="text-white bg-black">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Technician</th>
              <th className="px-4 py-3 text-left">Vehicle</th>
              <th className="px-4 py-3 text-left">Service</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Start Time</th>
              <th className="px-4 py-3 text-left">Est. Completion</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {jobs.map((job) => (
              <tr key={job.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">{job.id}</td>
                <td className="px-4 py-3">{job.technician}</td>
                <td className="px-4 py-3">{job.vehicle}</td>
                <td className="px-4 py-3">{job.service}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    job.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    job.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    job.status === 'Pending Parts' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {job.status}
                  </span>
                </td>
                <td className="px-4 py-3">{job.startTime}</td>
                <td className="px-4 py-3">{job.estimatedCompletion}</td>
                <td className="px-4 py-3">
                  <button className="mr-2 text-red-500 hover:text-red-700">Update</button>
                  <button className="text-black hover:text-gray-700">Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default JobsTable;