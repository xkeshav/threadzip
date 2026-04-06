import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(), 
    mdx(), 
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    })
  ],
  output: "static",
  site: "https://threadzip.com",
  base: "/",
  trailingSlash: "ignore",
  prefetch: true
});