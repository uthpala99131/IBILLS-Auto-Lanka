"use client";

import '../app/globals.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";
import Packages from "../components/Packages";

const services = [
  { title: "Engine Diagnostics", desc: "Advanced computer diagnostics to find issues fast." },
  { title: "Oil & Filter Change", desc: "Keep your car running smooth and clean." },
  { title: "Brake Repair", desc: "Top-quality brake service for safety and performance." },
  { title: "Battery Replacement", desc: "Quick and reliable battery change for any model." },
  { title: "AC Repair", desc: "Stay cool with our efficient air conditioning service." },
  { title: "Tire Services", desc: "Rotation, balancing, and new tire installation." },
  { title: "Recovery", desc: "Recovery service." },
];

export default function Services() {
  return (
    <div className="flex flex-col min-h-screen text-white bg-black">
      <Navbar />

      <main className="flex-grow w-full px-4 mx-auto pb-15 pt-28 sm:px-6 lg:px-8 max-w-7xl">
        <h2 className="mb-12 text-4xl font-extrabold text-center text-red-600">
          Our Services
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              desc={service.desc}
            />
          ))}
        </div>
      </main>
          
          <Packages />
      <Footer />
    </div>
  );
}
