import JobCardForm from "../components/JobCardForm";
import "../app/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function JobCardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow p-6 py-25 g-black ptext-white">
        <h1 className="mb-4 text-3xl font-bold text-center text-red-600 ">Create Job Card</h1>
        <JobCardForm />
      </main>

      <Footer />
    </div>
  );
}
