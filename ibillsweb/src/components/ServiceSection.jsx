"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import '../app/globals.css';

const services = [
  { 
    title: "Engine Diagnostics", 
    desc: "Advanced computer diagnostics to find issues fast.",
    image: "/images/engine-diagnostics.jpg",
    icon: "⚙️"
  },
  { 
    title: "Oil & Filter", 
    desc: "Keep your car running smooth and clean.",
    image: "/images/oil-change.jpg",
    icon: "🛢️"
  },
  { 
    title: "Brake Repair", 
    desc: "Top-quality brake service for safety.",
    image: "/images/brake-repair.jpg",
    icon: "🛑"
  },
  { 
    title: "Battery", 
    desc: "Quick and reliable battery change.",
    image: "/images/b.jpg",
    icon: "🔋"
  },
  { 
    title: "AC Repair", 
    desc: "Stay cool with efficient AC service.",
    image: "/images/ac-repair.jpg",
    icon: "❄️"
  },
  { 
    title: "Tire Services", 
    desc: "Rotation, balancing, and installation.",
    image: "/images/tire-service.jpg",
    icon: "🛞"
  },
  { 
    title: "Recovery", 
    desc: "24/7 emergency recovery service.",
    image: "/images/rec2.jpg",
    icon: "🚑"
  },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState(0);
  const [angle, setAngle] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const containerRef = useRef(null);
  const radius = 220; // Reduced orbit radius

  // Tilt effect on mouse move
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  // Auto-rotate the services
  useEffect(() => {
    if (!isAutoRotating) return;
    
    const rotateInterval = setInterval(() => {
      setAngle(prev => (prev + 0.3) % 360);
    }, 50);

    return () => clearInterval(rotateInterval);
  }, [isAutoRotating]);

  // Auto-select services
  useEffect(() => {
    if (!isAutoRotating) return;
    
    const selectInterval = setInterval(() => {
      setSelectedService(prev => (prev + 1) % services.length);
    }, 4000);

    return () => clearInterval(selectInterval);
  }, [isAutoRotating]);

  const calculatePosition = (index, total) => {
    const currentAngle = angle + (index * (360 / total));
    const radian = (currentAngle * Math.PI) / 180;
    return {
      x: radius * Math.cos(radian),
      y: radius * Math.sin(radian),
      scale: 1 + 0.2 * Math.cos(radian),
      zIndex: Math.round(100 * Math.cos(radian)),
      opacity: 0.7 + 0.3 * Math.cos(radian)
    };
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleServiceClick = (index) => {
    setSelectedService(index);
    setIsAutoRotating(false);
    setTimeout(() => setIsAutoRotating(true), 5000);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[90vh] overflow-hidden text-white bg-gradient-to-br from-black-900 to-black-200">
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/carbon-fiber.png')] bg-repeat opacity-80"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-6xl px-4 py-12 mx-auto">
        <motion.h2 
          className="mb-4 text-4xl font-bold text-center text-transparent md:text-5xl bg-clip-text bg-gradient-to-r from-red-500 to-amber-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Premium Auto Services
        </motion.h2>
        
        <motion.p 
          className="max-w-2xl mx-auto mb-8 text-lg text-center text-gray-300 md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Cutting-edge automotive solutions with precision engineering.
        </motion.p>

        <motion.div
          ref={containerRef}
          className="relative flex items-center justify-center w-full h-[500px] md:h-[550px]"
          style={{ rotateX, rotateY }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={{ scale: 1.02 }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full opacity-30 bg-radial-gradient from-red-500/30 to-transparent blur-xl"></div>
          
          {/* Central Card - Smaller */}
          <motion.div 
            className="absolute z-30 flex flex-col items-center justify-center w-56 h-56 border border-gray-700 shadow-2xl md:w-64 md:h-64 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-red-900/30"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`selected-${selectedService}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center p-4 text-center md:p-6"
              >
                <div className="mb-2 text-4xl md:text-5xl">{services[selectedService].icon}</div>
                <h3 className="mb-1 text-xl font-bold text-transparent md:text-2xl bg-clip-text bg-gradient-to-r from-red-400 to-amber-400">
                  {services[selectedService].title}
                </h3>
                <p className="text-sm text-gray-300 md:text-base">{services[selectedService].desc}</p>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#ef4444" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-1.5 mt-4 text-xs md:text-sm font-medium text-white transition-all rounded-full bg-gradient-to-r from-red-600 to-amber-600 shadow-lg"
                >
                  Learn More
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Orbiting Service Cards - Smaller */}
          {services.map((service, index) => {
            const position = calculatePosition(index, services.length);
            const isSelected = selectedService === index;
            const distanceFromFront = Math.abs(position.x) / radius;
            
            return (
              <motion.div
                key={index}
                className={`absolute z-20 w-16 h-16 md:w-20 md:h-20 rounded-lg cursor-pointer overflow-hidden border ${isSelected ? 'border-2 border-amber-400 shadow-lg shadow-amber-400/30' : 'border-gray-600'}`}
                style={{
                  x: position.x,
                  y: position.y,
                  scale: position.scale,
                  zIndex: position.zIndex,
                  opacity: position.opacity,
                  rotateY: position.x > 0 ? 20 : -20,
                }}
                whileHover={{ 
                  scale: 1.2,
                  zIndex: 100,
                  opacity: 1,
                  boxShadow: "0 0 20px rgba(245, 158, 11, 0.5)"
                }}
                onClick={() => handleServiceClick(index)}
                initial={{ opacity: 0 }}
                animate={{ 
                  x: position.x,
                  y: position.y,
                  scale: position.scale,
                  opacity: position.opacity,
                  transition: { 
                    type: "spring", 
                    stiffness: 50 + (100 * distanceFromFront),
                    damping: 10 
                  }
                }}
              >
                <div className="relative w-full h-full group">
                  <div className="absolute inset-0 transition-all duration-500 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90" />
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-1 text-center">
                    <div className="mb-0.5 text-xl md:text-2xl">{service.icon}</div>
                    <h3 className="text-[0.6rem] md:text-xs font-bold text-white truncate">
                      {service.title}
                    </h3>
                  </div>
                  
                  {isSelected && (
                    <motion.div 
                      className="absolute top-0 left-0 right-0 h-1 bg-amber-400"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4 }}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
          
          {/* Decorative rings - Smaller */}
          <div className="absolute border border-gray-800 rounded-full w-[350px] h-[350px] md:w-[400px] md:h-[400px]"></div>
          <div className="absolute border border-gray-800 rounded-full w-[450px] h-[450px] md:w-[500px] md:h-[500px]"></div>
          <div className="absolute border border-dashed border-gray-700 rounded-full w-[550px] h-[550px] md:w-[600px] md:h-[600px]"></div>
        </motion.div>
        
        {/* Navigation dots */}
        <div className="flex justify-center mt-8 space-x-2 md:space-x-3">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => handleServiceClick(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${selectedService === index ? 'bg-amber-500 w-4 md:w-6' : 'bg-gray-600 hover:bg-gray-500'}`}
            />
          ))}
        </div>
      </div>
      
      {/* Simplified background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-gray-800 rounded-full"
            style={{
              width: 80 + i * 100,
              height: 80 + i * 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 50],
              y: [0, (Math.random() - 0.5) * 50],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>
    </div>
  );
}