'use client';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaFacebookF, FaInstagram, FaYoutube, FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';
import '../app/globals.css';

export default function Contact() {
  return (
    <div className="relative w-full min-h-[60vh] overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-50">
        <div className="absolute inset-0 bg-[url('/images/car3.png')] bg-cover bg-center" />
      </div>

      {/* Main Content - Full Width */}
      <div className="relative z-10 w-full px-4 py-2 mx-auto max-w-7xl">
        {/* Compact Contact Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 gap-8 p-6 bg-black border border-gray-800 shadow-xl bg-opacity-80 rounded-xl md:grid-cols-2 backdrop-blur-sm"
        >
          {/* Left Column - Contact Info */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">
              Get In Touch
            </h2>
            
            {/* Phone - Highlighted */}
            <div className="p-3 rounded-lg bg-gradient-to-r from-red-900 to-red-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-full bg-opacity-20">
                  <FaPhoneAlt className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-300">Phone</p>
                  <a href="tel:0702086082" className="text-lg font-semibold text-white hover:underline">
                    070 208 6082
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="p-3 transition-colors duration-200 border border-gray-800 rounded-lg hover:border-red-600">
              <div className="flex items-center gap-3">
                <div className="p-2 text-red-500 bg-red-500 rounded-full bg-opacity-10">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-sm text-gray-300">Email</p>
                  <a href="mailto:isuruhemachandra25@gmail.com" className="text-white hover:text-red-400 hover:underline">
                    isuruhemachandra25@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="p-3 transition-colors duration-200 border border-gray-800 rounded-lg hover:border-red-600">
              <div className="flex items-center gap-3">
                <div className="p-2 text-red-500 bg-red-500 rounded-full bg-opacity-10">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-sm text-gray-300">Address</p>
                  <p className="text-white">
                    No.99/1/1, Medawela Road, Pujapitiya
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-4 mt-4 border-t border-gray-800">
              <h3 className="mb-3 text-sm font-semibold text-gray-400">FOLLOW US</h3>
              <div className="flex gap-4">
                {[
                  { icon: <FaWhatsapp />, color: 'bg-green-600', href: 'https://wa.me/1234567890' },
                  { icon: <FaFacebookF />, color: 'bg-blue-600', href: 'https://facebook.com' },
                  { icon: <FaInstagram />, color: 'bg-pink-600', href: 'https://instagram.com' },
                  { icon: <FaYoutube />, color: 'bg-red-600', href: 'https://youtube.com' },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className={`p-2 text-white rounded-full ${social.color} hover:shadow-lg transition-all`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Compact Form */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Send a Message</h3>
            <form className="space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-2 text-white bg-gray-900 border border-gray-800 rounded-lg focus:ring-1 focus:ring-red-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-2 text-white bg-gray-900 border border-gray-800 rounded-lg focus:ring-1 focus:ring-red-500"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-2 text-white bg-gray-900 border border-gray-800 rounded-lg focus:ring-1 focus:ring-red-500"
              />
              <textarea
                placeholder="Your Message"
                rows="3"
                className="w-full p-2 text-white bg-gray-900 border border-gray-800 rounded-lg focus:ring-1 focus:ring-red-500"
              />
              <button
                type="submit"
                className="flex items-center justify-center w-full gap-2 px-4 py-2 text-white transition-all bg-red-600 rounded-lg hover:bg-red-700"
              >
                <FaPaperPlane />
                Send Message
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}