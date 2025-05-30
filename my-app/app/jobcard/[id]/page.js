'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const JobCardPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [jobCard, setJobCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [review, setReview] = useState({ rating: 5, comment: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchJobCard = async () => {
      try {
        const response = await axios.get(`/api/jobcards/${id}`);
        setJobCard(response.data);
        
        // Fetch analytics if job card is found
        const analyticsResponse = await axios.get('/api/jobcards/analytics');
        setAnalytics(analyticsResponse.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch job card');
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobCard();
  }, [id]);

  const updateServiceStatus = async (serviceIndex, status) => {
    try {
      const response = await axios.post('/api/jobcards/update-service-status', {
        jobCardId: id,
        serviceIndex,
        status
      });
      setJobCard(response.data);
    } catch (err) {
      console.error('Error updating service status:', err);
    }
  };

  const handleGenerateBill = async () => {
    try {
      const response = await axios.put(`/api/jobcards/${id}/generate-bill`);
      setJobCard(response.data);
    } catch (err) {
      console.error('Error generating bill:', err);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/jobcards/add-review', {
        jobCardId: id,
        customerId: jobCard.customer._id,
        rating: review.rating,
        comment: review.comment
      });
      setShowReviewForm(false);
      alert('Thank you for your review!');
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  };

  const downloadBill = () => {
    if (!jobCard) return;
    
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(18);
    doc.setTextColor(255, 0, 0);
    doc.text('IBILLS Auto Lanka', 105, 15, { align: 'center' });
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Service Invoice', 105, 25, { align: 'center' });
    
    // Job Card Info
    doc.setFontSize(10);
    doc.text(`Job Number: ${jobCard.jobNumber}`, 14, 35);
    doc.text(`Date: ${new Date(jobCard.billDate).toLocaleDateString()}`, 14, 40);
    
    // Customer Info
    doc.text('Customer Information:', 14, 50);
    doc.text(`Name: ${jobCard.customer.name}`, 20, 55);
    doc.text(`Contact: ${jobCard.customer.contact}`, 20, 60);
    if (jobCard.customer.email) {
      doc.text(`Email: ${jobCard.customer.email}`, 20, 65);
    }
    
    // Vehicle Info
    doc.text('Vehicle Information:', 14, 75);
    doc.text(`Make/Model: ${jobCard.vehicle.make} ${jobCard.vehicle.model}`, 20, 80);
    doc.text(`Registration: ${jobCard.vehicle.registrationNo}`, 20, 85);
    doc.text(`Mileage: ${jobCard.vehicle.mileage} km`, 20, 90);
    
    // Services Table
    doc.text('Services:', 14, 100);
    const servicesData = jobCard.services.map(service => [
      service.name,
      service.description || '-',
      `LKR ${service.charge.toFixed(2)}`
    ]);
    
    doc.autoTable({
      startY: 105,
      head: [['Service', 'Description', 'Amount']],
      body: servicesData,
      theme: 'grid',
      headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] },
    });
    
    // Parts Table
    doc.text('Spare Parts:', 14, doc.lastAutoTable.finalY + 10);
    const partsData = jobCard.spareParts.map(part => [
      part.name,
      part.partNumber || '-',
      part.quantity,
      `LKR ${part.unitPrice.toFixed(2)}`,
      `LKR ${part.totalPrice.toFixed(2)}`
    ]);
    
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 15,
      head: [['Part Name', 'Part No', 'Qty', 'Unit Price', 'Total']],
      body: partsData,
      theme: 'grid',
      headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] },
    });
    
    // Total
    doc.setFontSize(12);
    doc.text(`Total Amount: LKR ${jobCard.totalAmount.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 20);
    
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Thank you for choosing IBILLS Auto Lanka!', 105, 285, { align: 'center' });
    
    doc.save(`IBILLS_Invoice_${jobCard.jobNumber}.pdf`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-black">Loading job card...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
          <h2 className="text-xl font-bold text-red-500 mb-2">Error</h2>
          <p className="text-black mb-4">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!jobCard) {
    return null;
  }

  // Prepare data for charts
  const makeDistributionChart = analytics && {
    labels: analytics.makeDistribution.map(item => item._id),
    datasets: [{
      data: analytics.makeDistribution.map(item => item.count),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#8AC24A', '#F06292', '#7986CB', '#A1887F'
      ],
    }]
  };

  const serviceDistributionChart = analytics && {
    labels: analytics.serviceDistribution.map(item => item._id),
    datasets: [{
      data: analytics.serviceDistribution.map(item => item.count),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#8AC24A', '#F06292', '#7986CB', '#A1887F'
      ],
    }]
  };

  const monthlyJobsChart = analytics && {
    labels: analytics.monthlyJobs.map(item => `${item._id.month}/${item._id.year}`),
    datasets: [{
      label: 'Jobs',
      data: analytics.monthlyJobs.map(item => item.count),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }]
  };

  const technicianWorkloadChart = analytics && {
    labels: analytics.technicianWorkload.map(item => item._id),
    datasets: [{
      label: 'Jobs',
      data: analytics.technicianWorkload.map(item => item.count),
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    }]
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Job Card Header */}
        <div className="bg-black text-white p-6 rounded-t-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold">Job Card: {jobCard.jobNumber}</h1>
              <p className="text-red-400">IBILLS Auto Lanka</p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                jobCard.status === 'Pending' ? 'bg-red-100 text-red-800' :
                jobCard.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                jobCard.status === 'Completed' ? 'bg-green-100 text-green-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {jobCard.status}
              </span>
            </div>
          </div>
        </div>
        
        {/* Job Card Body */}
        <div className="bg-white p-6 rounded-b-lg shadow-md">
          {/* Customer and Vehicle Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="border border-gray-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3 border-b pb-2 text-black">Customer Information</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {jobCard.customer.name}</p>
                <p><span className="font-medium">Contact:</span> {jobCard.customer.contact}</p>
                {jobCard.customer.email && <p><span className="font-medium">Email:</span> {jobCard.customer.email}</p>}
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3 border-b pb-2 text-black">Vehicle Information</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Make/Model:</span> {jobCard.vehicle.make} {jobCard.vehicle.model}</p>
                {jobCard.vehicle.year && <p><span className="font-medium">Year:</span> {jobCard.vehicle.year}</p>}
                <p><span className="font-medium">Registration No:</span> {jobCard.vehicle.registrationNo}</p>
                <p><span className="font-medium">Mileage:</span> {jobCard.vehicle.mileage} km</p>
                {jobCard.vehicle.vin && <p><span className="font-medium">VIN:</span> {jobCard.vehicle.vin}</p>}
              </div>
            </div>
          </div>
          
          {/* Technician and Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="border border-gray-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3 border-b pb-2 text-black">Technician</h2>
              <p><span className="font-medium">Name:</span> {jobCard.technician.name}</p>
              <p><span className="font-medium">ID:</span> {jobCard.technician.id}</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3 border-b pb-2 text-black">Dates</h2>
              <p><span className="font-medium">Start Date:</span> {new Date(jobCard.startDate).toLocaleDateString()}</p>
              {jobCard.endDate && <p><span className="font-medium">End Date:</span> {new Date(jobCard.endDate).toLocaleDateString()}</p>}
              {jobCard.billDate && <p><span className="font-medium">Bill Date:</span> {new Date(jobCard.billDate).toLocaleDateString()}</p>}
            </div>
          </div>
          
          {/* Services */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3 border-b pb-2 text-black">Services</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="text-white bg-black">
                  <tr>
                    <th className="px-4 py-3 text-left">Service</th>
                    <th className="px-4 py-3 text-left">Description</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Amount (LKR)</th>
                    {jobCard.status !== 'Billed' && <th className="px-4 py-3 text-left">Actions</th>}
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {jobCard.services.map((service, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3">{service.name}</td>
                      <td className="px-4 py-3">{service.description || '-'}</td>
                      <td className="px-4 py-3">
                        {jobCard.status === 'Billed' ? (
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            service.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            service.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {service.status}
                          </span>
                        ) : (
                          <select
                            value={service.status}
                            onChange={(e) => updateServiceStatus(index, e.target.value)}
                            className={`px-2 py-1 rounded text-xs ${
                              service.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              service.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                        )}
                      </td>
                      <td className="px-4 py-3">{service.charge.toFixed(2)}</td>
                      {jobCard.status !== 'Billed' && (
                        <td className="px-4 py-3">
                          <button
                            onClick={() => updateServiceStatus(index, 'Completed')}
                            className="text-green-600 hover:text-green-800 text-sm mr-2"
                          >
                            Complete
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Spare Parts */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3 border-b pb-2 text-black">Spare Parts</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="text-white bg-black">
                  <tr>
                    <th className="px-4 py-3 text-left">Part Name</th>
                    <th className="px-4 py-3 text-left">Part No</th>
                    <th className="px-4 py-3 text-left">Qty</th>
                    <th className="px-4 py-3 text-left">Unit Price (LKR)</th>
                    <th className="px-4 py-3 text-left">Total (LKR)</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {jobCard.spareParts.map((part, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3">{part.name}</td>
                      <td className="px-4 py-3">{part.partNumber || '-'}</td>
                      <td className="px-4 py-3">{part.quantity}</td>
                      <td className="px-4 py-3">{part.unitPrice.toFixed(2)}</td>
                      <td className="px-4 py-3">{part.totalPrice.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Future Services */}
          {jobCard.futureServices && jobCard.futureServices.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3 border-b pb-2 text-black">Recommended Future Services</h2>
              <div className="space-y-2">
                {jobCard.futureServices.map((service, index) => (
                  <div key={index} className="border border-gray-200 rounded p-3">
                    <p className="font-medium">{service.serviceType}</p>
                    <p className="text-sm text-gray-600">At {service.recommendedMileage} km</p>
                    {service.description && <p className="text-sm mt-1">{service.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Notes */}
          {jobCard.notes && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3 border-b pb-2 text-black">Notes</h2>
              <p className="whitespace-pre-line">{jobCard.notes}</p>
            </div>
          )}
          
          {/* Total and Actions */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="text-xl font-semibold mb-4 md:mb-0">
                Total Amount: <span className="text-red-500">LKR {jobCard.totalAmount.toFixed(2)}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                {jobCard.status === 'Completed' && !jobCard.billGenerated && (
                  <button
                    onClick={handleGenerateBill}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Generate Bill
                  </button>
                )}
                
                {jobCard.billGenerated && (
                  <button
                    onClick={downloadBill}
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                  >
                    Download Bill
                  </button>
                )}
                
                {jobCard.billGenerated && !showReviewForm && (
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300"
                  >
                    Leave a Review
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Review Form */}
          {showReviewForm && (
            <div className="mt-8 border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4 text-black">Rate Your Experience</h2>
              <form onSubmit={handleReviewSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReview({ ...review, rating: star })}
                        className="text-2xl focus:outline-none"
                      >
                        {star <= review.rating ? '★' : '☆'}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Comments</label>
                  <textarea
                    value={review.comment}
                    onChange={(e) => setReview({ ...review, comment: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    rows="3"
                    placeholder="Tell us about your experience..."
                  ></textarea>
                </div>
                
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Analytics Section */}
          {analytics && (
            <div className="mt-12">
              <h2 className="text-xl font-semibold mb-6 border-b pb-2 text-black">Service Analytics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                  <h3 className="text-lg font-medium mb-4 text-black">Vehicle Make Distribution</h3>
                  <div className="h-64">
                    {makeDistributionChart && <Pie data={makeDistributionChart} />}
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                  <h3 className="text-lg font-medium mb-4 text-black">Service Type Distribution</h3>
                  <div className="h-64">
                    {serviceDistributionChart && <Pie data={serviceDistributionChart} />}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                  <h3 className="text-lg font-medium mb-4 text-black">Monthly Jobs</h3>
                  <div className="h-64">
                    {monthlyJobsChart && <Bar data={monthlyJobsChart} />}
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                  <h3 className="text-lg font-medium mb-4 text-black">Technician Workload</h3>
                  <div className="h-64">
                    {technicianWorkloadChart && <Bar data={technicianWorkloadChart} />}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCardPage;