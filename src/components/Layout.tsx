import React from 'react';
import { ShoppingCart, Menu } from 'lucide-react';
import { Button } from './ui/button';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative bg-[#4CAF50] text-white py-2 overflow-hidden">
        <div className="animate-[marquee_20s_linear_infinite] whitespace-nowrap inline-block">
          <span className="mx-4">Subscribe & Save 10%</span>
          <span className="mx-4">•</span>
          <span className="mx-4">Subscribe & Save 10%</span>
          <span className="mx-4">•</span>
          <span className="mx-4">Subscribe & Save 10%</span>
        </div>
      </div>
      <nav className="fixed w-full z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Button variant="ghost" className="lg:hidden p-0">
              <Menu className="w-6 h-6" />
            </Button>
            <div className="hidden lg:flex items-center space-x-8">
              <Button variant="link" className="text-black font-light tracking-wider">Collections</Button>
            </div>
            <a href="/" className="absolute left-1/2 transform -translate-x-1/2">
              <h1 className="font-playfair text-4xl tracking-widest text-black">FINELY</h1>
            </a>
            <Button variant="ghost" className="text-black hover:bg-transparent hover:text-black p-0">
              <span className="hidden lg:inline mr-2 font-light tracking-wider">Commander</span>
              <ShoppingCart className="w-5 h-5" />
            </Button>
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
              <h3 className="font-playfair text-xl mb-4">FINELY</h3>
              <p className="text-gray-400">L'élégance de la sérénité au quotidien.</p>
            </div>
            <div>
              <h4 className="font-playfair text-lg mb-4">Service Client</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Contact</li>
                <li>FAQ</li>
                <li>Retours</li>
              </ul>
            </div>
            <div>
              <h4 className="font-playfair text-lg mb-4">À Propos</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Notre Histoire</li>
                <li>Nos Valeurs</li>
                <li>Dans la Presse</li>
              </ul>
            </div>
            <div>
              <h4 className="font-playfair text-lg mb-4">Newsletter</h4>
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
