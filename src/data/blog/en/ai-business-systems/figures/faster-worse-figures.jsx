/* ─────────────────────────────────────────────────────────────
   faster-worse-figures.jsx — MDX entry-point
   Wraps individual figure components with useDarkMode() so MDX
   can use them as self-contained islands (client:load).
   ───────────────────────────────────────────────────────────── */

import { useState, useEffect } from "react";
import { THEMES } from "./tokens";
import { KEYFRAMES_CSS } from "./shared";
import ThesisToggle from "./ThesisToggle";
import SixPatterns from "./SixPatterns";
import PerceptionGap from "./PerceptionGap";
import TwoLoops from "./TwoLoops";
import SpendingInversion from "./SpendingInversion";

function useDarkMode() {
  const [isDark, setIsDark] = useState(true); // default dark (matches site default)
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    const obs = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return isDark;
}

export function Figure1ThesisToggle() {
  const t = useDarkMode() ? THEMES.dark : THEMES.light;
  return (
    <>
      <style>{KEYFRAMES_CSS}</style>
      <ThesisToggle t={t} />
    </>
  );
}

export function Figure2SixPatterns() {
  const t = useDarkMode() ? THEMES.dark : THEMES.light;
  return <SixPatterns t={t} />;
}

export function Figure3PerceptionGap() {
  const t = useDarkMode() ? THEMES.dark : THEMES.light;
  return <PerceptionGap t={t} />;
}

export function Figure4TwoLoops() {
  const t = useDarkMode() ? THEMES.dark : THEMES.light;
  return <TwoLoops t={t} />;
}

export function Figure5SpendingInversion() {
  const t = useDarkMode() ? THEMES.dark : THEMES.light;
  return (
    <>
      <style>{KEYFRAMES_CSS}</style>
      <SpendingInversion t={t} />
    </>
  );
}
