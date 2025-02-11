
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { User, Package, Heart, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la déconnexion",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-playfair mb-4">Mon Compte</h1>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-medium">{user.email}</h2>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Orders Section */}
            <Card className="p-6 hover:shadow-luxury transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-4">
                <Package className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-medium">Mes Commandes</h3>
              </div>
              <p className="text-gray-600 mb-4">Consultez l'historique de vos commandes</p>
              <Button onClick={() => navigate('/orders')} className="w-full">Voir mes commandes</Button>
            </Card>

            {/* Favorites Section */}
            <Card className="p-6 hover:shadow-luxury transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-4">
                <Heart className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-medium">Mes Favoris</h3>
              </div>
              <p className="text-gray-600 mb-4">Retrouvez vos produits préférés</p>
              <Button variant="outline" className="w-full">Voir mes favoris</Button>
            </Card>

            {/* Settings Section */}
            <Card className="p-6 hover:shadow-luxury transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-4">
                <Settings className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-medium">Paramètres</h3>
              </div>
              <p className="text-gray-600 mb-4">Gérez vos informations personnelles</p>
              <Button variant="outline" className="w-full">Modifier mes paramètres</Button>
            </Card>

            {/* Logout Section */}
            <Card className="p-6 hover:shadow-luxury transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-4">
                <LogOut className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-medium">Déconnexion</h3>
              </div>
              <p className="text-gray-600 mb-4">Se déconnecter de votre compte</p>
              <Button 
                variant="outline" 
                className="w-full text-red-600 hover:text-red-700"
                onClick={handleSignOut}
              >
                Se déconnecter
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
