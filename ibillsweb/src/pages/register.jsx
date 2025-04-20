import { useState } from 'react';
import '../app/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) router.push('/login');
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <section className="flex items-center justify-center flex-grow px-4 py-16 bg-black">
          <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
            <h2 className="mb-6 text-3xl font-extrabold text-center text-black">Create Account</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="w-full px-6 py-3 font-bold text-white transition duration-200 bg-red-600 rounded-lg hover:bg-red-700"
              >
                Register
              </button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <a href="/login" className="text-red-600 hover:underline">
                  Login here
                </a>
              </p>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

