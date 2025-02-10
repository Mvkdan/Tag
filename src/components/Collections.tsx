
import React from 'react';
import { Card } from './ui/card';
import { Shield, Diamond, Crown, Star } from 'lucide-react';
import { Button } from './ui/button';

const products = [
  {
    name: "AirTag Classic",
    price: "35€",
    description: "Protection élégante pour vos objets quotidiens",
    icon: Shield,
    color: "bg-primary/10",
    iconColor: "text-primary"
  },
  {
    name: "AirTag Premium",
    price: "45€",
    description: "Finitions luxueuses et design raffiné",
    icon: Diamond,
    color: "bg-primary-dark/10",
    iconColor: "text-primary-dark"
  },
  {
    name: "AirTag Gold Edition",
    price: "65€",
    description: "Une édition limitée plaquée or",
    icon: Crown,
    color: "bg-luxury-gold/10",
    iconColor: "text-luxury-gold"
  },
  {
    name: "AirTag Limited",
    price: "55€",
    description: "Une série spéciale en édition limitée",
    icon: Star,
    color: "bg-accent/10",
    iconColor: "text-accent"
  }
];

const Collections = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-playfair text-center mb-16">
          Découvrez nos Collections
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Card key={index} className="group hover:shadow-lg transition-shadow duration-300">
              <div className="p-8 text-center">
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full ${product.color} flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
                  <product.icon className={`w-10 h-10 ${product.iconColor}`} />
                </div>
                <h3 className="text-2xl font-playfair mb-2">{product.name}</h3>
                <p className="text-xl font-semibold mb-2">{product.price}</p>
                <p className="text-gray-600 mb-6">{product.description}</p>
                <Button className="w-full bg-primary hover:bg-primary-dark transition-colors">
                  Ajouter au panier
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
