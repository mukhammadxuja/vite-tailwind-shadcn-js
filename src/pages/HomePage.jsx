import React from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import HeroSection from '@/components/landing/Hero';
import Particles from '@/components/ui/particles';
import Navbar from '@/components/landing/Navbar';
import ClientSection from '@/components/landing/Client';
import PricingSection from '@/components/landing/Price';
import { SphereMask } from '@/components/ui/sphare-mask';
import CallToActionSection from '@/components/landing/CTA';
import Footer from '@/components/landing/Footer';

function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ClientSection />
      <SphereMask />
      <PricingSection />
      <CallToActionSection />
      <Particles
        className="absolute inset-0 -z-10"
        quantity={50}
        ease={70}
        size={0.05}
        staticity={40}
        color="#ffffff"
      />
      <Footer />
    </>
  );
}

export default HomePage;
