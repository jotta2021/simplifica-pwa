'use client'

import React, { useEffect } from 'react';
import Header from './header';
import HeroSection from './hero-section';
import FeaturesSection from './features-section';
import WhatsAppSection from './whatsapp-section';
import PricingSection from './pricing-section';
import CTASection from './cta-section';
import ContactSection from './contact-section';
import Footer from './footer';

const LandingClient: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Header scrollToSection={scrollToSection} />
      <HeroSection />
      <FeaturesSection />
      <WhatsAppSection />
      <PricingSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default LandingClient; 