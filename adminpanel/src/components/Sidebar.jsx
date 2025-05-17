'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiCalendar, FiMail, FiUsers, FiTool, FiDollarSign, FiBell, FiSettings, FiLogOut } from 'react-icons/fi';

export default function Sidebar() {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiHome /> },
    { name: 'Bookings', path: '/dashboard/bookings', icon: <FiCalendar /> },
    { name: 'Messages', path: '/dashboard/messages', icon: <FiMail /> },
    { name: 'Users', path: '/dashboard/users', icon: <FiUsers /> },
    { name: 'Technicians', path: '/dashboard/technicians', icon: <FiTool /> },
    { name: 'Revenue', path: '/dashboard/revenue', icon: <FiDollarSign /> },
    { name: 'Notifications', path: '/dashboard/notifications', icon: <FiBell /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <FiSettings /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="w-64 bg-black text-white flex flex-col">
      <div className="p-4 flex items-center justify-center border-b border-gray-800">
        <h1 className="text-xl font-bold text-red-500">IBILLS AUTO LANKA</h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-2">
          {navItems.map((item) => (
            <li key={item.name} className="mb-1">
              <Link
                href={item.path}
                className={`flex items-center p-3 rounded-lg transition-colors ${pathname === item.path ? 'bg-red-600 text-white' : 'hover:bg-gray-800'}`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center w-full p-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <span className="mr-3"><FiLogOut /></span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}