"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative flex items-center justify-center h-screen overflow-hidden text-white bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/car.jpg" // Replace with your image path or URL
          alt="Vehicle Hero"
          fill
          className="object-cover opacity-30"
        />
      </div>

      {/* Content */}
      <motion.div
        className="z-10 px-4 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="mb-4 text-4xl font-bold text-white md:text-6xl">
          Precision Car Repair, Every Time
        </h2>
        <p className="mb-8 text-lg text-gray-200 md:text-xl">
          We bring professional car repair solutions to your doorstep.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 text-white transition bg-red-600 rounded-full shadow-lg hover:bg-red-700"
        >
          Book Now
        </motion.button>
      </motion.div>
    </section>
  );
}
