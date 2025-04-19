// components/ServiceCard.jsx
export default function ServiceCard({ title, desc }) {
    return (
      <div className="p-6 border rounded-lg shadow hover:shadow-xl transition">
        <h3 className="text-2xl font-semibold text-red-600 mb-2">{title}</h3>
        <p className="text-gray-700">{desc}</p>
      </div>
    );
  }
  