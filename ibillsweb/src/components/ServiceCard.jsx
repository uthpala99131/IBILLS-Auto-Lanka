// app/services.jsx
import "../app/globals.css";
import ServiceCard from "../components/ServiceCard";

const services = [
  { title: "Engine Diagnostics", desc: "Advanced computer diagnostics to find issues fast." },
  { title: "Oil & Filter Change", desc: "Keep your car running smooth and clean." },
  { title: "Brake Repair", desc: "Top-quality brake service for safety and performance." },
  { title: "Battery Replacement", desc: "Quick and reliable battery change for any model." },
  { title: "AC Repair", desc: "Stay cool with our efficient air conditioning service." },
  { title: "Tire Services", desc: "Rotation, balancing, and new tire installation." },
];

export default function Services() {
  return (
  
      <main className="flex-grow py-30 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <h2 className="text-4xl font-bold text-center text-red-700 mb-12">
          Our Services
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={index} title={service.title} desc={service.desc} />
          ))}
        </div>
      </main>

  );
}
