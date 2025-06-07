
let pdfjsLib: any = null;

// Initialize PDF.js library with local worker
async function initializePdfJs() {
  if (!pdfjsLib) {
    try {
      pdfjsLib = await import('pdfjs-dist');
      
      // Use local worker to avoid CORS issues completely
      const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.min.js?url');
      pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker.default;
      
      console.log('PDF.js initialized successfully with local worker');
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
    
    try {
      // Load PDF document with minimal configuration
      const loadingTask = pdfLib.getDocument({ 
        data: arrayBuffer,
        verbosity: 0,
        useSystemFonts: true
      });
      
      const pdf = await loadingTask.promise;
      console.log('PDF loaded successfully, pages:', pdf.numPages);
      
      // Get first page
      const page = await pdf.getPage(1);
      console.log('First page loaded');
      
      // Create canvas
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      if (!context) {
        throw new Error('Canvas context could not be created');
      }
      
      // Set viewport (optimized scale for OCR)
      const viewport = page.getViewport({ scale: 2.0 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      
      // White background for better OCR
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      console.log('Canvas configured:', viewport.width, 'x', viewport.height);
      
      // Render page to canvas
      await page.render({
        canvasContext: context,
        viewport: viewport,
        background: 'white'
      }).promise;
      
      console.log('Page rendered to canvas');
      
      // Convert canvas to base64 (JPEG format, high quality)
      const base64 = canvas.toDataURL('image/jpeg', 0.95);
      
      // Validate base64 string
      if (!base64 || !base64.startsWith('data:image/')) {
        throw new Error('Base64 conversion failed');
      }
      
      console.log('PDF to image conversion successful, size:', base64.length);
      return base64;
      
    } catch (pdfError) {
      console.error('PDF processing error:', pdfError);
      return null;
    }
    
  } catch (error) {
    console.error('PDF to image conversion error:', error);
    return null;
  }
}
