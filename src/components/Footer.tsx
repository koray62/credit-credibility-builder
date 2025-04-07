import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, GithubIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <div className="flex items-center">
                <span className="font-heading text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  SkorUp
                </span>
                <div className="ml-1 bg-white rounded-full flex items-center justify-center">
                  <img 
                    src="public/lovable-uploads/a421e180-ad0f-46da-9cd7-3162a4530f1b.png"
                    alt="Logo arrow" 
                    className="h-8 w-8" 
                    style={{ marginLeft: "-2px" }}
                  />
                </div>
              </div>
            </Link>
            <p className="text-gray-600 text-sm max-w-xs">
              Kredibilite oluşturmanıza yardımcı olan güvenilir finansal çözüm platformu.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                <GithubIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                <YoutubeIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Hızlı Erişim</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
              </li>
              <li>
                <Link to="/basvuru" className="hover:text-primary transition-colors">Başvuru</Link>
              </li>
              <li>
                <Link to="/surec" className="hover:text-primary transition-colors">Süreç Takibi</Link>
              </li>
              <li>
                <Link to="/findeks" className="hover:text-primary transition-colors">Findeks</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Şirket</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link to="/biz-kimiz" className="hover:text-primary transition-colors">Biz Kimiz</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/kvkk" className="hover:text-primary transition-colors">KVKK</Link>
              </li>
              <li>
                <Link to="/sss" className="hover:text-primary transition-colors">SSS</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">İletişim</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center justify-between group">
                <span className="text-sm">E-posta</span>
                <a href="mailto:info@skorup.org" className="text-primary font-medium group-hover:underline flex items-center">
                  info@skorup.org
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </a>
              </li>
              <li className="flex items-center justify-between group">
                <span className="text-sm">Telefon</span>
                <a href="tel:+905001234567" className="text-primary font-medium group-hover:underline flex items-center">
                  0850 123 4567
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </a>
              </li>
              <li className="flex items-center justify-between group">
                <span className="text-sm">Adres</span>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-primary font-medium group-hover:underline flex items-center">
                  Haritada Gör
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>© 2025 SkorUp. Tüm hakları saklıdır.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/gizlilik-politikasi" className="hover:text-primary transition-colors">Gizlilik Politikası</Link>
            <Link to="/kullanim-kosullari" className="hover:text-primary transition-colors">Kullanım Koşulları</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
