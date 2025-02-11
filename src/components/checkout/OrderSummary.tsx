
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CartItem } from '@/contexts/CartContext';

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
  discount: number;
  shippingMethod: 'standard' | 'express' | null;
  shippingCost: number;
  finalTotal: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  total,
  discount,
  shippingMethod,
  shippingCost,
  finalTotal
}) => {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Résumé de votre commande</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-4 border-b">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                <p className="text-primary">{(item.price * item.quantity).toFixed(2)} €</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Sous-total</span>
            <span>{total.toFixed(2)} €</span>
          </div>
          
          {discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Réduction</span>
              <span>-{discount.toFixed(2)} €</span>
            </div>
          )}

          {shippingMethod && (
            <div className="flex justify-between text-sm">
              <span>Livraison ({shippingMethod === 'standard' ? 'Standard' : 'Express'})</span>
              <span>{shippingCost.toFixed(2)} €</span>
            </div>
          )}

          <Separator className="my-4" />
          
          <div className="flex justify-between font-medium text-lg">
            <span>Total</span>
            <span>{finalTotal.toFixed(2)} €</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
