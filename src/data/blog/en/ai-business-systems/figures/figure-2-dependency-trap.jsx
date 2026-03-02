import { useState } from "react";

/*
  Figure: The Dependency Trap
  Two reinforcing loops — cognitive (skill atrophy) and motivational (desire atrophy).
  Evidence from Shen, Wiles, Budzyń, Bastani, Wu et al.
  Dark-mode aware.
*/

const EVIDENCE = [
  { label: "1 hour", source: "Shen & Tamkin 2026", detail: "17% lower quiz scores. Debugging skills hit hardest.", domain: "Coding", loop: "cognitive" },
  { label: "90 min", source: "Wiles / BCG 2024", detail: "Skills didn't persist after AI removed. 'Exoskeleton' — temporary capability, no learning.", domain: "Consulting", loop: "cognitive" },
  { label: "3 months", source: "Budzyń et al. 2025", detail: "Adenoma detection dropped 28.4% → 22.4%. 19 experienced endoscopists.", domain: "Medicine", loop: "cognitive" },
  { label: "1 semester", source: "Bastani et al. 2024", detail: "Students scored 17% worse after AI removed. Safeguarded version: +127%.", domain: "Education", loop: "cognitive" },
  { label: "Immediate", source: "Wu et al. 2025", detail: "Decreased intrinsic motivation + increased boredom after AI collaboration. N=3,562.", domain: "General", loop: "motivational" },
];

function useDarkMode() {
  if (typeof window === "undefined") return false;
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ||
      document.documentElement.classList.contains("dark");
  } catch { return false; }
}

