import { useState } from 'react';
import '../app/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <section className="flex items-center justify-center flex-grow px-4 py-16 bg-black">
          <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
            <h2 className="mb-6 text-3xl font-extrabold text-center text-black">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
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
                Login
              </button>
            </form>

            {/* Forgot Password and Register links */}
            <div className="mt-4 text-center">
              <a href="/forgot-password" className="text-sm text-red-600 hover:text-red-700">
                Forgot Password?
              </a>
            </div>
            <div className="mt-2 text-center">
              <p className="text-sm text-black">
                Don't have an account?{' '}
                <a href="/register" className="text-red-600 hover:text-red-700">
                  Register here
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

