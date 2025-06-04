"use client";
import { useEffect, useState } from 'react';

const MessagesTable = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('/api/messages');
        const data = await res.json();
        if (res.ok) {
          setMessages(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (res.ok) {
        setMessages(messages.map(msg => 
          msg._id === id ? { ...msg, status: newStatus } : msg
        ));
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading messages...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        {/* ... rest of your table code ... */}
        <td className="px-4 py-3">
          <select 
            value={msg.status}
            onChange={(e) => handleStatusChange(msg._id, e.target.value)}
            className={`px-2 py-1 rounded-full text-xs ${
              msg.status === 'New' ? 'bg-red-100 text-red-800' :
              msg.status === 'Replied' ? 'bg-green-100 text-green-800' :
              'bg-yellow-100 text-yellow-800'
            }`}
          >
            <option value="New">New</option>
            <option value="Pending">Pending</option>
            <option value="Replied">Replied</option>
          </select>
        </td>
        {/* ... rest of your table code ... */}
      </table>
    </div>
  );
};

export default MessagesTable;