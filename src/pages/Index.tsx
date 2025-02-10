
import React from 'react';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import Benefits from '../components/Benefits';
import Lifestyle from '../components/Lifestyle';
import Press from '../components/Press';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Pricing from '../components/Pricing';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <Benefits />
      <Lifestyle />
      <Press />
      <Features />
      <Testimonials />
      <FAQ />
      <Pricing />
    </Layout>
  );
};

export default Index;
