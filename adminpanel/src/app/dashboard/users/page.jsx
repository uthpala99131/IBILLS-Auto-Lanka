'use client';
import { useState, useEffect } from 'react';
import UserTable from '@/components/UserTable';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchUsers = async () => {
      if (status === 'unauthenticated') {
        setError('Please sign in to view users');
        setLoading(false);
        return;
      }

      if (status === 'loading') return;

      try {
        const response = await fetch('/api/users', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.accessToken}`
          }
        });
        
        if (!response.ok) {
          if (response.status === 401) {
            // Token might be expired, try refreshing
            const refreshResponse = await fetch('/api/auth/session?update');
            const refreshedSession = await refreshResponse.json();
            
            if (!refreshResponse.ok) {
              throw new Error('Session expired. Please sign in again.');
            }
            
            // Retry with new token
            const retryResponse = await fetch('/api/users', {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refreshedSession.accessToken}`
              }
            });
            
            if (!retryResponse.ok) throw new Error(`Failed to fetch users: ${retryResponse.status}`);
            const data = await retryResponse.json();
            setUsers(data);
            return;
          }
          throw new Error(`Failed to fetch users: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!Array.isArray(data)) {
          throw new Error('Expected an array of users but got something else');
        }
        
        setUsers(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [status, session]);

  if (status === 'unauthenticated') {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">You need to be signed in to view this page</p>
        </div>
        <button
          onClick={() => signIn()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Sign In
        </button>
      </div>
    );
  }

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
          <p className="text-red-700">Error: {error}</p>
          {error.includes('Session expired') && (
            <button
              onClick={() => signIn()}
              className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              Sign In Again
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