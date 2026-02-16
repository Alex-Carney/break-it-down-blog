import mdx from "@astrojs/mdx";
import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import compress from "@playform/compress";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import AutoImport from "astro-auto-import";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://starter.cosmicthemes.com",
  adapter: netlify({
    imageCDN: false,
  }),
  // keep minimal i18n so astro:i18n imports still resolve
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    shikiConfig: {
      theme: "css-variables",
      wrap: true,
    },
  },
  integrations: [
    AutoImport({
      imports: [
        "@/components/admonition/Admonition.astro",
      ],
    }),
    mdx(),
    react(),
    icon(),
    sitemap(),
    compress({
      HTML: true,
      JavaScript: true,
      CSS: false,
      Image: false,
      SVG: false,
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    build: {
      assetsInlineLimit: 0,
    },
  },
});
