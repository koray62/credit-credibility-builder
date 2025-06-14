
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

      // For now, let's try a simpler approach - just tell the user to upload an image instead
      // This bypasses the PDF conversion issue entirely
      throw new Error('PDF otomatik işleme şu anda desteklenmiyor. Lütfen Findeks raporunuzun ekran görüntüsünü PNG veya JPG formatında yükleyin.');

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

async function extractScoreFromImage(base64Image: string) {
  try {
    const OPENAI_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!OPENAI_KEY) {
      throw new Error("OPENAI_API_KEY environment variable bulunamadı");
    }

    console.log('Preparing image for OpenAI...');

    // Clean the base64 string
    let cleanBase64 = base64Image;
    if (base64Image.includes(',')) {
      cleanBase64 = base64Image.split(',')[1];
    }

    // Validate base64 format
    if (!cleanBase64 || cleanBase64.length < 100) {
      throw new Error("Base64 image verisi çok kısa veya geçersiz");
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
          model: "gpt-4.1-2025-04-14",
          messages: [{
            role: "user",
            content: [
              { 
                type: "text",
                text: "Bu Findeks kredi raporu görselinden sadece kredi notunu çıkar. Kredi notu genellikle büyük rakamlarla yazılır ve 'Kredi Notu' veya 'Score' kelimesinin yanında bulunur. Sadece sayıyı yaz (örnek: 1450). Eğer kredi notu bulunamazsa 'NOT_FOUND' yaz. Başka hiçbir şey yazma."
              },
              { 
                type: "image_url", 
                image_url: { 
                  url: base64Image,
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
