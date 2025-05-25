import { useState } from 'react';
import { useRouter } from 'next/router';
import JobCardForm from '../../components/JobCardForm';
import { createJobCard } from '../../lib/api';

export default function CreateJobCard() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const initialValues = {
    customer: {
      name: '',
      contact: '',
      email: '',
      address: '',
    },
    vehicle: {
      make: '',
      model: '',
      year: '',
      registrationNo: '',
      vin: '',
      currentMileage: '',
    },
    services: [{
      description: '',
      technician: '',
      status: 'Pending',
      charge: 0,
    }],
    parts: [],
    progress: {
      stage: 'Check-in',
      notes: '',
    },
    futureServices: [],
    bill: {
      subtotal: 0,
      tax: 0,
      discount: 0,
      total: 0,
      paid: false,
    },
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const createdJobCard = await createJobCard(values);
      router.push(`/jobcard/${createdJobCard._id}`);
    } catch (err) {
      console.error('Error creating job card:', err);
      setError(err.message || 'Failed to create job card');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 bg-black text-white">
            <h1 className="text-2xl font-bold">Create New Job Card</h1>
            <p className="text-red-300">Fill in the vehicle and customer details</p>
          </div>
          
          <div className="p-6">
            {error && (
              <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                {error}
              </div>
            )}
            
            <JobCardForm 
              initialValues={initialValues}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
}