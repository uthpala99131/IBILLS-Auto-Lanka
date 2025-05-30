import React, { useState, useEffect } from 'react';

const ChatIcon = ({ onClick, isOpen }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1500);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  return (
    <button
      onClick={() => {
        onClick();
        setIsAnimating(false);
      }}
      className={`fixed bottom-5 right-5 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-xl flex items-center justify-center transition-all duration-300 z-50 border-2 border-white ${
        isAnimating
          ? "animate-bounce shadow-blue-500/50"
          : isOpen
          ? "hover:shadow-lg hover:scale-105"
          : "hover:shadow-2xl hover:scale-105"
      }`}
      aria-label={isOpen ? "Close chat" : "Open chat"}
    >
      {isOpen ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : (
        <div className="relative w-10 h-10 flex items-center justify-center">
          <div
            className={`absolute inset-0 bg-white/20 rounded-full ${
              isAnimating ? "animate-ping" : ""
            }`}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border border-white"></div>
        </div>
      )}
    </button>
  );
};

export default ChatIcon;
