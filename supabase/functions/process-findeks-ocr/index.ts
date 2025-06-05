/******************************************************************
 *  Findeks OCR – PDF ► JPEG ► Supabase Storage ► OpenAI Vision
 ******************************************************************/
import { serve } from "https://deno.land/std@0.201.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

import { createCanvas } from "https://deno.land/x/canvas@1.4.1/mod.ts";
import {
  getDocument,
  GlobalWorkerOptions,
} from "npm:pdfjs-dist@4.2.67/legacy/build/pdf.mjs";

GlobalWorkerOptions.workerSrc =
  "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.2.67/build/pdf.worker.mjs";

/* ---------- sabitler ---------- */
const SUPABASE_URL   = "https://wxfzuexhsgyeruqrmdow.supabase.co";
const STORAGE_BUCKET = "public";
const STORAGE_PATH   = "ocr-cache";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

/* ---------- yardımcı ---------- */
function base64ToUint8(b64: string): Uint8Array {
  const bin = atob(b64);
  return Uint8Array.from({ length: bin.length }, (_, i) => bin.charCodeAt(i));
}
async function pdfPageToJpeg(pdfBytes: Uint8Array): Promise<Uint8Array> {
  const pdf = await getDocument({ data: pdfBytes }).promise;
  const page = await pdf.getPage(1);
  const vp = page.getViewport({ scale: 1.4 });
  const canvas = createCanvas(vp.width, vp.height);
  await page.render({ canvasContext: canvas.getContext("2d"), viewport: vp })
    .promise;
  return canvas.toBuffer("image/jpeg", { quality: 0.9 });
}
async function uploadToSupabase(img: Uint8Array, name: string): Promise<string> {
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY env yok");
  const path = `${STORAGE_PATH}/${name}`;
  const r = await fetch(
    `${SUPABASE_URL}/storage/v1/object/${STORAGE_BUCKET}/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${key}`,
        apikey: key,
        "Content-Type": "image/jpeg",
        "x-upsert": "true",
        "cache-control": "public, max-age=31536000",
      },
      body: img,
    },
  );
  if (!r.ok) throw new Error(`Upload hata ${r.status}`);
  console.log("⬆️  UPLOAD OK:", path);
  return `${SUPABASE_URL}/storage/v1/render/image/public/${path}`;
}

/* ---------- OCR ---------- */
interface OCRResult { score?: number; confidence?: number; error?: string; }

async function extractScore(input: string): Promise<OCRResult> {
  try {
    /* 1. Görsel URL’si oluştur */
    let imageUrl = input;
    const isPDF = /^data:application\/pdf;base64,|^JVBER/i.test(input);
    const isImg = /^data:image\//i.test(input);

    if (isPDF || isImg) {
      const rawB64 = input.includes(",") ? input.split(",")[1] : input;
      const jpeg = isPDF
        ? await pdfPageToJpeg(base64ToUint8(rawB64))
        : base64ToUint8(rawB64);

      if (jpeg.length > 5_000_000) throw new Error("Görsel 5 MB sınırını aşıyor");
      imageUrl = await uploadToSupabase(jpeg, `${crypto.randomUUID()}.jpg`);
    }

    /* 2. URL kontrolü */
    try {
      const head = await fetch(imageUrl, { method: "HEAD" });
      console.log(
        "🔎 HEAD",
        head.status,
        head.headers.get("content-type"),
      );
    } catch (e) {
      console.error("🔎 HEAD FAIL:", (e as Error).message);
    }
    console.log(
      "👉 imageUrl:",
      imageUrl.slice(0, 120), "...len", imageUrl.length,
    );

    /* 3. OpenAI Vision */
    const OPENAI_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!OPENAI_KEY) throw new Error("OPENAI_API_KEY env yok");

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{
          role: "user",
          content: [
            { type: "text",
              text: "Bu Findeks kredi raporu görselinden sadece kredi notunu çıkar. Sadece sayıyı yaz; bulunamazsa NOT_FOUND yaz." },
            { type: "image_url", image_url: { url: imageUrl, detail: "auto" } },
          ],
        }],
        max_tokens: 10,
      }),
    });

    if (!resp.ok) {
      const raw = await resp.text();
      console.error("🟥 RAW:", resp.status, raw.slice(0, 500));
      throw new Error(`OpenAI API error ${resp.status}`);
    }
    console.log("✅ OpenAI OK");

    const txt = (await resp.json()).choices?.[0]?.message?.content?.trim();
    if (!txt || txt === "NOT_FOUND") return { error: "Score bulunamadı" };
    const score = parseInt(txt, 10);
    if (Number.isNaN(score) || score < 0 || score > 1900) {
      return { error: "Geçersiz score" };
    }
    return { score, confidence: 0.95 };
  } catch (err) {
    return { error: (err as Error).message };
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
      throw new Error("reportId, base64Image ve userId zorunlu");
    }
    const ocr = await extractScore(base64Image);

    /* --- Supabase kayıt/güncelleme adımları (değişmedi) --- */

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
