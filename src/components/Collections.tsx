
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Heart, Minus, Plus, Star } from 'lucide-react';
import { toast } from './ui/use-toast';

const Collections = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  
  const sizes = ['S', 'M', 'L', 'XL'];
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Veuillez sélectionner une taille",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Produit ajouté au panier",
      description: `${quantity} x AirTag Protection - Taille ${selectedSize}`
    });
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <Card className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Image Section */}
            <div className="relative">
              <img 
                src="/lovable-uploads/c4d34119-cd16-4268-b4f9-d49f038af7f3.png"
                alt="AirTag Protection Premium" 
                className="w-full h-auto rounded-lg"
              />
              <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Product Details Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-playfair mb-2">AirTag Protection Premium</h2>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">(125 avis)</span>
                </div>
                <p className="text-2xl font-semibold text-primary">45.00 €</p>
              </div>

              {/* Size Selector */}
              <div className="space-y-4">
                <h3 className="font-medium">Taille</h3>
                <div className="flex gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all ${
                        selectedSize === size 
                          ? 'border-primary bg-primary/10 text-primary' 
                          : 'border-gray-200 hover:border-primary/50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-4">
                <h3 className="font-medium">Quantité</h3>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 rounded-lg border-2 border-gray-200 hover:border-primary/50 transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-12 text-center text-xl">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 rounded-lg border-2 border-gray-200 hover:border-primary/50 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button 
                  onClick={handleAddToCart}
                  className="w-full bg-primary hover:bg-primary-dark text-lg py-6"
                >
                  Ajouter au panier
                </Button>
                <Button 
                  variant="outline"
                  className="w-full text-lg py-6 border-2"
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
