/**
 * Break it Down — Tailwind CSS Design Tokens
 *
 * Add this to your tailwind.config.mjs extend block:
 *
 *   import { bidColors } from './src/config/bid-tokens'
 *
 *   export default {
 *     theme: {
 *       extend: {
 *         colors: bidColors,
 *       },
 *     },
 *   }
 *
 * Or merge directly into the theme.extend.colors object in your existing config.
 *
 * These tokens ensure every Break it Down component uses the same palette,
 * whether it's an Astro component, a React interactive figure, or raw MDX.
 */

export const bidColors = {
  // ── Core palette ──────────────────────────────────────────────
  "bid-bg":             "#FAFAF8",      // page background
  "bid-surface":        "#FFFFFF",      // card / panel background
  "bid-border":         "#E8E6E1",      // borders, rules, dividers

  // ── Text hierarchy ────────────────────────────────────────────
  "bid-text":           "#1A1A1A",      // primary text
  "bid-text-secondary": "#6B6560",      // body text, descriptions
  "bid-text-tertiary":  "#9C9690",      // captions, labels, sources

  // ── Accent palette (from the editorial color system) ──────────
  "bid-slate":          "#264653",      // primary accent, authority
  "bid-teal":           "#2A9D8F",      // positive, success, insight
  "bid-gold":           "#E9C46A",      // highlight, model layer
  "bid-warm":           "#F4A261",      // warning, caution
  "bid-coral":          "#E76F51",      // negative, failure, emphasis

  // ── Semantic aliases ──────────────────────────────────────────
  "bid-positive":       "#2D6A4F",      // inside frontier, healthy
  "bid-positive-bg":    "#D8F3DC",      // positive background
  "bid-negative":       "#9B2226",      // outside frontier, failing
  "bid-negative-bg":    "#FDDEDE",      // negative background
};

/**
 * Typography configuration for Break it Down articles.
 *
 * The design system uses:
 * - Serif (Georgia or similar) for body text, titles, narrative
 * - Sans-serif (system sans or Helvetica Neue) for labels, data, UI elements
 *
 * If your CosmicThemes config already defines font families,
 * you can alias them:
 *
 *   fontFamily: {
 *     'bid-serif': ['Georgia', 'Times New Roman', 'serif'],
 *     'bid-sans': ['Helvetica Neue', 'Arial', 'sans-serif'],
 *   }
 */
export const bidTypography = {
  "bid-serif": ["Georgia", "'Times New Roman'", "serif"],
  "bid-sans":  ["'Helvetica Neue'", "Arial", "sans-serif"],
};
