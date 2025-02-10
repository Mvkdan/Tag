
import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from './ui/button';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-luxury-gold text-white py-2 animate-slideDown">
        <div className="container mx-auto px-4 text-center text-sm font-light tracking-wider">
          Livraison offerte dans notre écrin signature
        </div>
      </div>
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-luxury-black">Collections</Button>
              <Button variant="ghost" className="text-luxury-black">Personnalisation</Button>
            </div>
            <a href="/" className="absolute left-1/2 transform -translate-x-1/2">
              <h1 className="text-2xl font-light tracking-widest text-luxury-black">FINELY</h1>
            </a>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-luxury-black">
                <Star className="w-4 h-4 mr-1" />
                <span className="text-sm">4.9/5</span>
              </div>
              <Button variant="ghost" className="flex items-center gap-2 text-luxury-black">
                <ShoppingCart className="w-5 h-5" />
                <span>Panier</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <main className="pt-28">
        {children}
      </main>
      <footer className="bg-luxury-black text-white py-16 mt-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-light text-xl mb-4">FINELY</h3>
              <p className="text-gray-400">L'élégance de la sérénité au quotidien.</p>
            </div>
            <div>
              <h4 className="font-light text-lg mb-4">Service Client</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Contact</li>
                <li>FAQ</li>
                <li>Retours</li>
              </ul>
            </div>
            <div>
              <h4 className="font-light text-lg mb-4">À Propos</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Notre Histoire</li>
                <li>Nos Valeurs</li>
                <li>Dans la Presse</li>
              </ul>
            </div>
            <div>
              <h4 className="font-light text-lg mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">Recevez nos actualités et offres exclusives.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Votre email" className="bg-white/10 px-4 py-2 rounded-md" />
                <Button className="bg-luxury-gold hover:bg-primary-dark">S'inscrire</Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
