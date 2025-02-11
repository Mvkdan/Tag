
import React from 'react';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';

const About = () => {
  return (
    <Layout>
      {/* Brand Story */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="font-playfair text-4xl md:text-5xl mb-16 text-center">Notre Histoire</h1>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                Fondée avec la vision de redéfinir la protection des objets personnels, FINELY s'est établie comme une marque de référence dans l'univers des accessoires connectés haut de gamme.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Notre parcours est marqué par une quête constante d'innovation et d'excellence, fusionnant technologie de pointe et design raffiné.
              </p>
            </div>
            <div className="relative">
              <img 
                src="/placeholder.svg"
                alt="Notre Histoire" 
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quality Commitment */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-4xl mb-16 text-center">Engagement Qualité</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-luxury">
              <h3 className="text-xl font-semibold mb-4">Matériaux Premium</h3>
              <p className="text-gray-600">Sélection rigoureuse des meilleurs matériaux pour une durabilité exceptionnelle.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-luxury">
              <h3 className="text-xl font-semibold mb-4">Tests Rigoureux</h3>
              <p className="text-gray-600">Chaque produit subit des tests approfondis pour garantir une performance optimale.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-luxury">
              <h3 className="text-xl font-semibold mb-4">Garantie Excellence</h3>
              <p className="text-gray-600">Une garantie complète qui reflète notre confiance dans nos produits.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Process */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-4xl mb-16 text-center">Processus de Fabrication</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="/placeholder.svg"
                alt="Processus de Fabrication" 
                className="rounded-xl shadow-lg"
              />
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">1. Conception</h3>
                <p className="text-gray-600">Design minutieux et modélisation 3D précise.</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">2. Prototypage</h3>
                <p className="text-gray-600">Tests et itérations pour une perfection absolue.</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">3. Production</h3>
                <p className="text-gray-600">Fabrication de précision dans nos ateliers.</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">4. Contrôle Qualité</h3>
                <p className="text-gray-600">Inspection rigoureuse de chaque unité.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-4xl mb-16 text-center">Notre Équipe</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <img 
                src="/placeholder.svg"
                alt="Team Member 1" 
                className="w-48 h-48 rounded-full mx-auto mb-6 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">Emma Laurent</h3>
              <p className="text-gray-600">Fondatrice & CEO</p>
            </div>
            <div className="text-center">
              <img 
                src="/placeholder.svg"
                alt="Team Member 2" 
                className="w-48 h-48 rounded-full mx-auto mb-6 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">Thomas Martin</h3>
              <p className="text-gray-600">Directeur Technique</p>
            </div>
            <div className="text-center">
              <img 
                src="/placeholder.svg"
                alt="Team Member 3" 
                className="w-48 h-48 rounded-full mx-auto mb-6 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">Sophie Dubois</h3>
              <p className="text-gray-600">Directrice Design</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
