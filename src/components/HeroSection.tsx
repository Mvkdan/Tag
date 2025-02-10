
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ChevronRight, Play } from 'lucide-react';

const HeroSection = () => {
  const [typedText, setTypedText] = useState("");
  const words = ["Innovation", "Excellence", "Sérénité"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const features = [
    {
      title: "Bluetooth 5.0",
      description: "Connectivité avancée pour une localisation précise",
      video: "/video-bluetooth.mp4"
    },
    {
      title: "Batterie ultime",
      description: "Autonomie d'un an, facilement remplaçable",
      video: "/video-battery.mp4"
    },
    {
      title: "Réseau Find my",
      description: "Localisation mondiale via le réseau Apple",
      video: "/video-findmy.mp4"
    },
    {
      title: "Étanche IP67",
      description: "Protection contre l'eau et la poussière",
      video: "/video-waterproof.mp4"
    }
  ];

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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#40BCD8]">
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
              <Button size="lg" className="bg-white text-[#40BCD8] hover:bg-white/90 rounded-full shadow-lg transition-all duration-300 group">
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

        <div className="mt-24 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 group hover:bg-white/20 transition-all duration-300"
              onMouseEnter={() => setActiveVideo(index)}
              onMouseLeave={() => setActiveVideo(null)}
            >
              <div className="relative aspect-video mb-4 rounded-lg overflow-hidden bg-black/20">
                {activeVideo === index ? (
                  <video 
                    className="w-full h-full object-cover"
                    autoPlay 
                    muted 
                    loop
                  >
                    <source src={feature.video} type="video/mp4" />
                  </video>
                ) : (
                  <Button 
                    variant="ghost" 
                    className="absolute inset-0 w-full h-full hover:bg-black/20 group"
                  >
                    <Play className="w-12 h-12 text-white opacity-70 group-hover:opacity-100 transition-opacity" />
                  </Button>
                )}
              </div>
              <h3 className="text-xl font-medium text-white mb-2">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </div>
          ))}
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
