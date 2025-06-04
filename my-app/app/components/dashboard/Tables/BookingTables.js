const BookingsTable = () => {

  
    return (
      <div className="overflow-x-auto ">
        <table className="min-w-full  bg-white">
          <thead className="text-white bg-black">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Vehicle</th>
              <th className="px-4 py-3 text-left">Service</th>
              <th className="px-4 py-3 text-left">Date</th>
             
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