'use client';
import { useEffect, useState } from 'react';
import JobCardList from './components/JobCardList';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorAlert from '@/components/ErrorAlert';

export default function JobCardPage() {
  const [jobCards, setJobCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobCards = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching job cards from frontend...');
        const response = await fetch('/api/jobcards', {
          cache: 'no-store'
        });

        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch job cards');
        }

        const { data, success } = await response.json();
        
        if (!success) {
          throw new Error('API request was not successful');
        }

        setJobCards(data || []);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobCards();
  }, []);

  const retryFetch = () => {
    setError(null);
    setLoading(true);
    fetchJobCards();
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} onRetry={retryFetch} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-red-600 mb-6">Job Cards</h1>
      <JobCardList jobCards={jobCards} />
    </div>
  );
}