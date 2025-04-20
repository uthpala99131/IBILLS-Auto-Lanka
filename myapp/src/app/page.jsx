// app/page.jsx
import HeroSection from "../components/HeroSection";
import VehicleBrands from "../components/VehicleBrands";
import AboutSection from "../components/AboutSection";
import ServiceCard from "../components/ServiceCard";
import ContactForm from "../components/ContactForm";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServiceCard />
      <VehicleBrands />
      <ContactForm />
    </>
  );
}
