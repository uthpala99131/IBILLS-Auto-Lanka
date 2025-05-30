"use client";
import { useEffect, useState } from "react";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/bookings", {
          method: "GET",
          credentials: "include", // to send cookies
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

  return (
    <div className="min-h-screen px-6 py-12 text-white bg-black mt-10">
      <h1 className="text-3xl font-bold mb-6 text-red-600">My Bookings</h1>

      {loading ? (
        <p>Loading bookings...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="p-4 border border-gray-600 rounded bg-gray-900"
            >
              <p><strong>Customer Name:</strong> {booking.cus_name}</p>
              <p><strong>Vehicle Name:</strong> {booking.vehicleName}</p>
              <p><strong>Service Type:</strong> {booking.serviceType}</p>
              <p><strong>Price:</strong> Rs. {booking.price}</p>
              <p><strong>Status:</strong> {booking.status}</p>
              <p><strong>Booked At:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
