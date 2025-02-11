
import React from 'react';
import Layout from '@/components/Layout';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
}

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();

  const form = useForm<CheckoutFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      postalCode: '',
      phone: '',
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    // Simuler un traitement de commande
    toast({
      title: "Commande confirmée",
      description: "Merci pour votre achat !",
      className: "bg-primary text-white",
    });
    clearCart();
    navigate('/');
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
        <h1 className="text-3xl font-playfair mb-8">Finaliser votre commande</h1>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Formulaire de livraison */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-luxury">
              <h2 className="text-xl font-medium mb-6">Informations de livraison</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prénom</FormLabel>
                          <FormControl>
                            <Input placeholder="Jean" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <Input placeholder="Dupont" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="jean.dupont@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <Input placeholder="06 12 34 56 78" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adresse</FormLabel>
                        <FormControl>
                          <Input placeholder="123 rue de Paris" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ville</FormLabel>
                          <FormControl>
                            <Input placeholder="Paris" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Code Postal</FormLabel>
                          <FormControl>
                            <Input placeholder="75001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full mt-8">
                    Confirmer la commande
                  </Button>
                </form>
              </Form>
            </div>
          </div>

          {/* Résumé de la commande */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-luxury">
              <h2 className="text-xl font-medium mb-6">Résumé de votre commande</h2>
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
                <div className="flex justify-between text-sm">
                  <span>Livraison</span>
                  <span>Gratuite</span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-4 border-t">
                  <span>Total</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
