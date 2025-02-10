
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Heart, Minus, Plus, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from './ui/use-toast';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const Collections = () => {
  const [quantity, setQuantity] = useState(1);
  
  const images = [
    "/lovable-uploads/c4d34119-cd16-4268-b4f9-d49f038af7f3.png",
    "/lovable-uploads/8982a45a-388b-4280-b48c-5f2a359156f7.png"
  ];
  
  const handleAddToCart = () => {
    toast({
      title: "Produit ajouté au panier",
      description: `${quantity} x AirTag Protection`,
      className: "bg-primary text-white",
    });
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <Card className="max-w-6xl mx-auto overflow-hidden hover:shadow-luxury transition-shadow duration-300">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Image Section with Carousel */}
            <div className="relative rounded-xl overflow-hidden bg-gray-50">
              <Carousel className="w-full">
                <CarouselContent>
                  {images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-square">
                        <img 
                          src={image}
                          alt={`AirTag Protection Premium ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
              <button 
                className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-all duration-300 z-10"
              >
                <Heart className="w-6 h-6 text-primary hover:fill-primary" />
              </button>
            </div>

            {/* Product Details Section */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-playfair mb-2 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                  AirTag Protection Premium
                </h2>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">(125 avis)</span>
                </div>
                <p className="text-3xl font-semibold text-primary">45.00 €</p>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-4">
                <h3 className="font-medium">Quantité</h3>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 rounded-lg border-2 border-gray-200 hover:border-primary/50 transition-all duration-300 hover:scale-105"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-12 text-center text-xl font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 rounded-lg border-2 border-gray-200 hover:border-primary/50 transition-all duration-300 hover:scale-105"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button 
                  onClick={handleAddToCart}
                  className="w-full bg-primary hover:bg-primary-dark text-lg py-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-glow"
                >
                  Ajouter au panier
                </Button>
                <Button 
                  variant="outline"
                  className="w-full text-lg py-6 border-2 transition-all duration-300 hover:scale-[1.02] hover:border-primary"
                >
                  Acheter maintenant
                </Button>
              </div>

              {/* Description */}
              <div className="pt-6 border-t">
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  Protection premium pour votre AirTag avec un design élégant et des finitions luxueuses. 
                  Fabriqué à partir de matériaux haut de gamme pour une protection optimale de votre 
                  dispositif tout en conservant son style raffiné.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Collections;

