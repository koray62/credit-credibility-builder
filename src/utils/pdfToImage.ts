
import * as pdfjsLib from 'pdfjs-dist';

// PDF.js worker'ını konfigüre et
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export async function convertPdfToImage(file: File): Promise<string | null> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    
    // PDF dokümanını yükle
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    // İlk sayfayı al
    const page = await pdf.getPage(1);
    
    // Canvas oluştur
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (!context) {
      throw new Error('Canvas context oluşturulamadı');
    }
    
    // Viewport ayarla (yüksek kalite için scale artırıldı)
    const viewport = page.getViewport({ scale: 2.0 });
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    // Sayfayı canvas'a render et
    await page.render({
      canvasContext: context,
      viewport: viewport
    }).promise;
    
    // Canvas'ı base64'e çevir
    const base64 = canvas.toDataURL('image/jpeg', 0.95);
    
    return base64;
    
  } catch (error) {
    console.error('PDF to image conversion error:', error);
    return null;
  }
}
