
import React from 'react';
import { Heart, Gem, Flower } from 'lucide-react';

const features = [
  {
    title: "Design Raffiné",
    description: "Un accessoire qui s'harmonise parfaitement avec votre style personnel et vos plus beaux sacs.",
    icon: Gem,
  },
  {
    title: "Protection Intuitive",
    description: "Retrouvez vos objets précieux en toute simplicité, pour une tranquillité d'esprit au quotidien.",
    icon: Heart,
  },
  {
    title: "Élégance Durable",
    description: "Une batterie longue durée d'un an pour vous accompagner dans tous vos moments.",
    icon: Flower,
  },
  {
    title: "Style & Praticité",
    description: "Aussi élégant que vos accessoires préférés, avec une utilisation simplissime.",
    icon: Gem,
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-secondary-light via-white to-primary-light/20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            La technologie au service de votre style
          </h2>
          <p className="text-gray-600">
            Découvrez comment l'AirTag devient votre allié beauté et sécurité au quotidien.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft hover:shadow-glow transition-all duration-300"
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
