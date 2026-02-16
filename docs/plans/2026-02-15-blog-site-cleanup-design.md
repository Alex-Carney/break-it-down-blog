# Blog Site Cleanup — Design Document

**Date:** 2026-02-15
**Approach:** Surgical cleanup of Cosmic Themes Starter v3.1.0

## Goal

Strip the kitchen-sink Astro starter down to a focused blog website with a landing page, blog system, about page, and contact page. Remove all SaaS, services, projects, careers, resume, pricing, and i18n infrastructure.

## Final Site Structure

### Pages

| Route | Source | Notes |
|-------|--------|-------|
| `/` | `index.astro` | Background image hero + latest posts grid + newsletter CTA |
| `/about` | `about.astro` | Simplified — AboutSideImage only, no team swiper |
| `/contact` | `contact.astro` | New page — uses Contact component + ContactForm |
| `/blog` | `blog/[...page].astro` | Blog index with pagination |
| `/blog/[slug]` | `blog/[...slug].astro` | Individual blog posts |
| `/categories` | `categories/index.astro` | Categories index |
| `/categories/[cat]` | `categories/[category]/[...page].astro` | Posts by category |
| `/tags` | `tags/index.astro` | Tags index |
| `/tags/[tag]` | `tags/[tag]/[...page].astro` | Posts by tag |
| `/404` | `404.astro` | Error page |
| `/rss.xml` | `rss.xml.ts` | RSS feed |
| `/robots.txt` | `robots.txt.ts` | SEO |

### Navigation

Simplified to: **Home | Blog | About | Contact**

## What Gets Removed

### Pages to delete

- `src/pages/services/` (index + detail)
- `src/pages/projects/` (index + detail)
- `src/pages/careers/` (index + detail)
- `src/pages/authors/` (author detail pages)
- `src/pages/examples/` (all 9 demo pages)
- `src/pages/fr/` (entire French section)
- `src/pages/resume.astro`
- `src/pages/overview.astro`
- `src/pages/sign-up.astro`
- `src/pages/sign-in.astro`
- `src/pages/password-reset.astro`
- `src/pages/[...page].astro` (other pages catch-all)

### Component directories to delete entirely

- `career/`
- `pricing/` (all 5 variants)
- `projects/`
- `project-showcase/`
- `process/`
- `resume/` (all 7 components)
- `services/`
- `team/`
- `testimonials/`
- `logo-cloud/` (all 3 variants)
- `faq/` (all components + sub-accordions)
- `feature/` (all 9 variants)
- `feature-card/` (all 4 variants)
- `language-select/`
- `keystatic-components/`

### Individual component files to delete

- `forms/SignInForm.astro`
- `forms/SignUpForm.astro`
- `forms/PasswordResetForm.astro`
- `forms/ContactFormTwoCol.astro`
- `hero/HeroBasic.astro`
- `hero/HeroCentered.astro`
- `hero/HeroOverview.astro`
- `hero/HeroSideImage.astro`
- `about/AboutMe.astro`
- `about/AboutNumbers.astro`
- `about/AboutNumbersImage.astro`
- `about/AboutSideCards.astro`
- `contact/` — whichever variant is not used for the contact page
- `cta/CtaBgImage.astro`
- `cta/CtaCardBgImage.astro`
- `seo/HrefLang.astro`

### Layouts to delete

- `AuthorLayout.astro`
- `CareerLayout.astro`
- `ProjectLayout.astro`
- `ServiceLayout.astro`
- `ResumeLayout.astro`
- `OverviewLayout.astro`

### Data to delete

- `data/blog/fr/` (French blog posts)
- `data/services/` (entire directory)
- `data/projects/` (entire directory)
- `data/careers/` (entire directory)
- `data/resume/` (entire directory)
- `data/otherPages/` (entire directory)
- `data/codeToggles/` (entire directory)

### Config to delete/modify

- Delete `src/config/fr/` (entire French config)
- Delete `src/config/en/faqData.json.ts`
- Delete `src/config/en/testimonialData.json.ts`
- Delete `src/config/translationData.json.ts`
- Simplify `src/config/en/navData.json.ts` to: Home, Blog, About, Contact
- Simplify `src/config/siteSettings.json.ts` — remove i18n settings

### Styles to delete

- `src/styles/keystatic.css`

### Root files to delete/modify

- Delete `keystatic.config.tsx`

## What Gets Kept

### Components

- `hero/HeroBackgroundImage.astro`
- `blog/BlogSectionGrid.astro`
- `post-card/PostCardMultiLink.astro`
- `related-posts/RelatedPosts.astro`
- `category/`, `category-cloud/`
- `tag/`, `tag-cloud/`
- `pagination/Pagination.astro`
- `share-buttons/ShareButtons.astro`
- `nav/` (all — simplified nav data)
- `footer/` (Footer + FooterLink)
- `contact/Contact.astro` or `ContactCentered.astro`
- `forms/ContactForm.astro`
- `about/AboutSideImage.astro`
- `button/Button.astro`, `button/FilterButton.astro`
- `badge/Badge.astro`
- `seo/Seo.astro`
- `site-logo/SiteLogo.astro`
- `social-icon/SocialIcon.astro`
- `theme-toggle/ThemeToggle.astro`
- `cookie-consent/CookieConsent.astro`
- `admonition/Admonition.astro`
- `markdown-components/`
- `cta/CtaCenteredNewsletter.astro`
- `starwind/` (entire UI library — tree-shaken at build)

### Layouts

- `BaseLayout.astro`
- `BaseHead.astro`
- `BlogLayoutCenter.astro`
- `BlogLayoutSidebar.astro`
- `BlogIndexGrid.astro`

### Data

- `data/blog/en/` (6 English blog posts)
- `data/authors/` (author profiles — referenced by posts)

### JS utilities

- `blogUtils.ts` — as-is
- `jsonLD.ts` — as-is
- `textUtils.ts` — as-is
- `localeUtils.ts` — simplify, hardcode to English
- `translationUtils.ts` — simplify, hardcode to English

### Styles

- `global.css`, `markdown-content.css`, `buttons.css`, `fonts.css`, `tailwind-theme.css`, `mos.css`

## Config Changes

### `astro.config.mjs`

- Remove i18n config block
- Remove `@keystatic/astro` integration
- Remove `/admin` redirect

### `content.config.ts`

- Keep: `blog`, `authors` collections
- Remove: `services`, `careers`, `projects`, `resume`, `otherPages`, `codeToggles`

### `package.json`

- Remove: `@keystatic/astro`, `@keystatic/core`, `swiper`
- Keep everything else

## Landing Page Composition

```
[Nav: Home | Blog | About | Contact]
[HeroBackgroundImage — title, tagline, CTA to /blog]
[BlogSectionGrid — "Latest Posts" (3-6 recent posts)]
[CtaCenteredNewsletter — subscribe/newsletter CTA]
[Footer — updated links]
```

## New Pages

### `/contact` (new file)

Create `src/pages/contact.astro` using:
- `BaseLayout` wrapper
- `Contact` or `ContactCentered` section component
- `ContactForm` embedded within

## Verification

After each major removal step, run `npm run build` to catch broken imports. Fix any import errors before proceeding to the next step.
