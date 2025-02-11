
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
import { toast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const MiniCart = () => {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();
  const navigate = useNavigate();

  const handleRemoveItem = (itemId: string, itemName: string) => {
    removeItem(itemId);
    toast({
      title: "Produit retiré",
      description: `${itemName} a été retiré de votre panier`,
    });
  };

  const handleQuantityChange = (itemId: string, newQuantity: number, itemName: string) => {
    if (newQuantity === 0) {
      removeItem(itemId);
      toast({
        title: "Produit retiré",
        description: `${itemName} a été retiré de votre panier`,
      });
    } else {
      updateQuantity(itemId, newQuantity);
      toast({
        title: "Quantité mise à jour",
        description: `La quantité de ${itemName} a été mise à jour`,
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative text-black hover:bg-transparent hover:text-black p-0 group"
        >
          <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg animate-slide-in-right">
        <SheetHeader>
          <SheetTitle className="font-playfair">Votre Panier ({itemCount} articles)</SheetTitle>
        </SheetHeader>
        
        <div className="mt-8 space-y-4 h-[calc(100vh-200px)] overflow-auto">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="flex gap-4 py-4 border-b animate-fade-in hover:bg-gray-50 transition-colors rounded-lg p-3"
            >
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-20 h-20 object-cover rounded-lg transition-transform hover:scale-105" 
              />
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">{item.name}</h3>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="text-gray-400 hover:text-red-500 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                        <AlertDialogDescription>
                          Êtes-vous sûr de vouloir retirer {item.name} de votre panier ?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleRemoveItem(item.id, item.name)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Supprimer
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <p className="text-sm text-gray-600 mt-1">{item.price.toFixed(2)} €</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.name)}
                    className="p-1 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.name)}
                    className="p-1 rounded-md hover:bg-gray-200 transition-colors"
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
              className="w-full hover:scale-105 transition-transform bg-primary hover:bg-primary/90"
              onClick={() => {
                navigate('/cart');
                toast({
                  title: "Navigation vers le panier",
                  description: "Vous pouvez maintenant voir tous les détails de votre commande",
                });
              }}
              disabled={items.length === 0}
            >
              Voir le panier
            </Button>
            <Button 
              variant="outline"
              className="w-full hover:bg-gray-50 transition-colors"
              onClick={() => {
                navigate('/checkout');
                toast({
                  title: "Navigation vers le paiement",
                  description: "Vous allez pouvoir finaliser votre commande",
                });
              }}
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
