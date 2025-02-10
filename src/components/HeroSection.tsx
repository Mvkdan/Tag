
import React from 'react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 animate-fadeIn">
          <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
            Nouveau • En stock
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Ne perdez plus jamais vos objets précieux
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Localisez vos affaires en temps réel avec une précision inégalée grâce à l'AirTag. Une technologie révolutionnaire dans un design élégant.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary-dark">
              Acheter maintenant
            </Button>
            <Button size="lg" variant="outline">
              En savoir plus
            </Button>
          </div>
        </div>
        <div className="relative h-[400px] lg:h-[600px] animate-float">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"></div>
          <img 
            src="/placeholder.svg" 
            alt="AirTag" 
            className="w-full h-full object-contain relative z-10"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
