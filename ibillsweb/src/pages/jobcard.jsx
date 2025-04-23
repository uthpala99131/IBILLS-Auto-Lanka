import '../app/globals.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BookingForm } from '../components/BookingForm';
import  { JobCard }  from '../components/jobcard/JobCard';
import { ProgressTracker as Progress } from '../components/jobcard/ProgressTracker';
import { InvoiceGenerator as Invoice } from '../components/jobcard/InvoiceGenerator';
import { ScheduleDisplay as Schedule } from '../components/jobcard/ScheduleDisplay';
import { ReviewSection as Review } from '../components/jobcard/ReviewSection';

export default function CustomerDashboard() {
  return (
    <div className="flex flex-col min-h-screen text-center text-white bg-black">
      <Navbar />
      <main className="flex-grow p-6">
        <div className="max-w-screen-lg mx-auto space-y-10">
          <BookingForm />
          <JobCard />
          <Progress />
          <Invoice />
          <Schedule />
          <Review />
        </div>
      </main>
      <Footer />
    </div>
  );
}