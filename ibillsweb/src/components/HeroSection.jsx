"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Images/car.jpg" // Replace with your image path or URL
          alt="Vehicle Hero"
          fill
          className="object-cover opacity-30"
        />
      </div>

      {/* Content */}
      <motion.div
        className="z-10 text-center px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">
          Precision Car Repair, Every Time
        </h2>
        <p className="text-lg md:text-xl mb-8 text-gray-200">
          We bring professional car repair solutions to your doorstep.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-red-700 transition"
        >
          Book Now
        </motion.button>
      </motion.div>
    </section>
  );
}
