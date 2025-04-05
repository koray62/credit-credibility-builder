
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, TrendingUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
import UserMenu from './UserMenu';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, signOut } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    setIsMenuOpen(false);
    signOut();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={scrollToTop}>
              <span className="font-heading text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center">
                SkorUp
                <TrendingUp className="ml-1 h-5 w-5 text-primary transform rotate-45" />
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors" onClick={scrollToTop}>Ana Sayfa</Link>
            <Link to="/basvuru" className="text-gray-700 hover:text-primary transition-colors">Başvuru</Link>
            <Link to="/surec" className="text-gray-700 hover:text-primary transition-colors">Süreç Takibi</Link>
            
            <div className="relative" ref={dropdownRef}>
              <button 
                className="flex items-center text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Bilgi <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {isDropdownOpen && (
                <div 
                  className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 animate-fade-in"
                >
                  <Link 
                    to="/biz-kimiz" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Biz Kimiz
                  </Link>
                  <Link 
                    to="/blog" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Blog
                  </Link>
                  <Link 
                    to="/findeks" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Findeks
                  </Link>
                  <Link 
                    to="/#faq" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setTimeout(() => {
                        const faqElement = document.getElementById('faq');
                        if (faqElement) faqElement.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                  >
                    Sıkça Sorulan Sorular
                  </Link>
                </div>
              )}
            </div>
            
            {!user ? (
              <>
                <Link to="/giris">
                  <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                    Giriş Yap
                  </Button>
                </Link>
                
                <Link to="/basvuru">
                  <Button size="sm" className="bg-primary text-white hover:bg-primary-dark transition-colors">
                    Hemen Başvur
                  </Button>
                </Link>
              </>
            ) : (
              <UserMenu />
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              type="button"
              className="text-gray-500 hover:text-primary focus:outline-none focus:text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                onClick={() => {
                  setIsMenuOpen(false);
                  scrollToTop();
                }}
              >
                Ana Sayfa
              </Link>
              <Link 
                to="/basvuru" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Başvuru
              </Link>
              <Link 
                to="/surec" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Süreç Takibi
              </Link>
              <Link 
                to="/biz-kimiz" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Biz Kimiz
              </Link>
              <Link 
                to="/blog" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/findeks" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Findeks
              </Link>
              <Link 
                to="/#faq" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                onClick={() => {
                  setIsMenuOpen(false);
                  setTimeout(() => {
                    const faqElement = document.getElementById('faq');
                    if (faqElement) faqElement.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              >
                Sıkça Sorulan Sorular
              </Link>
              
              {!user ? (
                <div className="flex space-x-2 mt-4">
                  <Link 
                    to="/giris" 
                    className="flex-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
                      Giriş Yap
                    </Button>
                  </Link>
                  <Link 
                    to="/basvuru" 
                    className="flex-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button className="w-full bg-primary text-white hover:bg-primary-dark">
                      Hemen Başvur
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="mt-4 px-3 py-2">
                  <p className="font-medium text-gray-800 mb-2">
                    {user.user_metadata?.name || 'Kullanıcı'}
                  </p>
                  <Link 
                    to="/profil" 
                    className="block py-2 text-sm text-gray-700 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profil
                  </Link>
                  <Link 
                    to="/surec" 
                    className="block py-2 text-sm text-gray-700 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Başvurularım
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="block py-2 text-sm text-red-500 hover:text-red-700 w-full text-left"
                  >
                    Çıkış Yap
                  </button>
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
