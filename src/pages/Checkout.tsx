
import React from 'react';
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
import { Button } from '@/components/ui/button';

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

  const onSubmit = (data: CheckoutFormData) => {
    if (!shippingMethod) {
      toast({
        title: "Mode de livraison requis",
        description: "Veuillez sélectionner un mode de livraison",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Commande confirmée",
      description: "Merci pour votre achat !",
      className: "bg-primary text-white",
    });
    clearCart();
    navigate('/');
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
