
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const NotFoundContent: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Blog Yazısı Bulunamadı</h1>
      <p className="text-gray-600 mb-8">Aradığınız blog yazısı mevcut değil veya kaldırılmış olabilir.</p>
      <Link to="/blog">
        <Button>Blog'a Dön</Button>
      </Link>
    </div>
  );
};

export default NotFoundContent;
