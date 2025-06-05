/******************************************************************
 *  Findeks OCR – PDF ► JPEG ► Supabase Storage ► OpenAI Vision
 *  Deno Edge Function (Supabase)
 ******************************************************************/
import { serve } from "https://deno.land/std@0.201.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

import { createCanvas } from "https://deno.land/x/canvas@1.4.1/mod.ts";
import {
  getDocument,
  GlobalWorkerOptions,
} from "npm:pdfjs-dist@4.2.67/legacy/build/pdf.mjs";

/* -------------------------------------------------- */
/*  Worker (PDF.js)                                   */
/* -------------------------------------------------- */
GlobalWorkerOptions.workerSrc =
  "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.2.67/build/pdf.worker.mjs";

/* -------------------------------------------------- */
/*  Env / Config                                      */
/* -------------------------------------------------- */
const SUPABASE_URL  = "https://wxfzuexhsgyeruqrmdow.supabase.co";
const STORAGE_BUCKET = "public";          // herkesçe erişilebilir
const STORAGE_PATH   = "ocr-cache";       // JPEG’lerin klasörü

const corsHeaders = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/* -------------------------------------------------- */
/*  Yardımcı Fonksiyonlar                             */
/* -------------------------------------------------- */
function base64ToUint8(b64: string): Uint8Array {
  const bin = atob(b64);
  return Uint8Array.from({ length: bin.length }, (_, i) => bin.charCodeAt(i));
}

async function pdfPageToJpegBytes(pdfBytes: Uint8Array): Promise<Uint8Array> {
  const pdf   = await getDocument({ data: pdfBytes }).promise;
  const page  = await pdf.getPage(1);            // 1. sayfa yeterli
  const view  = page.getViewport({ scale: 1.4 }); // ~150-200 DPI
  const canvas = createCanvas(view.width, view.height);
  await page.render({ canvasContext: canvas.getContext("2d"), viewport: view }).promise;
  return canvas.toBuffer("image/jpeg", { quality: 0.9 });
}

async function uploadToSupabase(img: Uint8Array, fileName: string): Promise<string> {
  const svcKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!svcKey) throw new Error("Supabase service key yok (env).");

  const objectPath = `${STORAGE_PATH}/${fileName}`;
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${STORAGE_BUCKET}/${objectPath}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${svcKey}`,
      apikey:       svcKey,
      "Content-Type": "image/jpeg",
    },
    body: img,
  });

  if (!res.ok) throw new Error(`Storage yükleme hatası (${res.status}).`);
  // Public bucket => doğrudan erişim URL’i:
  return `${SUPABASE_URL}/storage/v1/object/public/${objectPath}`;
}

/* -------------------------------------------------- */
/*  OCR İşlevi                                        */
/* -------------------------------------------------- */
interface OCRResult { score?: number; confidence?: number; error?: string; }

async function extractScore(base64OrPdf: string): Promise<OCRResult> {
  try {
    /* ---------- 1) Görseli hazırlama (public URL) ---------- */
    let imageUrl = base64OrPdf; // fallback (eğer doğrudan url gelirse)
    const isPDF  = /^data:application\/pdf;base64,|^JVBER/i.test(base64OrPdf);
    const isImg  = /^data:image\//i.test(base64OrPdf);

    if (isPDF || isImg) {
      const rawB64 = base64OrPdf.includes(",") ? base64OrPdf.split(",")[1] : base64OrPdf;
      const jpegBytes = isPDF
        ? await pdfPageToJpegBytes(base64ToUint8(rawB64))
        : base64ToUint8(rawB64);                // zaten image/jpeg|png

      if (jpegBytes.length > 5_000_000) throw new Error("Görsel 5 MB sınırını aşıyor.");

      const fileName = `${crypto.randomUUID()}.jpg`;
      imageUrl = await uploadToSupabase(jpegBytes, fileName);
    }

    /* ---------- 2) OpenAI Vision ---------- */
    const OPENAI_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!OPENAI_KEY) throw new Error("OPENAI_API_KEY yok (env).");

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${OPENAI_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{
          role: "user",
          content: [
            { type: "text",
              text: "Bu Findeks kredi raporu görselinden sadece kredi notunu (score) çıkar. Yalnızca sayıyı döndür; bulunamazsa NOT_FOUND yaz." },
            { type: "image_url", image_url: { url: imageUrl, detail: "auto" } }
          ]
        }],
        max_tokens: 10,
      }),
    });

    if (!resp.ok) {
      console.error("OpenAI hata:", resp.status, await resp.text());
      throw new Error(`OpenAI API error ${resp.status}`);
    }

    const { choices } = await resp.json();
    const txt = choices?.[0]?.message?.content?.trim();
    if (!txt || txt === "NOT_FOUND") return { error: "Score bulunamadı" };

    const score = parseInt(txt, 10);
    if (Number.isNaN(score) || score < 0 || score > 1900) return { error: "Geçersiz score" };
    return { score, confidence: 0.95 };
  } catch (err) {
    return { error: (err as Error).message };
  }
}

/* -------------------------------------------------- */
/*  HTTP Handler (Supabase Function)                  */
/* -------------------------------------------------- */
serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { reportId, base64Image, userId } = await req.json();
    if (!reportId || !base64Image || !userId)
      throw new Error("reportId, base64Image ve userId zorunludur.");

    // OCR
    const ocr = await extractScore(base64Image);

    // --- Burada Supabase’e kayıt / güncelleme adımlarınız aynı kalabilir ---
    // findeks_reports & ocr_processing tablolarını güncelleyin.
    // (Önceki kodunuzdaki fetch çağrılarını olduğu gibi kopyalayabilirsiniz.)

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
