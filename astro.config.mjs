import { defineConfig } from "astro/config";

// https://astro.build/config
import react from "@astrojs/react";

const isProd = import.meta.env.PROD;

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  site: "https://www.threadzip.com",
  base: ".",
  trailingSlash: "ignore",
  prefetch: true,
});
