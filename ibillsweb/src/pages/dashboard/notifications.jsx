import '../../app/globals.css';
import Sidebar from '../../components/dashboard/Layout/Sidebar';
import Topbar from '../../components/dashboard/Layout/Topbar';

const NotificationsPage = () => {
  const notifications = [
    { 
      id: 1, 
      title: 'New Booking Received', 
      message: 'John Doe booked an oil change service for tomorrow', 
      time: '10 minutes ago', 
      read: false 
    },
    { 
      id: 2, 
      title: 'Service Completed', 
      message: 'Brake replacement for Honda Civic (RJ-1234) completed', 
      time: '2 hours ago', 
      read: true 
    },
    { 
      id: 3, 
      title: 'Payment Received', 
      message: 'Payment of LKR 12,500 received for invoice #INV-2023-056', 
      time: '1 day ago', 
      read: true 
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Topbar />
        <main className="min-h-screen p-6 bg-gray-50">
          <h1 className="mb-6 text-2xl font-bold text-black">Notifications</h1>
          
          <div className="p-6 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-black">All Notifications</h2>
              <button className="text-red-500 hover:text-red-700">
                Mark all as read
              </button>
            </div>
            
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 border rounded-lg ${notification.read ? 'bg-white border-gray-200' : 'bg-red-50 border-red-200'}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className={`font-medium ${notification.read ? 'text-black' : 'text-red-600'}`}>
                        {notification.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                    </div>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                  {!notification.read && (
                    <button className="mt-2 text-xs text-red-500 hover:text-red-700">
                      Mark as read
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotificationsPage;