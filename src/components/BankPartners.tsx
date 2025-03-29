
import React from 'react';

const BankPartners: React.FC = () => {
  // Bu içerik için örnek banka logoları
  const banks = [
    { name: "Örnek Banka 1", logo: "/placeholder.svg" },
    { name: "Örnek Banka 2", logo: "/placeholder.svg" },
    { name: "Örnek Banka 3", logo: "/placeholder.svg" },
    { name: "Örnek Banka 4", logo: "/placeholder.svg" },
    { name: "Örnek Banka 5", logo: "/placeholder.svg" }
  ];

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-semibold text-gray-700 mb-8">Anlaşmalı Bankalar</h2>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {banks.map((bank, index) => (
            <div key={index} className="w-32 h-32 flex items-center justify-center bg-white rounded-lg shadow-sm p-4 grayscale hover:grayscale-0 transition-all duration-300">
              <img src={bank.logo} alt={bank.name} className="max-w-full max-h-full" />
            </div>
          ))}
        </div>
        
        <p className="text-center text-gray-500 mt-8 max-w-2xl mx-auto">
          Tüm kredi işlemleri, Türkiye'nin önde gelen bankaları aracılığıyla güvenli ve şeffaf bir şekilde gerçekleştirilmektedir.
        </p>
      </div>
    </section>
  );
};

export default BankPartners;
