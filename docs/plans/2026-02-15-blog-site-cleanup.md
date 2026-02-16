# Blog Site Cleanup — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strip the Cosmic Themes Starter v3.1.0 kitchen sink down to a focused blog website with landing page, blog, about, and contact.

**Architecture:** Surgical removal of unused pages, components, data, and config. Simplify the i18n infrastructure to English-only while preserving the same API surface so existing components don't need rewriting. Rebuild the homepage as a blog-forward landing page.

**Tech Stack:** Astro 5, Tailwind CSS 4, React 19, MDX, Starwind UI

---

### Task 1: Initialize Git and Create Baseline Commit

**Files:**
- Create: `.git/` (git init)

**Step 1: Initialize git repository**

Run: `git init`
Expected: "Initialized empty Git repository"

**Step 2: Create initial commit with full kitchen sink**

Run: `git add -A && git commit -m "chore: initial commit — full kitchen sink starter v3.1.0"`
Expected: Commit created with all files

---

### Task 2: Delete All Unused Pages

**Files:**
- Delete: `src/pages/services/` (entire directory)
- Delete: `src/pages/projects/` (entire directory)
- Delete: `src/pages/careers/` (entire directory)
- Delete: `src/pages/authors/` (entire directory)
- Delete: `src/pages/examples/` (entire directory)
- Delete: `src/pages/fr/` (entire directory)
- Delete: `src/pages/resume.astro`
- Delete: `src/pages/overview.astro`
- Delete: `src/pages/sign-up.astro`
- Delete: `src/pages/sign-in.astro`
- Delete: `src/pages/password-reset.astro`
- Delete: `src/pages/[...page].astro`

**Step 1: Delete all unused page directories**

```bash
rm -rf src/pages/services src/pages/projects src/pages/careers src/pages/authors src/pages/examples src/pages/fr
```

**Step 2: Delete all unused page files**

```bash
rm src/pages/resume.astro src/pages/overview.astro src/pages/sign-up.astro src/pages/sign-in.astro src/pages/password-reset.astro "src/pages/[...page].astro"
```

**Step 3: Commit**

```bash
git add -A && git commit -m "chore: delete unused pages (services, projects, careers, resume, auth, examples, i18n)"
```

---

### Task 3: Delete Unused Data, Layouts, and Styles

**Files:**
- Delete: `src/data/blog/fr/` (entire directory)
- Delete: `src/data/services/` (entire directory)
- Delete: `src/data/projects/` (entire directory)
- Delete: `src/data/careers/` (entire directory)
- Delete: `src/data/resume/` (entire directory)
- Delete: `src/data/otherPages/` (entire directory)
- Delete: `src/data/codeToggles/` (entire directory)
- Delete: `src/layouts/AuthorLayout.astro`
- Delete: `src/layouts/CareerLayout.astro`
- Delete: `src/layouts/ProjectLayout.astro`
- Delete: `src/layouts/ServiceLayout.astro`
- Delete: `src/layouts/ResumeLayout.astro`
- Delete: `src/layouts/OverviewLayout.astro`
- Delete: `src/styles/keystatic.css`

**Step 1: Delete unused data directories**

```bash
rm -rf src/data/blog/fr src/data/services src/data/projects src/data/careers src/data/resume src/data/otherPages src/data/codeToggles
```

**Step 2: Delete unused layouts**

```bash
rm src/layouts/AuthorLayout.astro src/layouts/CareerLayout.astro src/layouts/ProjectLayout.astro src/layouts/ServiceLayout.astro src/layouts/ResumeLayout.astro src/layouts/OverviewLayout.astro
```

**Step 3: Delete keystatic styles**

```bash
rm src/styles/keystatic.css
```

**Step 4: Commit**

```bash
git add -A && git commit -m "chore: delete unused data, layouts, and keystatic styles"
```

---

### Task 4: Delete Unused Components

