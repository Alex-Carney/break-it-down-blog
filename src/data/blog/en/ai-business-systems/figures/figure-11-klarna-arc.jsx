import { useState } from "react";

const P = {
  bg: "#FAFAF8", surface: "#FFFFFF", border: "#E8E6E1",
  text: "#1A1A1A", sub: "#6B6560", muted: "#9C9690",
  accent: "#264653", teal: "#2A9D8F", coral: "#E76F51",
  gold: "#E9C46A", warm: "#F4A261",
  positive: "#2D6A4F", positiveBg: "#D8F3DC",
  negative: "#9B2226", negativeBg: "#FDDEDE",
};

const PHASES = [
  {
    id: "launch", label: "Launch", period: "Feb 2024",
    title: "Extraordinary first results",
    metrics: [
      { label: "Conversations handled", value: "2.3M", ctx: "in first month" },
      { label: "Share of all chats", value: "67%", ctx: "two-thirds of CS" },
      { label: "Resolution time", value: "<2 min", ctx: "down from 11 min" },
      { label: "Projected savings", value: "$40M", ctx: "annual" },
    ],
    narrative: "Klarna's OpenAI-powered assistant handled two-thirds of all customer service in its first month. By any standard metric, this was one of the most successful enterprise AI deployments on record.",
    sentiment: "positive",
  },
  {
    id: "overcorrection", label: "Overcorrection", period: "Mid–Late 2024",
    title: "Cost optimisation without boundaries",
    metrics: [
      { label: "Headcount cut", value: "700 FTE", ctx: "publicly announced" },
      { label: "Routing logic", value: "Cost-first", ctx: "complex cases → AI" },
      { label: "Satisfaction", value: "Declining", ctx: "on complex cases" },
    ],
    narrative: "Klarna overpivoted — optimising for cost without investing in the cases where human judgment was irreplaceable. Complex disputes, fraud, and emotionally charged interactions were routed to systems that couldn't handle them.",
    sentiment: "warning",
  },
  {
    id: "degradation", label: "Quality crisis", period: "Mid 2025",
    title: "CEO acknowledges the problem",
    metrics: [
      { label: "CEO admission", value: "\"Lower quality\"", ctx: "cost was predominant factor" },
      { label: "Complex cases", value: "Inadequate", ctx: "fraud, disputes, emotional" },
      { label: "Trust erosion", value: "Long-tail cases", ctx: "simple queries still fine" },
    ],
    narrative: "CEO Siemiatkowski acknowledged what customers had been experiencing: cost was the predominant evaluation factor, and the result was lower quality. The long tail of difficult cases eroded trust.",
    sentiment: "negative",
  },
  {
    id: "recalibration", label: "Recalibration", period: "Q3 2025",
    title: "Hybrid model — redesigned twice",
    metrics: [
      { label: "AI workload", value: "853 FTE equiv.", ctx: "more than the original 700" },
      { label: "Cost per txn", value: "$0.19", ctx: "down from $0.32 (−40%)" },
      { label: "Revenue/employee", value: "+152%", ctx: "since Q1 2023" },
      { label: "Daily AI usage", value: "96%", ctx: "of all employees" },
    ],
    narrative: "Rather than retreating, Klarna recalibrated: rehiring humans for complex interactions, building a hybrid model. AI handles routine volume, humans handle the frontier's edge. The value came from redesigning the operating model — twice.",
    sentiment: "resolved",
  },
];

const sentColors = {
  positive: { border: P.positive, text: P.positive, dot: P.teal },
  warning: { border: P.warm, text: P.warm, dot: P.gold },
  negative: { border: P.negative, text: P.negative, dot: P.coral },
  resolved: { border: P.teal, text: P.accent, dot: P.accent },
};

const icons = { positive: "▲", warning: "◆", negative: "▼", resolved: "◇" };

export default function KlarnaArc() {
  const [activePhase, setActivePhase] = useState(0); // Default to first phase
  const active = PHASES[activePhase];
  const colors = sentColors[active.sentiment];

  return (
    <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", background: P.bg, padding: "24px" }}>
      {/* Takeaway — always visible at top */}
      <div style={{
        padding: "14px 20px", marginBottom: 20,
        background: `${P.accent}06`, borderLeft: `3px solid ${P.accent}50`,
      }}>
        <p style={{ fontSize: 13, color: P.sub, margin: 0, fontFamily: "Georgia, serif", lineHeight: 1.55 }}>
          <strong style={{ color: P.accent }}>The only success story in this report followed a four-phase arc</strong> — 
          spectacular launch, overcorrection, quality crisis, hybrid recalibration. 
          The value wasn't in the AI. It was in the willingness to redesign the operating model twice.
        </p>
      </div>

      {/* Timeline nav */}
      <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 24, position: "relative" }}>
        <div style={{ position: "absolute", top: 18, left: 40, right: 40, height: 2, background: P.border, zIndex: 0 }} />
        {PHASES.map((phase, i) => {
          const sc = sentColors[phase.sentiment];
          const isActive = activePhase === i;
          return (
            <button key={phase.id} onClick={() => setActivePhase(i)} style={{
              flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
              background: "none", border: "none", cursor: "pointer", zIndex: 1, padding: "0 4px",
            }}>
              <div style={{
                width: isActive ? 36 : 28, height: isActive ? 36 : 28,
                borderRadius: "50%",
                background: isActive ? sc.dot : P.surface,
                border: `2px solid ${sc.dot}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s ease",
                boxShadow: isActive ? `0 0 0 3px ${sc.dot}20` : "none",
              }}>
                <span style={{ fontSize: isActive ? 14 : 11, color: isActive ? P.surface : sc.dot }}>
                  {icons[phase.sentiment]}
                </span>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{
                  fontSize: 11, fontWeight: 600, letterSpacing: "0.04em",
                  color: isActive ? sc.text : P.sub, textTransform: "uppercase",
                }}>{phase.label}</div>
                <div style={{ fontSize: 10, color: P.muted, marginTop: 1 }}>{phase.period}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Phase detail */}
      <div style={{
        background: P.surface, border: `1px solid ${P.border}`,
        borderLeft: `4px solid ${colors.border}`,
      }}>
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${P.border}` }}>
          <span style={{
            fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase",
            color: colors.text,
          }}>{active.label} — {active.period}</span>
          <h4 style={{
            fontSize: 18, fontWeight: 400, color: P.text, margin: "6px 0 0",
            fontFamily: "Georgia, serif",
          }}>{active.title}</h4>
          <p style={{
            fontSize: 14, lineHeight: 1.6, color: P.sub,
            fontFamily: "Georgia, serif", margin: "10px 0 0",
          }}>{active.narrative}</p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${Math.min(active.metrics.length, 4)}, 1fr)`,
          gap: 1, background: P.border,
        }}>
          {active.metrics.map((m, i) => (
            <div key={i} style={{ background: P.surface, padding: "12px 14px" }}>
              <div style={{ fontSize: 18, fontWeight: 300, color: colors.text, lineHeight: 1.1 }}>{m.value}</div>
              <div style={{ fontSize: 11, color: P.sub, marginTop: 4, fontFamily: "Georgia, serif" }}>{m.label}</div>
              <div style={{ fontSize: 10, color: P.muted, marginTop: 2 }}>{m.ctx}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
