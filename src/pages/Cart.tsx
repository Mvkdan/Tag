
import React from 'react';
import Layout from '@/components/Layout';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
import { toast } from '@/hooks/use-toast';

const Cart = () => {
  const { items, removeItem, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  const handleRemoveItem = (itemId: string, itemName: string) => {
    removeItem(itemId);
    toast({
      title: "Produit retiré",
      description: `${itemName} a été retiré de votre panier`,
    });
  };

  const handleQuantityUpdate = (itemId: string, newQuantity: number, itemName: string) => {
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

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto space-y-8 animate-fade-in">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-400" />
            <h1 className="text-3xl font-playfair mb-4">Votre panier est vide</h1>
            <p className="text-gray-600 mb-8">Découvrez nos produits et commencez votre shopping</p>
            <Button 
              onClick={() => navigate('/product')} 
              className="bg-primary hover:bg-primary/90 transition-colors animate-fade-in"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voir les produits
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-playfair mb-8 animate-fade-in">Votre Panier</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="flex gap-6 p-4 bg-white rounded-lg shadow-luxury animate-fade-in transition-all hover:shadow-lg group"
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-32 h-32 object-cover rounded-lg transition-transform group-hover:scale-105" 
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-5 h-5" />
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
                  <p className="text-primary text-lg font-medium mt-2">{item.price.toFixed(2)} €</p>
                  <div className="flex items-center gap-4 mt-4">
                    <button
                      onClick={() => handleQuantityUpdate(item.id, item.quantity - 1, item.name)}
                      className="p-2 rounded-lg border-2 border-gray-200 hover:border-primary/50 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center text-lg font-medium">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityUpdate(item.id, item.quantity + 1, item.name)}
                      className="p-2 rounded-lg border-2 border-gray-200 hover:border-primary/50 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-luxury animate-fade-in">
              <h2 className="text-xl font-medium mb-4">Résumé de la commande</h2>
              <div className="space-y-3 pb-4 border-b">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>{(item.price * item.quantity).toFixed(2)} €</span>
                  </div>
                ))}
              </div>
              <div className="py-4">
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
              </div>
              <div className="space-y-3 pt-4">
                <Button 
                  className="w-full hover:scale-105 transition-transform bg-primary hover:bg-primary/90"
                  onClick={() => {
                    navigate('/checkout');
                    toast({
                      title: "Navigation vers le paiement",
                      description: "Vous allez pouvoir finaliser votre commande",
                    });
                  }}
                >
                  Procéder au paiement
                </Button>
                <Button
                  variant="outline"
                  className="w-full hover:bg-gray-50 transition-colors"
                  onClick={() => navigate('/product')}
                >
                  Continuer les achats
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
