const P = {
  bg: "#F6F5F9", surface: "#FFFFFF", border: "#D0CEE0",
  text: "#1A1830", sub: "#3A3856", muted: "#6E6C8A",
  accent: "#6B4FCF", teal: "#0EA5A5", coral: "#A83E54",
  positive: "#0F7B4F", positiveBg: "rgba(15, 123, 79, 0.06)",
  negativeBg: "rgba(168, 62, 84, 0.06)",
};

const ROWS = [
  {
    dim: "Strategic orientation",
    hp: "Growth + innovation",
    hpDetail: "AI reshapes what the business does",
    typical: "Cost reduction",
    typDetail: "AI automates existing processes",
    stat: "3×", statNote: "more likely to pursue transformative change",
    source: "McKinsey 2025",
  },
  {
    dim: "Investment level",
    hp: ">20% of digital budget",
    hpDetail: "Committed, with rigorous ROI tracking",
    typical: "Experimental budgets",
    typDetail: "Pilot-level: covers model, not integration",
    stat: "85%", statNote: "misestimate AI costs by >10%",
    source: "McKinsey; Benchmarkit 2025",
  },
  {
    dim: "Portfolio focus",
    hp: "~3.5 use cases",
    hpDetail: "Concentrate resources, clear success criteria",
    typical: "~6.1 use cases",
    typDetail: "Spread thin — breadth mistaken for ambition",
    stat: "1.7×", statNote: "more use cases in struggling orgs",
    source: "BCG 2025; MIT NANDA",
  },
  {
    dim: "Workflow approach",
    hp: "Redesign the process",
    hpDetail: "AI triggers role redefinition, new operating models",
    typical: "Bolt on to existing",
    typDetail: "Electric motor on a steam factory layout",
    stat: "70%", statNote: "of value from people & process (BCG 10-20-70)",
    source: "BCG 2017–2025",
  },
  {
    dim: "Measurement",
    hp: "Business-linked ROI",
    hpDetail: "Revenue, margin, customer outcomes",
    typical: "Technical metrics or none",
    typDetail: "Model accuracy ≠ business impact",
    stat: "2–4 yr", statNote: "actual ROI timeline (vs. 7–12 mo expected)",
    source: "Wharton/GBK; Deloitte 2025",
  },
  {
    dim: "Build vs. buy",
    hp: "Buy commodity, build edge",
    hpDetail: "Purchase standard. Self-host only where data is advantage.",
    typical: "Build everything",
    typDetail: "Custom dev for problems purchased solutions already solve",
    stat: "3×", statNote: "success rate of purchased vs. built",
    source: "MIT NANDA; Menlo 2025",
  },
];

export default function HighPerformerPatterns() {
  return (
    <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", background: P.bg, padding: "24px" }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "baseline", gap: 12, marginBottom: 16,
        padding: "12px 16px", background: P.surface, border: `1px solid ${P.border}`,
      }}>
        <span style={{ fontSize: 32, fontWeight: 300, color: P.accent, letterSpacing: "-0.03em" }}>~6%</span>
        <span style={{ fontSize: 13, color: P.sub, fontFamily: "Georgia, serif" }}>
          of organisations capture meaningful returns from AI. They share six structural patterns — none of which are about the technology itself.
        </span>
      </div>

      {/* Comparison table */}
      <div style={{ background: P.surface, border: `1px solid ${P.border}`, overflow: "hidden" }}>
        {/* Column headers */}
        <div style={{
          display: "grid", gridTemplateColumns: "130px 1fr 1fr 90px",
          borderBottom: `2px solid ${P.border}`, gap: 0,
        }}>
          <div style={{ padding: "10px 16px", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: P.muted }}>
            Dimension
          </div>
          <div style={{ padding: "10px 16px", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: P.positive, background: `${P.positive}06`, borderLeft: `1px solid ${P.border}` }}>
            High performers (~6%)
          </div>
          <div style={{ padding: "10px 16px", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: P.coral, background: `${P.coral}04`, borderLeft: `1px solid ${P.border}` }}>
            Everyone else (~94%)
          </div>
          <div style={{ padding: "10px 16px", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: P.muted, borderLeft: `1px solid ${P.border}`, textAlign: "center" }}>
            Key stat
          </div>
        </div>

        {/* Data rows */}
        {ROWS.map((row, i) => (
          <div key={row.dim} style={{
            display: "grid", gridTemplateColumns: "130px 1fr 1fr 90px",
            borderBottom: i < ROWS.length - 1 ? `1px solid ${P.border}` : "none",
          }}>
            <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: P.text, lineHeight: 1.3 }}>{row.dim}</div>
              <div style={{ fontSize: 9, color: P.muted, marginTop: 3 }}>{row.source}</div>
            </div>
            <div style={{ padding: "12px 16px", borderLeft: `1px solid ${P.border}`, background: `${P.positive}03` }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: P.positive }}>{row.hp}</div>
              <div style={{ fontSize: 11, color: P.sub, marginTop: 2, fontFamily: "Georgia, serif", lineHeight: 1.35 }}>{row.hpDetail}</div>
            </div>
            <div style={{ padding: "12px 16px", borderLeft: `1px solid ${P.border}`, background: `${P.coral}02` }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: P.coral }}>{row.typical}</div>
              <div style={{ fontSize: 11, color: P.sub, marginTop: 2, fontFamily: "Georgia, serif", lineHeight: 1.35 }}>{row.typDetail}</div>
            </div>
            <div style={{
              padding: "12px 8px", borderLeft: `1px solid ${P.border}`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{ fontSize: 16, fontWeight: 300, color: P.accent, lineHeight: 1 }}>{row.stat}</div>
              <div style={{ fontSize: 9, color: P.muted, marginTop: 3, textAlign: "center", lineHeight: 1.2 }}>{row.statNote}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Caveat */}
      <div style={{
        marginTop: 12, padding: "12px 16px",
        background: `${P.accent}06`, borderLeft: `3px solid ${P.accent}40`,
      }}>
        <p style={{ fontSize: 12, color: P.sub, margin: 0, fontFamily: "Georgia, serif", lineHeight: 1.5 }}>
          <strong style={{ color: P.accent }}>Correlation, not causation</strong> — but the more useful claim holds:
          the <em>absence</em> of these patterns is a reliable predictor of failure. No data readiness, no workflow redesign,
          no realistic timelines, no executive sponsorship → predictable outcomes.
        </p>
      </div>
    </div>
  );
}
