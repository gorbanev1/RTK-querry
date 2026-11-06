import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  // Vite проксирует локальные /api-запросы на PHP в Timeweb.
  server: {
    proxy: {
      "/api": {
        target: "https://backendcards.tw1.ru",
        changeOrigin: true,
      },
    },
  },
})