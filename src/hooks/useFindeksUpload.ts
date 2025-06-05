
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export const useFindeksUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();

  const uploadFindeksReport = async (file: File) => {
    if (!user) {
      toast.error('Lütfen giriş yapın');
      return null;
    }

    if (!file.type.includes('pdf')) {
      toast.error('Lütfen PDF formatında bir dosya seçin');
      return null;
    }

    setIsUploading(true);

    try {
      // Dosyayı storage'a yükle
      const fileName = `${user.id}/${Date.now()}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('findeks-reports')
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      // Findeks raporu kaydını oluştur
      const { data: reportData, error: reportError } = await supabase
        .from('findeks_reports')
        .insert({
          user_id: user.id,
          file_path: uploadData.path,
          score: 0, // OCR ile güncellenecek
          report_date: new Date().toISOString()
        })
        .select()
        .single();

      if (reportError) {
        throw reportError;
      }

      toast.success('Dosya başarıyla yüklendi');
      
      // OCR işlemini başlat
      await processWithOCR(file, reportData.id);
      
      return reportData;

    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Dosya yükleme başarısız');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const processWithOCR = async (file: File, reportId: string) => {
    if (!user) {
      toast.error('Kullanıcı oturumu bulunamadı');
      return;
    }

    setIsProcessing(true);
    
    try {
      // PDF'i canvas'a çevir ve base64 olarak al
      const base64Image = await convertPdfToImage(file);
      
      if (!base64Image) {
        throw new Error('PDF görsel dönüştürme başarısız');
      }

      console.log('Calling OCR function with user ID:', user.id);

      // OCR edge function'ını çağır
      const { data, error } = await supabase.functions.invoke('process-findeks-ocr', {
        body: {
          reportId,
          base64Image,
          userId: user.id
        }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw error;
      }

      console.log('OCR function response:', data);

      if (data.success && data.score) {
        toast.success(`Findeks notunuz başarıyla güncellendi: ${data.score}`);
      } else {
        toast.error(data.error || 'OCR işlemi başarısız');
      }

    } catch (error) {
      console.error('OCR processing error:', error);
      toast.error('Rapor işleme başarısız: ' + (error.message || 'Bilinmeyen hata'));
    } finally {
      setIsProcessing(false);
    }
  };

  const convertPdfToImage = async (file: File): Promise<string | null> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = function(e) {
        if (e.target?.result) {
          // PDF'den ilk sayfayı base64 olarak al
          const base64 = (e.target.result as string).split(',')[1];
          resolve(base64);
        } else {
          resolve(null);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return {
    uploadFindeksReport,
    isUploading,
    isProcessing
  };
};
