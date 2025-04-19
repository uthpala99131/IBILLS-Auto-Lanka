import Navbar from '@/components/Navbar';

export default function About() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <main className="p-8">
        <h2 className="text-3xl font-bold text-primary">About Us</h2>
        <p className="mt-4">AutoServicePro has been serving customers for over 10 years with high-quality automobile repairs and services.</p>
      </main>
    </div>
  );
}