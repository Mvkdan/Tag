
import React from 'react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-r from-primary-light/30 to-secondary/30">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 animate-fadeIn">
          <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
            Nouveau • Collection Féminine
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            L'élégance de la tranquillité d'esprit
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Gardez vos précieux accessoires toujours près de vous avec notre AirTag au design raffiné. La protection qui s'adapte à votre style de vie.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full">
              Découvrir
            </Button>
            <Button size="lg" variant="outline" className="rounded-full">
              En savoir plus
            </Button>
          </div>
          <div className="flex items-center gap-4 mt-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              Livraison offerte
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Garantie 1 an
            </div>
          </div>
        </div>
        <div className="relative h-[400px] lg:h-[600px] animate-float">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-light/40 to-secondary/40 rounded-full blur-3xl"></div>
          <img 
            src="/placeholder.svg" 
            alt="AirTag élégant" 
            className="w-full h-full object-contain relative z-10"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
