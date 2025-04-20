import HeroSection from '../components/HeroSection';
import VehicleBrands from '../components/VehicleBrands';
import ContactDetails from '../components/ContactDetails';
import Parts from '../components/SparepartsSection';
import Recovery from '../components/RecoverySection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Recovery />
      <VehicleBrands />
      <Parts />
      <ContactDetails />
    </main>
  );
}