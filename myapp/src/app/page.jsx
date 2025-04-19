// app/page.jsx
import HeroSection from "../components/HeroSection";
import VehicleBrands from "../components/VehicleBrands";
import About from "../app/about";
import Services from "../app/services";
import Contacts from "../app/contact";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <About />
      <Services />
      <VehicleBrands />
      <Contacts />
    </>
  );
}
