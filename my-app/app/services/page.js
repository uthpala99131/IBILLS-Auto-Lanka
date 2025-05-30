"use client";
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    y: -5,
    transition: { duration: 0.2 }
  }
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "backOut"
    }
  }
};

export default function Services() {
  const router = useRouter();

  const handleServiceClick = (title) => {
    const encodedTitle = encodeURIComponent(title);
    router.push(`/services/add?title=${encodedTitle}`);
  };

  return (
    <div className="flex flex-col min-h-screen text-white bg-black">
      <Navbar />

      <motion.main 
        initial="hidden"
        animate="visible"
        className="flex-grow w-full px-4 mx-auto pb-15 pt-28 sm:px-6 lg:px-8 max-w-7xl"
      >
        <motion.div variants={titleVariants}>
          <h2 className="mb-4 text-4xl font-extrabold text-center text-red-600">
            Our Services
          </h2>
          <motion.h2 
            className="mb-8 text-xl text-center text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Book your Service
          </motion.h2>
        </motion.div>

        <motion.div 
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
            >
              <ServiceCard
                title={service.title}
                desc={service.desc}
                onClick={() => handleServiceClick(service.title)}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.main>

      <Footer />
    </div>
  );
}