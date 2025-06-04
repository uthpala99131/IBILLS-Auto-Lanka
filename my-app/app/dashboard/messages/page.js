"use client";
import Sidebar from '../../components/dashboard/Layout/Sidebar';
import Topbar from '../../components/dashboard/Layout/Topbar';
import MessagesTable from '../../components/dashboard/Tables/MessagesTable';

const MessagesPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Topbar />
        <main className="min-h-screen p-6 bg-gray-50">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-black">Customer Messages</h1>
            <div className="flex space-x-2">
              <button className="px-4 py-2 text-black transition-colors bg-white border border-black rounded-lg hover:bg-gray-100">
                Filter Messages
              </button>
              <button className="px-4 py-2 text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600">
                + Compose
              </button>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <MessagesTable />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MessagesPage;