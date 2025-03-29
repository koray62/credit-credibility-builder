
import React from 'react';
import { Check } from 'lucide-react';

interface BenefitCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
}

const BenefitCard: React.FC<BenefitCardProps> = ({ title, description, icon, benefits }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 transform transition-transform duration-300 hover:scale-105">
      <div className="w-14 h-14 mb-6 bg-primary-light text-primary rounded-full flex items-center justify-center">
        {icon}
      </div>
      
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      
      <ul className="space-y-2">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-gray-700">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BenefitCard;
