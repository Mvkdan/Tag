
import React from 'react';
import { ShieldCheck, Star, Award } from 'lucide-react';

const benefitsData = [
  {
    icon: ShieldCheck,
    title: "Protection garantie",
    description: "Sécurité maximale pour vos objets de valeur avec une garantie à vie"
  },
  {
    icon: Star,
    title: "Design exclusif",
    description: "Finitions luxueuses et matériaux nobles pour un style unique"
  },
  {
    icon: Award,
    title: "Service premium",
    description: "Un accompagnement personnalisé pour une expérience d'exception"
  }
];

const Benefits = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-playfair text-center mb-16">
          L'excellence à votre service
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {benefitsData.map((benefit, index) => (
            <div key={index} className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-luxury-gold/10 flex items-center justify-center group-hover:bg-luxury-gold/20 transition-colors duration-300">
                <benefit.icon className="w-10 h-10 text-luxury-gold" />
              </div>
              <h3 className="text-2xl font-playfair mb-4">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="fill-secondary-light" viewBox="0 0 1440 320">
          <path d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,80C672,64,768,64,864,80C960,96,1056,128,1152,128C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Benefits;
