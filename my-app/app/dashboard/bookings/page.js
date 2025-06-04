"use client";
import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/dashboard/Layout/Sidebar';
import Topbar from '../../components/dashboard/Layout/Topbar';



const BookingsTable = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/bookings", {
          method: "GET",
          credentials: "include", // Required for cookie-based sessions
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch bookings.");

        setBookings(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p className="text-gray-700">Loading bookings...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="overflow-x-auto">
      <div className="flex">
      <Sidebar />
      <div className="flex-1 pt-20 sm:pt-25 ml-64">
       

      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            <th className="px-6 py-3">Customer Name</th>
            <th className="px-6 py-3">User Name</th>
            <th className="px-6 py-3">User Email</th>
            <th className="px-6 py-3">Vehicle</th>
            <th className="px-6 py-3">Service</th>
         
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Created At</th>
            <th className="px-6 py-3">Updated At</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id} className="bg-white border-b">
              <td className="px-6 py-4">{booking.cus_name}</td>
              <td className="px-6 py-4">{booking.user?.name || 'N/A'}</td>
              <td className="px-6 py-4">{booking.user?.email || 'N/A'}</td>
              <td className="px-6 py-4">{booking.vehicleName}</td>
              <td className="px-6 py-4">{booking.serviceType}</td>
            
              <td className="px-6 py-4">Rs. {booking.price.toFixed(2)}</td>
              <td className="px-6 py-4">{new Date(booking.createdAt).toLocaleString()}</td>
              <td className="px-6 py-4">{new Date(booking.updatedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
    </div>
  );
};

export default BookingsTable;
