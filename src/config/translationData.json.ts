/**
 * Configuration of data files and text translations (English-only)
 */

import navDataEn from "./en/navData.json";
import siteDataEn from "./en/siteData.json";

export const dataTranslations = {
  en: {
    siteData: siteDataEn,
    navData: navDataEn,
  },
} as const;

export const textTranslations = {
  en: {
    hero_text: "Everything you need for an amazing website.",
    hero_description:
      "Transforming ideas into beautiful, functional designs that leave lasting impressions.",

    // blog
    back_to_all_posts: "Back to all posts",
    updated: "Updated",
    share_this_article: "Share this article",
    table_of_contents: "Table of Contents",
    tags: "Tags",
    related_posts: "Related Posts",
  },
} as const;

export const routeTranslations = {
  en: {
    aboutKey: "about",
    contactKey: "contact",
    categoryKey: "categories",
    categoryKey2: "categories/*",
    tagKey: "tags",
    tagKey2: "tags/*",
    blogKey: "blog",
  },
} as const;

export const localizedCollections = {
  blog: {
    en: "blog",
  },
} as const;
