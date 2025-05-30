import Sidebar from '../../components/dashboard/Layout/Sidebar';
import Topbar from '../../components/dashboard/Layout/Topbar';

const SettingsPage = () => {
  const settingsSections = [
    { id: 'profile', name: 'Profile Settings', icon: '👤' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'business', name: 'Business Information', icon: '🏢' },
    { id: 'services', name: 'Services & Pricing', icon: '💰' },
    { id: 'team', name: 'Team Management', icon: '👥' },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Topbar />
        <main className="min-h-screen p-6 bg-gray-50">
          <h1 className="mb-6 text-2xl font-bold text-black">Settings</h1>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {settingsSections.map((section) => (
              <div 
                key={section.id} 
                className="p-6 transition-colors bg-white border border-gray-200 rounded-lg shadow cursor-pointer hover:border-red-300"
              >
                <div className="flex items-center">
                  <span className="mr-4 text-2xl">{section.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-black">{section.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">Configure {section.name.toLowerCase()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Account Section */}
          <div className="p-6 mt-8 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-xl font-semibold text-black">Account Information</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
                <input 
                  type="text" 
                  defaultValue="Admin User" 
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                <input 
                  type="email" 
                  defaultValue="admin@ibillsauto.lk" 
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Phone Number</label>
                <input 
                  type="tel" 
                  defaultValue="0771234567" 
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Role</label>
                <input 
                  type="text" 
                  defaultValue="Administrator" 
                  disabled 
                  className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button className="px-6 py-2 text-white transition-colors bg-red-500 rounded-md hover:bg-red-600">
                Save Changes
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;