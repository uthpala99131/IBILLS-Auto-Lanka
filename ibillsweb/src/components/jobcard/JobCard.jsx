'use client';
import React, { useState } from 'react';

export const JobCard = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    vehicleNumber: '',
    vehicleType: 'Car',
    brand: '',
    model: '',
    serviceType: '',
    date: '',
    time: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-4xl p-8 mx-auto text-white bg-black shadow-2xl rounded-2xl">
      <h2 className="mb-6 text-2xl font-bold text-red-500">Vehicle Service Job Card</h2>

      {/* Customer Input Section */}
      <div className="mb-8">
        <h3 className="mb-4 text-xl font-semibold text-white">Customer Vehicle Details</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input name="customerName" placeholder="Customer Name" onChange={handleChange} className="p-3 bg-gray-800 rounded-lg" />
          <input name="vehicleNumber" placeholder="Vehicle Number" onChange={handleChange} className="p-3 bg-gray-800 rounded-lg" />
          <select name="vehicleType" onChange={handleChange} className="p-3 bg-gray-800 rounded-lg">
            <option value="Car">Car</option>
            <option value="Van">Van</option>
            <option value="Lorry">Lorry</option>
            <option value="Bus">Bus</option>
          </select>
          <input name="brand" placeholder="Brand" onChange={handleChange} className="p-3 bg-gray-800 rounded-lg" />
          <input name="model" placeholder="Model" onChange={handleChange} className="p-3 bg-gray-800 rounded-lg" />
          <input name="serviceType" placeholder="Service Type" onChange={handleChange} className="p-3 bg-gray-800 rounded-lg" />
          <input type="date" name="date" onChange={handleChange} className="p-3 bg-gray-800 rounded-lg" />
          <input type="time" name="time" onChange={handleChange} className="p-3 bg-gray-800 rounded-lg" />
        </div>
      </div>

      {/* Admin Filled Section */}
      <div>
        <h3 className="mb-4 text-xl font-semibold text-red-500">Service Job Details (Admin Panel)</h3>
        <div className="mb-6 space-y-2">
          <p><span className="text-gray-400">Job Number:</span> JOB-20250423</p>
          <p><span className="text-gray-400">Technician Name:</span> abcd efgh</p>
          <p><span className="text-gray-400">Service Type:</span> Engine Repair</p>
          <p><span className="text-gray-400">Technician Report:</span> Found oil leak in cylinder. Replaced gasket and tested engine operation.</p>
        </div>

        <h4 className="mb-2 text-lg font-semibold text-white">Spare Parts Used</h4>
        <div className="p-4 bg-gray-800 rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="text-red-500 border-b border-gray-700">
              <tr>
                <th className="pb-2">Part Name</th>
                <th className="pb-2">Quantity</th>
                <th className="pb-2">Price/Unit</th>
                <th className="pb-2">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-700">
                <td className="py-2">Gasket</td>
                <td>1</td>
                <td>Rs.1500.00</td>
                <td>Rs.1500.00</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="py-2">Engine Oil</td>
                <td>2L</td>
                <td>Rs.1800.00</td>
                <td>Rs.2600.00</td>
              </tr>
              <tr className="font-semibold text-white border-t border-gray-700">
                <td colSpan="3" className="pr-4 text-right">Total Cost:</td>
                <td>Rs.4100.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
