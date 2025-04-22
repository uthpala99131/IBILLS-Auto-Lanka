'use client';
import Link from 'next/link';
import '../app/globals.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SparePartsPage() {
  const spareParts = [
    'Engine Oil',
    'Brake Pads',
    'Oil Filters',
    'Coolants',
    'Spark Plugs',
    'Timing Belts',
    'Fuel Pumps',
    'Clutch Kits',
    'Air Filters',
    'Batteries',
  ];

  const vehicleBrands = [
    'Toyota', 'Honda', 'Nissan', 'Ford', 'Mazda',
    'BMW', 'Kia', 'Hyundai', 'Suzuki', 'Mitsubishi'
  ];

  return (
    <div className="flex flex-col min-h-screen">
          <Navbar />
          
    
    <main className="w-full min-h-screen px-6 py-20 mx-auto text-white bg-black max-w-7xl">
      <h2 className="mb-12 text-4xl font-bold text-center text-red-600">
        Spare Parts Dashboard
      </h2>

      <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
        {/* Left Section - 1/3 */}
        <div className="space-y-6">
          <button className="w-full py-4 text-lg font-semibold text-white transition bg-red-600 rounded-xl hover:bg-red-700">
            🔧 Calculate Vehicle Generation
          </button>
          <button className="w-full py-4 text-lg font-semibold text-white transition bg-red-600 rounded-xl hover:bg-red-700">
            🔍 Research Vehicle Info
          </button>
          <button className="w-full py-4 text-lg font-semibold text-white transition bg-red-600 rounded-xl hover:bg-red-700">
            🏪 Find Spare Parts Shops
          </button>
        </div>

        {/* Right Section - 2/3 */}
        <div className="p-6 border border-red-600 shadow-lg bg-white/5 rounded-2xl">
          <h3 className="mb-4 text-2xl font-bold text-red-500">Available Spare Parts</h3>
          <ul className="mb-6 space-y-1 text-white list-disc list-inside">
            {spareParts.map((part, index) => (
              <li key={index}>{part}</li>
            ))}
          </ul>

          <h4 className="mb-2 text-lg font-semibold text-gray-300">Compatible Vehicle Brands</h4>
          <div className="flex flex-wrap gap-3 text-sm text-gray-400">
            {vehicleBrands.map((brand, index) => (
              <span key={index} className="px-3 py-1 bg-gray-800 rounded-lg">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>

          <Footer />
        </div>
  );
}
