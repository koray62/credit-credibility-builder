
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

    // Image file validation
    if (!file.type.includes('image/')) {
      toast.error('Lütfen PNG veya JPG formatında bir görüntü seçin');
      return null;
    }

    setIsUploading(true);

    try {
      console.log('Starting image upload...', file.name, 'Size:', file.size);

      // Dosyayı storage'a yükle
      const fileName = `${user.id}/${Date.now()}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('findeks-reports')
        .upload(fileName, file);

      if (uploadError) {
        console.error('Storage upload error:', uploadError);
        throw uploadError;
      }

      console.log('File uploaded successfully:', uploadData.path);

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
        console.error('Database insert error:', reportError);
        throw reportError;
      }

      console.log('Report record created:', reportData.id);

      toast.success('Görüntü başarıyla yüklendi');
      
      // OCR işlemini başlat
      await processWithOCR(reportData.id, uploadData.path);
      
      return reportData;

    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Görüntü yükleme başarısız: ' + (error.message || 'Bilinmeyen hata'));
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const processWithOCR = async (reportId: string, filePath: string) => {
    if (!user) {
      toast.error('Kullanıcı oturumu bulunamadı');
      return;
    }

    setIsProcessing(true);
    
    try {
      console.log('Starting OCR processing...', 'Report ID:', reportId, 'File path:', filePath);

      // OCR edge function'ını çağır
      const { data, error } = await supabase.functions.invoke('process-findeks-ocr', {
        body: {
          reportId,
          filePath,
          userId: user.id
        }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error(error.message || 'OCR servisi hatası');
      }

      console.log('OCR function response:', data);

      if (data?.success && data.score) {
        toast.success(`Findeks notunuz başarıyla güncellendi: ${data.score}`);
      } else {
        throw new Error(data?.error || 'OCR işlemi başarısız');
      }

    } catch (error) {
      console.error('OCR processing error:', error);
      toast.error('Rapor işleme başarısız: ' + (error.message || 'Bilinmeyen hata'));
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    uploadFindeksReport,
    isUploading,
    isProcessing
  };
};