**Files:**
- Delete entire directories: `src/components/career/`, `src/components/pricing/`, `src/components/projects/`, `src/components/project-showcase/`, `src/components/process/`, `src/components/resume/`, `src/components/services/`, `src/components/team/`, `src/components/testimonials/`, `src/components/logo-cloud/`, `src/components/faq/`, `src/components/feature/`, `src/components/feature-card/`, `src/components/language-select/`, `src/components/keystatic-components/`
- Delete individual files: `src/components/forms/SignInForm.astro`, `src/components/forms/SignUpForm.astro`, `src/components/forms/PasswordResetForm.astro`, `src/components/forms/ContactFormTwoCol.astro`, `src/components/hero/HeroBasic.astro`, `src/components/hero/HeroCentered.astro`, `src/components/hero/HeroOverview.astro`, `src/components/hero/HeroSideImage.astro`, `src/components/about/AboutMe.astro`, `src/components/about/AboutNumbers.astro`, `src/components/about/AboutNumbersImage.astro`, `src/components/about/AboutSideCards.astro`, `src/components/contact/ContactCentered.astro`, `src/components/cta/CtaBgImage.astro`, `src/components/cta/CtaCardBgImage.astro`, `src/components/seo/HrefLang.astro`

**Step 1: Delete entire component directories**

```bash
rm -rf src/components/career src/components/pricing src/components/projects src/components/project-showcase src/components/process src/components/resume src/components/services src/components/team src/components/testimonials src/components/logo-cloud src/components/faq src/components/feature src/components/feature-card src/components/language-select src/components/keystatic-components
```

**Step 2: Delete individual unused component files**

```bash
rm src/components/forms/SignInForm.astro src/components/forms/SignUpForm.astro src/components/forms/PasswordResetForm.astro src/components/forms/ContactFormTwoCol.astro
rm src/components/hero/HeroBasic.astro src/components/hero/HeroCentered.astro src/components/hero/HeroOverview.astro src/components/hero/HeroSideImage.astro
rm src/components/about/AboutMe.astro src/components/about/AboutNumbers.astro src/components/about/AboutNumbersImage.astro src/components/about/AboutSideCards.astro
rm src/components/contact/ContactCentered.astro
rm src/components/cta/CtaBgImage.astro src/components/cta/CtaCardBgImage.astro
rm src/components/seo/HrefLang.astro
```

**Step 3: Commit**

```bash
git add -A && git commit -m "chore: delete unused components (16 directories + individual files)"
```

---

### Task 5: Simplify Content Collections and Remove Keystatic

**Files:**
- Modify: `src/content.config.ts`
- Delete: `keystatic.config.tsx`

**Step 1: Rewrite content.config.ts to blog + authors only**

Replace the entire file with:

```ts
import { glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*{md,mdx}", base: "./src/data/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      authors: z.array(reference("authors")),
      pubDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      updatedDate: z
        .string()
        .or(z.date())
        .optional()
        .transform((str) => (str ? new Date(str) : undefined)),
      heroImage: image().optional(),
      categories: z.array(z.string()),
      tags: z.array(z.string()),
      draft: z.boolean().optional(),
    }),
});

const authorsCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*{md,mdx}", base: "./src/data/authors" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      avatar: image(),
      about: z.string(),
      email: z.string(),
      authorLink: z.string(),
    }),
});

export const collections = {
  blog: blogCollection,
  authors: authorsCollection,
};
```

Note: The `mappingKey` field is removed from blog since it was only for i18n cross-language matching.

**Step 2: Delete keystatic config**

```bash
rm keystatic.config.tsx
```

**Step 3: Commit**

```bash
git add -A && git commit -m "chore: strip content collections to blog + authors, remove keystatic"
```

---

### Task 6: Simplify Astro Config

**Files:**
- Modify: `astro.config.mjs`

**Step 1: Rewrite astro.config.mjs**

Replace the entire file with:

```js
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
```

Key changes: Removed keystatic import/integration, removed `/admin` redirect, simplified i18n to English-only.

**Step 2: Commit**

```bash
git add -A && git commit -m "chore: simplify astro config — remove keystatic, simplify i18n"
```

