
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
    const { reportId, base64Image, userId } = await req.json();
    
    if (!reportId || !base64Image || !userId) {
      throw new Error("reportId, base64Image, userId gerekli");
    }

    console.log('Processing OCR for user:', userId, 'report:', reportId);
    console.log('Base64 image length:', base64Image.length);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
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
      // Extract score from image using OpenAI
      const extractedScore = await extractScoreFromImage(base64Image);
      
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

async function extractScoreFromImage(base64Image: string) {
  try {
    const OPENAI_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!OPENAI_KEY) {
      throw new Error("OPENAI_API_KEY environment variable bulunamadı");
    }

    console.log('Preparing image for OpenAI...');

    // Clean the base64 string and validate format
    let cleanBase64 = base64Image;
    if (base64Image.includes(',')) {
      cleanBase64 = base64Image.split(',')[1];
    }

    // Validate base64 format
    if (!cleanBase64 || cleanBase64.length < 100) {
      throw new Error("Base64 görsel verisi çok kısa veya geçersiz");
    }

    console.log('Base64 cleaned, length:', cleanBase64.length);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
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
                url: `data:image/jpeg;base64,${cleanBase64}`,
                detail: "high"
              } 
            },
          ],
        }],
        max_tokens: 50,
        temperature: 0
      }),
    });

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

  } catch (error) {
    console.error('Score extraction error:', error);
    return { error: error.message };
  }
}
