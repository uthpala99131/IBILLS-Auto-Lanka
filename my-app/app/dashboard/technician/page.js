"use client";
// components/dashboard/Pages/TechnicianPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/dashboard/Layout/Sidebar';
import Topbar from '../../components/dashboard/Layout/Topbar';
import TechnicianTable from '../../components/dashboard/Tables/TechnicianTable';
import AddTechnicianModal from '../../components/dashboard/Modals/AddTechnicianModal';

const TechnicianPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [technicians, setTechnicians] = useState([]); // State to hold technician data

  // Fetch technicians from the backend
  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/technicians');
        setTechnicians(response.data.data); // Assuming the backend returns data in this format
      } catch (error) {
        console.error('Error fetching technicians:', error);
      }
    };
    fetchTechnicians();
  }, []);

  // Function to handle adding a new technician
  const handleAddTechnician = async (newTechnician) => {
    try {
      const response = await axios.post('http://localhost:5000/api/technicians', newTechnician);
      setTechnicians((prevTechnicians) => [...prevTechnicians, response.data.data]); // Add new technician to state
      setIsModalOpen(false); // Close the modal after adding
    } catch (error) {
      console.error('Error adding technician:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Topbar />
        <main className="min-h-screen p-6 bg-gray-50">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-black">Technicians</h1>
            <div className="flex space-x-2">
              <button className="px-4 py-2 text-black transition-colors bg-white border border-black rounded-lg hover:bg-gray-100">
                Filter Technicians
              </button>
              <button
                className="px-4 py-2 text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600"
                onClick={() => setIsModalOpen(true)}
              >
                + Add Technician
              </button>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <TechnicianTable technicians={technicians} />
          </div>
        </main>
      </div>

      {/* Modal for adding a new technician */}
      {isModalOpen && (
        <AddTechnicianModal
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddTechnician}
        />
      )}
    </div>
  );
};

export default TechnicianPage;