---

### Task 7: Simplify Site Settings

**Files:**
- Modify: `src/config/siteSettings.json.ts`

**Step 1: Rewrite siteSettings to English-only**

Replace the entire file with:

```ts
/**
 * Global site settings
 */

import { type SiteSettingsProps } from "./types/configDataTypes";

export const locales = ["en"] as const;
export const defaultLocale = "en" as const;

export const localeMap = {
  en: "en-US",
} as const;

export const languageSwitcherMap = {
  en: "EN",
} as const;

export const siteSettings: SiteSettingsProps = {
  useViewTransitions: true,
  useAnimations: true,
};

export default siteSettings;
```

**Step 2: Commit**

```bash
git add -A && git commit -m "chore: simplify site settings to English-only"
```

---

### Task 8: Simplify Translation Infrastructure

**Files:**
- Modify: `src/config/translationData.json.ts`
- Modify: `src/js/translationUtils.ts`
- Modify: `src/config/types/configDataTypes.ts`
- Delete: `src/config/fr/` (entire French config directory)
- Delete: `src/config/en/faqData.json.ts`
- Delete: `src/config/en/testimonialData.json.ts`

**Step 1: Delete French config and unused English config**

```bash
rm -rf src/config/fr
rm src/config/en/faqData.json.ts src/config/en/testimonialData.json.ts
```

**Step 2: Rewrite translationData.json.ts (English-only, no FAQ/testimonials)**

Replace the entire file with:

```ts
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
```

**Step 3: Simplify translationUtils.ts (remove complex i18n route generation)**

Replace the entire file with:

```ts
import { defaultLocale, locales } from "@/config/siteSettings.json";
import {
  dataTranslations,
  textTranslations,
} from "@/config/translationData.json";

/**
 * Text translation helper function
 */
export function useTranslations(locale: keyof typeof textTranslations) {
  return function t(key: keyof (typeof textTranslations)[typeof locale]) {
    return textTranslations[locale][key] || textTranslations[defaultLocale][key];
  };
}

type Locale = keyof typeof dataTranslations;
type DataKey<T extends Locale> = keyof (typeof dataTranslations)[T];

/**
 * Data file translation helper function
 */
export function getTranslatedData<T extends Locale, K extends DataKey<T>>(
  data: K,
  locale: T,
): (typeof dataTranslations)[T][K] {
  return dataTranslations[locale][data] || dataTranslations[defaultLocale as T][data];
}

/**
 * Returns the localized route. In English-only mode, just normalizes the path.
 * Handles external links, hash links, and trailing slashes.
 */
export function getLocalizedRoute(
  _locale: (typeof locales)[number],
  baseRoute: string = "/",
): string {
  const isExternalLink = /^(https?:\/\/|mailto:|tel:|sms:)/i.test(baseRoute);
  const isId = baseRoute.startsWith("#");
  if (isExternalLink || isId) return baseRoute;

  let fragment = "";
  let routeWithoutFragment = baseRoute;
  const fragmentIndex = baseRoute.indexOf("#");

  if (fragmentIndex !== -1) {
    fragment = baseRoute.slice(fragmentIndex);
    routeWithoutFragment = baseRoute.slice(0, fragmentIndex);
  }

  const normalized = routeWithoutFragment.replace(/^\/?|\/?$/g, "");

  if (normalized === "") {
    return fragment ? "/" + fragment : "/";
  }

  return fragment ? `/${normalized}/` + fragment : `/${normalized}/`;
}
```

Note: `getLocalizedPathname()` and `generateRouteTranslations()` are removed — they were only used by the language switcher and HrefLang components which we deleted.

**Step 4: Clean up configDataTypes.ts (remove FaqItem and TestimonialItem)**

Replace the entire file with:

