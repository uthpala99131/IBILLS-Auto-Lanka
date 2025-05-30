"use client";
import { useState } from 'react';

export default function JobCardForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    customerInfo: {
      name: '',
      contactNumber: '',
      email: '',
      address: '',
      vehicleNumber: '',
      vehicleMake: '',
      vehicleModel: '',
      mileage: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('customerInfo.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        customerInfo: {
          ...formData.customerInfo,
          [field]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Create New Job Card</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-black mb-2">Customer Information</h3>
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name*</label>
                <input
                  type="text"
                  name="customerInfo.name"
                  value={formData.customerInfo.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Number*</label>
                <input
                  type="tel"
                  name="customerInfo.contactNumber"
                  value={formData.customerInfo.contactNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="customerInfo.email"
                  value={formData.customerInfo.email}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="customerInfo.address"
                  value={formData.customerInfo.address}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-black mb-2">Vehicle Information</h3>
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Vehicle Number*</label>
                <input
                  type="text"
                  name="customerInfo.vehicleNumber"
                  value={formData.customerInfo.vehicleNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Make*</label>
                <input
                  type="text"
                  name="customerInfo.vehicleMake"
                  value={formData.customerInfo.vehicleMake}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Model*</label>
                <input
                  type="text"
                  name="customerInfo.vehicleModel"
                  value={formData.customerInfo.vehicleModel}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mileage (km)*</label>
                <input
                  type="number"
                  name="customerInfo.mileage"
                  value={formData.customerInfo.mileage}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-black bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Create Job Card
          </button>
        </div>
      </form>
    </div>
  );
}