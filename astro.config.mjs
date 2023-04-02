import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      config: { applyBaseStyles: false },
    }),
  ],
  experimental: {
    assets: true,
  },
  image: {
    service: "astro/assets/services/sharp",
  },
});
