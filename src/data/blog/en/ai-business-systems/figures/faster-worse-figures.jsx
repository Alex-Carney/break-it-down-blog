/* ─────────────────────────────────────────────────────────────
   faster-worse-figures.jsx — MDX entry-point
   Wraps Tier 2 figure components with useDarkMode() so MDX
   can use them as self-contained React islands (client:load).

   Tier 1 inline components (Callout, StatCallout) are Astro
   components imported directly in MDX — no wrapper needed.
   ───────────────────────────────────────────────────────────── */

import { useState, useEffect } from "react";
import { THEMES } from "./theme";

// Tier 2 figures
import PerceptionGapInner from "./perception-gap";
import TwoLoopsInner from "./two-loops";
import SpendingInversionInner from "./spending-inversion";
import CollaborationModesInner from "./collaboration-modes";
import ThreePartDistinctionInner from "./three-part-distinction";

function useDarkMode() {
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    const obs = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);
  return isDark;
}

export function PerceptionGap() {
  const t = useDarkMode() ? THEMES.dark : THEMES.light;
  return <PerceptionGapInner t={t} />;
}

export function TwoLoops() {
  const t = useDarkMode() ? THEMES.dark : THEMES.light;
  return <TwoLoopsInner t={t} />;
}

export function SpendingInversion() {
  const t = useDarkMode() ? THEMES.dark : THEMES.light;
  return <SpendingInversionInner t={t} />;
}

export function CollaborationModes() {
  const t = useDarkMode() ? THEMES.dark : THEMES.light;
  return <CollaborationModesInner t={t} />;
}

export function ThreePartDistinction() {
  const t = useDarkMode() ? THEMES.dark : THEMES.light;
  return <ThreePartDistinctionInner t={t} />;
}
