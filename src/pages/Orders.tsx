
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Please sign in to view your orders</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Mes commandes</h1>
        
        {isLoading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        )}

        <div className="grid gap-4">
          {orders?.map((order) => (
            <Card 
              key={order.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/orders/${order.id}`)}
            >
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <span>Commande #{order.id.slice(0, 8)}</span>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                    <p className="font-medium">
                      {order.total.toFixed(2)} €
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {orders?.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            Vous n'avez pas encore de commandes
          </p>
        )}
      </div>
    </Layout>
  );
};

export default Orders;
