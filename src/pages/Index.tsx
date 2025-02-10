
import React from 'react';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Pricing from '../components/Pricing';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <Features />
      <Testimonials />
      <FAQ />
      <Pricing />
    </Layout>
  );
};

export default Index;
