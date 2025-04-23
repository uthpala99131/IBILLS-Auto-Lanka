'use client';
import React from 'react';

export const ScheduleDisplay = () => (
  <div className="max-w-lg p-6 mx-auto text-white bg-black shadow-lg rounded-2xl">
    <h3 className="mb-6 text-2xl font-extrabold text-center text-red-600">Upcoming Services</h3>
    
    <div className="space-y-4">
      {/* Service 1 */}
      <div className="flex items-center justify-between p-4 transition-all duration-300 bg-gray-800 rounded-lg shadow-lg service-item hover:scale-105">
        <div className="service-details">
          <h4 className="text-lg font-semibold text-red-600">Oil Change</h4>
          <p className="text-sm text-gray-300">Service Type</p>
        </div>
        <div className="font-bold text-white kilometers">
          <p className="text-2xl">10,000 km</p>
        </div>
      </div>

      {/* Service 2 */}
      <div className="flex items-center justify-between p-4 transition-all duration-300 bg-gray-800 rounded-lg shadow-lg service-item hover:scale-105">
        <div className="service-details">
          <h4 className="text-lg font-semibold text-red-600">Tire Rotation</h4>
          <p className="text-sm text-gray-300">Service Type</p>
        </div>
        <div className="font-bold text-white kilometers">
          <p className="text-2xl">20,000 km</p>
        </div>
      </div>
      
      {/* Service 3 */}
      <div className="flex items-center justify-between p-4 transition-all duration-300 bg-gray-800 rounded-lg shadow-lg service-item hover:scale-105">
        <div className="service-details">
          <h4 className="text-lg font-semibold text-red-600">Engine Check</h4>
          <p className="text-sm text-gray-300">Service Type</p>
        </div>
        <div className="font-bold text-white kilometers">
          <p className="text-2xl">30,000 km</p>
        </div>
      </div>
    </div>
  </div>
);
