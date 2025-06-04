// components/dashboard/Pages/SparePartPage.js
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/dashboard/Layout/Sidebar';
import Topbar from '../../components/dashboard/Layout/Topbar';
import SparePartTable from '../../components/dashboard/Tables/SparePartTable';
import AddSparePartModal from '../../components/dashboard/Modals/AddSparePartModal';

const SparePartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spareParts, setSpareParts] = useState([]); // State to hold spare part data

  // Fetch spare parts from the backend
  useEffect(() => {
    const fetchSpareParts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/spareparts');
        setSpareParts(response.data.data); // Assuming the backend returns data in this format
      } catch (error) {
        console.error('Error fetching spare parts:', error);
      }
    };
    fetchSpareParts();
  }, []);

  // Function to handle adding a new spare part
  const handleAddSparePart = async (newSparePart) => {
    try {
      const response = await axios.post('http://localhost:5000/api/spareparts', newSparePart);
      setSpareParts((prevSpareParts) => [...prevSpareParts, response.data.data]); // Add new spare part to state
      setIsModalOpen(false); // Close the modal after adding
    } catch (error) {
      console.error('Error adding spare part:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Topbar />
        <main className="min-h-screen p-6 bg-gray-50">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-black">Spare Parts</h1>
            <div className="flex space-x-2">
              <button className="px-4 py-2 text-black transition-colors bg-white border border-black rounded-lg hover:bg-gray-100">
                Filter Spare Parts
              </button>
              <button
                className="px-4 py-2 text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600"
                onClick={() => setIsModalOpen(true)}
              >
                + Add Spare Part
              </button>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <SparePartTable spareParts={spareParts} />
          </div>
        </main>
      </div>

      {/* Modal for adding a new spare part */}
      {isModalOpen && (
        <AddSparePartModal
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddSparePart}
        />
      )}
    </div>
  );
};

export default SparePartPage;