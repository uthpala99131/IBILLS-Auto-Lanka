import React from 'react';
import { BookingForm } from '../components/BookingForm';
import { JobCard } from '../components/jobcard/JobCard';
import { ProgressTracker } from '../components/jobcard/ProgressTracker';
import { InvoiceGenerator } from '../components/jobcard/InvoiceGenerator';
import { ReviewSection } from '../components/jobcard/ReviewSection';
import { ScheduleDisplay } from '../components/jobcard/ScheduleDisplay';

export default function CustomerDashboard() {
  return (
    <div className="grid min-h-screen gap-6 p-6 bg-black">
      <BookingForm />
      <JobCard />
      <ProgressTracker />
      <InvoiceGenerator />
      <ReviewSection />
      <ScheduleDisplay />
    </div>
  );
}