"use client";
import Link from 'next/link';
import React from 'react';
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative flex items-center justify-center h-screen overflow-hidden text-white bg-gradient-to-r from-blue-900 via-black to-red-600">
    
      <div className="absolute inset-0 z-0 p-15">
        <Image 
          src="/images/car1.png"
          alt="Auto Repair Service"
          layout="fill"
          className="opacity-75 pt-15"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-0 bg-black opacity-40"></div>

      {/* Content */}
      <motion.div
        className="z-10 px-6 text-center md:px-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Main Heading with Looping Animation */}
        <motion.h1
          className="mb-6 font-extrabold text-white text-5x1 md:text-8xl"
          animate={{
            scale: [1.1, 1.05, 1.1],
            rotate: [0, 3, -3, 0],
            transition: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          IBILLS AUTO LANKA
        </motion.h1>

        <motion.p
          className="mb-8 text-lg text-gray-200 md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Expert auto repairs at your service. Fast, reliable, and professional.
        </motion.p>

        {/* Action Button */}
        <Link href="/jobcard" passHref>
          <motion.button
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 text-white transition-all duration-300 transform bg-red-600 rounded-full shadow-2xl hover:bg-red-700"
          >
            Book Your Service
          </motion.button>
        </Link>
      </motion.div>

      {/* Animated Gear Icon */}
      <motion.div
        className="absolute transform -translate-x-1/2 bottom-16 left-1/2"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <motion.img
          src="/images/ibillslogo2.png"
          alt="Gear Icon"
          className="h-auto w-50"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        />
      </motion.div>
    </section>
  );
}
