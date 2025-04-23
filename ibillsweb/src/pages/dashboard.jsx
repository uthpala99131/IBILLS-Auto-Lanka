// pages/dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [jobCards, setJobCards] = useState([]);

  useEffect(() => {
    const fetchJobCards = async () => {
      try {
        const response = await axios.get("/api/job-cards");
        setJobCards(response.data);
      } catch (error) {
        console.error("Error fetching job cards:", error);
      }
    };
    fetchJobCards();
  }, []);

  return (
    <div className="container p-4 mx-auto">
      <h2 className="mb-4 text-2xl font-bold text-center">Job Cards</h2>
      <div className="space-y-4">
        {jobCards.map((jobCard) => (
          <div key={jobCard._id} className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{jobCard.customerName}</h3>
            <p>Service Type: {jobCard.serviceType}</p>
            <p>Status: {jobCard.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
