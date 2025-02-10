
import React from 'react';
import { Heart, Shield, Sparkles, Clock } from 'lucide-react';

const features = [
  {
    title: "Design Élégant",
    description: "Un accessoire raffiné qui s'harmonise parfaitement avec votre style personnel.",
    icon: Sparkles,
  },
  {
    title: "Protection Intuitive",
    description: "Retrouvez vos objets précieux en toute simplicité, pour une tranquillité d'esprit absolue.",
    icon: Shield,
  },
  {
    title: "Compagnon Fidèle",
    description: "Une année complète d'autonomie pour vous accompagner au quotidien.",
    icon: Clock,
  },
  {
    title: "Usage Quotidien",
    description: "Aussi simple à utiliser que vos accessoires préférés.",
    icon: Heart,
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-primary-light/20 to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">
            La technologie au service de votre sérénité
          </h2>
          <p className="text-gray-600">
            Découvrez comment l'AirTag devient votre allié beauté et sécurité au quotidien.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
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
