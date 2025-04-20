// app/recovery.jsx
import '../app/globals.css';

export default function Recovery() {
  return (
    <main className="flex-grow w-full max-w-6xl px-6 py-20 mx-auto text-white bg-black">
      <h2 className="mb-10 text-4xl font-bold text-center text-red-600">24/7 Vehicle Recovery Service</h2>
      
      <div className="grid items-center grid-cols-1 gap-12 md:grid-cols-2">
        
        {/* Left Side */}
        <div className="space-y-6">
          <h3 className="text-3xl font-semibold text-white">Stranded? We’ve got your back!</h3>
          <p className="text-lg leading-8 text-gray-300">
            Our reliable recovery service ensures your broken vehicle is safely transported and repaired.
            Whether it’s day or night, we’re just a call away.
          </p>
          
          <div className="inline-block px-5 py-3 text-lg font-bold text-white bg-red-700 rounded-lg shadow-lg">
            📞 Emergency Number: +94 702 222 222
          </div>

          <p className="text-xl font-bold text-red-500">Available <span className="px-2 py-1 text-black bg-white rounded">24/7</span> for Your Emergency Needs</p>

          <button className="px-6 py-3 mt-4 text-lg font-semibold text-white transition-all duration-300 bg-red-600 shadow-md hover:bg-red-700 rounded-xl">
            Book Recovery Now
          </button>
        </div>

        {/* Right Side */}
        <div className="flex justify-center">
          <img
            src="/images/rec.jpg" // Replace with your actual image path or external URL
            alt="Recovery Vehicle"
            className="h-auto max-w-full shadow-2xl rounded-xl"
          />
        </div>

      </div>
    </main>
  );
}
