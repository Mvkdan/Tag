
import React from 'react';
import { Button } from './ui/button';
import { Star, Crown, Shield } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-r from-luxury-beige to-secondary-light">
      <div className="absolute inset-0 bg-[url('/photo-1581091226825-a6a2a5aee158')] opacity-20 bg-cover bg-center" />
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative">
        <div className="space-y-6 animate-fadeIn">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-luxury-black rounded-full shadow-luxury">
            <Crown className="w-4 h-4 text-luxury-gold" />
            <span className="text-sm font-light tracking-wider">Collection Signature</span>
          </span>
          <h1 className="text-4xl md:text-6xl font-light leading-tight">
            L'élégance de la
            <span className="block text-luxury-gold">sérénité</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed font-light">
            Découvrez notre AirTag signature, un bijou technologique alliant raffinement et tranquillité d'esprit. L'accessoire indispensable de votre quotidien d'exception.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-luxury-gold hover:bg-primary-dark rounded-full shadow-luxury transition-all duration-300">
              Découvrir la Collection
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-white">
              Service Personnalisation
            </Button>
          </div>
          <div className="flex items-center gap-6 mt-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-luxury">
              <Star className="w-4 h-4 text-luxury-gold" />
              <span className="text-sm">13,000+ Avis 5★</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-luxury">
              <Shield className="w-4 h-4 text-luxury-gold" />
              <span className="text-sm">Garantie à Vie</span>
            </div>
          </div>
        </div>
        <div className="relative h-[400px] lg:h-[600px]">
          <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/20 to-secondary/20 rounded-[30%] blur-3xl animate-float" />
          <div className="relative z-10 w-full h-full rounded-[30%] overflow-hidden shadow-luxury animate-float">
            <img 
              src="/photo-1581091226825-a6a2a5aee158" 
              alt="AirTag Signature en situation" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
