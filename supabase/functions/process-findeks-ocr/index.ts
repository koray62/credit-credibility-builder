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

/* ---------- konfig ---------- */
const supabaseUrl = "https://wxfzuexhsgyeruqrmdow.supabase.co";
const bucket = "public";              // herkese açık bir bucket
const folder = "ocr-cache";           // JPG’ler burada tutulacak
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
  const page = await pdf.getPage(2);
  const vp = page.getViewport({ scale: 1.4 });
  const canvas = createCanvas(vp.width, vp.height);
  await page.render({ canvasContext: canvas.getContext("2d"), viewport: vp })
    .promise;
  return canvas.toBuffer("image/jpeg", { quality: 0.9 });
}

async function uploadToSupabase(buf: Uint8Array, fileName: string): Promise<string> {
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseKey) throw new Error("Supabase key yok");

  const path = `${folder}/${fileName}`;
  const res = await fetch(
    `${supabaseUrl}/storage/v1/object/${bucket}/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${supabaseKey}`,
        apikey: supabaseKey,
        "Content-Type": "image/jpeg",
      },
      body: buf,
    },
  );

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Storage yükleme hatası: ${t.slice(0, 200)}`);
  }
  // Public bucket ise şu URL doğrudan erişilebilir
  return `${supabaseUrl}/storage/v1/object/public/${path}`;
}

interface OCRResult {
  score?: number;
  confidence?: number;
  error?: string;
}

async function extractScore(pdfOrImg64: string): Promise<OCRResult> {
  try {
    /* ---------- dosya hazıla (JPEG remote URL) ---------- */
    let imageUrl = pdfOrImg64; // eğer doğrudan jpeg64 gelirse bucket’a yüklenecek

    if (/^data:application\/pdf|^JVBER/i.test(pdfOrImg64)) {
      // PDF ► JPEG ► upload
      const rawPdf64 = pdfOrImg64.includes(",")
        ? pdfOrImg64.split(",")[1]
        : pdfOrImg64;
      const jpegBytes = await pdfPageToJpeg(base64ToUint8(rawPdf64));

      if (jpegBytes.length > 5_000_000) {
        throw new Error("JPEG 5 MB sınırını aşıyor");
      }
      const fName = `page1_${crypto.randomUUID()}.jpg`;
      imageUrl = await uploadToSupabase(jpegBytes, fName);
    } else if (/^data:image\//.test(pdfOrImg64)) {
      // Ham base64 görsel geldiyse yine bucket’a koy
      const [header, data] = pdfOrImg64.split(",");
      const jpegBytes = base64ToUint8(data);
      const fName = `inline_${crypto.randomUUID()}.jpg`;
      imageUrl = await uploadToSupabase(jpegBytes, fName);
    }

    /* ---------- OpenAI Vision ---------- */
    const openaiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiKey) throw new Error("OPENAI_API_KEY yok");

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
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
                  "Bu Findeks kredi raporu görselinden sadece kredi notunu çıkar. Yalnızca sayıyı yaz; bulunamazsa NOT_FOUND yaz.",
              },
              {
                type: "image_url",
                image_url: { url: imageUrl, detail: "auto" },
              },
            ],
          },
        ],
        max_tokens: 10,
      }),
    });

    if (!resp.ok) {
      const dbg = await resp.text();
      console.error("OpenAI error:", dbg.slice(0, 200));
      throw new Error(`OpenAI API error: ${resp.status}`);
    }

    const js = await resp.json();
    const txt = js.choices?.[0]?.message?.content?.trim();
    if (!txt || txt === "NOT_FOUND") return { error: "Score bulunamadı" };

    const score = parseInt(txt);
    if (Number.isNaN(score) || score < 0 || score > 1900) {
      return { error: "Geçersiz skor" };
    }
    return { score, confidence: 0.95 };
  } catch (e) {
    return { error: (e as Error).message };
  }
}

/* ---------- HTTP handler ---------- */
serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { reportId, base64Image, userId } = await req.json();
    if (!reportId || !base64Image || !userId) throw new Error("Eksik parametre");

    const ocr = await extractScore(base64Image);

    // … (Supabase veri kaydı ve rapor güncelleme aynen kalabilir) …

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
