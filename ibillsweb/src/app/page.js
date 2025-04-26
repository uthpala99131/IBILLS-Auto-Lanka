import HeroSection from '../components/HeroSection';
import VehicleBrands from '../components/VehicleBrands';
import ContactDetails from '../components/ContactDetails';
import Parts from '../components/SparepartsSection';
import Recovery from '../components/RecoverySection';
import Service from '../components/ServiceSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Recovery />
      <Service />
      <VehicleBrands />
      <Parts />
      <ContactDetails />
    </main>
  );
}