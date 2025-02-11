
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CART_STORAGE_KEY = 'finely_cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize state from localStorage if available
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(i => i.id === item.id);
      const newItems = existingItem
        ? currentItems.map(i =>
            i.id === item.id 
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          )
        : [...currentItems, item];
      
      toast({
        title: "Produit ajouté au panier",
        description: `${item.name} a été ajouté à votre panier`,
      });
      
      return newItems;
    });
  };

  const removeItem = (itemId: string) => {
    setItems(currentItems => {
      const itemToRemove = currentItems.find(item => item.id === itemId);
      if (itemToRemove) {
        toast({
          title: "Produit retiré du panier",
          description: `${itemToRemove.name} a été retiré de votre panier`,
        });
      }
      return currentItems.filter(item => item.id !== itemId);
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setItems(currentItems =>
      currentItems.map(item => {
        if (item.id === itemId) {
          const newQuantity = Math.max(0, quantity);
          if (newQuantity === 0) {
            // If quantity becomes 0, we'll remove the item
            removeItem(itemId);
            return item;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Panier vidé",
      description: "Votre panier a été vidé avec succès",
    });
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
