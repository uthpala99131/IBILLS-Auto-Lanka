// components/dashboard/Tables/ServiceTable.js
import React from 'react';

const ServiceTable = ({ services }) => {
  return (
    <div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Price (Rs)</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.length > 0 ? (
            services.map((service, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 px-4">{service.name}</td>
                <td className="py-2 px-4">Rs.{service.price}</td>
                <td className="py-2 px-4">
                  <button className="text-red-500 hover:text-red-700">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-4 text-center">
                No services found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceTable;