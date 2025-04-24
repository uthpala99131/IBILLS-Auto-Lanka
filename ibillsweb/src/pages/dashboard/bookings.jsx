
import Sidebar from '../../components/dashboard/Layout/Sidebar';
import Topbar from '../../components/dashboard/Layout/Topbar';
import BookingsTable  from '../../components/dashboard/Tables/BookingTables';
import React from 'react';
import '../../app/globals.css';

const BookingsPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Topbar />
        <main className="min-h-screen p-6 bg-gray-50">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-black">Bookings Management</h1>
            <button className="px-4 py-2 text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600">
              + Add New Booking
            </button>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <BookingsTable />
          </div>
        </main>
      </div>
    </div>
  );
};

export default BookingsPage;