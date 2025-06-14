
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useAuth } from '@/hooks/useAuth';
import UserMenu from './UserMenu';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-xl text-primary-dark">SkorUp</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary font-medium transition-colors">
              Ana Sayfa
            </Link>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-600 hover:text-primary font-medium">
                    Bilgi
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-48 p-2">
                      <Link
                        to="/biz-kimiz"
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                      >
                        Biz Kimiz
                      </Link>
                      <Link
                        to="/blog"
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                      >
                        Blog
                      </Link>
                      <Link
                        to="/kredi-hesaplama"
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                      >
                        Kredi Hesaplama
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link to="/findeks" className="text-gray-600 hover:text-primary font-medium transition-colors">
              Findeks
            </Link>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <UserMenu />
            ) : (
              <>
                <Link to="/giris">
                  <Button variant="ghost" className="text-gray-600 hover:text-primary">
                    Giriş Yap
                  </Button>
                </Link>
                <Link to="/basvuru">
                  <Button className="bg-primary hover:bg-primary-dark text-white">
                    Başvuru Yap
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-4">
              <Link
                to="/"
                className="block text-gray-600 hover:text-primary font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Ana Sayfa
              </Link>
              <Link
                to="/biz-kimiz"
                className="block text-gray-600 hover:text-primary font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Biz Kimiz
              </Link>
              <Link
                to="/blog"
                className="block text-gray-600 hover:text-primary font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/kredi-hesaplama"
                className="block text-gray-600 hover:text-primary font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Kredi Hesaplama
              </Link>
              <Link
                to="/findeks"
                className="block text-gray-600 hover:text-primary font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Findeks
              </Link>
              
              {user ? (
                <div className="pt-4 border-t border-gray-200">
                  <UserMenu />
                </div>
              ) : (
                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <Link to="/giris" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-primary">
                      Giriş Yap
                    </Button>
                  </Link>
                  <Link to="/basvuru" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-primary hover:bg-primary-dark text-white">
                      Başvuru Yap
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
