
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
import { Truck, Percent, PackageCheck, XCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Informations de livraison</CardTitle>
                <CardDescription>Entrez vos informations de livraison</CardDescription>
              </CardHeader>
              <CardContent>
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
                              <Input placeholder="Jean" {...field} className="bg-white" />
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
                              <Input placeholder="Dupont" {...field} className="bg-white" />
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
                            <Input type="email" placeholder="jean.dupont@example.com" {...field} className="bg-white" />
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
                            <Input placeholder="06 12 34 56 78" {...field} className="bg-white" />
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
                            <Input placeholder="123 rue de Paris" {...field} className="bg-white" />
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
                              <Input placeholder="Paris" {...field} className="bg-white" />
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
                              <Input placeholder="75001" {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button 
                      type="submit"
                      className="w-full mt-8 hover:scale-105 transition-transform bg-primary hover:bg-primary/90"
                    >
                      Confirmer la commande
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Mode de livraison</CardTitle>
                <CardDescription>Choisissez votre mode de livraison préféré</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={shippingMethod || ''}
                  onValueChange={(value: 'standard' | 'express') => setShippingMethod(value)}
                  className="grid gap-4"
                >
                  <div>
                    <RadioGroupItem
                      value="standard"
                      id="standard"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="standard"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:border-primary"
                    >
                      <Truck className="mb-3 h-6 w-6" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Livraison Standard
                        </p>
                        <p className="text-sm text-muted-foreground">
                          4.99 € - 3-5 jours ouvrés
                        </p>
                      </div>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="express"
                      id="express"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="express"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:border-primary"
                    >
                      <PackageCheck className="mb-3 h-6 w-6" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Livraison Express
                        </p>
                        <p className="text-sm text-muted-foreground">
                          9.99 € - 1-2 jours ouvrés
                        </p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Code promo</CardTitle>
                <CardDescription>Entrez votre code promo si vous en avez un</CardDescription>
              </CardHeader>
              <CardContent>
                {promoCode ? (
                  <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Percent className="w-5 h-5 text-primary" />
                      <span className="font-medium">{promoCode}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={removePromoCode}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <XCircle className="w-5 h-5" />
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handlePromoCodeSubmit} className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="promoCode"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Entrez votre code" {...field} className="bg-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Appliquer</Button>
                  </form>
                )}
              </CardContent>
            </Card>

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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
