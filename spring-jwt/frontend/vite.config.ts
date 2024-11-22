import { defineConfig } from "vite"
import tailwindcss from "tailwindcss"
import react from "@vitejs/plugin-react"

const ReactCompilerConfig = {}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
})
