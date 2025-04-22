import { useState } from 'react';

export default function JobCardForm() {
  const [formData, setFormData] = useState({});
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/job-card', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const result = await res.json();
    alert('Job Card Submitted!');
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <input name="customerName" placeholder="Customer Name" onChange={handleChange} className="input" />
        <input name="contact" placeholder="Contact Number / Email" onChange={handleChange} className="input" />
        <input name="vehicleRegNo" placeholder="Vehicle Reg. No" onChange={handleChange} className="input" />
        <input name="vehicleModel" placeholder="Make & Model" onChange={handleChange} className="input" />
        <input name="chassisNo" placeholder="Chassis Number" onChange={handleChange} className="input" />
        <input name="engineNo" placeholder="Engine Number" onChange={handleChange} className="input" />
        <input name="mileage" placeholder="Mileage (KM)" onChange={handleChange} className="input" />
        <input name="fuelLevel" placeholder="Fuel Level" onChange={handleChange} className="input" />
        <input name="dropoffTime" type="datetime-local" onChange={handleChange} className="input" />
      </div>

      <div className="space-y-4">
        <select name="serviceType" onChange={handleChange} className="input">
          <option>Type of Service</option>
          <option>General Service</option>
          <option>Repair</option>
          <option>Accident</option>
          <option>Custom Job</option>
        </select>
        <textarea name="issuesReported" placeholder="Customer Complaints" onChange={handleChange} className="input" />
        <textarea name="additionalRequests" placeholder="Additional Requests" onChange={handleChange} className="input" />
        <textarea name="servicesToPerform" placeholder="List of Services" onChange={handleChange} className="input" />
        <textarea name="spareParts" placeholder="Spare Parts Used (name, qty, cost)" onChange={handleChange} className="input" />
        <input name="laborCharges" placeholder="Labor Charges" onChange={handleChange} className="input" />
        <input name="estimatedCost" placeholder="Estimated Cost" onChange={handleChange} className="input" />
        <input name="technician" placeholder="Technician Assigned" onChange={handleChange} className="input" />
        <input name="jobStatus" placeholder="Job Status (Pending/In Progress/etc)" onChange={handleChange} className="input" />
      </div>

      <button type="submit" className="p-2 text-white bg-red-600 hover:bg-red-700 rounded-xl col-span-full">
        Submit Job Card
      </button>
    </form>
  );
}