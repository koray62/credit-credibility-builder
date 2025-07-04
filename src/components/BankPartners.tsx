
import React from 'react';

const BankPartners: React.FC = () => {
  // Banka logoları 
  const banks = [
    { name: "Colendibank", logo: "/lovable-uploads/ab4315a3-ab9b-43cc-bef1-8efad9454e7e.png" }
  ];

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-semibold text-gray-700 mb-8">Anlaşmalı Bankalar</h2>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {banks.map((bank, index) => (
            <div key={index} className="w-48 h-32 flex items-center justify-center bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-300">
              <img src={bank.logo} alt={bank.name} className="max-w-full max-h-full object-contain" />
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
