
// Set up PDF.js worker using a more reliable CDN
const pdfjsLib = await import('pdfjs-dist');

// Use unpkg CDN which is more reliable
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@4.0.269/build/pdf.worker.min.js';

export async function convertPdfToImage(file: File): Promise<string | null> {
  try {
    console.log('PDF conversion started for file:', file.name);
    
    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      console.error('File too large:', file.size);
      return null;
    }
    
    const arrayBuffer = await file.arrayBuffer();
    console.log('ArrayBuffer created, size:', arrayBuffer.byteLength);
    
    // Wait a bit to ensure worker is loaded
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // PDF dokümanını yükle with more options
    const loadingTask = pdfjsLib.getDocument({ 
      data: arrayBuffer,
      verbosity: 0,
      useWorkerFetch: false,
      isEvalSupported: false,
      standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@4.0.269/standard_fonts/',
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
    
    // White background for better OCR
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    console.log('Canvas configured:', viewport.width, 'x', viewport.height);
    
    // Sayfayı canvas'a render et
    await page.render({
      canvasContext: context,
      viewport: viewport,
      background: 'white'
    }).promise;
    
    console.log('Page rendered to canvas');
    
    // Canvas'ı base64'e çevir (JPEG formatı, sıkıştırma ile)
    const base64 = canvas.toDataURL('image/jpeg', 0.9);
    
    // Base64 string'in geçerli olup olmadığını kontrol et
    if (!base64 || !base64.startsWith('data:image/')) {
      throw new Error('Base64 dönüştürme başarısız');
    }
    
    console.log('PDF to image conversion successful, size:', base64.length);
    return base64;
    
  } catch (error) {
    console.error('PDF to image conversion error:', error);
    
    // If it's a worker error, try alternative approach
    if (error.message && error.message.includes('worker')) {
      console.log('Trying alternative worker configuration...');
      
      try {
        // Try with different worker URL
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.269/pdf.worker.min.js';
        
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ 
          data: arrayBuffer,
          verbosity: 0,
          useWorkerFetch: false,
          isEvalSupported: false,
        });
        
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d')!;
        
        const viewport = page.getViewport({ scale: 1.5 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        await page.render({
          canvasContext: context,
          viewport: viewport,
          background: 'white'
        }).promise;
        
        return canvas.toDataURL('image/jpeg', 0.9);
        
      } catch (secondError) {
        console.error('Alternative approach also failed:', secondError);
        return null;
      }
    }
    
    return null;
  }
}
