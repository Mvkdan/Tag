
import React from 'react';
import { Button } from './ui/button';
import { Check } from 'lucide-react';

const features = [
  "Localisation précise",
  "Réseau Find My",
  "Batterie remplaçable",
  "Résistant à l'eau",
  "Configuration simple",
  "Garantie 1 an"
];

const Pricing = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Commencez à protéger vos objets
          </h2>
          <p className="text-gray-600 mb-8">
            Une petite protection pour une grande tranquillité d'esprit
          </p>
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex justify-center items-end gap-2 mb-6">
              <span className="text-4xl font-bold">35€</span>
              <span className="text-gray-600">/ unité</span>
            </div>
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full bg-primary hover:bg-primary-dark">
              Acheter maintenant
            </Button>
            <p className="text-sm text-gray-600 mt-4">
              Livraison gratuite • Retours sous 14 jours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
