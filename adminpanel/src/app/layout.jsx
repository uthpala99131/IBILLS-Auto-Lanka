import { useState } from 'react';
import Head from 'next/head';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

export default function Layout({ children, title = 'IBILLS AUTO LANKA - Admin' }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex h-screen bg-gray-100">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <div className="container mx-auto px-4 py-6">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}