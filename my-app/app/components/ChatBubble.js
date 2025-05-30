import React from "react";
import { formatTimestamp } from "../utils/helpers";
import Image from "next/image";

const ChatBubble = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-5`}>
      <div
        className={`flex items-start ${
          isUser ? "flex-row-reverse" : "flex-row"
        } max-w-[85%]`}
      >
        {/* Avatar */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
            isUser
              ? "ml-3 mr-0 bg-gradient-to-r from-blue-500 to-blue-600"
              : "mr-3 bg-gradient-to-r from-teal-500 to-teal-600"
          }`}
        >
          {isUser ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <Image
              src="/images/logo.svg"
              alt="Sri Lanka Tourism Bot"
              width={28}
              height={28}
              className="p-0.5"
            />
          )}
        </div>

        {/* Message Bubble */}
        <div
          className={`rounded-2xl px-5 py-3 ${
            isUser
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none shadow-lg"
              : "bg-gradient-to-r from-teal-50 to-blue-50 border border-blue-100 text-gray-800 rounded-bl-none shadow-lg"
          }`}
        >
          {/* Message Content with Link Formatting */}
          <div className="text-sm leading-relaxed whitespace-pre-wrap">
            {formatMessageContent(message.content)}
          </div>

          {/* Timestamp */}
          <span
            className={`text-xs mt-2 block ${
              isUser ? "text-blue-100" : "text-gray-400"
            }`}
          >
            {formatTimestamp(message.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
};

// Helper function to format message content with links and styling
const formatMessageContent = (content) => {
  // Basic link detection regex
  const linkRegex = /(https?:\/\/[^\s]+)/g;

  // Split by links
  const parts = content.split(linkRegex);

  // Match all links
  const links = content.match(linkRegex) || [];

  // Build result with styled links
  const result = [];

  for (let i = 0; i < parts.length; i++) {
    // Add text part
    if (parts[i]) {
      result.push(<React.Fragment key={`text-${i}`}>{parts[i]}</React.Fragment>);
    }

    // Add link part if available
    if (links[i - 1]) {
      result.push(
        <a
          key={`link-${i}`}
          href={links[i - 1]}
          target="_blank"
          rel="noopener noreferrer"
          className={`underline font-medium transition-colors duration-200 ${
            parts[0] ? "text-blue-600 hover:text-blue-800" : "text-blue-100 hover:text-white"
          }`}
        >
          {links[i - 1]}
        </a>
      );
    }
  }

  return result;
};

export default ChatBubble;
