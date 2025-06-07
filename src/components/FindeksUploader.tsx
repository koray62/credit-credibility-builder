
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { useFindeksUpload } from '@/hooks/useFindeksUpload';

const FindeksUploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { uploadFindeksReport, isUploading, isProcessing } = useFindeksUpload();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      await uploadFindeksReport(selectedFile);
      setSelectedFile(null);
      // Input'u temizle
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    }
  };

  const isLoading = isUploading || isProcessing;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Upload className="mr-2 text-primary" />
        Findeks Raporu Yükleme
      </h2>
      
      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          Findeks raporunuzu PDF formatında yükleyerek, kredi puanınızı otomatik olarak çıkaracağız ve 
          hesabınızda güncelleyeceğiz. Yüklenen raporlar sadece sizin erişiminize açık olacaktır.
        </p>
        
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-blue-800 text-sm flex items-start">
          <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
          <p>
            <strong>Yeni Geliştirilmiş Sistem:</strong> PDF raporunuz güvenli bir şekilde sunucularımıza yüklenir 
            ve yapay zeka teknolojisi kullanarak kredi notunuz otomatik olarak tespit edilip hesabınızda güncellenir. 
            Artık browser uyumluluk sorunları yaşanmayacak.
          </p>
        </div>
      </div>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm font-medium text-gray-700">PDF formatında dosyanızı seçin</p>
        <p className="mt-1 text-xs text-gray-500">En fazla 10MB</p>
        
        <div className="mt-4">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".pdf"
            onChange={handleFileChange}
            disabled={isLoading}
          />
          <label htmlFor="file-upload">
            <Button variant="outline" className="mr-2" asChild disabled={isLoading}>
              <span>Dosya Seç</span>
            </Button>
          </label>
          
          <Button 
            onClick={handleUpload} 
            disabled={!selectedFile || isLoading}
            className="bg-primary hover:bg-primary-dark text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {isUploading ? 'Yükleniyor...' : 'İşleniyor...'}
              </>
            ) : (
              'Yükle ve İşle'
            )}
          </Button>
        </div>
        
        {selectedFile && !isLoading && (
          <div className="mt-4 text-sm">
            <p className="font-medium text-gray-700">Seçilen dosya: {selectedFile.name}</p>
            <p className="text-gray-500">Boyut: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        )}
        
        {isProcessing && (
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 text-blue-800 text-sm flex items-center">
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            <span>PDF güvenli sunucularımızda işleniyor, lütfen bekleyin...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindeksUploader;
