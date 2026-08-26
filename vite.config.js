import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages will serve this app from:
//   https://azuazu298.github.io/minimo-mono/
// so every asset path must be prefixed with /minimo-mono/.
export default defineConfig({
  plugins: [react()],
  base: "/minimo-mono/",
});
