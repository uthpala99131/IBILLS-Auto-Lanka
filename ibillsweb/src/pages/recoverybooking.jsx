'use client';
import React, { useState } from 'react';
import '../app/globals.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

export default function RecoveryVehicleBookingPage() {
  const [customerName, setCustomerName] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedTimeSlot) {
      alert("Please select both date and time.");
      return;
    }

    alert('Recovery Vehicle Booked!');
  };

  return (
    <div className="flex flex-col min-h-screen text-white bg-black">
      <Navbar />

      <main className="flex-grow px-6 pt-20">
        <h2 className="mb-8 text-3xl font-bold text-center text-red-600">Recovery Vehicle Booking</h2>

        <div className="grid max-w-5xl grid-cols-1 gap-10 mx-auto md:grid-cols-2">
          {/* Booking Form */}
          <form
            className="flex flex-col p-6 space-y-4 bg-gray-900 shadow-lg rounded-2xl"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="p-3 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
            />

            <input
              type="text"
              placeholder="Vehicle Number"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              className="p-3 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
            />

            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="p-3 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="">Select Vehicle Type</option>
              <option value="Car">Car</option>
              <option value="Van">Van</option>
              <option value="Lorry">Lorry</option>
              <option value="Bus">Bus</option>
            </select>

            {/* Date Picker */}
            <div className="relative">
              <FaCalendarAlt className="absolute text-white top-4 left-3" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3 pl-10 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            {/* Time Picker */}
            <div className="relative">
              <label className="flex items-center mb-1 text-sm font-medium text-white">
                <FaClock className="mr-2 text-white" /> Select Time
              </label>
              <TimePicker
                onChange={setSelectedTimeSlot}
                value={selectedTimeSlot}
                disableClock={false}
                clearIcon={null}
                className="w-full px-3 py-2 text-white bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <button
              type="submit"
              className="p-3 mt-4 font-bold transition duration-300 bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              Book Recovery Vehicle
            </button>
          </form>

          {/* Image Section */}
          <div className="flex items-center justify-center">
            <img
              src="/packages/rec.jpg"
              alt="Recovery Vehicle"
              className="object-cover w-full shadow-lg rounded-2xl"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
