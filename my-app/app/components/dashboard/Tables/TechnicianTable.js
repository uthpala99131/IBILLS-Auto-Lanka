// components/dashboard/Tables/TechnicianTable.js
import React from 'react';

const TechnicianTable = ({ technicians }) => {
  return (
    <div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Phone Number</th>
            <th className="py-2 px-4 text-left">Salary</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {technicians.length > 0 ? (
            technicians.map((technician, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 px-4">{technician.name}</td>
                <td className="py-2 px-4">{technician.phoneNum}</td>
                <td className="py-2 px-4">Rs.{technician.salary}</td>
                <td className="py-2 px-4">
                  <button className="text-red-500 hover:text-red-700">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-4 text-center">
                No technicians found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TechnicianTable;