import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(), 
    mdx(),
    sitemap({
      entryLimit: 5000
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    })
  ],
  output: "static",
  site: "https://threadzip.com",
  trailingSlash: "ignore",
  prefetch: true
});