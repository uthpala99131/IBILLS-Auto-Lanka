'use client';
import React, { useState, useEffect } from 'react';

export const BookingForm = () => {
  // States to store form values
  const [customerName, setCustomerName] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [issueDescription, setIssueDescription] = useState('');

  useEffect(() => {
    if (selectedDate) {
      checkAvailableSlots(selectedDate);
    }
  }, [selectedDate]);

  // Simulating availability check
  const checkAvailableSlots = (date) => {
    // Sample time slots for each date (this could be dynamic from an API)
    const availableTimes = ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM'];
    setAvailableSlots(availableTimes); // You can add an API call here to fetch real-time availability.
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., sending data to backend)
    alert('Service Booked!');
  };

  return (
    <div className="max-w-lg p-6 mx-auto text-white bg-black shadow-xl py-25 rounded-2xl">
      <h2 className="mb-4 text-2xl font-bold text-center text-red-600">Book a Service</h2>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        {/* Customer Name */}
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="p-3 text-white bg-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        {/* Vehicle Number */}
        <input
          type="text"
          placeholder="Vehicle Number"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
          className="p-3 text-white bg-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        {/* Vehicle Type */}
        <select
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          className="p-3 text-white bg-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
        >
          <option value="">Select Vehicle Type</option>
          <option value="Car">Car</option>
          <option value="Van">Van</option>
          <option value="Lorry">Lorry</option>
          <option value="Bus">Bus</option>
        </select>

        {/* Date Picker */}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-3 text-white bg-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        {/* Time Slot Picker */}
        {availableSlots.length > 0 && (
          <select
            value={selectedTimeSlot}
            onChange={(e) => setSelectedTimeSlot(e.target.value)}
            className="p-3 text-white bg-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <option value="">Select Time Slot</option>
            {availableSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        )}

        {/* Issue Description */}
        <textarea
          placeholder="Describe the issue"
          value={issueDescription}
          onChange={(e) => setIssueDescription(e.target.value)}
          className="p-3 text-white bg-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="p-3 font-bold text-white transition duration-300 bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};
