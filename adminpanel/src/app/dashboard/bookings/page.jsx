// app/bookings/page.js
'use client';
import { useState, useEffect } from 'react';
import BookingTable from '@/components/BookingTable';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/bookings');
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch bookings');
        }

        const data = await response.json();
        setBookings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Bookings</h1>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {error ? (
          <div className="p-4 text-red-500">{error}</div>
        ) : (
          <BookingTable bookings={bookings} loading={loading} />
        )}
      </div>
    </div>
  );
}