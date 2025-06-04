// components/dashboard/Pages/ServicePage.js
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/dashboard/Layout/Sidebar';
import Topbar from '../../components/dashboard/Layout/Topbar';
import ServiceTable from '../../components/dashboard/Tables/ServiceTable';
import AddServiceModal from '../../components/dashboard/Modals/AddServiceModal';

const ServicePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState([]); // State to hold service data

  // Fetch services from the backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/services');
        setServices(response.data.data); // Assuming the backend returns data in this format
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  // Function to handle adding a new service
  const handleAddService = async (newService) => {
    try {
      const response = await axios.post('http://localhost:5000/api/services', newService);
      setServices((prevServices) => [...prevServices, response.data.data]); // Add new service to state
      setIsModalOpen(false); // Close the modal after adding
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Topbar />
        <main className="min-h-screen p-6 bg-gray-50">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-black">Services</h1>
            <div className="flex space-x-2">
              <button className="px-4 py-2 text-black transition-colors bg-white border border-black rounded-lg hover:bg-gray-100">
                Filter Services
              </button>
              <button
                className="px-4 py-2 text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600"
                onClick={() => setIsModalOpen(true)}
              >
                + Add Service
              </button>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <ServiceTable services={services} />
          </div>
        </main>
      </div>

      {/* Modal for adding a new service */}
      {isModalOpen && (
        <AddServiceModal
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddService}
        />
      )}
    </div>
  );
};

export default ServicePage;