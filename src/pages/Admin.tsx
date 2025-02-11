
import React from 'react';
import AdminLayout from '../components/AdminLayout';
import { Card } from '@/components/ui/card';
import {
  ShoppingBag,
  Users,
  MessageSquare,
  TrendingUp,
} from 'lucide-react';

const statsCards = [
  {
    title: 'Ventes totales',
    value: '12,543 €',
    icon: TrendingUp,
    change: '+12%',
    changeType: 'positive'
  },
  {
    title: 'Produits',
    value: '45',
    icon: ShoppingBag,
    change: '+3',
    changeType: 'positive'
  },
  {
    title: 'Utilisateurs',
    value: '2,345',
    icon: Users,
    change: '+5%',
    changeType: 'positive'
  },
  {
    title: 'Avis',
    value: '128',
    icon: MessageSquare,
    change: '+8',
    changeType: 'positive'
  }
];

const Admin = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <p className="text-gray-500 mt-2">Bienvenue dans votre espace d'administration</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat) => (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                  <p className={`text-sm mt-2 ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} depuis le mois dernier
                  </p>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Dernières ventes</h3>
            <p className="text-gray-500">Graphique des ventes à venir...</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Avis récents</h3>
            <p className="text-gray-500">Liste des avis à venir...</p>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Admin;
