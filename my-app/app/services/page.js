"use client";
import { useRouter } from 'next/navigation';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";

const services = [
  { title: "Recovery", desc: "24/7 towing and roadside assistance for emergencies." },
  { title: "Engine Diagnostics", desc: "Advanced computer diagnostics to find issues fast." },
  { title: "Oil & Filter Change", desc: "Keep your car running smooth and clean." },
  { title: "Brake Repair", desc: "Top-quality brake service for safety and performance." },
  { title: "Battery Replacement", desc: "Quick and reliable battery change for any model." },
  { title: "AC Repair", desc: "Stay cool with our efficient air conditioning service." },
  { title: "Tire Services", desc: "Rotation, balancing, and new tire installation." },
 
  { title: "Basic Maintenance", desc: "Routine maintenance to extend your vehicle's life." },
  { title: "Full Service", desc: "Comprehensive inspection and full system checks." },
  { title: "Engine Tune-Up", desc: "Boost performance with our expert engine tune-up." },
  { title: "Brake Service", desc: "Brake pad replacement and hydraulic system check." },
  { title: "Premium Detailing", desc: "Interior and exterior deep cleaning and polishing." }
];

export default function Services() {
  const router = useRouter();

  const handleServiceClick = (title) => {
    const encodedTitle = encodeURIComponent(title);
    router.push(`/services/add?title=${encodedTitle}`);
  };

  return (
    <div className="flex flex-col min-h-screen text-white bg-black">
      <Navbar />

      <main className="flex-grow w-full px-4 mx-auto pb-15 pt-28 sm:px-6 lg:px-8 max-w-7xl">
        <h2 className="mb-4 text-4xl font-extrabold text-center text-red-600">
          Our Services
        </h2>
        <h2 className="mb-8 text-1xl  text-center text-white-600">
           Book your Service
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              desc={service.desc}
              onClick={() => handleServiceClick(service.title)}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
