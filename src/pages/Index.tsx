
import React from 'react';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import Collections from '../components/Collections';
import Innovation from '../components/Innovation';
import Tranquility from '../components/Tranquility';
import StyleProtection from '../components/StyleProtection';
import WhyChoose from '../components/WhyChoose';
import TechnicalSpecs from '../components/TechnicalSpecs';
import TikTokReviews from '../components/TikTokReviews';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <Collections />
      <Innovation />
      <Tranquility />
      <StyleProtection />
      <WhyChoose />
      <TikTokReviews />
      <TechnicalSpecs />
    </Layout>
  );
};

export default Index;
