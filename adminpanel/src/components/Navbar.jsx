'use client';
import { FiBell, FiUser } from 'react-icons/fi';

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <FiBell className="text-gray-600" />
          </button>
          
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-2">
              <FiUser className="text-red-600" />
            </div>
            <span className="text-sm font-medium">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}