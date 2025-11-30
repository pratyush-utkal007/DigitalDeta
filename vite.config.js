import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import Sitemap from "vite-plugin-pages-sitemap";
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    Sitemap({
      hostname: "https://digitaldeta.com", // change to your domain
      outDir: "dist",
      readable: true,
    }),
  ],
});
