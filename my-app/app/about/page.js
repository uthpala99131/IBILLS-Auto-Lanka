// app/about.jsx
"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const statsVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      duration: 0.3
    }
  }
};

export default function About() {
  return (
    <div className="flex flex-col pt-10 min-h-screen bg-black text-white">
      <Navbar />
      
      <motion.main 
        className="flex-grow w-full max-w-6xl px-6 mx-auto py-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="mb-16">
          <motion.h2 
            className="mb-6 text-5xl font-bold text-center text-red-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            About <span className="text-white">IBILLS</span>
          </motion.h2>
          
          <motion.p 
            className="max-w-3xl mx-auto mb-12 text-xl leading-8 text-center text-gray-300"
            variants={itemVariants}
          >
            IBILLS is a trusted name in car repair services. We combine cutting-edge technology with decades of experience to deliver unparalleled automotive care. Our certified professionals offer precision diagnostics, expert maintenance, and completely transparent pricing.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
          variants={containerVariants}
        >
          <motion.div 
            className="p-8 bg-gray-900 rounded-lg shadow-lg border border-gray-800"
            variants={statsVariants}
            whileHover="hover"
          >
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-3xl font-bold rounded-full bg-red-600/20 text-red-500">
              2+
            </div>
            <h3 className="mb-3 text-2xl font-semibold text-center text-red-500">Years Experience</h3>
            <p className="text-gray-400">We have been helping vehicle owners for over 2 years with expert care.</p>
          </motion.div>
          
          <motion.div 
            className="p-8 bg-gray-900 rounded-lg shadow-lg border border-gray-800"
            variants={statsVariants}
            whileHover="hover"
          >
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-3xl font-bold rounded-full bg-red-600/20 text-red-500">
              100%
            </div>
            <h3 className="mb-3 text-2xl font-semibold text-center text-red-500">Certified Mechanics</h3>
            <p className="text-gray-400">Every technician is ASE-certified and receives ongoing training.</p>
          </motion.div>
          
          <motion.div 
            className="p-8 bg-gray-900 rounded-lg shadow-lg border border-gray-800"
            variants={statsVariants}
            whileHover="hover"
          >
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-3xl font-bold rounded-full bg-red-600/20 text-red-500">
              5K+
            </div>
            <h3 className="mb-3 text-2xl font-semibold text-center text-red-500">Satisfied Clients</h3>
            <p className="text-gray-400">We have served thousands of customers who trust us with their vehicles.</p>
          </motion.div>
        </motion.div>

        {/* Additional animated section */}
        <motion.div 
          className="mt-24 p-12 bg-gradient-to-r from-gray-900 to-black rounded-xl border border-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="mb-6 text-3xl font-bold text-center text-white">
            Our <span className="text-red-500">Mission</span>
          </h3>
          <p className="max-w-4xl mx-auto text-xl leading-8 text-center text-gray-300">
            At IBILLS, We are committed to revolutionizing car maintenance through innovative technology, honest service, and a customer-first approach. We believe in building long-term relationships based on trust and exceptional service.
          </p>
        </motion.div>
      </motion.main>

      <Footer />
    </div>
  );
}