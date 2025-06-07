
// This file is deprecated and no longer used
// PDF processing is now handled entirely in the backend edge function
// to avoid browser compatibility issues

export async function convertPdfToImage(file: File): Promise<string | null> {
  console.warn('convertPdfToImage is deprecated. PDF processing is now handled in the backend.');
  return null;
}
