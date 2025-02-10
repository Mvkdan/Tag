
import React from 'react';
import { Bluetooth, Battery, Wifi, ShieldCheck } from 'lucide-react';

const specs = [
  {
    icon: Bluetooth,
    title: "Bluetooth 5.0",
    description: "Connectivité avancée pour une localisation précise"
  },
  {
    icon: Battery,
    title: "Batterie CR2032",
    description: "Autonomie d'un an, facilement remplaçable"
  },
  {
    icon: Wifi,
    title: "Réseau Find My",
    description: "Localisation mondiale via le réseau Apple"
  },
  {
    icon: ShieldCheck,
    title: "Étanche IP67",
    description: "Protection contre l'eau et la poussière"
  }
];

const TechnicalSpecs = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-playfair text-center mb-16">
          Spécifications Techniques
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specs.map((spec, index) => (
            <div key={index} className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <spec.icon className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{spec.title}</h3>
              <p className="text-gray-600">{spec.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalSpecs;