```ts
// site data types
export interface SiteDataProps {
  name: string;
  title: string;
  description: string;
  author: {
    name: string;
    email: string;
    twitter: string;
  };
  defaultImage: {
    src: string;
    alt: string;
  };
}

// nav data types
export interface navLinkItem {
  text: string;
  link: string;
  newTab?: boolean;
  icon?: string;
}

export interface navDropdownItem {
  text: string;
  dropdown: navLinkItem[];
}

export interface navMegaDropdownColumn {
  title: string;
  items: navLinkItem[];
}

export interface navMegaDropdownItem {
  text: string;
  megaMenuColumns: navMegaDropdownColumn[];
}

export type navItem = navLinkItem | navDropdownItem | navMegaDropdownItem;

// site settings types
export interface SiteSettingsProps {
  useViewTransitions?: boolean;
  useAnimations?: boolean;
}
```

**Step 5: Build to verify**

Run: `npm run build`
Expected: Build succeeds. If there are broken imports, fix them before proceeding.

**Step 6: Commit**

```bash
git add -A && git commit -m "chore: simplify i18n infrastructure to English-only"
```

---

### Task 9: Simplify Navigation

**Files:**
- Modify: `src/config/en/navData.json.ts`

**Step 1: Rewrite navData to simple 4-link nav**

Replace the entire file with:

```ts
import { type navItem } from "../types/configDataTypes";

const navConfig: navItem[] = [
  {
    text: "Home",
    link: "/",
  },
  {
    text: "Blog",
    link: "/blog",
  },
  {
    text: "About",
    link: "/about",
  },
  {
    text: "Contact",
    link: "/contact",
  },
];

export default navConfig;
```

**Step 2: Commit**

```bash
git add -A && git commit -m "chore: simplify navigation to Home, Blog, About, Contact"
```

---

### Task 10: Update Footer

**Files:**
- Modify: `src/components/footer/Footer.astro`

**Step 1: Update footer columns with real links**

In `src/components/footer/Footer.astro`, replace the `footerColumns` array (lines 17-48) with:

```ts
const footerColumns = [
  {
    title: "Navigation",
    links: [
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Blog",
    links: [
      { label: "All Posts", href: "/blog" },
      { label: "Categories", href: "/categories" },
      { label: "Tags", href: "/tags" },
      { label: "RSS Feed", href: "/rss.xml" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Use", href: "#" },
    ],
  },
];
```

**Step 2: Commit**

```bash
git add -A && git commit -m "chore: update footer with real navigation links"
```

---

### Task 11: Rebuild Landing Page (index.astro)

**Files:**
- Modify: `src/pages/index.astro`

**Step 1: Rewrite index.astro as blog-forward landing page**

Replace the entire file with:

```astro
---
import BlogSectionGrid from "@/components/blog/BlogSectionGrid.astro";
import CtaCenteredNewsletter from "@/components/cta/CtaCenteredNewsletter.astro";
import HeroBackgroundImage from "@/components/hero/HeroBackgroundImage.astro";
import { getLocaleFromUrl } from "@/js/localeUtils";
import { getTranslatedData } from "@/js/translationUtils";
import BaseLayout from "@/layouts/BaseLayout.astro";

const currLocale = getLocaleFromUrl(Astro.url);
const siteData = getTranslatedData("siteData", currLocale);
---

<BaseLayout title={siteData.title} description={siteData.description}>
  <HeroBackgroundImage />
  <BlogSectionGrid />
  <CtaCenteredNewsletter />
</BaseLayout>
```

**Step 2: Build to verify**

Run: `npm run build`
Expected: Build succeeds, homepage renders with hero + blog posts + newsletter CTA.

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: rebuild landing page with hero, latest posts, and newsletter CTA"
```

---

### Task 12: Simplify About Page

**Files:**
- Modify: `src/pages/about.astro`

**Step 1: Rewrite about.astro (remove team swiper and side cards)**

Replace the entire file with:

```astro
---
import AboutSideImage from "@/components/about/AboutSideImage.astro";
import { getLocaleFromUrl } from "@/js/localeUtils";
import { getTranslatedData } from "@/js/translationUtils";
import BaseLayout from "@/layouts/BaseLayout.astro";

