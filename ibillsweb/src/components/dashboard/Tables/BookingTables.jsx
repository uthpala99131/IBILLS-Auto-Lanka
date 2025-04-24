const BookingsTable = () => {
    const bookings = [
      { id: 1, customer: 'Kamal', vehicle: 'Toyota Corolla', service: 'Oil Change', date: '2023-06-15', status: 'Confirmed' },
      { id: 2, customer: 'Nimal', vehicle: 'Honda Civic', service: 'Brake Inspection', date: '2023-06-16', status: 'Pending' },
      { id: 3, customer: 'Kasun', vehicle: 'Nissan Sunny', service: 'Tire Rotation', date: '2023-06-17', status: 'Completed' },
      { id: 4, customer: 'Lakmal', vehicle: 'Mitsubishi Lancer', service: 'Engine Tune-up', date: '2023-06-18', status: 'Confirmed' },
      { id: 5, customer: 'Herath', vehicle: 'Suzuki Swift', service: 'AC Service', date: '2023-06-19', status: 'Pending' },
    ];
  
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="text-white bg-black">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Vehicle</th>
              <th className="px-4 py-3 text-left">Service</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">{booking.id}</td>
                <td className="px-4 py-3">{booking.customer}</td>
                <td className="px-4 py-3">{booking.vehicle}</td>
                <td className="px-4 py-3">{booking.service}</td>
                <td className="px-4 py-3">{booking.date}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                    booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="mr-2 text-red-500 hover:text-red-700">Edit</button>
                  <button className="text-black hover:text-gray-700">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default BookingsTable;