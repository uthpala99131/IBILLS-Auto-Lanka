import { useState } from 'react'

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.json()
    alert(data.message)
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
        className="mb-2 w-full border p-2"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="mb-2 w-full border p-2"
        required
      />
      <textarea
        name="message"
        placeholder="Message"
        onChange={handleChange}
        className="mb-2 w-full border p-2"
        required
      />
      <button type="submit" className="bg-red-500 text-white p-2 w-full">
        Send
      </button>
    </form>
  )
}

export default ContactForm

