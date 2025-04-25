const MessagesTable = () => {
    const messages = [
      { 
        id: 1, 
        name: 'John Doe', 
        email: 'john@example.com', 
        phone: '0771234567', 
        message: 'Need an oil change for my Toyota Corolla', 
        date: '2023-06-15', 
        status: 'New' 
      },
      { 
        id: 2, 
        name: 'Jane Smith', 
        email: 'jane@example.com', 
        phone: '0777654321', 
        message: 'Brakes making noise on my Honda Civic', 
        date: '2023-06-14', 
        status: 'Replied' 
      },
      { 
        id: 3, 
        name: 'Robert Johnson', 
        email: 'robert@example.com', 
        phone: '0771122334', 
        message: 'AC not cooling properly', 
        date: '2023-06-13', 
        status: 'Pending' 
      },
    ];
  
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="text-white bg-black">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Contact</th>
              <th className="px-4 py-3 text-left">Message</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {messages.map((msg) => (
              <tr key={msg.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">{msg.id}</td>
                <td className="px-4 py-3 font-medium">{msg.name}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span>{msg.email}</span>
                    <span className="text-sm">{msg.phone}</span>
                  </div>
                </td>
                <td className="max-w-xs px-4 py-3 truncate">{msg.message}</td>
                <td className="px-4 py-3">{msg.date}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    msg.status === 'New' ? 'bg-red-100 text-red-800' :
                    msg.status === 'Replied' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {msg.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="mr-2 text-red-500 hover:text-red-700">Reply</button>
                  <button className="text-black hover:text-gray-700">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default MessagesTable;