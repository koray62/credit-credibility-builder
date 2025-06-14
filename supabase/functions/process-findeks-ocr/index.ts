
import { serve } from "https://deno.land/std@0.201.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { reportId, filePath, userId } = await req.json();
    
    if (!reportId || !filePath || !userId) {
      throw new Error("reportId, filePath, userId gerekli");
    }

    console.log('Processing OCR for user:', userId, 'report:', reportId, 'file:', filePath);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase konfigürasyonu eksik');
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Insert OCR processing record
    const { data: ocrRecord, error: ocrError } = await supabase
      .from('ocr_processing')
      .insert({
        user_id: userId,
        findeks_report_id: reportId,
        status: 'processing'
      })
      .select()
      .single();

    if (ocrError) {
      console.error('OCR record creation error:', ocrError);
      throw new Error(`OCR kaydı oluşturulamadı: ${ocrError.message}`);
    }

    console.log('OCR record created:', ocrRecord.id);

    try {
      // Download PDF file from storage
      const { data: fileData, error: downloadError } = await supabase.storage
        .from('findeks-reports')
        .download(filePath);

      if (downloadError || !fileData) {
        throw new Error(`PDF dosyası indirilemedi: ${downloadError?.message}`);
      }

      console.log('PDF file downloaded, size:', fileData.size);

      // Check file size limit (10MB)
      if (fileData.size > 10 * 1024 * 1024) {
        throw new Error('Dosya boyutu çok büyük (max 10MB)');
      }

      // Convert PDF to base64 using optimized method
      const base64PDF = await convertToBase64Optimized(fileData);
      
      console.log('PDF converted to base64 successfully');

      // Extract score using OpenAI
      const extractedScore = await extractScoreFromPDF(base64PDF);
      
      if (extractedScore.error) {
        throw new Error(extractedScore.error);
      }

      console.log('Score extracted successfully:', extractedScore.score);

      // Update OCR processing record with success
      await supabase
        .from('ocr_processing')
        .update({
          status: 'completed',
          extracted_score: extractedScore.score,
          confidence_score: extractedScore.confidence,
          processed_at: new Date().toISOString()
        })
        .eq('id', ocrRecord.id);

      // Update findeks_reports table with extracted score
      await supabase
        .from('findeks_reports')
        .update({
          score: extractedScore.score,
          ocr_processed: true,
          ocr_extracted_score: extractedScore.score
        })
        .eq('id', reportId);

      console.log('OCR processing completed successfully');

      return new Response(
        JSON.stringify({ 
          success: true, 
          score: extractedScore.score,
          confidence: extractedScore.confidence 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );

    } catch (processingError) {
      console.error('OCR Error:', processingError);
      
      // Update OCR processing record with error
      await supabase
        .from('ocr_processing')
        .update({
          status: 'failed',
          error_message: processingError.message,
          processed_at: new Date().toISOString()
        })
        .eq('id', ocrRecord.id);

      return new Response(
        JSON.stringify({ 
          success: false, 
          error: processingError.message 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

  } catch (error) {
    console.error('General error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" }, 
        status: 500 
      }
    );
  }
});

// Optimized base64 conversion to prevent stack overflow
async function convertToBase64Optimized(file: File): Promise<string> {
  try {
    console.log('Starting optimized base64 conversion for file size:', file.size);
    
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    
    // Use TextDecoder with base64 encoding for better memory efficiency
    let binaryString = '';
    const chunkSize = 8192; // Process in 8KB chunks to avoid stack overflow
    
    for (let i = 0; i < uint8Array.length; i += chunkSize) {
      const chunk = uint8Array.slice(i, i + chunkSize);
      binaryString += String.fromCharCode.apply(null, Array.from(chunk));
    }
    
    const base64 = btoa(binaryString);
    const base64WithPrefix = `data:application/pdf;base64,${base64}`;
    
    console.log('Base64 conversion completed, length:', base64WithPrefix.length);
    return base64WithPrefix;
    
  } catch (error) {
    console.error('Base64 conversion error:', error);
    throw new Error(`Base64 dönüştürme hatası: ${error.message}`);
  }
}

async function extractScoreFromPDF(base64PDF: string) {
  try {
    const OPENAI_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!OPENAI_KEY) {
      throw new Error("OPENAI_API_KEY environment variable bulunamadı");
    }

    console.log('Preparing PDF for OpenAI...');

    // Clean the base64 string
    let cleanBase64 = base64PDF;
    if (base64PDF.includes(',')) {
      cleanBase64 = base64PDF.split(',')[1];
    }

    // Validate base64 format
    if (!cleanBase64 || cleanBase64.length < 100) {
      throw new Error("Base64 PDF verisi çok kısa veya geçersiz");
    }

    console.log('Base64 cleaned, length:', cleanBase64.length);

    // Add timeout to the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4.1-2025-04-14", // Updated to newer model
          messages: [{
            role: "user",
            content: [
              { 
                type: "text",
                text: "Bu Findeks kredi raporu PDF'inden sadece kredi notunu çıkar. Kredi notu genellikle büyük rakamlarla yazılır ve 'Kredi Notu' veya 'Score' kelimesinin yanında bulunur. Sadece sayıyı yaz (örnek: 1450). Eğer kredi notu bulunamazsa 'NOT_FOUND' yaz. Başka hiçbir şey yazma."
              },
              { 
                type: "image_url", 
                image_url: { 
                  url: base64PDF,
                  detail: "high"
                } 
              },
            ],
          }],
          max_tokens: 50,
          temperature: 0
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('OpenAI API error:', response.status, errorText);
        throw new Error(`OpenAI API hatası: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const extractedText = data.choices?.[0]?.message?.content?.trim();
      
      console.log('OpenAI response:', extractedText);

      if (!extractedText || extractedText === "NOT_FOUND") {
        return { error: "Kredi notu bulunamadı" };
      }

      const score = parseInt(extractedText, 10);
      if (Number.isNaN(score) || score < 0 || score > 1900) {
        return { error: `Geçersiz kredi notu: ${extractedText}` };
      }

      return { 
        score, 
        confidence: 0.95 
      };

    } catch (fetchError) {
      clearTimeout(timeoutId);
      if (fetchError.name === 'AbortError') {
        throw new Error('OpenAI API isteği zaman aşımına uğradı');
      }
      throw fetchError;
    }

  } catch (error) {
    console.error('Score extraction error:', error);
    return { error: error.message };
  }
}
