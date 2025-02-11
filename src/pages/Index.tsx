
import React from 'react';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import Collections from '../components/Collections';
import Innovation from '../components/Innovation';
import Tranquility from '../components/Tranquility';
import StyleProtection from '../components/StyleProtection';
import WhyChoose from '../components/WhyChoose';
import TechnicalSpecs from '../components/TechnicalSpecs';
import Testimonials from '../components/Testimonials';
import TikTokReviews from '../components/TikTokReviews';
import FAQ from '../components/FAQ';
import Press from '../components/Press';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <Press />
      <Collections />
      <Innovation />
      <Tranquility />
      <StyleProtection />
      <WhyChoose />
      <TikTokReviews />
      <Testimonials />
      <TechnicalSpecs />
      <FAQ />
    </Layout>
  );
};

export default Index;
