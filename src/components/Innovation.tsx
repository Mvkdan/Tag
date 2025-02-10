
import React from 'react';
import { Button } from './ui/button';
import { Shield, Paintbrush, Target, ThumbsUp } from 'lucide-react';

const Innovation = () => {
  return (
    <section className="py-24 bg-luxury-black text-white relative overflow-hidden">
      {/* Background texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptMCAxOGMtMy4zMTQgMC02LTIuNjg2LTYtNnMyLjY4Ni02IDYtNiA2IDIuNjg2IDYgNi0yLjY4NiA2LTYgNnoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-10" />
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="inline-block bg-primary/20 px-4 py-2 rounded-full">
              <span className="text-primary text-sm font-medium">Protection Intelligente</span>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-5xl font-playfair leading-tight">
                Une Protection Innovante pour Vos Objets
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Découvrez une nouvelle façon de protéger vos objets précieux. Notre AirTag allie technologie 
                de pointe et design raffiné pour une tranquillité d'esprit absolue.
              </p>
              <Button 
                variant="outline" 
                className="text-white border-white hover:bg-white hover:text-luxury-black mt-4"
              >
                En savoir plus
              </Button>
            </div>
          </div>

          {/* Right Column - Product Image & Features */}
          <div className="relative">
            {/* Product Image */}
            <div className="relative z-10 mb-12">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-dark/20 rounded-2xl blur-3xl" />
              <img 
                src="/lovable-uploads/c4d34119-cd16-4268-b4f9-d49f038af7f3.png"
                alt="AirTag Innovation" 
                className="relative z-10 w-full max-w-md mx-auto"
              />
            </div>

            {/* Feature Points */}
            <div className="grid grid-cols-2 gap-6 relative z-20">
              {[
                { icon: Shield, text: "Protection maximale", color: "text-primary" },
                { icon: Paintbrush, text: "Design élégant", color: "text-primary-light" },
                { icon: Target, text: "Localisation précise", color: "text-primary" },
                { icon: ThumbsUp, text: "Simple d'utilisation", color: "text-primary-light" }
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 bg-white/5 p-4 rounded-xl">
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Innovation;
