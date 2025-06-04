
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobPage = () => {
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch user from localStorage
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser?._id; // Assuming the user object has an `_id` field

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        let response;
        if (userId) {
          // Fetch jobs for the logged-in user
          response = await axios.get(`http://localhost:5000/api/jobs?user=${userId}`);
        } else {
          // Fetch all jobs if no user is found
          response = await axios.get('http://localhost:5000/api/jobs');
        }
        setJobs(response.data.data); // Assuming the backend returns data in this format
      } catch (error) {
        setError('Error fetching jobs');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [userId]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="flex">
      
      <div className="flex-1 ml-64">
        
        <main className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-100">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mt-14">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Service Records</h1>
                <p className="text-gray-600 text-lg">Ibills Auto Lanka - Professional Vehicle Service Center</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Jobs</p>
                <p className="text-2xl font-bold text-blue-600">{jobs.length}</p>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="ml-4 text-gray-600">Loading service records...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-red-600 text-center">{error}</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-gray-600 text-lg">No service records available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden"
                >
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-white">{job.serviceType}</h2>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(job.status)}`}>
                        {job.status || 'Pending'}
                      </span>
                    </div>
                    <p className="text-blue-100 text-sm mt-1">Job ID: #{job._id?.slice(-6) || 'N/A'}</p>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Customer Information */}
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">Customer Details</h3>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-gray-900 font-medium">{job.cus_name || 'N/A'}</p>
                        {job.customerPhone && (
                          <p className="text-gray-600 text-sm">📞 {job.customerPhone}</p>
                        )}
                        {job.customerEmail && (
                          <p className="text-gray-600 text-sm">✉️ {job.customerEmail}</p>
                        )}
                      </div>
                    </div>

                    {/* Vehicle Information */}
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">Vehicle Details</h3>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-gray-900 font-medium">🚗 {job.vehicleName || 'N/A'}</p>
                        {job.vehicleModel && (
                          <p className="text-gray-600 text-sm">Model: {job.vehicleModel}</p>
                        )}
                        {job.vehicleYear && (
                          <p className="text-gray-600 text-sm">Year: {job.vehicleYear}</p>
                        )}
                        {job.licensePlate && (
                          <p className="text-gray-600 text-sm">License: {job.licensePlate}</p>
                        )}
                      </div>
                    </div>

                    {/* Service Details */}
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">Service Information</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Service Fee:</span>
                          <span className="font-semibold text-green-600">Rs.{job.price || '0'}</span>
                        </div>
                        {job.serviceDate && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Service Date:</span>
                            <span className="text-gray-900">{formatDate(job.serviceDate)}</span>
                          </div>
                        )}
                        {job.estimatedTime && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Est. Time:</span>
                            <span className="text-gray-900">{job.estimatedTime}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Spare Parts (if applicable) */}
                    {(job.sparePartName || job.sparePartPrice) && (
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">Spare Parts</h3>
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                          {job.sparePartName && (
                            <p className="text-gray-900 font-medium">🔧 {job.sparePartName}</p>
                          )}
                          {job.sparePartPrice && (
                            <p className="text-orange-700 font-semibold">Cost: Rs.{job.sparePartPrice}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Technician Information */}
                    {(job.technicianName || job.technicianPhone) && (
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">Assigned Technician</h3>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          {job.technicianName && (
                            <p className="text-gray-900 font-medium">👨‍🔧 {job.technicianName}</p>
                          )}
                          {job.technicianPhone && (
                            <p className="text-gray-600 text-sm">📞 {job.technicianPhone}</p>
                          )}
                          {job.technicianSalary && (
                            <p className="text-blue-700 text-sm">Salary: Rs.{job.technicianSalary}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Review/Notes */}
                    {job.technicianReview && (
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">Service Notes</h3>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <p className="text-gray-700 text-sm italic">&quot;{job.technicianReview}&quot;</p>
                        </div>
                      </div>
                    )}
                    {job.futureServices && (
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">Future Services</h3>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <p className="text-gray-700 text-sm italic">&quot;{job.futureServices}&quot;</p>
                        </div>
                      </div>
                    )}

                    {/* Total Cost Summary */}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-700">Total Cost:</span>
                        <span className="text-xl font-bold text-blue-600">
                          Rs.{(parseFloat(job.price || 0) + parseFloat(job.sparePartPrice || 0)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="bg-gray-50 px-6 py-3 border-t">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Ibills Auto Lanka</span>
                      <span>{formatDate(job.createdAt || job.serviceDate)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Modal for updating a job */}
    
    </div>
  );
};

export default JobPage;