'use client';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import '../app/globals.css';

export default function Contact() {
  return (
    <main className="w-full max-w-xl px-3 py-1 mx-auto text-white sm:px-6 lg:px-8">
      <div className="p-6 space-y-5 bg-black shadow-xl rounded-xl sm:p-8">
        <h2 className="mb-4 text-3xl font-bold text-center text-red-600">Contact Us</h2>

        <div className="space-y-3 text-sm sm:text-base">
          <div className="flex items-center space-x-3">
            <FaPhoneAlt className="text-red-600" />
            <p className="text-white">0702086082</p>
          </div>

          <div className="flex items-center space-x-3">
            <FaEnvelope className="text-red-600" />
            <p className="text-white">isuruhemachandra25@gmail.com</p>
          </div>

          <div className="flex items-center space-x-3">
            <FaMapMarkerAlt className="text-red-600" />
            <p className="text-white">No.99/1/1, Medawela Road, Pujapitiya</p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-700">
          <h3 className="mb-2 text-sm font-semibold text-red-600 uppercase">Follow Us</h3>
          <div className="flex space-x-4 text-lg text-white">
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="hover:text-red-600">
              <FaWhatsapp />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-600">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-600">
              <FaInstagram />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-600">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
