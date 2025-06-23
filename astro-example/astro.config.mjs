// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3000,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      CHARACTER_ID: envField.string({
        context: "client",
        access: "public",
        default: "7394103e-ba65-41d8-ac98-a43348cee84f",
      }),
    },
  },
});
