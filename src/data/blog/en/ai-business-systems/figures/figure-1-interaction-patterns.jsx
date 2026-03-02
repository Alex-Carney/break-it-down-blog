import { useState } from "react";

/*
  Figure: The Six Interaction Patterns
  Source: Shen & Tamkin (2026), Anthropic
  Shows six AI collaboration modes with dramatically different outcomes on the same task.
  Dark-mode aware via CSS custom properties fallback.
*/

const PATTERNS = [
  {
    name: "AI Delegation",
    score: 39,
    time: 19.5,
    category: "low",
    desc: "Sent task to AI, received code, pasted it in. Fast and empty.",
    behavior: "No decomposition — task goes to AI as a single block.",
  },
  {
    name: "Progressive AI Reliance",
    score: 35,
    time: 22,
    category: "low",
    desc: "Started independently, increasingly offloaded as difficulty rose.",
    behavior: "Began decomposing but abandoned it when things got hard.",
  },
  {
    name: "Iterative AI Debugging",
    score: 24,
    time: 31,
    category: "low",
    desc: "Used AI to debug AI-generated code in loops. Slowest AND lowest.",
    behavior: "False decomposition — delegation with extra steps.",
  },
  {
    name: "Conceptual Inquiry",
    score: 65,
    time: 22,
    category: "high",
    desc: "Asked AI only conceptual questions. Wrote all code independently.",
    behavior: "Decomposed learning from execution — AI for understanding, self for doing.",
  },
  {
    name: "Hybrid Code-Explanation",
    score: 68,
    time: 24,
    category: "high",
    desc: "Asked for code and explanations simultaneously.",
    behavior: "Every AI output had a doing component and a knowing component.",
  },
  {
    name: "Generation-Then-Comprehension",
    score: 86,
    time: 24,
    category: "high",
    desc: "Used AI to generate, then interrogated until understood.",
    behavior: "Decomposed temporally — get the answer, then understand it. +4 min investment.",
  },
];

function useDarkMode() {
  if (typeof window === "undefined") return false;
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ||
      document.documentElement.classList.contains("dark");
  } catch { return false; }
}

