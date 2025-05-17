'use client';
import { useState, useEffect } from 'react';
import UserTable from '@/components/UserTable';
import { useRouter } from 'next/navigation';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Get token from wherever you store it (localStorage, cookies, etc.)
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('Not authenticated');
        }

        const response = await fetch('/api/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          if (response.status === 401) {
            // Handle unauthorized (redirect to login)
            router.push('/login');
            return;
          }
          throw new Error(`Failed to fetch users: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!Array.isArray(data)) {
          throw new Error('Expected an array of users');
        }
        
        setUsers(data);
        setError(null);
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-700">{error}</p>
          {error.includes('Not authenticated') && (
            <button
              onClick={() => router.push('/login')}
              className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              Login
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      <UserTable users={users} />
    </div>
  );
}