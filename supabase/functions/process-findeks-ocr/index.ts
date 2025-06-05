/******************************************************************
 *  Findeks OCR  (JPEG/PNG base64 ► Supabase Storage ► OpenAI Vision)
 *  Bu fonksiyon TARAYICIDAN gelen JPEG/PNG base64'i alır.
 *  (PDF → JPEG dönüşümü tarayıcıda yapılır, bkz. React bileşeni.)
 ******************************************************************/
import { serve } from "https://deno.land/std@0.201.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

/* ---------- Supabase ayarları ---------- */
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

async function uploadToSupabase(jpeg: Uint8Array, fileName: string): Promise<string> {
  const svcKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!svcKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY env yok");

  const path = `${STORAGE_PATH}/${fileName}`;
  const r = await fetch(`${SUPABASE_URL}/storage/v1/object/${STORAGE_BUCKET}/${path}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${svcKey}`,
      apikey: svcKey,
      "Content-Type": "image/jpeg",
      "x-upsert": "true",
      "cache-control": "public, max-age=31536000",
    },
    body: jpeg,
  });
  if (!r.ok) throw new Error(`Upload hata ${r.status}`);
  console.log("⬆️  UPLOAD OK:", path);

  /* render endpoint → doğrudan 200 image/jpeg */
  return `${SUPABASE_URL}/storage/v1/render/image/public/${path}`;
}

/* ---------- OCR ---------- */
interface OCRResult { score?: number; confidence?: number; error?: string; }

async function extractScore(imgB64: string): Promise<OCRResult> {
  try {
    if (!/^data:image\//.test(imgB64) && !/^[A-Za-z0-9+/]+={0,2}$/.test(imgB64)) {
      return { error: "Beklenen JPEG/PNG base64 gelmedi" };
    }

    const cleanB64 = imgB64.includes(",") ? imgB64.split(",")[1] : imgB64;
    const imgBytes = base64ToUint8(cleanB64);
    if (imgBytes.length > 5_000_000) return { error: "Görsel 5 MB sınırını aşıyor" };

    const imgUrl = await uploadToSupabase(imgBytes, `${crypto.randomUUID()}.jpg`);
    console.log("👉 imageUrl:", imgUrl);

    /* OpenAI Vision çağrısı ----------------------------------------- */
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
            { type: "image_url", image_url: { url: imgUrl, detail: "auto" } },
          ],
        }],
        max_tokens: 10,
      }),
    });

    if (!resp.ok) {
      console.error("🟥 RAW:", resp.status, await resp.text());
      throw new Error(`OpenAI error ${resp.status}`);
    }
    console.log("✅ OpenAI OK");

    const txt = (await resp.json()).choices?.[0]?.message?.content?.trim();
    if (!txt || txt === "NOT_FOUND") return { error: "Score bulunamadı" };
    const score = parseInt(txt, 10);
    if (Number.isNaN(score) || score < 0 || score > 1900) return { error: "Geçersiz score" };

    return { score, confidence: 0.95 };
  } catch (err) {
    return { error: (err as Error).message };
  }
}

/* ---------- HTTP handler ---------- */
serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { reportId, base64Image, userId } = await req.json();
    if (!reportId || !base64Image || !userId) {
      throw new Error("reportId, base64Image, userId zorunlu");
    }

    const ocr = await extractScore(base64Image);

    /* — Burada findeks_reports & ocr_processing tablolarınızı
         önceki kodunuzdaki gibi güncelleyebilirsiniz — */

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
