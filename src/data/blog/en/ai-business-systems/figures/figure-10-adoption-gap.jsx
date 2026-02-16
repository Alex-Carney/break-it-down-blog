import { useState, useEffect } from "react";

const PALETTE = {
  bg: "#FAFAF8", surface: "#FFFFFF", border: "#E8E6E1",
  text: "#1A1A1A", textSecondary: "#6B6560", textTertiary: "#9C9690",
  accent: "#264653", teal: "#2A9D8F", gold: "#E9C46A",
  warm: "#F4A261", coral: "#E76F51",
};

const STATS = [
  { value: "88%", label: "of organisations use AI", sub: "McKinsey 2025, N=1,491", color: PALETTE.accent },
  { value: "~6%", label: "report meaningful returns", sub: "McKinsey \"high performers\"", color: PALETTE.coral },
  { value: "$364–400B", label: "2025 Big Tech AI capex", sub: "Alphabet, Microsoft, Meta, Amazon, Nvidia", color: PALETTE.teal },
];

const FAILURE_RATES = [
  { source: "McKinsey 2025", n: "1,491", rate: 74, definition: "Difficulty capturing value at scale" },
  { source: "BCG / MIT Sloan 2025", n: "1,250", rate: 70, definition: "No significant business impact" },
  { source: "S&P Global 2025", n: "1,000+", rate: 72, definition: "Comparable failure levels" },
  { source: "Traditional IT (Standish)", n: "—", rate: 45, definition: "IT project failure baseline" },
];

export default function AdoptionGap() {
  const [step, setStep] = useState(0);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 300);
    const t2 = setTimeout(() => setStep(2), 800);
    const t3 = setTimeout(() => setStep(3), 1300);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: PALETTE.bg, padding: "24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>

        {/* Three big numbers */}
        <div style={{ display: "flex", gap: 2, marginBottom: 40 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              flex: 1, padding: "32px 20px 28px", background: PALETTE.surface,
              border: `1px solid ${PALETTE.border}`,
              borderLeft: i === 0 ? `1px solid ${PALETTE.border}` : "none",
              opacity: step > i ? 1 : 0,
              transform: step > i ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
            }}>
              <div style={{
                fontSize: i === 2 ? 32 : 48, fontWeight: 300, color: s.color,
                lineHeight: 1, letterSpacing: "-0.02em",
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
              }}>
                {s.value}
              </div>
              <div style={{ fontSize: 14, color: PALETTE.text, marginTop: 12, lineHeight: 1.4 }}>
                {s.label}
              </div>
              <div style={{ fontSize: 11, fontFamily: "'Helvetica Neue', Arial, sans-serif", color: PALETTE.textTertiary, marginTop: 6 }}>
                {s.sub}
              </div>
            </div>
          ))}
        </div>

        {/* The gap visual — bar comparison */}
        <div style={{ background: PALETTE.surface, border: `1px solid ${PALETTE.border}`, padding: "28px 28px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
            <p style={{ fontSize: 11, fontFamily: "'Helvetica Neue', Arial, sans-serif", textTransform: "uppercase", letterSpacing: "0.1em", color: PALETTE.textTertiary, margin: 0 }}>
              Failure rates by source
            </p>
            <button
              onClick={() => setShowDetail(!showDetail)}
              style={{
                fontSize: 11, fontFamily: "'Helvetica Neue', Arial, sans-serif",
                padding: "4px 12px", background: showDetail ? PALETTE.accent : "transparent",
                color: showDetail ? "#fff" : PALETTE.textSecondary,
                border: `1px solid ${showDetail ? PALETTE.accent : PALETTE.border}`,
                borderRadius: 2, cursor: "pointer",
              }}
            >
              {showDetail ? "Hide definitions" : "Show definitions"}
            </button>
          </div>

          {FAILURE_RATES.map((r, i) => {
            const isBaseline = r.source.includes("Standish");
            return (
              <div key={i} style={{ marginBottom: i < FAILURE_RATES.length - 1 ? 16 : 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                  <span style={{
                    fontSize: 13, color: isBaseline ? PALETTE.textTertiary : PALETTE.text,
                    fontStyle: isBaseline ? "italic" : "normal",
                  }}>
                    {r.source}
                    {r.n !== "—" && <span style={{ fontSize: 11, color: PALETTE.textTertiary, marginLeft: 6 }}>N={r.n}</span>}
                  </span>
                  <span style={{
                    fontSize: 15, fontFamily: "'Helvetica Neue', Arial, sans-serif",
                    fontWeight: 600, color: isBaseline ? PALETTE.textTertiary : PALETTE.coral,
                  }}>
                    {r.rate}%
                  </span>
                </div>
                <div style={{ position: "relative", height: 20, background: "#F5F4F0", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{
                    position: "absolute", left: 0, top: 0, height: "100%",
                    width: `${r.rate}%`, borderRadius: 2,
                    background: isBaseline ? PALETTE.textTertiary : (r.rate >= 70 ? PALETTE.coral : PALETTE.warm),
                    opacity: isBaseline ? 0.3 : 0.75,
                    transition: "width 1s ease",
                  }} />
                  {isBaseline && (
                    <div style={{
                      position: "absolute", right: 8, top: 2, fontSize: 10,
                      fontFamily: "'Helvetica Neue', Arial, sans-serif",
                      color: PALETTE.textTertiary, fontStyle: "italic",
                    }}>
                      traditional IT baseline
                    </div>
                  )}
                </div>
                {showDetail && (
                  <div style={{
                    fontSize: 11, fontFamily: "'Helvetica Neue', Arial, sans-serif",
                    color: PALETTE.textTertiary, marginTop: 4, fontStyle: "italic",
                  }}>
                    Definition: {r.definition}
                  </div>
                )}
              </div>
            );
          })}

          <div style={{
            marginTop: 20, paddingTop: 16, borderTop: `1px solid ${PALETTE.border}`,
            display: "flex", gap: 20,
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 22, fontWeight: 300, color: PALETTE.coral, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
                70–80%
              </div>
              <div style={{ fontSize: 12, color: PALETTE.textSecondary, marginTop: 2 }}>
                convergent AI failure range
              </div>
            </div>
            <div style={{ width: 1, background: PALETTE.border }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 22, fontWeight: 300, color: PALETTE.textTertiary, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
                40–50%
              </div>
              <div style={{ fontSize: 12, color: PALETTE.textSecondary, marginTop: 2 }}>
                traditional IT failure rate
              </div>
            </div>
            <div style={{ width: 1, background: PALETTE.border }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 22, fontWeight: 300, color: PALETTE.accent, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
                ~2×
              </div>
              <div style={{ fontSize: 12, color: PALETTE.textSecondary, marginTop: 2 }}>
                higher than baseline
              </div>
            </div>
          </div>
        </div>

        <p style={{ fontSize: 10, fontFamily: "'Helvetica Neue', Arial, sans-serif", color: PALETTE.textTertiary, marginTop: 12, lineHeight: 1.5 }}>
          Sources: McKinsey Global AI Survey 2025; BCG/MIT Sloan Management Review 2025; S&P Global Market Intelligence 2025; Standish Group CHAOS Report. The commonly cited "85% failure" figure (Gartner 2017) and "87% never reach production" figure (VentureBeat 2019) are excluded — neither traces to published research with disclosed methodology.
        </p>
      </div>
    </div>
  );
}
