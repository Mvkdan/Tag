
import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext';
import { Clock, Check, X, AlertTriangle, Timer, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const statusConfig = {
  pending: {
    icon: Clock,
    label: 'En attente',
    color: 'bg-yellow-100 text-yellow-800',
    description: 'Commande en attente de paiement'
  },
  processing: {
    icon: Timer,
    label: 'En cours de traitement',
    color: 'bg-blue-100 text-blue-800',
    description: 'Paiement en cours de traitement'
  },
  completed: {
    icon: Check,
    label: 'Terminée',
    color: 'bg-green-100 text-green-800',
    description: 'Commande complétée avec succès'
  },
  failed: {
    icon: X,
    label: 'Échouée',
    color: 'bg-red-100 text-red-800',
    description: 'Le paiement a échoué'
  },
  cancelled: {
    icon: AlertTriangle,
    label: 'Annulée',
    color: 'bg-gray-100 text-gray-800',
    description: 'Commande annulée'
  }
};

const OrderDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success');

  React.useEffect(() => {
    if (success === 'true') {
      toast({
        title: "Paiement réussi",
        description: "Votre commande a été confirmée. Merci de votre achat !",
      });
    }
  }, [success]);

  const { data: order, isLoading } = useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single();
      
      if (orderError) throw orderError;

      const { data: items, error: itemsError } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', id);
      
      if (itemsError) throw itemsError;

      return { ...orderData, items };
    },
    enabled: !!id && !!user,
  });

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Veuillez vous connecter pour voir cette commande</h1>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-64 w-full" />
        </div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Commande introuvable</h1>
        </div>
      </Layout>
    );
  }

  const StatusIcon = statusConfig[order.status as keyof typeof statusConfig]?.icon || Clock;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Commande #{order.id.slice(0, 8)}
          </h1>
          <span className={`px-4 py-2 rounded-full flex items-center gap-2 ${
            statusConfig[order.status as keyof typeof statusConfig]?.color || 'bg-gray-100 text-gray-800'
          }`}>
            <StatusIcon className="h-4 w-4" />
            {statusConfig[order.status as keyof typeof statusConfig]?.label || order.status}
          </span>
        </div>

        {order.error_message && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <h3 className="font-semibold mb-1">Message d'erreur :</h3>
            <p>{order.error_message}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Détails de la commande</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Date de commande</p>
                  <p>{new Date(order.created_at).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mode de livraison</p>
                  <p>{order.shipping_method === 'standard' ? 'Standard' : 'Express'}</p>
                </div>
                {order.promo_code && (
                  <div>
                    <p className="text-sm text-gray-500">Code promo utilisé</p>
                    <p>{order.promo_code}</p>
                  </div>
                )}
                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Télécharger la facture
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Adresse de livraison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>{order.first_name} {order.last_name}</p>
                <p>{order.address}</p>
                <p>{order.postal_code} {order.city}</p>
                <p>{order.email}</p>
                <p>{order.phone}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Articles commandés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex items-center gap-4 py-4 border-b last:border-0">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                    <p className="text-primary">{item.price.toFixed(2)} €</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Sous-total</span>
                <span>{(order.total - order.shipping_cost + order.discount).toFixed(2)} €</span>
              </div>
              
              {order.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Réduction</span>
                  <span>-{order.discount.toFixed(2)} €</span>
                </div>
              )}

              <div className="flex justify-between text-sm">
                <span>Livraison ({order.shipping_method === 'standard' ? 'Standard' : 'Express'})</span>
                <span>{order.shipping_cost.toFixed(2)} €</span>
              </div>

              <div className="pt-4 mt-4 border-t flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>{order.total.toFixed(2)} €</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {order.status_timeline && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Historique de la commande</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(order.status_timeline as any[]).map((event, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`mt-1 p-1 rounded-full ${
                      statusConfig[event.status as keyof typeof statusConfig]?.color || 'bg-gray-100'
                    }`}>
                      {React.createElement(statusConfig[event.status as keyof typeof statusConfig]?.icon || Clock, {
                        className: "h-4 w-4"
                      })}
                    </div>
                    <div>
                      <p className="font-medium">
                        {statusConfig[event.status as keyof typeof statusConfig]?.label || event.status}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(event.timestamp).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      {event.message && (
                        <p className="text-sm text-gray-600 mt-1">{event.message}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default OrderDetails;
