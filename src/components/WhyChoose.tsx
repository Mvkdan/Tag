
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const reasons = [
  "Design exclusif et élégant",
  "Matériaux premium",
  "Garantie à vie",
  "Service client dédié",
  "Livraison express",
  "Emballage luxueux"
];

const WhyChoose = () => {
  return (
    <section className="py-24 bg-secondary-light relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-playfair">Pourquoi Choisir nos AirTags</h2>
            <div className="grid gap-4">
              {reasons.map((reason, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-lg">{reason}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-dark/20 rounded-full blur-3xl animate-pulse" />
            <img 
              src="/lovable-uploads/c4d34119-cd16-4268-b4f9-d49f038af7f3.png"
              alt="AirTag Premium" 
              className="relative z-10 w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
