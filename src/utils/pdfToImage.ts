
import * as pdfjsLib from 'pdfjs-dist';

// PDF.js worker'ını Supabase'den yükle
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.269/pdf.worker.min.js';

export async function convertPdfToImage(file: File): Promise<string | null> {
  try {
    console.log('PDF conversion started for file:', file.name);
    
    const arrayBuffer = await file.arrayBuffer();
    console.log('ArrayBuffer created, size:', arrayBuffer.byteLength);
    
    // PDF dokümanını yükle
    const loadingTask = pdfjsLib.getDocument({ 
      data: arrayBuffer,
      verbosity: 0,
      useWorkerFetch: false,
      isEvalSupported: false
    });
    
    const pdf = await loadingTask.promise;
    console.log('PDF loaded successfully, pages:', pdf.numPages);
    
    // İlk sayfayı al
    const page = await pdf.getPage(1);
    console.log('First page loaded');
    
    // Canvas oluştur
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (!context) {
      throw new Error('Canvas context oluşturulamadı');
    }
    
    // Viewport ayarla (OCR için optimize edilmiş scale)
    const viewport = page.getViewport({ scale: 2.0 });
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    console.log('Canvas configured:', viewport.width, 'x', viewport.height);
    
    // Sayfayı canvas'a render et
    await page.render({
      canvasContext: context,
      viewport: viewport
    }).promise;
    
    console.log('Page rendered to canvas');
    
    // Canvas'ı base64'e çevir (PNG formatı, yüksek kalite)
    const base64 = canvas.toDataURL('image/png');
    
    // Base64 string'in geçerli olup olmadığını kontrol et
    if (!base64 || !base64.startsWith('data:image/')) {
      throw new Error('Base64 dönüştürme başarısız');
    }
    
    console.log('PDF to image conversion successful');
    return base64;
    
  } catch (error) {
    console.error('PDF to image conversion error:', error);
    return null;
  }
}
