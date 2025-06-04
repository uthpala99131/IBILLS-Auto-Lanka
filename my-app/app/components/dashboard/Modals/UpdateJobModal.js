import React, { useState, useEffect } from 'react';

const UpdateJobModal = ({ job, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    status: job?.status || '',
    sparePartName: job?.sparePartName || '',
    sparePartPrice: job?.sparePartPrice || '',
    technicianName: job?.technicianName || '',
    technicianPhone: job?.technicianPhone || '',
    technicianSalary: job?.technicianSalary || '',
    technicianReview: job?.technicianReview || '',
    futureServices: job?.futureServices || ''
  });

  const [spareParts, setSpareParts] = useState([]);
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    const fetchSpareParts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/spareparts');
        const data = await response.json();
        setSpareParts(data.data);
      } catch (error) {
        console.error('Error fetching spare parts:', error);
      }
    };
    fetchSpareParts();
  }, []);

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/technicians');
        const data = await response.json();
        setTechnicians(data.data);
      } catch (error) {
        console.error('Error fetching technicians:', error);
      }
    };
    fetchTechnicians();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'sparePartName') {
      const selectedSparePart = spareParts.find((part) => part.name === value);
      setFormData((prev) => ({
        ...prev,
        sparePartName: value,
        sparePartPrice: selectedSparePart ? selectedSparePart.price : ''
      }));
    }
    else if (name === 'technicianName') {
      const selectedTechnician = technicians.find((tech) => tech.name === value);
      setFormData((prev) => ({
        ...prev,
        technicianName: value,
        technicianPhone: selectedTechnician ? selectedTechnician.phoneNum : '',
        technicianSalary: selectedTechnician ? selectedTechnician.salary : ''
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${job._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const updatedJob = await response.json();
      onUpdate(updatedJob.data);
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-96 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Update Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Spare Part Name</label>
            <select
              name="sparePartName"
              value={formData.sparePartName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Select Spare Part</option>
              {spareParts.map((part) => (
                <option key={part._id} value={part.name}>
                  {part.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Spare Part Price (Rs)</label>
            <input
              type="number"
              name="sparePartPrice"
              value={formData.sparePartPrice}
              readOnly
              className="w-full px-3 py-2 border rounded-lg bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Technician Name</label>
            <select
              name="technicianName"
              value={formData.technicianName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Select Technician</option>
              {technicians.map((tech) => (
                <option key={tech._id} value={tech.name}>
                  {tech.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Technician Phone</label>
            <input
              type="text"
              name="technicianPhone"
              value={formData.technicianPhone}
              readOnly
              className="w-full px-3 py-2 border rounded-lg bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Technician Salary</label>
            <input
              type="text"
              name="technicianSalary"
              value={formData.technicianSalary}
              readOnly
              className="w-full px-3 py-2 border rounded-lg bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Technician Review</label>
            <textarea
              name="technicianReview"
              value={formData.technicianReview}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              rows="4"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Future Services</label>
            <textarea
              name="futureServices"
              value={formData.futureServices}
              onChange={handleChange}
              className="w-full px-2 py-2 border rounded-lg"
              rows="4"
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-2 sticky bottom-0 bg-white py-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-black transition-colors bg-white border border-black rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateJobModal;