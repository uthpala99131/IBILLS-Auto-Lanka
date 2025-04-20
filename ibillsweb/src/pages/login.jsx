import { useState } from 'react';
import '../app/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
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
      <Navbar />
      <section className="px-6 py-16 bg-gray-100">
        <div className="max-w-md p-8 mx-auto bg-white rounded shadow-md">
          <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full p-3 border rounded" />
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full p-3 border rounded" />
            <button className="w-full px-6 py-3 font-bold text-white rounded bg-primary">Login</button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
