import React, { useState } from 'react';

const ReviewForm = ({ title, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (rating && comment.trim()) {
      onSubmit({ rating, comment });
      setRating(0);
      setComment('');
    }
  };

  return (
    <div className="w-full max-w-4xl p-6 mx-auto mb-8 text-white border shadow-lg backdrop-blur-lg bg-white/10 border-white/20 rounded-3xl">
      <h3 className="mb-4 text-xl font-semibold text-red-400">{title}</h3>

      <div className="flex items-center mb-4 space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            type="button"
            className={`text-3xl transition ${
              rating >= star ? 'text-yellow-400' : 'text-white/40 hover:text-yellow-300'
            }`}
          >
            ★
          </button>
        ))}
      </div>

      <textarea
        placeholder="Share your thoughts..."
        className="w-full h-24 p-4 text-white resize-none bg-white/20 placeholder-white/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <div className="mt-4 text-right">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 font-semibold text-white transition bg-red-500 rounded-full hover:bg-red-600"
          type="button"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export const ReviewSection = () => {
  const handleTechnicianReview = (review) => {
    console.log('Technician Review:', review);
    // Backend integration or state logic here
  };

  const handleCompanyReview = (review) => {
    console.log('Company Review:', review);
    // Backend integration or state logic here
  };

  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-gray-900 to-gray-800">
      <h2 className="mb-12 text-4xl font-extrabold text-center text-white">Customer Reviews</h2>
      <ReviewForm title="Review for Technician" onSubmit={handleTechnicianReview} />
      <ReviewForm title="Review for Company" onSubmit={handleCompanyReview} />
    </div>
  );
};
