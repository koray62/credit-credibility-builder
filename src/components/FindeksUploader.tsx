/**
 *  FindeksPdfUpload – PDF ► JPEG (2. Sayfa) ► Edge Function
 *  --------------------------------------------------------
 *  - pdfjs-dist worker'ı CDN'den yüklenir.
 *  - PDF'in **2. sayfası** canvasa render edilir, JPEG base64 alınır.
 *  - Edge Function (process-findeks-ocr) çağrılır.
 */
import React, { useState } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import "pdfjs-dist/legacy/build/pdf.worker.min.js";

GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.2.67/pdf.worker.min.js";

/* ------------ PDF ► JPEG base64 (2. sayfa) ------------ */
async function pdfSecondPageToJpeg(file: File): Promise<string> {
  const pdf = await getDocument(await file.arrayBuffer()).promise;
  const total = pdf.numPages;
  if (total < 2) throw new Error("PDF yalnızca 1 sayfa içeriyor");
  const page = await pdf.getPage(2);               // ← 2. sayfa
  const vp = page.getViewport({ scale: 1.5 });     // 150-200 DPI
  const canvas = document.createElement("canvas");
  canvas.width = vp.width;
  canvas.height = vp.height;
  await page.render({
    canvasContext: canvas.getContext("2d")!,
    viewport: vp,
  }).promise;
  /* data:image/jpeg;base64,AAA…  →   sadece base64 bölümü */
  return canvas.toDataURL("image/jpeg", 0.9).split(",")[1];
}

export default function FindeksPdfUpload() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Lütfen PDF seçin");
      return;
    }
    setLoading(true);
    setResult(null);

    try {
      const base64Image = await pdfSecondPageToJpeg(file);

      const resp = await fetch("/functions/v1/process-findeks-ocr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportId: crypto.randomUUID(),
          userId: "current-user-id",
          base64Image,
        }),
      });
      const data = await resp.json();
      if (data.success) setResult(`Skor: ${data.score}`);
      else setResult(`Hata: ${data.error}`);
    } catch (err: any) {
      setResult("İşlem hatası: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 16, borderRadius: 8 }}>
      <input type="file" accept="application/pdf" onChange={handleChange} />
      {loading && <p>Yükleniyor…</p>}
      {result && <p>{result}</p>}
    </div>
  );
}