export default function InteractionPatterns() {
  const [hovered, setHovered] = useState(null);
  const dark = useDarkMode();

  const C = {
    bg: dark ? "#0E0C22" : "#F6F5F9",
    surface: dark ? "#141230" : "#FFFFFF",
    border: dark ? "#2A2850" : "#D0CEE0",
    text: dark ? "#ECE8F8" : "#1A1830",
    sub: dark ? "#B4B0CE" : "#3A3856",
    muted: dark ? "#7A78A0" : "#6E6C8A",
    low: dark ? "#F07090" : "#A83E54",
    lowBg: dark ? "rgba(240,112,144,0.08)" : "rgba(168,62,84,0.05)",
    high: dark ? "#3EE0A0" : "#0F7B4F",
    highBg: dark ? "rgba(62,224,160,0.08)" : "rgba(15,123,79,0.05)",
    barTrack: dark ? "#2A2850" : "#E8E6F0",
  };

  const maxScore = 100;

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: C.bg, padding: "20px 24px" }}>
      {/* Header stat */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "baseline",
        padding: "14px 20px", background: C.surface, border: `1px solid ${C.border}`,
        marginBottom: 20, borderRadius: 3,
      }}>
        <p style={{ fontSize: 14, color: C.text, margin: 0, lineHeight: 1.55, maxWidth: "65%" }}>
          Same tool. Same task. <strong>52 developers.</strong> The mode of collaboration produced a
          score range from <span style={{ color: C.low, fontWeight: 600 }}>24%</span> to{" "}
          <span style={{ color: C.high, fontWeight: 600 }}>86%</span>.
        </p>
        <div style={{ display: "flex", gap: 16, flexShrink: 0 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 32, fontWeight: 300, color: C.low, lineHeight: 1 }}>62pp</div>
            <div style={{ fontSize: 9, fontFamily: "'Helvetica Neue', Arial, sans-serif", color: C.muted, marginTop: 3, textTransform: "uppercase", letterSpacing: "0.08em" }}>gap between<br />best and worst</div>
          </div>
        </div>
      </div>

      {/* Patterns */}
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {PATTERNS.map((p, i) => {
          const isHov = hovered === i;
          const isHigh = p.category === "high";
          const accentColor = isHigh ? C.high : C.low;
          const bgColor = isHigh ? C.highBg : C.lowBg;

          return (
            <div
              key={p.name}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "grid",
                gridTemplateColumns: "200px 1fr 60px",
                alignItems: "center",
                gap: 16,
                padding: "12px 16px",
                background: isHov ? bgColor : C.surface,
                border: `1px solid ${isHov ? accentColor + "40" : C.border}`,
                borderRadius: 3,
                cursor: "default",
                transition: "all 0.15s ease",
              }}
            >
              {/* Name + category */}
              <div>
                <div style={{
                  fontSize: 13, fontWeight: 600, color: C.text, lineHeight: 1.3,
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                }}>
                  {p.name}
                </div>
                <div style={{
                  fontSize: 9, fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  textTransform: "uppercase", letterSpacing: "0.1em",
                  color: accentColor, marginTop: 3, fontWeight: 600,
                }}>
                  {isHigh ? "High-scoring pattern" : "Low-scoring pattern"}
                </div>
              </div>

              {/* Bar */}
              <div style={{ position: "relative", height: 28 }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                  background: C.barTrack, borderRadius: 3,
                }} />
                <div style={{
                  position: "absolute", top: 0, left: 0, bottom: 0,
                  width: `${(p.score / maxScore) * 100}%`,
                  background: `linear-gradient(90deg, ${accentColor}18, ${accentColor}40)`,
                  borderRadius: 3,
                  borderRight: `2px solid ${accentColor}`,
                  transition: "width 0.4s ease",
                }} />
                {/* Detail on hover */}
                {isHov && (
                  <div style={{
                    position: "absolute", top: "50%", left: `${Math.min((p.score / maxScore) * 100 + 2, 60)}%`,
                    transform: "translateY(-50%)",
                    fontSize: 11, color: C.sub, fontFamily: "'Helvetica Neue', Arial, sans-serif",
                    whiteSpace: "nowrap",
                  }}>
                    {p.desc}
                  </div>
                )}
              </div>

              {/* Score */}
              <div style={{ textAlign: "right" }}>
                <div style={{
                  fontSize: 22, fontWeight: 300, color: accentColor, lineHeight: 1,
                }}>
                  {p.score}%
                </div>
                <div style={{
                  fontSize: 9, fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  color: C.muted, marginTop: 2,
                }}>
                  {p.time} min
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Decomposition insight */}
      {hovered !== null && (
        <div style={{
          marginTop: 12, padding: "12px 16px",
          background: C.surface, border: `1px solid ${C.border}`,
          borderRadius: 3,
        }}>
          <div style={{
            fontSize: 9, fontFamily: "'Helvetica Neue', Arial, sans-serif",
            textTransform: "uppercase", letterSpacing: "0.1em",
            color: C.muted, marginBottom: 4,
          }}>
            Decomposition lens
          </div>
          <p style={{ fontSize: 13, color: C.sub, margin: 0, lineHeight: 1.55 }}>
            <strong style={{ color: C.text }}>{PATTERNS[hovered].name}:</strong>{" "}
            {PATTERNS[hovered].behavior}
          </p>
        </div>
      )}

      {/* Footer */}
      <div style={{
        marginTop: 16, padding: "12px 16px",
        background: C.surface, border: `1px solid ${C.border}`,
        borderRadius: 3, display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <p style={{ fontSize: 11, color: C.muted, margin: 0, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
          The +4 minute investment separating 39% from 86% is the cost of asking <em>"why does this work?"</em>
        </p>
        <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: C.high }} />
            <span style={{ fontSize: 10, fontFamily: "'Helvetica Neue', Arial, sans-serif", color: C.muted }}>High-scoring</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: C.low }} />
            <span style={{ fontSize: 10, fontFamily: "'Helvetica Neue', Arial, sans-serif", color: C.muted }}>Low-scoring</span>
          </div>
        </div>
      </div>

      <p style={{ fontSize: 10, fontFamily: "'Helvetica Neue', Arial, sans-serif", color: C.muted, marginTop: 10, lineHeight: 1.5 }}>
        Source: Shen & Tamkin (2026), Anthropic. N=52 professional developers. Quiz scores on conceptual understanding, code reading, and debugging after learning an unfamiliar Python library with GPT-4 access.
      </p>
    </div>
  );
}
