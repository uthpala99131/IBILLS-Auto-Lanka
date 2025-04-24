import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Bookings', path: '/dashboard/bookings', icon: '📅' },
    { name: 'Messages', path: '/dashboard/messages', icon: '✉️' },
    { name: 'Revenue', path: '/dashboard/revenue', icon: '💰' },
    { name: 'Notifications', path: '/dashboard/notifications', icon: '🔔' },
    { name: 'Jobs', path: '/dashboard/jobs', icon: '🔧' },
    { name: 'Settings', path: '/dashboard/settings', icon: '⚙️' },
  ];

  return (
    <div className="fixed top-0 left-0 w-64 h-screen p-4 text-white bg-black">
      <div className="flex items-center justify-center mb-8">
        <h1 className="text-2xl font-bold text-red-500">IBILLS AUTO LANKA</h1>
      </div>
      
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.path}>
                <div className={`flex items-center p-3 rounded-lg hover:bg-red-500 hover:text-white cursor-pointer transition-colors ${router.pathname === item.path ? 'bg-red-600 text-white' : 'text-gray-300'}`}>
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </div>
              </Link>
            </li>
          ))}
          <li>
            <div className="flex items-center p-3 text-gray-300 transition-colors rounded-lg cursor-pointer hover:bg-red-500 hover:text-white">
              <span className="mr-3">🚪</span>
              <span>Logout</span>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;