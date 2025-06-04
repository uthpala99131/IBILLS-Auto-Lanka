'use client';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaFacebookF, FaInstagram, FaYoutube, FaPaperPlane } from 'react-icons/fa';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MessagesTable } from '../components/dashboard/Tables/MessagesTable';
export default function Contact() {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    phone: "",
    message: "" 
  });
  const [responseMsg, setResponseMsg] = useState("");
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch("/api/locations");
        const data = await res.json();
        setLocations(data);
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        setResponseMsg(data.message || "Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setResponseMsg(data.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setResponseMsg("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen pt-10 bg-black">
      <Navbar />

      <main className="flex-grow">
        <div className="relative w-full px-4 py-20 mx-auto max-w-7xl">
          {/* Compact Contact Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 gap-8 p-6 mb-12 bg-black border border-gray-800 shadow-xl bg-opacity-80 rounded-xl md:grid-cols-2 backdrop-blur-sm"
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
                      99/1/1 Medawela Road, Pujapitiya
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-4 mt-4 border-t border-gray-800">
                <h3 className="mb-3 text-sm font-semibold text-gray-400">FOLLOW US</h3>
                <div className="flex gap-4">
                  {[
                    { icon: <FaWhatsapp />, color: 'bg-green-600', href: 'https://wa.me/94702086082' },
                    { icon: <FaFacebookF />, color: 'bg-blue-600', href: 'https://facebook.com/ibillsautolanka' },
                    { icon: <FaInstagram />, color: 'bg-pink-600', href: 'https://instagram.com/ibillsautolanka' },
                    { icon: <FaYoutube />, color: 'bg-red-600', href: 'https://youtube.com/ibillsautolanka' },
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
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 text-white bg-gray-900 border border-gray-800 rounded-lg focus:ring-1 focus:ring-red-500"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 text-white bg-gray-900 border border-gray-800 rounded-lg focus:ring-1 focus:ring-red-500"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 text-white bg-gray-900 border border-gray-800 rounded-lg focus:ring-1 focus:ring-red-500"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2 text-white bg-gray-900 border border-gray-800 rounded-lg focus:ring-1 focus:ring-red-600"
                  required
                />
                {responseMsg && (
                  <p className={`text-sm ${responseMsg.includes("Failed") ? "text-red-600" : "text-green-500"}`}>
                    {responseMsg}
                  </p>
                )}
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

          {/* iBills Auto Lanka Main Location Section */}
          <div className="p-6 mb-12 bg-black border border-gray-800 rounded-xl">
            <h2 className="mb-6 text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-900 to-red-600">
              MAP
            </h2>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-red-500">Our Main Location</h3>
                <p className="text-gray-300">
                  Visit us at our headquarters in Medawala for all your automotive needs. 
                  Our expert team provides 24x7 recovery services, motor garage services, 
                  and comprehensive vehicle solutions.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="mt-1 text-red-500" />
                    <div>
                      <p className="font-medium text-white">Address:</p>
                      <p className="text-gray-300">99/1/1 Medawela Road, Pujapitiya, Sri Lanka</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <FaPhoneAlt className="mt-1 text-red-500" />
                    <div>
                      <p className="font-medium text-white">Phone:</p>
                      <p className="text-gray-300">070 208 6082 (24/7 Service)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <FaEnvelope className="mt-1 text-red-500" />
                    <div>
                      <p className="font-medium text-white">Email:</p>
                      <p className="text-gray-300">isuruhemachandra25@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-white">Operating Hours:</p>
                      <p className="text-gray-300">24 hours, 7 days a week</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="h-64 overflow-hidden rounded-lg md:h-full">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.123456789012!2d80.5859884!3d7.3780719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3430073a611b1%3A0x837449f823e54a59!2sIBILLS%20AUTO%20LANKA%20MOTOR%20GARAGE%2C%2024%20x%207%20RECOVERY%20SERVICE!5e0!3m2!1sen!2slk!4v1621234567890!5m2!1sen!2slk" 
                  width="100%" 
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Other Locations Section */}
          <div className="mt-12">
            <h2 className="mb-8 text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-600">
              Our Service Areas
            </h2>
            
            {loading ? (
              <div className="flex justify-center">
                <div className="w-8 h-8 border-4 border-red-500 rounded-full border-t-transparent animate-spin"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {locations.length > 0 ? (
                  locations.map((location, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="overflow-hidden border border-gray-800 rounded-lg shadow-lg bg-gradient-to-br from-gray-900 to-black"
                    >
                      <div className="h-48 overflow-hidden">
                        <iframe
                          src={location.mapEmbedUrl}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-semibold text-red-400">{location.name}</h3>
                        <p className="mt-2 text-gray-300">{location.address}</p>
                        <div className="flex items-center mt-3 text-gray-400">
                          <FaPhoneAlt className="mr-2 text-sm" />
                          <span>{location.phone}</span>
                        </div>
                        <div className="flex items-center mt-1 text-gray-400">
                          <FaEnvelope className="mr-2 text-sm" />
                          <span>{location.email}</span>
                        </div>
                        {location.hours && (
                          <div className="mt-3">
                            <p className="text-sm font-semibold text-gray-400">Service Hours:</p>
                            <p className="text-sm text-gray-300">{location.hours}</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-3 py-12 text-center">
                    <p className="text-gray-400">We currently serve the entire Kandy district with our mobile recovery services.</p>
                    <p className="mt-2 text-gray-500">Contact us for service outside our main location.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}