"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function AddBookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedService = searchParams.get("title");

  const [formData, setFormData] = useState({
    cus_name: "",
    vehicleName: "",
    serviceType: "",
    price: 0
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch user from localStorage and set name
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setFormData((prev) => ({
        ...prev,
        cus_name: user.username || ""
      }));
    }
  }, []);

  // Fetch price for selected service and set type + price
  useEffect(() => {
    const fetchServicePrice = async () => {
      if (!selectedService) return;
      try {
        const res = await fetch(`http://localhost:5000/api/services`);
        const data = await res.json();
        const foundService = data.data.find(
          (service) => service.name === selectedService
        );
        if (foundService) {
          setFormData((prev) => ({
            ...prev,
            serviceType: selectedService,
            price: foundService.price
          }));
        }
      } catch (err) {
        setError("Failed to load service data.");
      }
    };

    fetchServicePrice();
  }, [selectedService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create booking.");

      router.push("/bookings");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-30 bg-black"> {/* Added black background for the entire page */}
      <div className="max-w-xl mx-auto pt-6 p-6  bg-white rounded-md shadow-md text-black">
        <h2 className="text-2xl font-bold mb-4 text-center text-red-600">Book a Service</h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium mb-1">Customer Name</label>
            <input
              type="text"
              name="cus_name"
              value={formData.cus_name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Vehicle Name</label>
            <input
              type="text"
              name="vehicleName"
              value={formData.vehicleName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Service Type</label>
            <input
              type="text"
              name="serviceType"
              value={formData.serviceType}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
            />
          </div>

          <div className="mb-6">
            <label className="block font-medium mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}