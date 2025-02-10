
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-primary">AirTag</a>
          <Button variant="ghost" className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <span>Panier</span>
          </Button>
        </div>
      </nav>
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
};

export default Layout;
