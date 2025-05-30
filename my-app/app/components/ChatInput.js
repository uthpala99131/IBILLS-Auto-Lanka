import React, { useState, useRef, useEffect } from "react";

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  // Quick suggestions for car services
  const suggestions = [
    "Book a car service",
    "Service pricing",
    "Working hours",
    "Nearest service center",
    "Offers on oil change"
  ];

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = Math.min(textarea.scrollHeight, 120);
      textarea.style.height = `${newHeight}px`;
    }
  };

  useEffect(() => {
    resizeTextarea();
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onSendMessage(suggestion);
  };

  return (
    <div className="border-t border-blue-100 bg-white relative z-10 shadow-lg">
      {/* Quick Suggestions */}
      <div className="px-4 pt-3 pb-1 overflow-x-auto hide-scrollbar">
        <div className="flex space-x-2 whitespace-nowrap">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              disabled={isLoading}
              className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-teal-100 rounded-full text-xs font-medium text-blue-700 hover:from-blue-200 hover:to-teal-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-3 pt-2">
        <div
          className={`flex items-end rounded-xl border-2 ${
            isFocused
              ? "border-blue-400 ring-2 ring-blue-200 ring-opacity-50"
              : "border-blue-200 hover:border-blue-300"
          } bg-white shadow-sm overflow-hidden transition-all duration-300`}
        >
          {/* Message Icon */}
          <div className="pl-3 self-center text-teal-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </div>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            className="flex-grow px-3 py-3 bg-transparent outline-none resize-none min-h-[44px] max-h-[120px] text-gray-700 placeholder-blue-400 transition-all duration-200"
            placeholder="Ask about our car services..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows={1}
            disabled={isLoading}
            style={{ fontSize: "0.95rem" }}
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!message.trim() || isLoading}
            className={`px-4 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-medium transition-all duration-300 ${
              !message.trim() || isLoading
                ? "opacity-50 cursor-not-allowed"
                : "hover:opacity-90 active:scale-95"
            }`}
            aria-label="Send message"
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transform transition-transform group-hover:translate-x-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