export default function DependencyTrap() {
  const [activeLoop, setActiveLoop] = useState("both");
  const [hoveredEvidence, setHoveredEvidence] = useState(null);
  const dark = useDarkMode();

  const C = {
    bg: dark ? "#0E0C22" : "#F6F5F9",
    surface: dark ? "#141230" : "#FFFFFF",
    border: dark ? "#2A2850" : "#D0CEE0",
    text: dark ? "#ECE8F8" : "#1A1830",
    sub: dark ? "#B4B0CE" : "#3A3856",
    muted: dark ? "#7A78A0" : "#6E6C8A",
    cognitive: dark ? "#A48AFF" : "#6B4FCF",
    cognitiveBg: dark ? "rgba(164,138,255,0.06)" : "rgba(107,79,207,0.04)",
    motivational: dark ? "#7A9EF0" : "#3458A8",
    motivationalBg: dark ? "rgba(122,158,240,0.06)" : "rgba(52,88,168,0.04)",
    coral: dark ? "#A48AFF" : "#6B4FCF",
  };

  const showCognitive = activeLoop === "both" || activeLoop === "cognitive";
  const showMotivational = activeLoop === "both" || activeLoop === "motivational";

  const filteredEvidence = EVIDENCE.filter(e => {
    if (activeLoop === "both") return true;
    return e.loop === activeLoop;
  });

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: C.bg, padding: "20px 24px" }}>
      {/* Toggle */}
      <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
        {[
          { id: "both", label: "Both loops" },
          { id: "cognitive", label: "Cognitive (skill loss)" },
          { id: "motivational", label: "Motivational (desire loss)" },
        ].map(opt => (
          <button
            key={opt.id}
            onClick={() => setActiveLoop(opt.id)}
            style={{
              fontSize: 11, fontFamily: "'Helvetica Neue', Arial, sans-serif",
              padding: "6px 14px", borderRadius: 3, cursor: "pointer",
              border: `1px solid ${activeLoop === opt.id ? (opt.id === "cognitive" ? C.cognitive : opt.id === "motivational" ? C.motivational : C.text) : C.border}`,
              background: activeLoop === opt.id ? (opt.id === "cognitive" ? C.cognitiveBg : opt.id === "motivational" ? C.motivationalBg : C.surface) : "transparent",
              color: activeLoop === opt.id ? C.text : C.muted,
              fontWeight: activeLoop === opt.id ? 600 : 400,
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Loop diagrams */}
      <div style={{ display: "grid", gridTemplateColumns: showCognitive && showMotivational ? "1fr 1fr" : "1fr", gap: 12, marginBottom: 16 }}>
        {showCognitive && (
          <div style={{
            padding: "16px", background: C.surface, border: `1px solid ${C.border}`,
            borderTop: `3px solid ${C.cognitive}`, borderRadius: 3,
          }}>
            <div style={{
              fontSize: 10, fontFamily: "'Helvetica Neue', Arial, sans-serif",
              textTransform: "uppercase", letterSpacing: "0.1em",
              color: C.cognitive, fontWeight: 700, marginBottom: 12,
            }}>
              Cognitive loop
            </div>
            {[
              "Delegate to AI",
              "Encounter fewer errors",
              "Build less understanding",
              "Less capable of evaluating AI",
              "Delegate more →",
            ].map((step, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "7px 0",
                borderBottom: i < 4 ? `1px solid ${C.border}` : "none",
              }}>
                <div style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: C.cognitiveBg, border: `1px solid ${C.cognitive}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  color: C.cognitive, fontWeight: 600, flexShrink: 0,
                }}>
                  {i + 1}
                </div>
                <span style={{ fontSize: 13, color: C.text, lineHeight: 1.4 }}>{step}</span>
              </div>
            ))}
          </div>
        )}

        {showMotivational && (
          <div style={{
            padding: "16px", background: C.surface, border: `1px solid ${C.border}`,
            borderTop: `3px solid ${C.motivational}`, borderRadius: 3,
          }}>
            <div style={{
              fontSize: 10, fontFamily: "'Helvetica Neue', Arial, sans-serif",
              textTransform: "uppercase", letterSpacing: "0.1em",
              color: C.motivational, fontWeight: 700, marginBottom: 12,
            }}>
              Motivational loop
            </div>
            {[
              "Collaborate with AI",
              "Solo work feels boring",
              "Intrinsic motivation drops",
              "Reach for AI more",
              "Solo capacity shrinks →",
            ].map((step, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "7px 0",
                borderBottom: i < 4 ? `1px solid ${C.border}` : "none",
              }}>
                <div style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: C.motivationalBg, border: `1px solid ${C.motivational}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  color: C.motivational, fontWeight: 600, flexShrink: 0,
                }}>
                  {i + 1}
                </div>
                <span style={{ fontSize: 13, color: C.text, lineHeight: 1.4 }}>{step}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Evidence timeline */}
      <div style={{
        padding: "16px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 3,
      }}>
        <div style={{
          fontSize: 10, fontFamily: "'Helvetica Neue', Arial, sans-serif",
          textTransform: "uppercase", letterSpacing: "0.1em",
          color: C.muted, fontWeight: 600, marginBottom: 12,
        }}>
          Evidence across timeframes
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {filteredEvidence.map((e, i) => {
            const isHov = hoveredEvidence === i;
            const loopColor = e.loop === "cognitive" ? C.cognitive : C.motivational;

            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredEvidence(i)}
                onMouseLeave={() => setHoveredEvidence(null)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 8px 1fr",
                  gap: 12,
                  alignItems: "start",
                  padding: "10px 12px",
                  background: isHov ? (e.loop === "cognitive" ? C.cognitiveBg : C.motivationalBg) : "transparent",
                  borderRadius: 3,
                  cursor: "default",
                  transition: "background 0.15s ease",
                }}
              >
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.text, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
                    {e.label}
                  </div>
                  <div style={{ fontSize: 10, color: C.muted, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
                    {e.domain}
                  </div>
                </div>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: loopColor, marginTop: 5,
                }} />
                <div>
                  <div style={{ fontSize: 12, color: C.sub, fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 500 }}>
                    {e.source}
                  </div>
                  {isHov && (
                    <div style={{ fontSize: 12, color: C.text, marginTop: 4, lineHeight: 1.5 }}>
                      {e.detail}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p style={{ fontSize: 10, fontFamily: "'Helvetica Neue', Arial, sans-serif", color: C.muted, marginTop: 10, lineHeight: 1.5 }}>
        Sources: Shen & Tamkin (arXiv 2026, N=52); Wiles et al. / BCG Henderson Institute (2024, N=480); Budzyń et al. (Lancet GI&H 2025, N=1,443 procedures); Bastani et al. (Wharton/SSRN 2024, N≈1,000); Wu et al. (Scientific Reports 2025, N=3,562). Hover for detail.
      </p>
    </div>
  );
}
