// components/ServiceCard.jsx
"use client";

const ServiceCard = ({ title, desc }) => {
  return (
    <div className="p-6 transition bg-gray-100 rounded-lg shadow-md hover:bg-red-50">
      <h3 className="mb-2 text-xl font-semibold text-red-700">{title}</h3>
      <p className="text-gray-700">{desc}</p>
    </div>
  );
};

export default ServiceCard;
