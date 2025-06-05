// supabase/functions/process-findeks-ocr/index.ts
//-------------------------------------------------
//  Deno Edge Function – Findeks OCR
//-------------------------------------------------
import { serve } from "https://deno.land/std@0.201.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

// PDF ► PNG dönüştürme:
import {
  getDocument,
  GlobalWorkerOptions,
} from "npm:pdfjs-dist@4.2.67/legacy/build/pdf.mjs";
import { createCanvas } from "https://deno.land/x/canvas@1.4.1/mod.ts";

// Worker’ı CDN’den göster
GlobalWorkerOptions.workerSrc =
  "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.2.67/build/pdf.worker.mjs";

/* -------------------------------------------------- */
/*  CORS                                              */
/* -------------------------------------------------- */
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

/* -------------------------------------------------- */
/*  Türler                                            */
/* -------------------------------------------------- */
interface OCRResult {
  score?: number;
  confidence?: number;
  error?: string;
}

/* -------------------------------------------------- */
/*  Yardımcı – PDF ilk sayfayı PNG-dataURI yap        */
/* -------------------------------------------------- */
async function pdfFirstPageToDataURI(pdfBytes: Uint8Array): Promise<string> {
  const pdf = await getDocument({ data: pdfBytes }).promise;
  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale: 2 }); // çözünürlüğü gerekirse düşür
  const canvas = createCanvas(viewport.width, viewport.height);
  const ctx = canvas.getContext("2d");

  await page.render({ canvasContext: ctx, viewport }).promise;

  // PNG en sorunsuz; header'ı koru (data:image/png;base64,…)
  return canvas.toDataURL(); // default = image/png
}

/* -------------------------------------------------- */
/*  Yardımcı – base64 → Uint8Array                    */
/* -------------------------------------------------- */
function base64ToUint8Array(b64: string): Uint8Array {
  const binary = atob(b64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

/* -------------------------------------------------- */
/*  OCR ana fonksiyon                                 */
/* -------------------------------------------------- */
async function extractScoreFromImage(base64Input: string): Promise<OCRResult> {
  try {
    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiApiKey) throw new Error("OpenAI API key not configured");

    /* ---------- 1️⃣  PDF mi, resim mi? ---------- */
    let dataURI = base64Input; // data:image/png;base64,…  veya PDF

    // data:application/pdf;base64,…  veya  JVBER…
    const pdfRegex = /^data:application\/pdf;base64,|^JVBER/i;
    if (pdfRegex.test(base64Input)) {
      console.log("🔄 PDF algılandı, PNG'e dönüştürülüyor…");

      const rawPdfBase64 = base64Input.includes(",")
        ? base64Input.split(",")[1]
        : base64Input;

      dataURI = await pdfFirstPageToDataURI(
        base64ToUint8Array(rawPdfBase64),
      );
      console.log("✅ Dönüştürme tamam; dataURI uzunluğu:", dataURI.length);
    }

    /* ---------- 2️⃣  20 MB sınırı ---------- */
    // data URI üst bilgisi ≈ 30–50 bayt; kabaca %75 çarpanla byte’a dön
    const bytesApprox = (dataURI.length - dataURI.indexOf(",") - 1) * 0.75;
    if (bytesApprox > 20_000_000) {
      throw new Error("Dönüştürülen görüntü 20 MB sınırını aşıyor");
    }

    /* ---------- 3️⃣  OpenAI Vision ---------- */
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o", // Vision destekli model
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text:
                  "Bu Findeks kredi raporu görselinden sadece kredi notunu (score) çıkar. Yalnızca sayıyı döndür; bulunamazsa NOT_FOUND yaz.",
              },
              {
                type: "image_url",
                image_url: {
                  url: dataURI, // tam data URI (mime + base64)
                  detail: "auto",
                },
              },
            ],
          },
        ],
        max_tokens: 10,
      }),
    });

    // Hata yakalama – ayrıntılı logla
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

    /* ---------- 4️⃣  Cevabı işle ---------- */
    const data = await response.json();
    const extractedText = data.choices?.[0]?.message?.content?.trim();

    if (!extractedText || extractedText === "NOT_FOUND") {
      return { error: "Kredi notu bulunamadı" };
    }

    const score = parseInt(extractedText);
    if (isNaN(score) || score < 0 || score > 1900) {
      return { error: "Geçersiz kredi notu tespit edildi" };
    }

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
    if (!reportId || !base64Image || !userId) {
      throw new Error("Report ID, base64 image, and user ID are required");
    }

    console.log("▶️  OCR süreci:", { userId, reportId });

    // OCR
    const ocrResult = await extractScoreFromImage(base64Image);

    // Supabase
    const supabaseUrl = "https://wxfzuexhsgyeruqrmdow.supabase.co";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseKey) throw new Error("Supabase service key not configured");

    const sbHeaders = {
      Authorization: `Bearer ${supabaseKey}`,
      apikey: supabaseKey,
      "Content-Type": "application/json",
    };

    // OCR kaydı
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

    // Raporu güncelle
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

    // Yanıt
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
