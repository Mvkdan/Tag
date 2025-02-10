
import React from 'react';
import { Button } from './ui/button';
import { Heart, Flower, Gem } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-r from-primary-light to-secondary-light">
      <div className="absolute inset-0 bg-[url('/photo-1649972904349-6e44c42644a7')] opacity-10 bg-cover bg-center" />
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative">
        <div className="space-y-6 animate-fadeIn">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-primary rounded-full shadow-soft">
            <Heart className="w-4 h-4" />
            <span className="text-sm">Nouvelle Collection Féminine</span>
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            La sécurité rencontre l'élégance
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Découvrez notre AirTag exclusif, un bijou technologique qui allie style et tranquillité d'esprit. Parfait pour garder vos précieux accessoires toujours près de vous.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary-dark rounded-full shadow-glow transition-all duration-300">
              Je découvre
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-primary text-primary hover:bg-primary-light">
              En savoir plus
            </Button>
          </div>
          <div className="flex items-center gap-6 mt-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-soft">
              <Gem className="w-4 h-4 text-primary" />
              <span className="text-sm">Livraison offerte</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-soft">
              <Flower className="w-4 h-4 text-primary" />
              <span className="text-sm">Garantie 1 an</span>
            </div>
          </div>
        </div>
        <div className="relative h-[400px] lg:h-[600px]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-light/40 to-secondary/40 rounded-[30%] blur-3xl animate-float" />
          <div className="relative z-10 w-full h-full rounded-[30%] overflow-hidden shadow-glow animate-float">
            <img 
              src="/photo-1581091226825-a6a2a5aee158" 
              alt="AirTag élégant en situation" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
