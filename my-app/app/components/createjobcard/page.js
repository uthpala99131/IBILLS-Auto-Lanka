'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const CreateJobCardPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    customer: {
      name: '',
      contact: '',
      email: '',
    },
    vehicle: {
      make: '',
      model: '',
      year: '',
      registrationNo: '',
      mileage: '',
      vin: '',
    },
    technician: {
      name: '',
      id: '',
    },
    services: [{ name: '', description: '', charge: 0 }],
    spareParts: [{ name: '', partNumber: '', quantity: 1, unitPrice: 0, totalPrice: 0 }],
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleServiceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedServices = [...formData.services];
    updatedServices[index] = {
      ...updatedServices[index],
      [name]: name === 'charge' ? parseFloat(value) : value
    };
    setFormData(prev => ({
      ...prev,
      services: updatedServices
    }));
  };

  const handlePartChange = (index, e) => {
    const { name, value } = e.target;
    const updatedParts = [...formData.spareParts];
    
    updatedParts[index] = {
      ...updatedParts[index],
      [name]: name === 'quantity' || name === 'unitPrice' ? parseFloat(value) : value
    };
    
    // Calculate total price
    if (name === 'quantity' || name === 'unitPrice') {
      updatedParts[index].totalPrice = updatedParts[index].quantity * updatedParts[index].unitPrice;
    }
    
    setFormData(prev => ({
      ...prev,
      spareParts: updatedParts
    }));
  };

  const addService = () => {
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, { name: '', description: '', charge: 0 }]
    }));
  };

  const removeService = (index) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const addPart = () => {
    setFormData(prev => ({
      ...prev,
      spareParts: [...prev.spareParts, { name: '', partNumber: '', quantity: 1, unitPrice: 0, totalPrice: 0 }]
    }));
  };

  const removePart = (index) => {
    setFormData(prev => ({
      ...prev,
      spareParts: prev.spareParts.filter((_, i) => i !== index)
    }));
  };

  const calculateTotal = () => {
    const servicesTotal = formData.services.reduce((sum, service) => sum + (service.charge || 0), 0);
    const partsTotal = formData.spareParts.reduce((sum, part) => sum + (part.totalPrice || 0), 0);
    return servicesTotal + partsTotal;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/jobcards', formData);
      router.push(`/jobcard/${response.data._id}`);
    } catch (error) {
      console.error('Error creating job card:', error);
      alert('Failed to create job card. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-black text-white p-6">
          <h1 className="text-2xl font-bold">Create New Job Card</h1>
          <p className="text-red-400">IBILLS Auto Lanka</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {/* Customer Information */}
          <div className="mb-8 border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold mb-4 text-black">Customer Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="customer.name"
                  value={formData.customer.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <input
                  type="tel"
                  name="customer.contact"
                  value={formData.customer.contact}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="customer.email"
                  value={formData.customer.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>
          
          {/* Vehicle Information */}
          <div className="mb-8 border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold mb-4 text-black">Vehicle Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
                <input
                  type="text"
                  name="vehicle.make"
                  value={formData.vehicle.make}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                <input
                  type="text"
                  name="vehicle.model"
                  value={formData.vehicle.model}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <input
                  type="number"
                  name="vehicle.year"
                  value={formData.vehicle.year}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Registration No</label>
                <input
                  type="text"
                  name="vehicle.registrationNo"
                  value={formData.vehicle.registrationNo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mileage (km)</label>
                <input
                  type="number"
                  name="vehicle.mileage"
                  value={formData.vehicle.mileage}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">VIN</label>
                <input
                  type="text"
                  name="vehicle.vin"
                  value={formData.vehicle.vin}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>
          
          {/* Technician Information */}
          <div className="mb-8 border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold mb-4 text-black">Technician Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Technician Name</label>
                <input
                  type="text"
                  name="technician.name"
                  value={formData.technician.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Technician ID</label>
                <input
                  type="text"
                  name="technician.id"
                  value={formData.technician.id}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Services */}
          <div className="mb-8 border-b border-gray-200 pb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-black">Services</h2>
              <button
                type="button"
                onClick={addService}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Add Service
              </button>
            </div>
            
            {formData.services.map((service, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                  <input
                    type="text"
                    name="name"
                    value={service.name}
                    onChange={(e) => handleServiceChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    name="description"
                    value={service.description}
                    onChange={(e) => handleServiceChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Charge (LKR)</label>
                  <input
                    type="number"
                    name="charge"
                    value={service.charge}
                    onChange={(e) => handleServiceChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div className="flex items-end">
                  {formData.services.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeService(index)}
                      className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Spare Parts */}
          <div className="mb-8 border-b border-gray-200 pb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-black">Spare Parts</h2>
              <button
                type="button"
                onClick={addPart}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Add Part
              </button>
            </div>
            
            {formData.spareParts.map((part, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Part Name</label>
                  <input
                    type="text"
                    name="name"
                    value={part.name}
                    onChange={(e) => handlePartChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Part Number</label>
                  <input
                    type="text"
                    name="partNumber"
                    value={part.partNumber}
                    onChange={(e) => handlePartChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={part.quantity}
                    onChange={(e) => handlePartChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price (LKR)</label>
                  <input
                    type="number"
                    name="unitPrice"
                    value={part.unitPrice}
                    onChange={(e) => handlePartChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div className="flex items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total (LKR)</label>
                    <input
                      type="number"
                      name="totalPrice"
                      value={part.totalPrice}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                    />
                  </div>
                  {formData.spareParts.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePart(index)}
                      className="ml-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Notes */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-black">Additional Notes</h2>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              rows="3"
            ></textarea>
          </div>
          
          {/* Total and Submit */}
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold">
              Total: <span className="text-red-500">LKR {calculateTotal().toFixed(2)}</span>
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Create Job Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJobCardPage;