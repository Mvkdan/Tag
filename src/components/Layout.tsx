
import React from 'react';
import { ShoppingCart, Menu, Mail, Instagram, Twitter, Facebook, ArrowRight, User } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

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
      <div className="fixed w-full z-50 px-4 pt-4">
        <nav className="container mx-auto bg-white rounded-xl shadow-luxury">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <Button variant="ghost" className="lg:hidden p-0">
                <Menu className="w-6 h-6" />
              </Button>
              <div className="hidden lg:flex items-center space-x-8">
                <Link to="/product">
                  <Button variant="link" className="text-black font-light tracking-wider">Collections</Button>
                </Link>
              </div>
              <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
                <h1 className="font-playfair text-4xl tracking-widest text-black">FINELY</h1>
              </Link>
              <div className="flex items-center gap-4">
                <Link to="/profile">
                  <Button variant="ghost" className="text-black hover:bg-transparent hover:text-black p-0">
                    <User className="w-5 h-5" />
                  </Button>
                </Link>
                <Button variant="ghost" className="text-black hover:bg-transparent hover:text-black p-0">
                  <span className="hidden lg:inline mr-2 font-light tracking-wider">Commander</span>
                  <ShoppingCart className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <main className="pt-28">
        {children}
      </main>
      
      {/* New Footer */}
      <footer>
        {/* CTA Banner */}
        <div className="bg-[#40BCD8] text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center gap-8 mb-8 md:mb-0">
                <img src="/placeholder.svg" alt="AirTags Collection" className="w-32 h-32 object-contain" />
                <div>
                  <h2 className="text-4xl font-playfair mb-2">Ready to Track?</h2>
                  <p className="text-lg opacity-80">Find your perfect AirTag companion</p>
                </div>
              </div>
              <Button className="bg-white text-[#40BCD8] hover:bg-white/90">
                Shop Now <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="bg-luxury-black text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
              <div className="space-y-4">
                <h4 className="font-playfair text-lg">Newsletter</h4>
                <p className="text-sm text-gray-400">Get 10% off your first order</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="bg-white/10 px-4 py-2 rounded-md flex-1" 
                  />
                  <Button size="sm">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div>
                <h4 className="font-playfair text-lg mb-4">Shop</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>All Products</li>
                  <li>New Arrivals</li>
                  <li>Best Sellers</li>
                </ul>
              </div>

              <div>
                <h4 className="font-playfair text-lg mb-4">About Us</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Our Story</li>
                  <li>Reviews</li>
                  <li>Blog</li>
                </ul>
              </div>

              <div>
                <h4 className="font-playfair text-lg mb-4">Support</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>FAQ</li>
                  <li>Shipping</li>
                  <li>Returns</li>
                </ul>
              </div>

              <div>
                <h4 className="font-playfair text-lg mb-4">Legal</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                  <li>Cookie Policy</li>
                </ul>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex gap-4">
                <Button variant="ghost" size="icon">
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Facebook className="w-5 h-5" />
                </Button>
              </div>
              
              <h3 className="font-playfair text-2xl">FINELY</h3>
              
              <div className="flex gap-4">
                <img src="/placeholder.svg" alt="Certification 1" className="h-12 w-auto" />
                <img src="/placeholder.svg" alt="Certification 2" className="h-12 w-auto" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
