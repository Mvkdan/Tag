
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
  promoCode: string | null;
  applyPromoCode: (code: string) => void;
  removePromoCode: () => void;
  discount: number;
  shippingMethod: 'standard' | 'express' | null;
  setShippingMethod: (method: 'standard' | 'express' | null) => void;
  shippingCost: number;
  finalTotal: number;
}

const CART_STORAGE_KEY = 'finely_cart';
const VALID_PROMO_CODES = {
  'BIENVENUE10': 0.10,
  'FINELY20': 0.20,
  'ETE2024': 0.15
};

const SHIPPING_COSTS = {
  standard: 4.99,
  express: 9.99
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | null>(null);

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
    setPromoCode(null);
    setShippingMethod(null);
    toast({
      title: "Panier vidé",
      description: "Votre panier a été vidé avec succès",
    });
  };

  const applyPromoCode = (code: string) => {
    const upperCode = code.toUpperCase();
    if (VALID_PROMO_CODES[upperCode as keyof typeof VALID_PROMO_CODES]) {
      setPromoCode(upperCode);
      toast({
        title: "Code promo appliqué",
        description: `Le code ${upperCode} a été appliqué avec succès`,
      });
    } else {
      toast({
        title: "Code promo invalide",
        description: "Ce code promo n'est pas valide",
        variant: "destructive",
      });
    }
  };

  const removePromoCode = () => {
    setPromoCode(null);
    toast({
      title: "Code promo retiré",
      description: "Le code promo a été retiré",
    });
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = promoCode ? subtotal * VALID_PROMO_CODES[promoCode as keyof typeof VALID_PROMO_CODES] : 0;
  const shippingCost = shippingMethod ? SHIPPING_COSTS[shippingMethod] : 0;
  const total = subtotal - discount;
  const finalTotal = total + shippingCost;
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
        promoCode,
        applyPromoCode,
        removePromoCode,
        discount,
        shippingMethod,
        setShippingMethod,
        shippingCost,
        finalTotal,
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
