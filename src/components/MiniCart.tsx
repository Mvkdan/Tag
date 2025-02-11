
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { ShoppingBag, X, Plus, Minus } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const MiniCart = () => {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative text-black hover:bg-transparent hover:text-black p-0">
          <ShoppingBag className="w-5 h-5" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Votre Panier ({itemCount} articles)</SheetTitle>
        </SheetHeader>
        
        <div className="mt-8 space-y-4 h-[calc(100vh-200px)] overflow-auto">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 py-4 border-b">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">{item.name}</h3>
                  <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-1">{item.price.toFixed(2)} €</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 rounded-md hover:bg-gray-100"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 rounded-md hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t">
          <div className="flex justify-between mb-4">
            <span className="font-medium">Total</span>
            <span className="font-medium">{total.toFixed(2)} €</span>
          </div>
          <div className="space-y-3">
            <Button 
              className="w-full"
              onClick={() => navigate('/cart')}
              disabled={items.length === 0}
            >
              Voir le panier
            </Button>
            <Button 
              variant="outline"
              className="w-full"
              onClick={() => navigate('/checkout')}
              disabled={items.length === 0}
            >
              Commander
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MiniCart;
