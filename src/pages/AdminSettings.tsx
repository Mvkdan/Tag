
import React from 'react';
import AdminLayout from '../components/AdminLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const AdminSettings = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Paramètres</h1>
          <p className="text-gray-500 mt-2">Gérez les paramètres de votre boutique</p>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList>
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="shipping">Livraison</TabsTrigger>
            <TabsTrigger value="payments">Paiements</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Informations de la boutique</h3>
                  <p className="text-sm text-gray-500">
                    Ces informations seront affichées publiquement sur votre site.
                  </p>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="storeName">Nom de la boutique</Label>
                    <Input id="storeName" defaultValue="AirTag Protection" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="storeEmail">Email de contact</Label>
                    <Input id="storeEmail" type="email" defaultValue="contact@example.com" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="storePhone">Téléphone</Label>
                    <Input id="storePhone" type="tel" defaultValue="+33 1 23 45 67 89" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="storeAddress">Adresse</Label>
                    <Input id="storeAddress" defaultValue="123 Rue du Commerce" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>Enregistrer les modifications</Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="shipping">
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Paramètres de livraison</h3>
                  <p className="text-sm text-gray-500">
                    Configurez les options de livraison pour vos clients.
                  </p>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="freeShippingThreshold">Seuil de livraison gratuite</Label>
                    <Input id="freeShippingThreshold" type="number" defaultValue="50" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="defaultShippingFee">Frais de livraison par défaut</Label>
                    <Input id="defaultShippingFee" type="number" defaultValue="5.90" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>Enregistrer les modifications</Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Paramètres de paiement</h3>
                  <p className="text-sm text-gray-500">
                    Configurez vos méthodes de paiement.
                  </p>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="stripeKey">Clé API Stripe</Label>
                    <Input id="stripeKey" type="password" defaultValue="sk_test_..." />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>Enregistrer les modifications</Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Paramètres des notifications</h3>
                  <p className="text-sm text-gray-500">
                    Configurez les notifications envoyées à vos clients.
                  </p>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="orderConfirmation">Confirmation de commande</Label>
                    <Input id="orderConfirmation" type="text" defaultValue="Votre commande a été confirmée" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="shippingConfirmation">Confirmation d'expédition</Label>
                    <Input id="shippingConfirmation" type="text" defaultValue="Votre commande a été expédiée" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>Enregistrer les modifications</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
