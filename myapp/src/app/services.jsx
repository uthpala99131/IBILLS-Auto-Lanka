// app/services.jsx
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
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center text-red-700 mb-10">Our Services</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={index} title={service.title} desc={service.desc} />
        ))}
      </div>
    </section>
  );
}
