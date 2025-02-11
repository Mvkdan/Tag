
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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#40BCD8] -mt-[1px]">
      <div className="container mx-auto px-4 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
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
              <Button size="lg" className="bg-white hover:bg-white/90 rounded-full shadow-lg transition-all duration-300 group text-black">
                Commander
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-[30%] blur-3xl" />
            <img 
              src="/lovable-uploads/c4d34119-cd16-4268-b4f9-d49f038af7f3.png"
              alt="AirTag Signature" 
              className="relative z-10 w-full max-w-[500px] mx-auto animate-float"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full">
        <svg
          className="w-full h-48"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,192 C480,320 960,320 1440,192 L1440,320 L0,320 Z" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
