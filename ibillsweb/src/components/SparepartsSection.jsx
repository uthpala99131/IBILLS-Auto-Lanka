'use client';
import Link from 'next/link';
import '../app/globals.css';

export default function SpareParts() {
  return (
    <section className="w-full px-4 py-16 bg-gradient-to-b from-black via-gray-900 to-black sm:px-6 lg:px-8">
      <div className="max-w-5xl p-10 mx-auto text-center border border-red-700 shadow-2xl bg-black/80 rounded-2xl">
        <h2 className="mb-4 text-4xl font-extrabold tracking-wide text-red-600 animate-fade-in">
          All Kind of Spare Parts
        </h2>

        <p className="mb-8 text-lg leading-relaxed text-gray-300 animate-fade-in-delay">
          Find premium quality automotive spare parts tailored for every need.
        </p>

        <div className="grid justify-center grid-cols-2 gap-4 mb-8 font-medium text-center text-white sm:grid-cols-3 md:grid-cols-4">
          <span className="px-4 py-2 bg-gray-800 rounded-lg">Engine Oil</span>
          <span className="px-4 py-2 bg-gray-800 rounded-lg">Suspension Systems</span>
          <span className="px-4 py-2 bg-gray-800 rounded-lg">Coolants</span>
          <span className="px-4 py-2 bg-gray-800 rounded-lg">Brake Pads</span>
          <span className="px-4 py-2 bg-gray-800 rounded-lg">Rotors</span>
          <span className="px-4 py-2 bg-gray-800 rounded-lg">Steering</span>
          <span className="px-4 py-2 bg-gray-800 rounded-lg">Spark Plugs</span>
          <span className="px-4 py-2 bg-gray-800 rounded-lg">Batteries</span>
          <span className="px-4 py-2 bg-gray-800 rounded-lg">Oil Filters</span>
        </div>

        <Link
          href="/parts"
          className="inline-block px-8 py-3 font-semibold text-white transition duration-300 ease-in-out bg-red-600 rounded-full shadow-md hover:bg-red-700"
        >
          Explore Spare Parts
        </Link>
      </div>
    </section>
  );
}
