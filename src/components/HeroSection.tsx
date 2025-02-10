
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Star, Crown, Shield, ChevronRight } from 'lucide-react';

const HeroSection = () => {
  const [typedText, setTypedText] = useState("");
  const words = ["Innovation", "Excellence", "Sérénité"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const word = words[currentWordIndex];
    let index = 0;
    
    const typeTimer = setInterval(() => {
      if (index <= word.length) {
        setTypedText(word.slice(0, index));
        index++;
      } else {
        clearInterval(typeTimer);
        setTimeout(() => {
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeTimer);
  }, [currentWordIndex]);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-luxury-blue via-luxury-lightBlue to-white opacity-80" />
      <div className="absolute inset-0 bg-[url('/photo-1581091226825-a6a2a5aee158')] opacity-10 bg-cover bg-center mix-blend-overlay" />
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative">
        <div className="space-y-8 animate-fadeIn">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-luxury-black rounded-full shadow-luxury">
            <Crown className="w-4 h-4 text-luxury-blue" />
            <span className="text-sm font-light tracking-wider">Collection Signature</span>
          </span>
          <div className="space-y-2">
            <h1 className="font-playfair text-5xl md:text-7xl xl:text-8xl font-light leading-tight">
              Design
            </h1>
            <h1 className="font-playfair text-5xl md:text-7xl xl:text-8xl font-light leading-tight">
              Innovation
            </h1>
            <h1 className="font-playfair text-5xl md:text-7xl xl:text-8xl font-light leading-tight text-luxury-blue">
              {typedText}
              <span className="border-r-2 border-luxury-blue ml-1 animate-blink"></span>
            </h1>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed font-light max-w-xl">
            Découvrez notre AirTag signature, un bijou technologique alliant raffinement et tranquillité d'esprit. L'accessoire indispensable de votre quotidien d'exception.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-luxury-blue hover:bg-primary-dark rounded-full shadow-luxury transition-all duration-300 group">
              Découvrir la Collection
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-luxury-blue text-luxury-blue hover:bg-luxury-blue hover:text-white transition-all duration-300">
              Service Personnalisation
            </Button>
          </div>
          <div className="flex items-center gap-6 mt-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-luxury">
              <Star className="w-4 h-4 text-luxury-blue" />
              <span className="text-sm">13,000+ Avis 5★</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-luxury">
              <Shield className="w-4 h-4 text-luxury-blue" />
              <span className="text-sm">Garantie à Vie</span>
            </div>
          </div>
        </div>
        <div className="relative h-[500px] lg:h-[700px]">
          <div className="absolute inset-0 bg-gradient-to-br from-luxury-blue/20 to-secondary/20 rounded-[30%] blur-3xl animate-float" />
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
