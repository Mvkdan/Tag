
import React from 'react';
import Layout from '@/components/Layout';
import Collections from '@/components/Collections';
import TechnicalSpecs from '@/components/TechnicalSpecs';
import Pricing from '@/components/Pricing';

const Product = () => {
  return (
    <Layout>
      <div className="min-h-screen">
        <Collections />
        <TechnicalSpecs />
        <Pricing />
      </div>
    </Layout>
  );
};

export default Product;
