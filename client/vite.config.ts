import tailwindcss from "@tailwindcss/vite";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Ensure all routes are served by index.html for client-side routing
  server: {},
  build: {
    rollupOptions: {
      // Handle client-side routing in production
      output: {
        manualChunks: undefined,
      },
    },
  },
});
