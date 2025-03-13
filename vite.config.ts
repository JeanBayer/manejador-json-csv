import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@duplicate-complex-marker": path.resolve(
        __dirname,
        "./src/pages/duplicate-complex-marker"
      ),
      "@format-others-cashback": path.resolve(
        __dirname,
        "./src/pages/format-others-cashback"
      ),
      "@duplicate-marker": path.resolve(
        __dirname,
        "./src/pages/duplicate-marker"
      ),
      "@json-csv-converter": path.resolve(
        __dirname,
        "./src/pages/json-csv-converter"
      ),
      "@match-logic": path.resolve(__dirname, "./src/pages/match-logic"),
      "@prueba": path.resolve(__dirname, "./src/pages/prueba"),
      "@string-converter": path.resolve(
        __dirname,
        "./src/pages/string-converter"
      ),
      "@calculate-withdrawal-status": path.resolve(
        __dirname,
        "./src/pages/calculate-withdrawal-status"
      ),
      "@split-data": path.resolve(__dirname, "./src/pages/split-data"),
    },
  },
});
