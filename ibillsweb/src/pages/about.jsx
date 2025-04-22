// app/about.jsx
import '../app/globals.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow w-full max-w-6xl px-6 mx-auto py-30">
        <h2 className="mb-6 text-4xl font-bold text-center text-red-700">About IBILLS</h2>
        <p className="mb-12 text-lg leading-8 text-center text-gray-700">
          IBILLS is a trusted name in car repair services. We combine technology and experience
          to deliver the best automotive care in the industry. Our trained professionals offer
          precision diagnostics, expert maintenance, and transparent pricing.
        </p>

        <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-3">
          <div className="p-6 border rounded-lg shadow">
            <h3 className="text-2xl font-semibold text-red-600">10+ Years Experience</h3>
            <p>We've been helping vehicle owners for over a decade.</p>
          </div>
          <div className="p-6 border rounded-lg shadow">
            <h3 className="text-2xl font-semibold text-red-600">Certified Mechanics</h3>
            <p>Every mechanic is certified and trained for quality service.</p>
          </div>
          <div className="p-6 border rounded-lg shadow">
            <h3 className="text-2xl font-semibold text-red-600">Thousands of Clients</h3>
            <p>We’ve served thousands of satisfied customers.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
