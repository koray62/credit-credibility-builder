// supabase/functions/process-findeks-ocr/index.ts
import { serve } from "https://deno.land/std@0.201.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

import {
  getDocument,
  GlobalWorkerOptions,
} from "npm:pdfjs-dist@4.2.67/legacy/build/pdf.mjs";
import { createCanvas } from "https://deno.land/x/canvas@1.4.1/mod.ts";

GlobalWorkerOptions.workerSrc =
  "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.2.67/build/pdf.worker.mjs";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OCRResult {
  score?: number;
  confidence?: number;
  error?: string;
}

/* ---------- PDF ► JPEG-dataURI ---------- */
async function pdfToJpegDataURI(pdfBytes: Uint8Array): Promise<string> {
  const pdf = await getDocument({ data: pdfBytes }).promise;
  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale: 1.5 }); // ↓ çözünürlük
  const canvas = createCanvas(viewport.width, viewport.height);
  const ctx = canvas.getContext("2d");
  await page.render({ canvasContext: ctx, viewport }).promise;

  // JPEG, kalite 0.9
  const uri = canvas.toDataURL("image/jpeg", 0.9);
  return uri.replace(/\r?\n|\r/g, ""); // newline temizle
}

function base64ToUint8Array(b64: string): Uint8Array {
  const bin = atob(b64);
  return Uint8Array.from({ length: bin.length }, (_, i) => bin.charCodeAt(i));
}

/* ---------- OCR ana işlev ---------- */
async function extractScoreFromImage(b64Input: string): Promise<OCRResult> {
  try {
    const openaiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiKey) throw new Error("OPENAI_API_KEY yok");

    // 1) PDF mi resim mi?
    let dataURI = b64Input;
    const pdfRe = /^data:application\/pdf;base64,|^JVBER/i;

    if (pdfRe.test(b64Input)) {
      console.log("PDF algılandı → JPEG’e dönüştür");
      const cleanB64 = b64Input.includes(",")
        ? b64Input.split(",")[1]
        : b64Input;
      dataURI = await pdfToJpegDataURI(base64ToUint8Array(cleanB64));
      console.log("JPEG hazır, uzunluk:", dataURI.length);
    }

    // 2) Boyut kontrolü (<= 5 MB)
    const bytes = (dataURI.length - dataURI.indexOf(",") - 1) * 0.75;
    if (bytes > 5_000_000) throw new Error("Görüntü 5 MB sınırını aşıyor");

    // 3) OpenAI Vision çağrısı
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openaiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text:
                  "Bu Findeks kredi raporu görselinden sadece kredi notunu çıkar. Sadece sayıyı yaz; bulunamazsa NOT_FOUND yaz.",
              },
              {
                type: "image_url",
                image_url: { url: dataURI, detail: "auto" },
              },
            ],
          },
        ],
        max_tokens: 10,
      }),
    });

    if (!res.ok) {
      const p = await res.text();
      console.error("OpenAI error:", res.status, p.slice(0, 200));
      throw new Error(`OpenAI API error: ${res.status}`);
    }

    const js = await res.json();
    const out = js.choices?.[0]?.message?.content?.trim();

    if (!out || out === "NOT_FOUND") return { error: "Score bulunamadı" };
    const score = parseInt(out);
    if (isNaN(score) || score < 0 || score > 1900) {
      return { error: "Geçersiz score" };
    }
    return { score, confidence: 0.95 };
  } catch (e) {
    console.error("OCR Error:", e);
    return { error: (e as Error).message };
  }
}

/* ---------- HTTP handler ---------- */
serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { reportId, base64Image, userId } = await req.json();
    if (!reportId || !base64Image || !userId) {
      throw new Error("reportId, base64Image, userId zorunlu");
    }

    const ocr = await extractScoreFromImage(base64Image);

    // … (Supabase kayıt & güncelleme kodları değişmedi) …

    return new Response(
      JSON.stringify({ success: !ocr.error, score: ocr.score, error: ocr.error }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ success: false, error: (e as Error).message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 },
    );
  }
});
