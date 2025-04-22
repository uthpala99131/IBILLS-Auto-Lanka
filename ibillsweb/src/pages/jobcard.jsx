import JobCardForm from '../components/JobCardForm';
import '../app/globals.css';

export default function JobCardPage() {
  return (
    <div className="min-h-screen p-6 text-white bg-black">
      <h1 className="mb-4 text-3xl font-bold text-red-600">Create Job Card</h1>
      <JobCardForm />
    </div>
  );
}