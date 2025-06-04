// components/dashboard/Tables/JobTable.js
import React from 'react';

const JobTable = ({ jobs, onDelete, onUpdate }) => {
  return (
    <div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left">Customer Name</th>
            <th className="py-2 px-4 text-left">Vehicle Name</th>
            <th className="py-2 px-4 text-left">Service Type</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Price (Rs)</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <tr key={job._id} className="border-t">
                <td className="py-2 px-4">{job.cus_name}</td>
                <td className="py-2 px-4">{job.vehicleName}</td>
                <td className="py-2 px-4">{job.serviceType}</td>
                <td className="py-2 px-4">{job.status}</td>
                <td className="py-2 px-4">Rs.{job.price}</td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    className="px-3 py-1 text-sm text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
                    onClick={() => onUpdate(job)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 text-sm text-white transition-colors bg-red-500 rounded hover:bg-red-600"
                    onClick={() => onDelete(job._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-4 text-center">
                No jobs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;