// components/ServiceCard.jsx (or .js)
export default function ServiceCard({ title, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      className="p-6 bg-gray-900 rounded-lg shadow-md cursor-pointer hover:bg-gray-800 transition"
    >
      <h3 className="text-xl font-bold text-red-500 mb-2">{title}</h3>
      <p className="text-white">{desc}</p>
    </div>
  );
}
