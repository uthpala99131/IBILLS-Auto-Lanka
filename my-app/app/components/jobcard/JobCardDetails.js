"use client";
import { useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';

export default function JobCardDetails({
  jobCard,
  onUpdate,
  onAddService,
  onUpdateServiceStatus,
  onAddSpareParts,
  onAddFutureService,
  onAddReview,
  onBack
}) {
  const [activeTab, setActiveTab] = useState('services');
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    technician: '',
    charge: 0
  });
  const [newSparePart, setNewSparePart] = useState({
    name: '',
    partNumber: '',
    quantity: 1,
    unitPrice: 0
  });
  const [newFutureService, setNewFutureService] = useState({
    serviceType: '',
    recommendedMileage: 0
  });
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });
  const [editingCustomerInfo, setEditingCustomerInfo] = useState(false);
  const [customerInfo, setCustomerInfo] = useState(jobCard.customerInfo);

  const billRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => billRef.current,
    pageStyle: `
      @page { size: A4; margin: 10mm; }
      @media print { 
        body { -webkit-print-color-adjust: exact; } 
        .no-print { display: none; }
      }
    `
  });

  const handleServiceChange = (e) => {
    const { name, value } = e.target;
    setNewService({
      ...newService,
      [name]: name === 'charge' ? parseFloat(value) : value
    });
  };

  const handleAddService = (e) => {
    e.preventDefault();
    onAddService(newService);
    setNewService({
      name: '',
      description: '',
      technician: '',
      charge: 0
    });
  };

  const handleSparePartChange = (e) => {
    const { name, value } = e.target;
    const updatedSparePart = {
      ...newSparePart,
      [name]: name === 'quantity' || name === 'unitPrice' ? parseFloat(value) : value
    };
    updatedSparePart.totalPrice = updatedSparePart.quantity * updatedSparePart.unitPrice;
    setNewSparePart(updatedSparePart);
  };

  const handleAddSparePart = (e) => {
    e.preventDefault();
    onAddSpareParts(newSparePart);
    setNewSparePart({
      name: '',
      partNumber: '',
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0
    });
  };

  const handleFutureServiceChange = (e) => {
    const { name, value } = e.target;
    setNewFutureService({
      ...newFutureService,
      [name]: name === 'recommendedMileage' ? parseFloat(value) : value
    });
  };

  const handleAddFutureService = (e) => {
    e.preventDefault();
    onAddFutureService(newFutureService);
    setNewFutureService({
      serviceType: '',
      recommendedMileage: 0
    });
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: name === 'rating' ? parseInt(value) : value
    });
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    onAddReview(newReview);
    setNewReview({
      rating: 5,
      comment: ''
    });
  };

  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: value
    });
  };

  const handleSaveCustomerInfo = () => {
    onUpdate({ customerInfo });
    setEditingCustomerInfo(false);
  };

  const calculateTotal = () => {
    const servicesTotal = jobCard.serviceDetails.services.reduce((sum, service) => sum + service.charge, 0);
    const partsTotal = jobCard.spareParts.reduce((sum, part) => sum + part.totalPrice, 0);
    return servicesTotal + partsTotal;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-black text-white flex justify-between items-center">
        <h2 className="text-xl font-bold">
          Job Card #{jobCard._id.substring(18, 24).toUpperCase()}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={onBack}
            className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-700"
          >
            Back
          </button>
          <button
            onClick={handlePrint}
            className="px-3 py-1 bg-red-600 rounded hover:bg-red-700 no-print"
          >
            Print Bill
          </button>
        </div>
      </div>

      <div className="p-4 border-b">
        <div className="flex justify-end mb-2">
          {!editingCustomerInfo ? (
            <button
              onClick={() => setEditingCustomerInfo(true)}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={handleSaveCustomerInfo}
              className="text-sm text-green-600 hover:text-green-800"
            >
              Save
            </button>
          )}
        </div>

        {!editingCustomerInfo ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900">Customer Details</h4>
              <p>Name: {customerInfo.name}</p>
              <p>Contact: {customerInfo.contactNumber}</p>
              <p>Email: {customerInfo.email || 'N/A'}</p>
              <p>Address: {customerInfo.address || 'N/A'}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Vehicle Details</h4>
              <p>Vehicle: {customerInfo.vehicleMake} {customerInfo.vehicleModel}</p>
              <p>Number: {customerInfo.vehicleNumber}</p>
              <p>Mileage: {customerInfo.mileage} km</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleCustomerInfoChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact</label>
                <input
                  type="text"
                  name="contactNumber"
                  value={customerInfo.contactNumber}
                  onChange={handleCustomerInfoChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleCustomerInfoChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={customerInfo.address}
                  onChange={handleCustomerInfoChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Vehicle Make</label>
                <input
                  type="text"
                  name="vehicleMake"
                  value={customerInfo.vehicleMake}
                  onChange={handleCustomerInfoChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Vehicle Model</label>
                <input
                  type="text"
                  name="vehicleModel"
                  value={customerInfo.vehicleModel}
                  onChange={handleCustomerInfoChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Vehicle Number</label>
                <input
                  type="text"
                  name="vehicleNumber"
                  value={customerInfo.vehicleNumber}
                  onChange={handleCustomerInfoChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mileage (km)</label>
                <input
                  type="number"
                  name="mileage"
                  value={customerInfo.mileage}
                  onChange={handleCustomerInfoChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('services')}
            className={`whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm ${activeTab === 'services' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Services
          </button>
          <button
            onClick={() => setActiveTab('parts')}
            className={`whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm ${activeTab === 'parts' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Spare Parts
          </button>
          <button
            onClick={() => setActiveTab('future')}
            className={`whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm ${activeTab === 'future' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Future Services
          </button>
          <button
            onClick={() => setActiveTab('review')}
            className={`whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm ${activeTab === 'review' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Review
          </button>
          <button
            onClick={() => setActiveTab('bill')}
            className={`whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm ${activeTab === 'bill' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Bill
          </button>
        </nav>
      </div>

      <div className="p-4">
        {activeTab === 'services' && (
          <div>
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-2">Add New Service</h4>
              <form onSubmit={handleAddService} className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Service Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newService.name}
                    onChange={handleServiceChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <input
                    type="text"
                    name="description"
                    value={newService.description}
                    onChange={handleServiceChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Technician</label>
                  <input
                    type="text"
                    name="technician"
                    value={newService.technician}
                    onChange={handleServiceChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Charge (LKR)</label>
                  <input
                    type="number"
                    name="charge"
                    value={newService.charge}
                    onChange={handleServiceChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div className="md:col-span-4">
                  <button
                    type="submit"
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Add Service
                  </button>
                </div>
              </form>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-2">Current Services</h4>
              {jobCard.serviceDetails.services.length === 0 ? (
                <p className="text-gray-500">No services added yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Technician</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Charge (LKR)</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {jobCard.serviceDetails.services.map((service, index) => (
                        <tr key={index}>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{service.name}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{service.description}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{service.technician}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm">
                            <select
                              value={service.status}
                              onChange={(e) => onUpdateServiceStatus(service._id, e.target.value)}
                              className="border rounded px-2 py-1 text-sm"
                            >
                              <option value="Pending">Pending</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{service.charge.toFixed(2)}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                            {service.startTime && (
                              <span className="text-xs text-gray-400">
                                Started: {new Date(service.startTime).toLocaleString()}
                              </span>
                            )}
                            {service.endTime && (
                              <span className="text-xs text-gray-400 block">
                                Completed: {new Date(service.endTime).toLocaleString()}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'parts' && (
          <div>
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-2">Add Spare Parts</h4>
              <form onSubmit={handleAddSparePart} className="grid grid-cols-1 md:grid-cols-5 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Part Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newSparePart.name}
                    onChange={handleSparePartChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Part Number</label>
                  <input
                    type="text"
                    name="partNumber"
                    value={newSparePart.partNumber}
                    onChange={handleSparePartChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={newSparePart.quantity}
                    onChange={handleSparePartChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Unit Price (LKR)</label>
                  <input
                    type="number"
                    name="unitPrice"
                    value={newSparePart.unitPrice}
                    onChange={handleSparePartChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Price (LKR)</label>
                  <input
                    type="number"
                    name="totalPrice"
                    value={newSparePart.quantity * newSparePart.unitPrice}
                    readOnly
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 bg-gray-100"
                  />
                </div>
                <div className="md:col-span-5">
                  <button
                    type="submit"
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Add Part
                  </button>
                </div>
              </form>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-2">Used Spare Parts</h4>
              {jobCard.spareParts.length === 0 ? (
                <p className="text-gray-500">No spare parts added yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Part Name</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Part Number</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price (LKR)</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price (LKR)</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {jobCard.spareParts.map((part, index) => (
                        <tr key={index}>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{part.name}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{part.partNumber || 'N/A'}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{part.quantity}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{part.unitPrice.toFixed(2)}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{part.totalPrice.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-50">
                        <td colSpan="4" className="px-3 py-2 text-sm font-medium text-gray-900 text-right">Total:</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                          {jobCard.spareParts.reduce((sum, part) => sum + part.totalPrice, 0).toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'future' && (
          <div>
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-2">Add Future Service Recommendation</h4>
              <form onSubmit={handleAddFutureService} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Service Type</label>
                  <input
                    type="text"
                    name="serviceType"
                    value={newFutureService.serviceType}
                    onChange={handleFutureServiceChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Recommended Mileage</label>
                  <input
                    type="number"
                    name="recommendedMileage"
                    value={newFutureService.recommendedMileage}
                    onChange={handleFutureServiceChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2"
                    min="0"
                    required
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Add Recommendation
                  </button>
                </div>
              </form>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-2">Future Service Recommendations</h4>
              {jobCard.futureServices.length === 0 ? (
                <p className="text-gray-500">No future services recommended yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Type</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommended Mileage</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estimated Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {jobCard.futureServices.map((service, index) => {
                        const currentMileage = jobCard.customerInfo.mileage;
                        const mileageDiff = service.recommendedMileage - currentMileage;
                        const avgMonthlyMileage = 2000; // Assuming average 2000km per month
                        const estimatedMonths = Math.ceil(mileageDiff / avgMonthlyMileage);
                        const estimatedDate = new Date();
                        estimatedDate.setMonth(estimatedDate.getMonth() + estimatedMonths);
                        
                        return (
                          <tr key={index}>
                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{service.serviceType}</td>
                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{service.recommendedMileage} km</td>
                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                              {estimatedDate.toLocaleDateString()} (in ~{estimatedMonths} months)
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'review' && (
          <div>
            {jobCard.review ? (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-medium mb-2">Customer Review</h4>
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < jobCard.review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {new Date(jobCard.review.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{jobCard.review.comment}</p>
              </div>
            ) : (
              <div>
                <h4 className="text-lg font-medium mb-2">Add Customer Review</h4>
                <form onSubmit={handleAddReview} className="max-w-md">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating })}
                          className="focus:outline-none"
                        >
                          <svg
                            className={`w-8 h-8 ${rating <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                    <textarea
                      name="comment"
                      value={newReview.comment}
                      onChange={handleReviewChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2"
                      rows="3"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {activeTab === 'bill' && (
          <div>
            <div ref={billRef} className="p-6 bg-white border border-gray-200 rounded-lg">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-red-600">IBILLS Auto Lanka</h2>
                <p className="text-gray-600">Vehicle Service Center</p>
                <p className="text-gray-600">123 Garage Road, Colombo, Sri Lanka</p>
                <p className="text-gray-600">Tel: +94 11 234 5678</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold border-b border-black mb-2">Customer Details</h3>
                  <p><span className="font-medium">Name:</span> {jobCard.customerInfo.name}</p>
                  <p><span className="font-medium">Contact:</span> {jobCard.customerInfo.contactNumber}</p>
                  <p><span className="font-medium">Vehicle:</span> {jobCard.customerInfo.vehicleMake} {jobCard.customerInfo.vehicleModel}</p>
                  <p><span className="font-medium">Number:</span> {jobCard.customerInfo.vehicleNumber}</p>
                  <p><span className="font-medium">Mileage:</span> {jobCard.customerInfo.mileage} km</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold border-b border-black mb-2">Job Card Details</h3>
                  <p><span className="font-medium">Job Card #:</span> {jobCard._id.substring(18, 24).toUpperCase()}</p>
                  <p><span className="font-medium">Date:</span> {new Date(jobCard.createdAt).toLocaleDateString()}</p>
                  <p><span className="font-medium">Status:</span> {jobCard.serviceDetails.services.some(s => s.status !== 'Completed') ? 'In Progress' : 'Completed'}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold border-b border-black mb-2">Services Performed</h3>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-3 py-2 text-left">Service</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Technician</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Status</th>
                      <th className="border border-gray-300 px-3 py-2 text-right">Amount (LKR)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobCard.serviceDetails.services.map((service, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 px-3 py-2">{service.name}</td>
                        <td className="border border-gray-300 px-3 py-2">{service.technician || 'N/A'}</td>
                        <td className="border border-gray-300 px-3 py-2">{service.status}</td>
                        <td className="border border-gray-300 px-3 py-2 text-right">{service.charge.toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50">
                      <td colSpan="3" className="border border-gray-300 px-3 py-2 text-right font-medium">Services Subtotal:</td>
                      <td className="border border-gray-300 px-3 py-2 text-right font-medium">
                        {jobCard.serviceDetails.services.reduce((sum, service) => sum + service.charge, 0).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {jobCard.spareParts.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold border-b border-black mb-2">Spare Parts Used</h3>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-3 py-2 text-left">Part Name</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Part Number</th>
                        <th className="border border-gray-300 px-3 py-2 text-right">Qty</th>
                        <th className="border border-gray-300 px-3 py-2 text-right">Unit Price</th>
                        <th className="border border-gray-300 px-3 py-2 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobCard.spareParts.map((part, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 px-3 py-2">{part.name}</td>
                          <td className="border border-gray-300 px-3 py-2">{part.partNumber || 'N/A'}</td>
                          <td className="border border-gray-300 px-3 py-2 text-right">{part.quantity}</td>
                          <td className="border border-gray-300 px-3 py-2 text-right">{part.unitPrice.toFixed(2)}</td>
                          <td className="border border-gray-300 px-3 py-2 text-right">{part.totalPrice.toFixed(2)}</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50">
                        <td colSpan="4" className="border border-gray-300 px-3 py-2 text-right font-medium">Parts Subtotal:</td>
                        <td className="border border-gray-300 px-3 py-2 text-right font-medium">
                          {jobCard.spareParts.reduce((sum, part) => sum + part.totalPrice, 0).toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              <div className="flex justify-end">
                <div className="w-full md:w-1/2">
                  <table className="w-full border-collapse">
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 font-medium">Subtotal:</td>
                        <td className="border border-gray-300 px-3 py-2 text-right">{calculateTotal().toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 font-medium">Tax (8%):</td>
                        <td className="border border-gray-300 px-3 py-2 text-right">{(calculateTotal() * 0.08).toFixed(2)}</td>
                      </tr>
                      <tr className="bg-gray-100">
                        <td className="border border-gray-300 px-3 py-2 font-medium">Total Amount:</td>
                        <td className="border border-gray-300 px-3 py-2 text-right font-bold">
                          {(calculateTotal() * 1.08).toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-black text-center">
                <p className="text-sm text-gray-600">Thank you for choosing IBILLS Auto Lanka</p>
                <p className="text-sm text-gray-600">Please bring this job card on your next visit</p>
              </div>
            </div>

            <div className="mt-4 flex justify-end no-print">
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Download Bill
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}