
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';

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
      <div className="absolute inset-0 bg-[#40BCD8]" />
      
      <div className="absolute inset-0">
        <svg
          className="absolute bottom-0 w-full h-48"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,192 C480,320 960,320 1440,192 L1440,320 L0,320 Z" />
        </svg>
      </div>

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative">
        <div className="space-y-8 animate-fadeIn">
          <div className="space-y-2">
            <h1 className="font-playfair text-5xl md:text-7xl xl:text-8xl font-light leading-tight text-white">
              Design
            </h1>
            <h1 className="font-playfair text-5xl md:text-7xl xl:text-8xl font-light leading-tight text-white">
              Innovation
            </h1>
            <h1 className="font-playfair text-5xl md:text-7xl xl:text-8xl font-light leading-tight text-white">
              {typedText}
              <span className="border-r-2 border-white ml-1 animate-blink"></span>
            </h1>
          </div>
          <p className="text-lg text-white/90 leading-relaxed font-light max-w-xl">
            Découvrez notre AirTag signature, un bijou technologique alliant raffinement et tranquillité d'esprit. L'accessoire indispensable de votre quotidien d'exception.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-white text-luxury-blue hover:bg-white/90 rounded-full shadow-luxury transition-all duration-300 group">
              Commander
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
        <div className="relative h-[500px] lg:h-[700px] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/20 rounded-[30%] blur-3xl animate-float" />
          <img 
            src="/lovable-uploads/c4d34119-cd16-4268-b4f9-d49f038af7f3.png"
            alt="AirTag Signature" 
            className="relative z-10 w-[80%] max-w-[400px] animate-float"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
