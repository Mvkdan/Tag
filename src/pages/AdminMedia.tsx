
import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Image, Plus, Search, Filter, MoreVertical, Pencil, Trash2, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';

const media = [
  {
    id: 1,
    name: 'AirTag Premium 1.png',
    type: 'image/png',
    size: '1.2 MB',
    url: '/lovable-uploads/c4d34119-cd16-4268-b4f9-d49f038af7f3.png',
    date: '2024-02-20'
  },
  {
    id: 2,
    name: 'AirTag Premium 2.png',
    type: 'image/png',
    size: '0.8 MB',
    url: '/lovable-uploads/8982a45a-388b-4280-b48c-5f2a359156f7.png',
    date: '2024-02-20'
  }
];

const AdminMedia = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Médiathèque</h1>
            <p className="text-gray-500 mt-2">Gérez vos images et autres fichiers médias</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un média
          </Button>
        </div>

        <Card className="p-6">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher un média..."
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {media.map((item) => (
              <div key={item.id} className="group relative">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img 
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.size}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Renommer
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Télécharger
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminMedia;
