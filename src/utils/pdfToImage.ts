
let pdfjsLib: any = null;

// Initialize PDF.js library with better error handling
async function initializePdfJs() {
  if (!pdfjsLib) {
    try {
      pdfjsLib = await import('pdfjs-dist');
      
      // Try multiple worker sources for better reliability
      const workerSources = [
        'https://unpkg.com/pdfjs-dist@4.0.269/build/pdf.worker.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.269/pdf.worker.min.js',
        'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.269/build/pdf.worker.min.js'
      ];
      
      // Set worker source
      pdfjsLib.GlobalWorkerOptions.workerSrc = workerSources[0];
      
      // Disable worker fetch to avoid CORS issues
      pdfjsLib.GlobalWorkerOptions.workerPort = null;
      
    } catch (error) {
      console.error('Failed to initialize PDF.js:', error);
      throw new Error('PDF.js initialization failed');
    }
  }
  return pdfjsLib;
}

export async function convertPdfToImage(file: File): Promise<string | null> {
  try {
    console.log('PDF conversion started for file:', file.name);
    
    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      console.error('File too large:', file.size);
      return null;
    }
    
    // Initialize PDF.js
    const pdfLib = await initializePdfJs();
    
    const arrayBuffer = await file.arrayBuffer();
    console.log('ArrayBuffer created, size:', arrayBuffer.byteLength);
    
    // Wait a bit to ensure worker is loaded
    await new Promise(resolve => setTimeout(resolve, 200));
    
    try {
      // PDF dokümanını yükle with CORS-safe options
      const loadingTask = pdfLib.getDocument({ 
        data: arrayBuffer,
        verbosity: 0,
        useWorkerFetch: false,
        isEvalSupported: false,
        useSystemFonts: true,
        cMapUrl: 'https://unpkg.com/pdfjs-dist@4.0.269/cmaps/',
        cMapPacked: true,
        // Disable worker fetch to avoid CORS
        disableWorker: false,
        disableAutoFetch: false,
        disableStream: false
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
      
      // Canvas'ı base64'e çevir (JPEG formatı, yüksek kalite)
      const base64 = canvas.toDataURL('image/jpeg', 0.95);
      
      // Base64 string'in geçerli olup olmadığını kontrol et
      if (!base64 || !base64.startsWith('data:image/')) {
        throw new Error('Base64 dönüştürme başarısız');
      }
      
      console.log('PDF to image conversion successful, size:', base64.length);
      return base64;
      
    } catch (pdfError) {
      console.error('PDF processing error:', pdfError);
      
      // Fallback: Try with minimal configuration
      console.log('Trying fallback configuration...');
      
      const fallbackTask = pdfLib.getDocument({
        data: arrayBuffer,
        verbosity: 0,
        disableWorker: true, // Disable worker completely as fallback
      });
      
      const fallbackPdf = await fallbackTask.promise;
      const fallbackPage = await fallbackPdf.getPage(1);
      
      const fallbackCanvas = document.createElement('canvas');
      const fallbackContext = fallbackCanvas.getContext('2d')!;
      
      const fallbackViewport = fallbackPage.getViewport({ scale: 1.5 });
      fallbackCanvas.height = fallbackViewport.height;
      fallbackCanvas.width = fallbackViewport.width;
      
      fallbackContext.fillStyle = 'white';
      fallbackContext.fillRect(0, 0, fallbackCanvas.width, fallbackCanvas.height);
      
      await fallbackPage.render({
        canvasContext: fallbackContext,
        viewport: fallbackViewport,
        background: 'white'
      }).promise;
      
      const fallbackBase64 = fallbackCanvas.toDataURL('image/jpeg', 0.9);
      console.log('Fallback conversion successful');
      return fallbackBase64;
    }
    
  } catch (error) {
    console.error('PDF to image conversion error:', error);
    return null;
  }
}
