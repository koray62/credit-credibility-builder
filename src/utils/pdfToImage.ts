
import * as pdfjsLib from 'pdfjs-dist';

// PDF.js worker'ını doğru şekilde konfigüre et
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

export async function convertPdfToImage(file: File): Promise<string | null> {
  try {
    console.log('PDF conversion started for file:', file.name);
    
    const arrayBuffer = await file.arrayBuffer();
    console.log('ArrayBuffer created, size:', arrayBuffer.byteLength);
    
    // PDF dokümanını yükle
    const loadingTask = pdfjsLib.getDocument({ 
      data: arrayBuffer,
      verbosity: 0 // Verbose logging'i kapat
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
    const viewport = page.getViewport({ scale: 1.5 });
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    console.log('Canvas configured:', viewport.width, 'x', viewport.height);
    
    // Sayfayı canvas'a render et
    await page.render({
      canvasContext: context,
      viewport: viewport
    }).promise;
    
    console.log('Page rendered to canvas');
    
    // Canvas'ı base64'e çevir (JPEG formatı, yüksek kalite)
    const base64 = canvas.toDataURL('image/jpeg', 0.92);
    
    // Base64 string'in geçerli olup olmadığını kontrol et
    if (!base64 || !base64.startsWith('data:image/')) {
      throw new Error('Base64 dönüştürme başarısız');
    }
    
    console.log('PDF to image conversion successful');
    return base64;
    
  } catch (error) {
    console.error('PDF to image conversion error:', error);
    
    // Daha detaylı hata mesajı
    if (error.message?.includes('Setting up fake worker failed')) {
      console.error('PDF.js worker setup failed. Trying alternative approach...');
      
      // Worker olmadan deneme
      try {
        return await convertWithoutWorker(file);
      } catch (fallbackError) {
        console.error('Fallback conversion also failed:', fallbackError);
        return null;
      }
    }
    
    return null;
  }
}

// Worker olmadan PDF dönüştürme (fallback)
async function convertWithoutWorker(file: File): Promise<string | null> {
  try {
    console.log('Attempting conversion without worker...');
    
    // Farklı bir yaklaşım: PDF.js'i minimal konfigürasyonla kullan
    const arrayBuffer = await file.arrayBuffer();
    
    // PDF.js'i worker olmadan konfigüre et
    const oldWorkerSrc = pdfjsLib.GlobalWorkerOptions.workerSrc;
    pdfjsLib.GlobalWorkerOptions.workerSrc = null;
    
    const pdf = await pdfjsLib.getDocument({ 
      data: arrayBuffer,
      useWorkerFetch: false,
      isEvalSupported: false,
      useSystemFonts: true
    }).promise;
    
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1.5 });
    
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (!context) {
      throw new Error('Canvas context failed');
    }
    
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    await page.render({
      canvasContext: context,
      viewport: viewport
    }).promise;
    
    // Worker konfigürasyonunu geri yükle
    pdfjsLib.GlobalWorkerOptions.workerSrc = oldWorkerSrc;
    
    const base64 = canvas.toDataURL('image/jpeg', 0.92);
    console.log('Fallback conversion successful');
    
    return base64;
    
  } catch (error) {
    console.error('Fallback conversion failed:', error);
    return null;
  }
}
