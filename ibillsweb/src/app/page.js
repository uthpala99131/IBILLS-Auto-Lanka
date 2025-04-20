import HeroSection from '../components/HeroSection';
import VehicleBrands from '../components/VehicleBrands';
import ContactDetails from '../components/ContactDetails';
import Parts from '../components/SparepartsSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <VehicleBrands />
      <Parts />
      <ContactDetails />
    </main>
  );
}