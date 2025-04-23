// components/JobCardForm.jsx
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const JobCardForm = () => {
  const [jobCardData, setJobCardData] = useState({
    customerName: "",
    vehicleModel: "",
    serviceType: "",
    date: "",
    timeSlot: "",
  });

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobCardData({
      ...jobCardData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/job-cards", jobCardData);
      if (response.status === 200) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error creating job card:", error);
    }
  };

  return (
    <div className="container p-4 mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-center">Create Job Card</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="customerName"
          value={jobCardData.customerName}
          onChange={handleInputChange}
          placeholder="Customer Name"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="vehicleModel"
          value={jobCardData.vehicleModel}
          onChange={handleInputChange}
          placeholder="Vehicle Model"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <select
          name="serviceType"
          value={jobCardData.serviceType}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Service Type</option>
          <option value="general">General Service</option>
          <option value="repair">Repair</option>
          <option value="accident">Accident</option>
        </select>
        <input
          type="date"
          name="date"
          value={jobCardData.date}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="time"
          name="timeSlot"
          value={jobCardData.timeSlot}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full p-3 text-white rounded-lg bg-primary"
        >
          Create Job Card
        </button>
      </form>
    </div>
  );
};

export default JobCardForm;
