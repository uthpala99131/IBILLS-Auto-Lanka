"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getJobCard, updateJobCard } from '../../lib/api';
import JobCardForm from '../../components/jobcard/JobCardForm';
import ProgressTracker from '../../components/jobcard/ProgressTracker';
import ServiceList from '../../components/jobcard/ServiceList';
import PartsList from '../../components/jobcard/PartsList';
import BillGenerator from '../../components/jobcard/BillGenerator';
import FutureServices from '../../components/jobcard/FutureServices';
import ReviewSection from '../../components/jobcard/ReviewSection';

export default function JobCardDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [jobCard, setJobCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    if (!id) return;

    const fetchJobCard = async () => {
      try {
        const data = await getJobCard(id);
        setJobCard(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching job card:', err);
        setError(err.message || 'Failed to load job card');
        setLoading(false);
      }
    };

    fetchJobCard();
  }, [id]);

  const handleUpdate = async (updatedData) => {
    try {
      const updatedJobCard = await updateJobCard(id, updatedData);
      setJobCard(updatedJobCard);
      return updatedJobCard;
    } catch (err) {
      console.error('Error updating job card:', err);
      throw err;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse bg-white rounded-lg shadow p-6">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !jobCard) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <svg className="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Error loading job card</h3>
            <p className="mt-1 text-gray-500">{error || 'Job card not found'}</p>
            <div className="mt-6">
              <button
                onClick={() => router.push('/jobcard')}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Back to Job Cards
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 bg-black text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-2xl font-bold">Job Card: {jobCard.cardNumber}</h1>
                <p className="text-red-300">
                  {jobCard.vehicle.make} {jobCard.vehicle.model} ({jobCard.vehicle.registrationNo})
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <ProgressTracker 
                  currentStage={jobCard.progress.stage} 
                  onStageChange={(stage) => handleUpdate({ progress: { ...jobCard.progress, stage } })}
                />
              </div>
            </div>
          </div>
          
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('details')}
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'details' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'services' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Services
              </button>
              <button
                onClick={() => setActiveTab('parts')}
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'parts' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Parts
              </button>
              <button
                onClick={() => setActiveTab('bill')}
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'bill' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Bill
              </button>
              <button
                onClick={() => setActiveTab('future')}
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'future' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Future Services
              </button>
              <button
                onClick={() => setActiveTab('review')}
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'review' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Review
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'details' && (
              <JobCardForm 
                initialValues={jobCard}
                onSubmit={handleUpdate}
                isSubmitting={false}
                readOnly={jobCard.progress.stage === 'Completed'}
              />
            )}
            
            {activeTab === 'services' && (
              <ServiceList 
                services={jobCard.services} 
                onUpdate={(services) => handleUpdate({ services })}
                readOnly={jobCard.progress.stage === 'Completed'}
              />
            )}
            
            {activeTab === 'parts' && (
              <PartsList 
                parts={jobCard.parts} 
                onUpdate={(parts) => handleUpdate({ parts })}
                readOnly={jobCard.progress.stage === 'Completed'}
              />
            )}
            
            {activeTab === 'bill' && (
              <BillGenerator 
                jobCard={jobCard} 
                onUpdate={handleUpdate}
              />
            )}
            
            {activeTab === 'future' && (
              <FutureServices 
                futureServices={jobCard.futureServices} 
                currentMileage={jobCard.vehicle.currentMileage}
                onUpdate={(futureServices) => handleUpdate({ futureServices })}
              />
            )}
            
            {activeTab === 'review' && jobCard.progress.stage === 'Completed' && (
              <ReviewSection 
                review={jobCard.review} 
                onUpdate={(review) => handleUpdate({ review })}
              />
            )}
            
            {activeTab === 'review' && jobCard.progress.stage !== 'Completed' && (
              <div className="text-center py-10">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">Service not completed yet</h3>
                <p className="mt-1 text-gray-500">Review section will be available after service completion.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}