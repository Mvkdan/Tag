
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
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Package, Plus, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

const products = [
  {
    id: 1,
    name: 'AirTag Protection Premium',
    price: '45,00 €',
    stock: 25,
    status: 'En stock',
    image: '/lovable-uploads/c4d34119-cd16-4268-b4f9-d49f038af7f3.png'
  },
  {
    id: 2,
    name: 'AirTag Protection Classic',
    price: '35,00 €',
    stock: 15,
    status: 'En stock',
    image: '/lovable-uploads/8982a45a-388b-4280-b48c-5f2a359156f7.png'
  }
];

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Produits</h1>
            <p className="text-gray-500 mt-2">Gérez vos produits et leur inventaire</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un produit
          </Button>
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
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {product.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Menubar>
                      <MenubarMenu>
                        <MenubarTrigger>Actions</MenubarTrigger>
                        <MenubarContent className="bg-white">
                          <MenubarItem>Modifier</MenubarItem>
                          <MenubarItem>Dupliquer</MenubarItem>
                          <MenubarSeparator />
                          <MenubarItem className="text-red-600">Supprimer</MenubarItem>
                        </MenubarContent>
                      </MenubarMenu>
                    </Menubar>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
