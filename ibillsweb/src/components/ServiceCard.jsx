// components/ServiceCard.jsx
export default function ServiceCard({ title, desc }) {
  return (
    <div className="text-white transition-all duration-300 border border-red-600 rounded-lg shadow-lg bg-black/80 hover:scale-105 hover:shadow-xl">
      <div className="p-6">
        <h3 className="mb-4 text-xl font-semibold text-red-600">{title}</h3>
        <p className="text-sm text-gray-300">{desc}</p>
      </div>
    </div>
  );
}
