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
  "bid-bg":             "#F6F5F9",                    // cool purple-tinted page background
  "bid-surface":        "#FFFFFF",                    // card / panel surface
  "bid-border":         "#D0CEE0",                    // cool purple-tinted borders

  // ── Text hierarchy ────────────────────────────────────────────
  "bid-text":           "#1A1830",                    // deep navy primary text
  "bid-text-secondary": "#3A3856",                    // dark secondary text
  "bid-text-tertiary":  "#6E6C8A",                    // muted captions, labels

  // ── Accent palette ────────────────────────────────────────────
  "bid-slate":          "#3458A8",                    // annotation blue — data notes, definitions
  "bid-teal":           "#0EA5A5",                    // interactive teal — toggles, UI controls
  "bid-gold":           "#3458A8",                    // data label blue — same as slate
  "bid-warm":           "#B45309",                    // amber — caution, warning callouts
  "bid-coral":          "#6B4FCF",                    // brand purple — key findings, highlights

  // ── Semantic aliases ──────────────────────────────────────────
  "bid-positive":       "#0F7B4F",                    // deep emerald — positive outcomes
  "bid-positive-bg":    "rgba(15, 123, 79, 0.06)",    // tinted emerald background
  "bid-negative":       "#A83E54",                    // dusty rose — negative outcomes
  "bid-negative-bg":    "rgba(168, 62, 84, 0.06)",    // tinted rose background
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
  "bid-serif": ["Source Serif 4", "Georgia", "'Times New Roman'", "serif"],
  "bid-sans":  ["Inter Variable", "'Helvetica Neue'", "Arial", "sans-serif"],
};
