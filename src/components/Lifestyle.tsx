
import React from 'react';
import { Camera } from 'lucide-react';

const Lifestyle = () => {
  return (
    <section className="py-24 bg-secondary-light relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Camera className="w-12 h-12 text-luxury-gold mx-auto mb-6" />
          <h2 className="text-4xl font-playfair mb-6">
            L'élégance au quotidien
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Découvrez comment nos clients intègrent leur AirTag signature dans leur quotidien raffiné
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="rounded-2xl overflow-hidden shadow-luxury group hover:shadow-glow transition-shadow duration-300">
            <img 
              src="/photo-1581091226825-a6a2a5aee158" 
              alt="AirTag en situation" 
              className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-luxury group hover:shadow-glow transition-shadow duration-300">
            <img 
              src="/photo-1582562124811-c09040d0a901" 
              alt="AirTag lifestyle" 
              className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-luxury group hover:shadow-glow transition-shadow duration-300">
            <img 
              src="/photo-1487887235947-a955ef187fcc" 
              alt="AirTag design" 
              className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="fill-white" viewBox="0 0 1440 320">
          <path d="M0,128L48,144C96,160,192,192,288,192C384,192,480,160,576,144C672,128,768,128,864,144C960,160,1056,192,1152,192C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Lifestyle;
