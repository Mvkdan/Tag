
import React from 'react';
import { Shield, Smartphone, Battery } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: "Protection Continue",
    description: "Localisation précise et sécurisée de vos objets"
  },
  {
    icon: Smartphone,
    title: "Application Intuitive",
    description: "Interface simple et efficace sur votre iPhone"
  },
  {
    icon: Battery,
    title: "Autonomie d'un An",
    description: "Batterie longue durée remplaçable"
  }
];

const Tranquility = () => {
  return (
    <section className="py-24 bg-secondary-light">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <img 
              src="/lovable-uploads/c4d34119-cd16-4268-b4f9-d49f038af7f3.png"
              alt="AirTag Usage" 
              className="w-full max-w-md mx-auto rounded-2xl shadow-luxury"
            />
          </div>
          <div className="space-y-8 order-1 lg:order-2">
            <h2 className="text-4xl font-playfair">Votre Tranquillité au Quotidien</h2>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tranquility;
