'use client';
import { useState } from "react";
import '../app/globals.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    setResponseMsg(data.message);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-30 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto w-full">
        <h2 className="text-4xl font-bold text-center text-red-700 mb-10">Contact Us</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            rows="5"
            required
          ></textarea>

          <button type="submit" className="bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700">
            Send Message
          </button>

          {responseMsg && <p className="text-green-600 mt-4">{responseMsg}</p>}
        </form>
      </main>

      <Footer />
    </div>
  );
}
