// pages/index.tsx
import Head from 'next/head'
import HeroSection from '../components/HeroSection'
import Services from '../components/Services'
import Testimonials from '../components/Testimonials'
import ContactCTA from '../components/ContactCTA'

export default function Home() {
  return (
    <>
      <Head>
        <title>Cripar - Car Repair Services</title>
      </Head>
      <HeroSection />
      <Services />
      <Testimonials />
      <ContactCTA />
    </>
  )
}
