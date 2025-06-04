
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface OCRResult {
  score?: number;
  confidence?: number;
  error?: string;
}

async function extractScoreFromImage(base64Image: string): Promise<OCRResult> {
  try {
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Bu Findeks kredi raporu görselinden sadece kredi notunu (score) çıkar. Sadece sayısal değeri döndür, başka hiçbir metin ekleme. Eğer kredi notu bulunamazsa 'NOT_FOUND' yaz."
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`
                }
              }
            ]
          }
        ],
        max_tokens: 50
      })
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    const extractedText = data.choices[0]?.message?.content?.trim()
    
    if (!extractedText || extractedText === 'NOT_FOUND') {
      return { error: 'Kredi notu bulunamadı' }
    }

    const score = parseInt(extractedText)
    if (isNaN(score) || score < 0 || score > 1900) {
      return { error: 'Geçersiz kredi notu tespit edildi' }
    }

    return { score, confidence: 0.95 }
  } catch (error) {
    console.error('OCR Error:', error)
    return { error: error.message }
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { reportId, base64Image } = await req.json()
    
    if (!reportId || !base64Image) {
      throw new Error('Report ID and base64 image are required')
    }

    // OCR işlemini başlat
    const ocrResult = await extractScoreFromImage(base64Image)
    
    // Supabase client'ını hazırla
    const supabaseUrl = "https://wxfzuexhsgyeruqrmdow.supabase.co"
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    if (!supabaseServiceKey) {
      throw new Error('Supabase service key not configured')
    }

    const supabaseHeaders = {
      'Authorization': `Bearer ${supabaseServiceKey}`,
      'Content-Type': 'application/json',
      'apikey': supabaseServiceKey
    }

    // OCR sonucunu kaydet
    const ocrRecord = {
      findeks_report_id: reportId,
      status: ocrResult.error ? 'failed' : 'completed',
      extracted_score: ocrResult.score || null,
      confidence_score: ocrResult.confidence || null,
      error_message: ocrResult.error || null,
      processed_at: new Date().toISOString()
    }

    const ocrResponse = await fetch(`${supabaseUrl}/rest/v1/ocr_processing`, {
      method: 'POST',
      headers: supabaseHeaders,
      body: JSON.stringify(ocrRecord)
    })

    if (!ocrResponse.ok) {
      throw new Error('Failed to save OCR result')
    }

    // Eğer başarılıysa, findeks_reports tablosunu güncelle
    if (ocrResult.score) {
      const updateReportResponse = await fetch(`${supabaseUrl}/rest/v1/findeks_reports?id=eq.${reportId}`, {
        method: 'PATCH',
        headers: supabaseHeaders,
        body: JSON.stringify({
          ocr_processed: true,
          ocr_extracted_score: ocrResult.score,
          score: ocrResult.score
        })
      })

      if (!updateReportResponse.ok) {
        console.error('Failed to update findeks report')
      }
    }

    return new Response(
      JSON.stringify({ 
        success: !ocrResult.error,
        score: ocrResult.score,
        error: ocrResult.error 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