const currLocale = getLocaleFromUrl(Astro.url);
const siteData = getTranslatedData("siteData", currLocale);
---

<BaseLayout title="About" description={siteData.description}>
  <AboutSideImage class="mt-16" />
</BaseLayout>
```

**Step 2: Commit**

```bash
git add -A && git commit -m "chore: simplify about page — remove team swiper and side cards"
```

---

### Task 13: Create Contact Page

**Files:**
- Create: `src/pages/contact.astro`

**Step 1: Create the contact page**

Create `src/pages/contact.astro` with:

```astro
---
import Contact from "@/components/contact/Contact.astro";
import { getLocaleFromUrl } from "@/js/localeUtils";
import { getTranslatedData } from "@/js/translationUtils";
import BaseLayout from "@/layouts/BaseLayout.astro";

const currLocale = getLocaleFromUrl(Astro.url);
const siteData = getTranslatedData("siteData", currLocale);
---

<BaseLayout title="Contact" description="Get in touch with us.">
  <Contact />
</BaseLayout>
```

**Step 2: Build to verify**

Run: `npm run build`
Expected: Build succeeds, `/contact` page renders with the contact form.

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: add contact page"
```

---

### Task 14: Remove Unused Dependencies and Scripts

**Files:**
- Modify: `package.json`
- Delete: `scripts/` directory (if exists — contains config-i18n.js and remove-keystatic.js)

**Step 1: Check if scripts directory exists and delete it**

```bash
ls scripts/ 2>/dev/null && rm -rf scripts/ || echo "No scripts directory"
```

**Step 2: Remove unused dependencies from package.json**

Remove from `dependencies`:
- `@keystatic/astro`
- `@keystatic/core`
- `swiper`

Remove from `scripts`:
- `config-i18n`
- `remove-keystatic`

Use npm to uninstall:

```bash
npm uninstall @keystatic/astro @keystatic/core swiper
```

**Step 3: Manually edit package.json to remove the unused scripts**

Remove these lines from the `"scripts"` section:
```
"config-i18n": "node ./scripts/config-i18n.js",
"remove-keystatic": "node ./scripts/remove-keystatic.js",
```

**Step 4: Reinstall to clean lockfile**

```bash
npm install
```

**Step 5: Commit**

```bash
git add -A && git commit -m "chore: remove unused dependencies (keystatic, swiper) and scripts"
```

---

### Task 15: Full Build Verification and Final Cleanup

**Step 1: Run full build**

Run: `npm run build`
Expected: Clean build with zero errors.

**Step 2: If build fails, fix broken imports**

Common issues to check:
- Any component still importing from a deleted file
- Any page still referencing removed data (faqData, testimonialData)
- Any layout or component importing `getLocalizedPathname` or `generateRouteTranslations` (removed)
- Blog post frontmatter using `mappingKey` — this is OK, Astro ignores extra frontmatter fields not in the schema (actually, with strict schemas it might error — if so, keep `mappingKey` as optional in the blog schema)

**Step 3: Run dev server to spot-check**

Run: `npm run dev`
Check these routes manually:
- `/` — hero + latest posts + CTA
- `/blog` — paginated blog index
- `/blog/tsconfig-paths-setup` — individual blog post
- `/about` — about page
- `/contact` — contact form
- `/categories` — categories index
- `/tags` — tags index

**Step 4: Final commit**

```bash
git add -A && git commit -m "chore: final cleanup — verified clean build"
```

---

## Post-Cleanup Notes

After implementation, the following content should be customized (not part of this plan):
- Hero text/images in `HeroBackgroundImage.astro` (currently healthcare-themed)
- About text in `AboutSideImage.astro` (currently "Space Coast Medicine")
- Contact form fields in `ContactForm.astro` (currently medical office-themed)
- Site name/description in `src/config/en/siteData.json.ts`
- Footer social links in `Footer.astro`
- Blog post content in `src/data/blog/en/`
- Author profiles in `src/data/authors/`

These are content changes, not structural — the cleanup plan only handles removing unused code and infrastructure.
