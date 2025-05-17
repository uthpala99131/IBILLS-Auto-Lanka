'use client';
import { FiMail, FiUser, FiPhone, FiMessageSquare, FiClock } from 'react-icons/fi';

export default function MessageTable({ messages = [] }) {
  // Ensure messages is always an array and has proper fallbacks
  const safeMessages = Array.isArray(messages) ? messages : [];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center">
                <FiUser className="mr-1" /> Name
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center">
                <FiMail className="mr-1" /> Email
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center">
                <FiPhone className="mr-1" /> Phone
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center">
                <FiMessageSquare className="mr-1" /> Message
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center">
                <FiClock className="mr-1" /> Date
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {safeMessages.length > 0 ? (
            safeMessages.map((message) => (
              <tr key={message._id || message.id} className={message.isRead ? 'bg-white' : 'bg-red-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {message.name || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {message.email || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {message.phone || 'N/A'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="line-clamp-2">{message.description || 'No message'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {message.createdAt ? new Date(message.createdAt).toLocaleDateString() : 'N/A'}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                No messages found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}