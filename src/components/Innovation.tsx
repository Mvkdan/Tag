
import React from 'react';
import { Button } from './ui/button';

const Innovation = () => {
  return (
    <section className="py-24 bg-luxury-black text-white relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-playfair">Une Protection Innovante</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Profitez de la technologie Apple la plus avancée pour protéger vos objets précieux. 
              Notre AirTag allie design raffiné et performance exceptionnelle pour une tranquillité 
              d'esprit absolue.
            </p>
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-luxury-black">
              En savoir plus
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-dark/20 rounded-2xl blur-3xl" />
            <img 
              src="/lovable-uploads/c4d34119-cd16-4268-b4f9-d49f038af7f3.png"
              alt="AirTag Innovation" 
              className="relative z-10 w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Innovation;
