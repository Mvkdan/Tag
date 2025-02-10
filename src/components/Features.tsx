
import React from 'react';
import { Tag } from 'lucide-react';

const features = [
  {
    title: "Localisation précise",
    description: "Retrouvez vos objets avec une précision au centimètre près grâce à la technologie Ultra Wideband.",
    icon: Tag,
  },
  {
    title: "Réseau mondial",
    description: "Profitez du réseau d'appareils Apple pour localiser vos objets partout dans le monde.",
    icon: Tag,
  },
  {
    title: "Batterie longue durée",
    description: "Une année complète d'autonomie pour une tranquillité d'esprit absolue.",
    icon: Tag,
  },
  {
    title: "Configuration simple",
    description: "Connectez votre AirTag en un tap, aussi simplement que vos AirPods.",
    icon: Tag,
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-primary-light">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">
            La technologie au service de votre tranquillité
          </h2>
          <p className="text-gray-600">
            Découvrez pourquoi l'AirTag est l'accessoire indispensable pour protéger vos objets de valeur.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
