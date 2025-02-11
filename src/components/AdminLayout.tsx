
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Settings,
  MessageSquare,
  FileText,
  Image,
  LogOut,
} from 'lucide-react';
import { Button } from './ui/button';
import { Toaster } from './ui/toaster';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const menuItems = [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { title: 'Produits', icon: ShoppingBag, path: '/admin/products' },
    { title: 'Utilisateurs', icon: Users, path: '/admin/users' },
    { title: 'Témoignages', icon: MessageSquare, path: '/admin/testimonials' },
    { title: 'Articles', icon: FileText, path: '/admin/articles' },
    { title: 'Médias', icon: Image, path: '/admin/media' },
    { title: 'Paramètres', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-100">
        <Sidebar className="border-r border-gray-200">
          <SidebarContent>
            <div className="p-4">
              <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
            </div>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => navigate(item.path)}
                        >
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{item.title}</span>
                        </Button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <div className="absolute bottom-4 left-4 right-4">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => navigate('/')}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Déconnexion</span>
              </Button>
            </div>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1">
          <div className="p-8">
            <SidebarTrigger />
            {children}
          </div>
        </main>
        <Toaster />
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
