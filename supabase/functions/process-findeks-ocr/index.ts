import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

/* -------------------------------------------------- */
/*  CORS                                              */
/* -------------------------------------------------- */
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

/* -------------------------------------------------- */
/*  OCR helper                                        */
/* -------------------------------------------------- */
interface OCRResult {
  score?: number;
  confidence?: number;
  error?: string;
}

async function extractScoreFromImage(base64Image: string): Promise<OCRResult> {
  try {
    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiApiKey) throw new Error("OpenAI API key not configured");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o", // ✅ Vision erişimi olan evrensel model
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text:
                  "Bu Findeks kredi raporu görselinden sadece kredi notunu (score) çıkar. Sadece sayıyı döndür; bulunamazsa NOT_FOUND yaz.",
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`,
                  detail: "auto", // opsiyonel – şimdilik auto
                },
              },
            ],
          },
        ],
        max_tokens: 10,
      }),
    });

    /* ---------- ayrıntılı hata yakalama ---------- */
    if (!response.ok) {
      let payload: unknown;
      try {
        payload = await response.json();
      } catch {
        payload = await response.text();
      }
      console.error("OpenAI API error details:", response.status, payload);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const extractedText = data.choices?.[0]?.message?.content?.trim();

    if (!extractedText || extractedText === "NOT_FOUND")
      return { error: "Kredi notu bulunamadı" };

    const score = parseInt(extractedText);
    if (isNaN(score) || score < 0 || score > 1900)
      return { error: "Geçersiz kredi notu tespit edildi" };

    return { score, confidence: 0.95 };
  } catch (err) {
    console.error("OCR Error:", err);
    return { error: (err as Error).message };
  }
}

/* -------------------------------------------------- */
/*  HTTP handler                                      */
/* -------------------------------------------------- */
serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { reportId, base64Image, userId } = await req.json();

    if (!reportId || !base64Image || !userId)
      throw new Error("Report ID, base64 image, and user ID are required");

    console.log("Processing OCR:", { userId, reportId });

    /* ---------- OCR ---------- */
    const ocrResult = await extractScoreFromImage(base64Image);

    /* ---------- Supabase ---------- */
    const supabaseUrl = "https://wxfzuexhsgyeruqrmdow.supabase.co";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseKey) throw new Error("Supabase service key not configured");

    const sbHeaders = {
      Authorization: `Bearer ${supabaseKey}`,
      apikey: supabaseKey,
      "Content-Type": "application/json",
    };

    /* ---------- OCR kaydı ---------- */
    const ocrRecord = {
      findeks_report_id: reportId,
      user_id: userId,
      status: ocrResult.error ? "failed" : "completed",
      extracted_score: ocrResult.score ?? null,
      confidence_score: ocrResult.confidence ?? null,
      error_message: ocrResult.error ?? null,
      processed_at: new Date().toISOString(),
    };

    await fetch(`${supabaseUrl}/rest/v1/ocr_processing`, {
      method: "POST",
      headers: sbHeaders,
      body: JSON.stringify(ocrRecord),
    });

    /* ---------- Rapor güncelle ---------- */
    if (ocrResult.score) {
      await fetch(
        `${supabaseUrl}/rest/v1/findeks_reports?id=eq.${reportId}`,
        {
          method: "PATCH",
          headers: sbHeaders,
          body: JSON.stringify({
            ocr_processed: true,
            ocr_extracted_score: ocrResult.score,
            score: ocrResult.score,
          }),
        },
      );
    }

    /* ---------- yanıt ---------- */
    return new Response(
      JSON.stringify({
        success: !ocrResult.error,
        score: ocrResult.score,
        error: ocrResult.error,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (err) {
    console.error("Function error:", err);
    return new Response(
      JSON.stringify({ success: false, error: (err as Error).message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }
});
