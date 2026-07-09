import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

/**
 * Vite configuration for a React + FSD SPA.
 * Path alias `@/` maps to `./src/`.
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
