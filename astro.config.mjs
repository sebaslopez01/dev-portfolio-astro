import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/static";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
  ],
  experimental: {
    assets: true,
  },
  image: {
    service: "astro/assets/services/sharp",
  },
  output: "static",
  adapter: vercel({ analytics: true }),
});
