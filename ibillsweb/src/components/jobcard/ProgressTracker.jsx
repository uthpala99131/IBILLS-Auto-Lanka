'use client';
import React from 'react';

export const ProgressTracker = () => {
  // Estimated date (for each step)
  const estimatedTimes = {
    inspection: '2025-05-01, 10:00 AM',
    partsReplacement: '2025-05-02, 2:00 PM',
    testing: '2025-05-03, 11:00 AM',
    completed: '2025-05-04, 9:00 AM',
  };

  return (
    <div className="max-w-lg p-6 mx-auto text-white bg-black shadow-xl rounded-2xl">
      <h3 className="mb-6 text-2xl font-extrabold text-center text-red-600">Service Progress</h3>
      
      {/* Progress Bar */}
      <div className="relative pt-1">
        <div className="flex items-center justify-between mb-2">
          <div className="inline-block px-2 py-1 text-xs font-semibold text-red-600 uppercase bg-red-100 rounded-full">
            Inspection
          </div>
          <div className="inline-block px-2 py-1 text-xs font-semibold text-yellow-500 uppercase bg-yellow-100 rounded-full">
            Parts Replacement
          </div>
          <div className="inline-block px-2 py-1 text-xs font-semibold text-blue-500 uppercase bg-blue-100 rounded-full">
            Testing
          </div>
          <div className="inline-block px-2 py-1 text-xs font-semibold text-gray-600 uppercase bg-gray-100 rounded-full">
            Completed
          </div>
        </div>

        <div className="flex mb-4">
          <div className="w-full bg-gray-300 rounded-full h-2.5">
            <div
              className="bg-red-600 h-2.5 rounded-full"
              style={{ width: '25%' }} // Update based on progress
            ></div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="space-y-6">
        {/* Step 1: Inspection */}
        <div className="flex items-center p-4 space-x-4 transition-all duration-300 bg-gray-800 rounded-lg shadow-lg progress-step hover:bg-gray-700">
          <div className="flex items-center justify-center w-10 h-10 font-bold text-white bg-green-600 rounded-full progress-circle">
            ✅
          </div>
          <div className="flex-1 progress-text">
            <h4 className="text-lg font-semibold text-red-600">Inspection</h4>
            <p className="text-sm text-gray-400">The vehicle is being inspected for issues.</p>
            <p className="text-xs text-gray-500">Estimated Time: {estimatedTimes.inspection}</p>
          </div>
        </div>

        {/* Step 2: Parts Replacement */}
        <div className="flex items-center p-4 space-x-4 transition-all duration-300 bg-gray-800 rounded-lg shadow-lg progress-step hover:bg-gray-700">
          <div className="flex items-center justify-center w-10 h-10 font-bold text-white bg-yellow-500 rounded-full progress-circle animate-pulse">
            ⏳
          </div>
          <div className="flex-1 progress-text">
            <h4 className="text-lg font-semibold text-red-600">Parts Replacement</h4>
            <p className="text-sm text-gray-400">Replacement of necessary parts is in progress.</p>
            <p className="text-xs text-gray-500">Estimated Time: {estimatedTimes.partsReplacement}</p>
          </div>
        </div>

        {/* Step 3: Testing */}
        <div className="flex items-center p-4 space-x-4 transition-all duration-300 bg-gray-800 rounded-lg shadow-lg progress-step hover:bg-gray-700">
          <div className="flex items-center justify-center w-10 h-10 font-bold text-white bg-blue-600 rounded-full progress-circle animate-bounce">
            ⏳
          </div>
          <div className="flex-1 progress-text">
            <h4 className="text-lg font-semibold text-red-600">Testing</h4>
            <p className="text-sm text-gray-400">Testing the vehicle after repairs to ensure everything works perfectly.</p>
            <p className="text-xs text-gray-500">Estimated Time: {estimatedTimes.testing}</p>
          </div>
        </div>

        {/* Step 4: Completed */}
        <div className="flex items-center p-4 space-x-4 transition-all duration-300 bg-gray-800 rounded-lg shadow-lg progress-step hover:bg-gray-700">
          <div className="flex items-center justify-center w-10 h-10 font-bold text-white bg-gray-600 rounded-full progress-circle">
            ✔️
          </div>
          <div className="flex-1 progress-text">
            <h4 className="text-lg font-semibold text-red-600">Completed</h4>
            <p className="text-sm text-gray-400">The service has been completed, and the vehicle is ready for delivery.</p>
            <p className="text-xs text-gray-500">Estimated Time: {estimatedTimes.completed}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
