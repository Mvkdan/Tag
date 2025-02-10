import React from 'react';
import { Button } from './ui/button';
import { Star, Crown, Shield, ChevronRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-r from-luxury-beige to-secondary-light">
      <div className="absolute inset-0 bg-[url('/photo-1581091226825-a6a2a5aee158')] opacity-10 bg-cover bg-center" />
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="fill-white" viewBox="0 0 1440 320">
          <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white pointer-events-none" />
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative">
        <div className="space-y-8 animate-fadeIn">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-luxury-black rounded-full shadow-luxury">
            <Crown className="w-4 h-4 text-luxury-gold" />
            <span className="text-sm font-light tracking-wider">Collection Signature</span>
          </span>
          <h1 className="font-playfair text-4xl md:text-6xl font-light leading-tight">
            L'élégance de la
            <span className="block text-luxury-gold">sérénité</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed font-light max-w-xl">
            Découvrez notre AirTag signature, un bijou technologique alliant raffinement et tranquillité d'esprit. L'accessoire indispensable de votre quotidien d'exception.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-luxury-gold hover:bg-primary-dark rounded-full shadow-luxury transition-all duration-300 group">
              Découvrir la Collection
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-white transition-all duration-300">
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
        <div className="relative h-[500px] lg:h-[700px]">
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
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-white transform -skew-y-3 origin-left translate-y-12" />
    </section>
  );
};

export default HeroSection;
