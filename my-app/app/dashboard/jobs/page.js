// components/dashboard/Pages/JobPage.js
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/dashboard/Layout/Sidebar';
import Topbar from '../../components/dashboard/Layout/Topbar';
import JobTable from '../../components/dashboard/Tables/JobTable';
import UpdateJobModal from '../../components/dashboard/Modals/UpdateJobModal';

const JobPage = () => {
  const [jobs, setJobs] = useState([]); // State to hold job data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Fetch jobs from the backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs');
        setJobs(response.data.data); // Assuming the backend returns data in this format
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  // Function to handle deleting a job
  const handleDeleteJob = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`);
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id)); // Remove deleted job from state
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Topbar />
        <main className="min-h-screen p-6 bg-gray-50">
          <h1 className="text-2xl font-bold text-black mb-6">Jobs</h1>
          <div className="p-6 bg-white rounded-lg shadow">
            <JobTable
              jobs={jobs}
              onDelete={handleDeleteJob}
              onUpdate={(job) => {
                setSelectedJob(job);
                setIsModalOpen(true);
              }}
            />
          </div>
        </main>
      </div>

      {/* Modal for updating a job */}
      {isModalOpen && (
        <UpdateJobModal
          job={selectedJob}
          onClose={() => setIsModalOpen(false)}
          onUpdate={(updatedJob) => {
            setJobs((prevJobs) =>
              prevJobs.map((job) => (job._id === updatedJob._id ? updatedJob : job))
            );
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default JobPage;