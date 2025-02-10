
import React from 'react';

const Press = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <p className="text-center text-gray-500 mb-12">Ils parlent de nous</p>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
          <div className="w-32">
            <img src="/placeholder.svg" alt="Vogue" className="w-full grayscale" />
          </div>
          <div className="w-32">
            <img src="/placeholder.svg" alt="Forbes" className="w-full grayscale" />
          </div>
          <div className="w-32">
            <img src="/placeholder.svg" alt="GQ" className="w-full grayscale" />
          </div>
          <div className="w-32">
            <img src="/placeholder.svg" alt="Elle" className="w-full grayscale" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Press;
