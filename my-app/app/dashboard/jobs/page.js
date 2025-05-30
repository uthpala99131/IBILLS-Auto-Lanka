'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/dashboard/Layout/Sidebar';
import Topbar from '../../components/dashboard/Layout/Topbar';
import Link from 'next/link';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/jobcards');
        setJobs(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, []);

  // Count jobs by status
  const statusCounts = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Topbar />
          <main className="min-h-screen p-6 bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mx-auto"></div>
              <p className="mt-4 text-black">Loading jobs...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Topbar />
          <main className="min-h-screen p-6 bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
              <h2 className="text-xl font-bold text-red-500 mb-2">Error</h2>
              <p className="text-black mb-4">{error}</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Topbar />
        <main className="min-h-screen p-6 bg-gray-50">
          <h1 className="mb-6 text-2xl font-bold text-black">Service Jobs</h1>
          
          {/* Status Cards */}
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
            <div className="p-6 bg-white border-t-4 border-gray-500 rounded-lg shadow">
              <h2 className="mb-2 text-lg font-semibold text-black">Total Jobs</h2>
              <p className="text-3xl font-bold text-black">{jobs.length}</p>
            </div>
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
              <p className="text-3xl font-bold text-green-500">{(statusCounts['Completed'] || 0) + (statusCounts['Billed'] || 0)}</p>
              <p className="mt-1 text-sm text-gray-500">Finished jobs</p>
            </div>
          </div>
          
          {/* Jobs Table */}
          <div className="p-6 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-black">All Service Jobs</h2>
              <Link href="/createjobcard" className="px-4 py-2 text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600">
                + Add New Job
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="text-white bg-black">
                  <tr>
                    <th className="px-4 py-3 text-left">Job No</th>
                    <th className="px-4 py-3 text-left">Vehicle</th>
                    <th className="px-4 py-3 text-left">Customer</th>
                    <th className="px-4 py-3 text-left">Services</th>
                    <th className="px-4 py-3 text-left">Technician</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Dates</th>
                    <th className="px-4 py-3 text-left">Amount (LKR)</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {jobs.map((job) => (
                    <tr key={job._id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3">{job.jobNumber}</td>
                      <td className="px-4 py-3 font-medium">
                        {job.vehicle.make} {job.vehicle.model}
                        <div className="text-sm text-gray-500">{job.vehicle.registrationNo}</div>
                      </td>
                      <td className="px-4 py-3">
                        {job.customer.name}
                        <div className="text-sm text-gray-500">{job.customer.contact}</div>
                      </td>
                      <td className="px-4 py-3">
                        {job.services.slice(0, 2).map(s => s.name).join(', ')}
                        {job.services.length > 2 && '...'}
                      </td>
                      <td className="px-4 py-3">{job.technician.name}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          job.status === 'Pending' ? 'bg-red-100 text-red-800' :
                          job.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                          job.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col text-sm">
                          <span>Start: {new Date(job.startDate).toLocaleDateString()}</span>
                          {job.endDate && <span>End: {new Date(job.endDate).toLocaleDateString()}</span>}
                        </div>
                      </td>
                      <td className="px-4 py-3">{job.totalAmount?.toFixed(2) || '0.00'}</td>
                      <td className="px-4 py-3">
                        <Link 
                          href={`/jobcard/${job._id}`} 
                          className="mr-2 text-red-500 hover:text-red-700"
                        >
                          View
                        </Link>
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