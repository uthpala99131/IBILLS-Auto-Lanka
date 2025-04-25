'use client';
import { useState } from "react";
import '../app/globals.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    phone: "",
    message: "" 
  });
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
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow w-full max-w-2xl px-4 pt-20 mx-auto sm:px-6 lg:px-8">
        <h2 className="mb-10 text-4xl font-bold text-center text-red-700">Contact Us</h2>

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
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded"
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

          <button type="submit" className="px-6 py-2 text-white bg-red-600 rounded hover:bg-red-700">
            Send Message
          </button>

          {responseMsg && <p className="mt-4 text-green-600">{responseMsg}</p>}
        </form>
      </main>

      <Footer />
    </div>
  );
}