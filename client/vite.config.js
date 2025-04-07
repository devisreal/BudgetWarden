/* eslint-disable no-undef */
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
// import { fileURLToPath } from "url";
import { defineConfig } from "vite";


export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // alias: [
    //   {
    //     find: "@",
    //     replacement: fileURLToPath(new URL("./src", import.meta.url)),
    //   },
    // ],
    preserveSymlinks: false,
  },
});
