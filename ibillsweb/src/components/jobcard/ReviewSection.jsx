import React from 'react';


export const ReviewSection = () => (
  <div className="p-6 text-white bg-gray-900 shadow-lg rounded-2xl">
    <h3 className="mb-2 text-lg font-bold text-red-500">Leave a Review</h3>
    <textarea placeholder="Your feedback..." className="w-full p-2 text-white bg-black rounded"></textarea>
    <button className="p-2 mt-2 bg-red-600 rounded hover:bg-red-700">Submit Review</button>
  </div>
);