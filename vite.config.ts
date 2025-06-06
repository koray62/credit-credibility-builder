
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { copyFileSync, existsSync, mkdirSync } from "fs";

// Copy PDF.js worker file to public directory
const workerSource = path.resolve(__dirname, "node_modules/pdfjs-dist/build/pdf.worker.min.js");
const workerDest = path.resolve(__dirname, "public/pdf.worker.min.js");

try {
  if (existsSync(workerSource)) {
    // Ensure public directory exists
    const publicDir = path.dirname(workerDest);
    if (!existsSync(publicDir)) {
      mkdirSync(publicDir, { recursive: true });
    }
    copyFileSync(workerSource, workerDest);
    console.log("PDF.js worker copied to public directory");
  }
} catch (error) {
  console.warn("Could not copy PDF.js worker:", (error as Error).message);
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
