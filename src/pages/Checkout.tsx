
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useCart } from '@/contexts/CartContext';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ShippingForm from '@/components/checkout/ShippingForm';
import ShippingMethod from '@/components/checkout/ShippingMethod';
import PromoCodeSection from '@/components/checkout/PromoCodeSection';
import OrderSummary from '@/components/checkout/OrderSummary';
import StripeWrapper from '@/components/checkout/StripeWrapper';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  address: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
  city: z.string().min(2, "La ville doit contenir au moins 2 caractères"),
  postalCode: z.string().min(5, "Code postal invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  promoCode: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof formSchema>;

const Checkout = () => {
  const { 
    items, 
    total, 
    clearCart, 
    promoCode, 
    applyPromoCode, 
    removePromoCode, 
    discount,
    shippingMethod,
    setShippingMethod,
    shippingCost,
    finalTotal
  } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>("");
  const [orderId, setOrderId] = useState<string>("");
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      postalCode: '',
      phone: '',
      promoCode: '',
    },
  });

  const onSubmit = async (data: CheckoutFormData) => {
    if (!shippingMethod) {
      toast({
        title: "Mode de livraison requis",
        description: "Veuillez sélectionner un mode de livraison",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsProcessing(true);

      if (!user) {
        toast({
          title: "Connexion requise pour finaliser la commande",
          description: "Veuillez vous connecter pour continuer",
        });
        navigate('/auth', { state: { returnTo: '/checkout' } });
        return;
      }

      const orderData = {
        ...data,
        shipping_method: shippingMethod,
        shipping_cost: shippingCost,
        total: finalTotal,
        discount: discount,
        promo_code: promoCode,
        items: items.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
          image: item.image
        })),
        user_id: user.id
      };

      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        },
        body: JSON.stringify({
          amount: finalTotal,
          order_data: orderData,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { clientSecret: secret, orderId: id } = await response.json();
      setClientSecret(secret);
      setOrderId(id);
      setShowPaymentForm(true);

    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Erreur de paiement",
        description: "Une erreur est survenue lors du paiement. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePromoCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = form.getValues('promoCode');
    if (code) {
      applyPromoCode(code);
      form.setValue('promoCode', '');
    }
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-playfair mb-4">Votre panier est vide</h1>
          <p className="text-gray-600 mb-8">Ajoutez des produits avant de procéder au paiement</p>
          <Button onClick={() => navigate('/product')} className="bg-primary hover:bg-primary/90">
            Voir les produits
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-playfair mb-8 animate-fade-in">Finaliser votre commande</h1>
        
        {!showPaymentForm ? (
          <Form {...form}>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <ShippingForm form={form} onSubmit={onSubmit} />
                <ShippingMethod 
                  shippingMethod={shippingMethod} 
                  onShippingMethodChange={setShippingMethod} 
                />
              </div>

              <div className="space-y-8">
                <PromoCodeSection 
                  form={form}
                  promoCode={promoCode}
                  onPromoCodeSubmit={handlePromoCodeSubmit}
                  onRemovePromoCode={removePromoCode}
                />

                <OrderSummary 
                  items={items}
                  total={total}
                  discount={discount}
                  shippingMethod={shippingMethod}
                  shippingCost={shippingCost}
                  finalTotal={finalTotal}
                />

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isProcessing}
                  onClick={form.handleSubmit(onSubmit)}
                >
                  {isProcessing ? 'Traitement en cours...' : 'Procéder au paiement'}
                </Button>
              </div>
            </div>
          </Form>
        ) : (
          <div className="max-w-md mx-auto">
            <StripeWrapper clientSecret={clientSecret} orderId={orderId} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Checkout;
