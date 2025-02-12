
import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Package, Plus, Search, Filter } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stripePriceId, setStripePriceId] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  const { data: products, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const handleImportProduct = async () => {
    try {
      setIsImporting(true);
      const { data, error } = await supabase.functions.invoke('manage-product', {
        body: { stripe_price_id: stripePriceId },
      });

      if (error) throw error;

      await refetch();
      toast({
        title: "Produit importé avec succès",
        description: "Le produit a été ajouté à votre catalogue",
      });
      setStripePriceId('');
    } catch (error) {
      console.error('Error importing product:', error);
      toast({
        title: "Erreur lors de l'importation",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Produits</h1>
            <p className="text-gray-500 mt-2">Gérez vos produits et leur inventaire</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Importer un produit Stripe
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Importer un produit depuis Stripe</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="priceId" className="text-sm font-medium">
                    ID du prix Stripe
                  </label>
                  <Input
                    id="priceId"
                    placeholder="price_..."
                    value={stripePriceId}
                    onChange={(e) => setStripePriceId(e.target.value)}
                  />
                  <p className="text-sm text-gray-500">
                    Entrez l'ID du prix Stripe que vous souhaitez importer
                  </p>
                </div>
                <Button 
                  className="w-full" 
                  onClick={handleImportProduct}
                  disabled={isImporting || !stripePriceId}
                >
                  {isImporting ? 'Importation...' : 'Importer le produit'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="p-6">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtres
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>ID Stripe</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.price.toFixed(2)} €</TableCell>
                  <TableCell className="font-mono text-sm">{product.stripe_price_id}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Actif
                    </span>
                  </TableCell>
                </TableRow>
              ))}
              {!products?.length && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    Aucun produit trouvé. Importez un produit depuis Stripe pour commencer.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
