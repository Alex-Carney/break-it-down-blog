import FigureContainer from './figure-container';

export default function SpendingInversion({ t }) {
  const barH = 46;

  const actual = [
    { label: "Technology", pct: 93, fill: t.techFill, color: t.techColor },
    { label: "People & process", pct: 7, fill: t.peopleFill, color: t.peopleColor },
  ];

  const recommended = [
    { label: "Technology", pct: 10, fill: t.techFill, color: t.techColor },
    { label: "Process redesign", pct: 20, fill: t.processFill, color: t.processColor },
    { label: "People & change mgmt", pct: 70, fill: t.peopleFill, color: t.peopleColor },
  ];

  const renderBar = (segments, title, sublabel) => (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: t.text }}>{title}</div>
        <div style={{ fontSize: 10, color: t.textFaint }}>{sublabel}</div>
      </div>

      {/* Stacked bar with percentages always inside */}
      <div style={{
        display: "flex", height: barH, borderRadius: 5, overflow: "hidden",
        border: `1px solid ${t.borderLight}`,
      }}>
        {segments.map((seg, i) => (
          <div key={i} style={{
            width: `${seg.pct}%`, height: "100%", background: seg.fill,
            borderRight: i < segments.length - 1 ? `1px solid ${t.borderLight}` : "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", overflow: "visible",
          }}>
            <span style={{
              fontSize: seg.pct >= 30 ? 15 : 11,
              fontWeight: 700,
              color: seg.color,
              whiteSpace: "nowrap",
            }}>{seg.pct}%</span>
          </div>
        ))}
      </div>

      {/* Labels below, one per segment, same width proportions */}
      <div style={{ display: "flex", marginTop: 4 }}>
        {segments.map((seg, i) => (
          <div key={i} style={{
            width: `${seg.pct}%`,
            textAlign: "center",
            fontSize: 10,
            fontWeight: 500,
            color: seg.color,
            lineHeight: 1.3,
            padding: "2px 1px 0",
          }}>
            {seg.label}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <FigureContainer t={t}
      title="Enterprise AI budgets allocate 93% to the variable that doesn't explain the outcome gap"
      subtitle="The organizations achieving significant AI impact invest in the opposite direction."
      source="Actual: Deloitte CTO Survey (Fortune, Jan 2026). Recommended: BCG Henderson Institute (2025)."
    >
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        {renderBar(actual, "Current enterprise spending", "Deloitte 2026")}
        {renderBar(recommended, "High-performer allocation", "BCG Henderson")}

        <div style={{ display: "flex", gap: 10 }}>
          {[
            { stat: "~6%", label: "of orgs qualify as AI high performers", src: "McKinsey 2025" },
            { stat: "3\u00d7", label: "more likely to have redesigned workflows at the task level", src: "McKinsey 2025" },
            { stat: "70%", label: "of recommended investment goes to people, not tools", src: "BCG Henderson" },
          ].map((d, i) => (
            <div key={i} style={{
              flex: 1, padding: "14px 10px", background: t.surfaceAlt,
              borderRadius: 5, border: `1px solid ${t.borderLight}`, textAlign: "center",
            }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: t.accent, lineHeight: 1 }}>{d.stat}</div>
              <div style={{ fontSize: 9.5, color: t.textSub, marginTop: 5, lineHeight: 1.35 }}>{d.label}</div>
              <div style={{ fontSize: 8.5, color: t.textFaint, marginTop: 3, fontStyle: "italic" }}>{d.src}</div>
            </div>
          ))}
        </div>
      </div>
    </FigureContainer>
  );
}
