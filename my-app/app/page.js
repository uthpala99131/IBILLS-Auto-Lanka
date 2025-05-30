"use client";
import Link from 'next/link';
import React from 'react';
import { motion } from "framer-motion";
import Image from "next/image";
import ChatBot from './components/ChatBot';

export default function Home() {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const floating = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className='relative flex items-center justify-center min-h-screen overflow-hidden text-white bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800'>
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
      >
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white opacity-10"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 100],
              y: [0, (Math.random() - 0.5) * 100],
              rotate: [0, 360]
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
        ))}
      </motion.div>

      {/* Car image with parallax effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ y: 0 }}
        animate={{ y: [0, -50, 0] }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        <Image 
          src="/car1.png"
          alt="Auto Repair Service"
          layout="fill"
          objectFit="cover"
          className="opacity-30"
        />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="z-10 w-full max-w-6xl px-6 py-20 mx-auto text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <motion.p 
            className="mb-2 text-xl font-semibold text-red-400 uppercase tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Professional Auto Services
          </motion.p>
        </motion.div>

        <motion.div variants={item}>
          <motion.h1
            className="mb-6 text-5xl font-extrabold leading-tight md:text-7xl"
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-300">
              IBILLS AUTO
            </span>{' '}
            <span className="block mt-2">LANKA</span>
          </motion.h1>
        </motion.div>

        <motion.div variants={item}>
          <motion.p
            className="max-w-2xl mx-auto mb-12 text-lg text-gray-300 md:text-xl"
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Your trusted partner for premium vehicle maintenance and repair services. 
            Experience excellence on wheels with our expert technicians.
          </motion.p>
        </motion.div>

        <motion.div variants={item}>
          <Link href="/services" passHref>
            <motion.button
              className="relative px-12 py-4 overflow-hidden text-lg font-semibold text-white transition-all duration-300 bg-red-600 rounded-full group hover:bg-red-700"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(220, 38, 38, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Book Your Service</span>
              <motion.span 
                className="absolute inset-0 z-0 bg-gradient-to-r from-red-700 to-yellow-500 opacity-0 group-hover:opacity-100"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%", opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>
          </Link>
        </motion.div>

        {/* Animated logo */}
        <motion.div 
          className="mt-20"
          variants={floating}
        >
          <motion.img
            src="/ibillslogo2.png"
            alt="IBills Logo"
            className="w-24 h-24 mx-auto"
            whileHover={{ 
              rotate: 360,
              transition: { duration: 1 }
            }}
          />
        </motion.div>
      </motion.div>

      {/* Floating action elements */}
      <motion.div 
        className="absolute bottom-8 right-8"
        variants={floating}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex items-center justify-center w-16 h-16 bg-red-600 rounded-full shadow-lg cursor-pointer"
        >
          <span className="text-xl">📞</span>
        </motion.div>
      </motion.div>

      <ChatBot />
    </div>
  );
}