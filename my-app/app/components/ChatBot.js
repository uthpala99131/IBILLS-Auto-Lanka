import React, { useReducer, useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import ChatIcon from "./ChatIcon";

const initialState = {
  messages: [],
  isLoading: false,
};

const chatReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

const ChatBot = () => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages, isTyping]);

  useEffect(() => {
    if (isOpen && state.messages.length === 0) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
        const welcomeMessage = {
          id: Date.now().toString(),
          content: "Hello! Welcome to Ibills Auto Lanka Service Center. How can we assist you with your vehicle today? 🚗",
          role: "assistant",
          timestamp: new Date(),
        };
        dispatch({ type: "ADD_MESSAGE", payload: welcomeMessage });
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSendMessage = async (content) => {
    if (!content.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: content.trim(),
      role: "user",
      timestamp: new Date(),
    };
    dispatch({ type: "ADD_MESSAGE", payload: userMessage });

    dispatch({ type: "SET_LOADING", payload: true });
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat/route.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...state.messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      const typingDelay = 500 + Math.random() * 1000;

      const timer = setTimeout(() => {
        setIsTyping(false);
        const assistantMessage = {
          id: Date.now().toString(),
          content: data.response || data.message || "I didn't get that. Could you please repeat?",
          role: "assistant",
          timestamp: new Date(),
        };
        dispatch({ type: "ADD_MESSAGE", payload: assistantMessage });
      }, typingDelay);

      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsTyping(false);
      const errorMessage = {
        id: Date.now().toString(),
        content: "Sorry, we're experiencing technical difficulties. Please try again later or call our service center directly.",
        role: "assistant",
        timestamp: new Date(),
      };
      dispatch({ type: "ADD_MESSAGE", payload: errorMessage });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <ChatIcon onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />

      <div
        ref={chatContainerRef}
        className={`fixed bottom-20 right-4 w-11/12 max-w-sm sm:max-w-md max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-300 overflow-hidden transition-all duration-300 transform ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Chat Header */}
        <div className="relative z-20 flex items-center justify-between p-4 border-b border-gray-300 bg-gradient-to-r from-black to-red-800 text-white rounded-t-2xl">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3 shadow-md">
              <img 
                src="/images/logo1.png" 
                alt="Ibills Auto Lanka" 
                className="w-8 h-8"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20viewBox%3D%220%200%2032%2032%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20fill%3D%22%23ccc%22%20d%3D%22M16%200c8.837%200%2016%207.163%2016%2016s-7.163%2016-16%2016S0%2024.837%200%2016%207.163%200%2016%200zm0%202C8.268%202%202%208.268%202%2016s6.268%2014%2014%2014%2014-6.268%2014-14S23.732%202%2016%202z%22%2F%3E%3C%2Fsvg%3E";
                }}
              />
            </div>
            <div>
              <h3 className="font-bold text-lg">IBILLS AUTO LANKA</h3>
              <p className="text-xs text-red-200">Vehicle Service Center Assistant</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.open("https://www.ibills.lk", "_blank")}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
              aria-label="Visit Ibills Auto Lanka website"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
              aria-label="Close chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Chat Content */}
        <div className="relative flex-1 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 z-0 opacity-5 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-black rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-800 rounded-full -ml-32 -mb-32"></div>
            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-red-600 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          {/* Chat Messages */}
          <div className="relative z-10 flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-red-200 scrollbar-track-transparent">
            {state.messages.map((message) => (
              <ChatBubble key={message.id} message={message} />
            ))}

            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="flex items-start max-w-[85%]">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-md mr-3 bg-gradient-to-r from-red-800 to-black">
                    <img 
                      src="/images/logo1.png" 
                      alt="Assistant" 
                      className="w-8 h-8 p-0.5"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20viewBox%3D%220%200%2032%2032%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20fill%3D%22%23ccc%22%20d%3D%22M16%200c8.837%200%2016%207.163%2016%2016s-7.163%2016-16%2016S0%2024.837%200%2016%207.163%200%2016%200zm0%202C8.268%202%202%208.268%202%2016s6.268%2014%2014%2014%2014-6.268%2014-14S23.732%202%2016%202z%22%2F%3E%3C%2Fsvg%3E";
                      }}
                    />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-2 shadow-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat Input */}
        <div className="relative z-20">
          <ChatInput onSendMessage={handleSendMessage} isLoading={state.isLoading} />
        </div>
      </div>
    </div>
  );
};

export default ChatBot;