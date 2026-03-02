/* ─────────────────────────────────────────────────────────────
   Break it Down — Design Tokens
   Color system per Style Guide v1.0 (Feb 23, 2026)
   ───────────────────────────────────────────────────────────── */

export interface Theme {
  bg: string;
  bgElevated: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  borderLight: string;
  text: string;
  textSub: string;
  textMuted: string;
  textFaint: string;
  accent: string;
  accentBg: string;
  positive: string;
  negative: string;
  posBg: string;
  negBg: string;
  blue: string;
  blueBg: string;
  teal: string;
  tealBg: string;
}

export const THEMES: Record<"light" | "dark", Theme> = {
  light: {
    bg: "#F6F5F9",
    bgElevated: "#EEEDF4",
    surface: "#FFFFFF",
    surfaceAlt: "#F0EFF5",
    border: "#D0CEE0",
    borderLight: "#E0DEE8",
    text: "#1A1830",
    textSub: "#3A3856",
    textMuted: "#6E6C8A",
    textFaint: "#B0AEC6",
    accent: "#6B4FCF",
    accentBg: "rgba(107,79,207,0.06)",
    positive: "#0F7B4F",
    negative: "#A83E54",
    posBg: "rgba(15,123,79,0.05)",
    negBg: "rgba(168,62,84,0.05)",
    blue: "#3458A8",
    blueBg: "rgba(52,88,168,0.06)",
    teal: "#0EA5A5",
    tealBg: "rgba(14,165,165,0.05)",
  },
  dark: {
    bg: "#08061A",
    bgElevated: "#0E0C22",
    surface: "#141230",
    surfaceAlt: "#1A1838",
    border: "#2A2850",
    borderLight: "#222044",
    text: "#ECE8F8",
    textSub: "#B4B0CE",
    textMuted: "#7A78A0",
    textFaint: "#4A4868",
    accent: "#A48AFF",
    accentBg: "rgba(164,138,255,0.08)",
    positive: "#3EE0A0",
    negative: "#F07090",
    posBg: "rgba(62,224,160,0.06)",
    negBg: "rgba(240,112,144,0.06)",
    blue: "#7A9EF0",
    blueBg: "rgba(122,158,240,0.07)",
    teal: "#0EA5A5",
    tealBg: "rgba(14,165,165,0.07)",
  },
};
