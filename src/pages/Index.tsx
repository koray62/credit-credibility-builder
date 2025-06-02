
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Benefits from '../components/Benefits';
import TargetAudience from '../components/TargetAudience';
import CreditScoreBenefits from '../components/CreditScoreBenefits';
import BankPartners from '../components/BankPartners';
import CTASection from '../components/CTASection';
import FAQ from '../components/FAQ';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <Benefits />
        <TargetAudience />
        <CreditScoreBenefits />
        <BankPartners />
        <CTASection />
        <FAQ />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
