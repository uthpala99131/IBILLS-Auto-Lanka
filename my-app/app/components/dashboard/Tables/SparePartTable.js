// components/dashboard/Tables/SparePartTable.js
import React from 'react';

const SparePartTable = ({ spareParts }) => {
  return (
    <div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Price</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {spareParts.length > 0 ? (
            spareParts.map((sparePart, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 px-4">{sparePart.name}</td>
                <td className="py-2 px-4">Rs.{sparePart.price}</td>
                <td className="py-2 px-4">
                  <button className="text-red-500 hover:text-red-700">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-4 text-center">
                No spare parts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SparePartTable;