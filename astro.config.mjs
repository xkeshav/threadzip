import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx()],
  output: "static",
  site: "https://www.threadzip.com",
  base: ".",
  trailingSlash: "ignore",
  prefetch: true,
  adapter: node({
    mode: "standalone",
  }),
});
