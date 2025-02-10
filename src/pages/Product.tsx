
import React from 'react';
import Layout from '@/components/Layout';
import Collections from '@/components/Collections';
import TechnicalSpecs from '@/components/TechnicalSpecs';
import Pricing from '@/components/Pricing';
import StyleProtection from '@/components/StyleProtection';
import WhyChoose from '@/components/WhyChoose';
import Tranquility from '@/components/Tranquility';
import Testimonials from '@/components/Testimonials';
import TikTokReviews from '@/components/TikTokReviews';

const Product = () => {
  return (
    <Layout>
      <div className="min-h-screen">
        {/* Section Principale du Produit */}
        <Collections />
        
        {/* Avantages et Caractéristiques */}
        <div className="bg-gradient-to-b from-white to-secondary-light">
          <TechnicalSpecs />
          <WhyChoose />
        </div>
        
        {/* Style et Protection */}
        <div className="bg-white">
          <StyleProtection />
          <Tranquility />
        </div>
        
        {/* Témoignages et Avis */}
        <div className="bg-gradient-to-b from-secondary-light to-white">
          <Testimonials />
          <TikTokReviews />
        </div>
        
        {/* Section Prix et CTA */}
        <div className="bg-gradient-to-t from-primary-light/20 to-white">
          <Pricing />
        </div>
      </div>
    </Layout>
  );
};

export default Product;
