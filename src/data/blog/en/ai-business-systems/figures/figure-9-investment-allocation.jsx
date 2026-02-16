const P = {
  bg: "#FAFAF8", surface: "#FFFFFF", border: "#E8E6E1",
  text: "#1A1A1A", sub: "#6B6560", muted: "#9C9690",
  accent: "#264653", teal: "#2A9D8F", coral: "#E76F51",
  gold: "#E9C46A", warm: "#F4A261",
  positive: "#2D6A4F", positiveBg: "#D8F3DC",
  negativeBg: "#FDDEDE",
};

const CATS = [
  { id: "org", label: "People & Process Change", color: P.coral, icon: "△" },
  { id: "data", label: "Data Infrastructure", color: P.teal, icon: "◈" },
  { id: "integration", label: "Integration & Orchestration", color: P.accent, icon: "◇" },
  { id: "model", label: "Models & Tools", color: P.gold, icon: "○" },
];

const PROFILES = [
  {
    label: "High performers (~6%)",
    alloc: { org: 30, data: 30, integration: 25, model: 15 },
    outcome: "+30pp revenue growth vs. industry",
    outcomeColor: P.positive,
    detail: "Invest in foundations first. The model is 15% of the budget — not because it doesn't matter, but because it depreciates fastest.",
    bg: P.positiveBg,
  },
  {
    label: "Typical failure pattern (~74%)",
    alloc: { org: 10, data: 10, integration: 10, model: 70 },
    outcome: "70–80% report no meaningful returns",
    outcomeColor: P.coral,
    detail: "Over-index on the model. Underfund data, integration, and the people who need to change how they work.",
    bg: P.negativeBg,
  },
];

export default function InvestmentAllocation() {
  return (
    <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", background: P.bg, padding: "24px" }}>
      {/* Two profiles side by side */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        {PROFILES.map((profile) => (
          <div key={profile.label} style={{
            background: P.surface, border: `1px solid ${P.border}`, overflow: "hidden",
          }}>
            {/* Header */}
            <div style={{
              padding: "12px 16px", borderBottom: `1px solid ${P.border}`,
              background: `${profile.outcomeColor}06`,
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: profile.outcomeColor, letterSpacing: "0.04em" }}>
                {profile.label}
              </div>
              <div style={{ fontSize: 11, color: P.sub, marginTop: 2, fontFamily: "Georgia, serif" }}>
                {profile.outcome}
              </div>
            </div>

            {/* Stacked bar */}
            <div style={{ padding: "16px 16px 8px" }}>
              <div style={{ display: "flex", height: 32, borderRadius: 3, overflow: "hidden", marginBottom: 12 }}>
                {CATS.map((cat) => {
                  const val = profile.alloc[cat.id];
                  return (
                    <div key={cat.id} style={{
                      width: `${val}%`, background: cat.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: val >= 15 ? 11 : 0, color: "#fff", fontWeight: 600,
                      transition: "width 0.3s",
                    }}>
                      {val >= 15 ? `${val}%` : ""}
                    </div>
                  );
                })}
              </div>

              {/* Breakdown rows */}
              {CATS.map((cat) => {
                const val = profile.alloc[cat.id];
                return (
                  <div key={cat.id} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "4px 0",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: cat.color }} />
                      <span style={{ fontSize: 11, color: P.sub }}>{cat.label}</span>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 500, color: val >= 30 ? P.text : P.muted }}>{val}%</span>
                  </div>
                );
              })}
            </div>

            {/* Interpretation */}
            <div style={{ padding: "10px 16px 14px", borderTop: `1px solid ${P.border}` }}>
              <p style={{ fontSize: 12, color: P.sub, margin: 0, fontFamily: "Georgia, serif", lineHeight: 1.45 }}>
                {profile.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* BCG 10-20-70 callout */}
      <div style={{
        background: P.surface, border: `1px solid ${P.border}`,
        padding: "14px 20px",
        display: "flex", alignItems: "center", gap: 20,
      }}>
        <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
          {[
            { pct: "10%", label: "Algorithms", color: P.gold },
            { pct: "20%", label: "Technology", color: P.teal },
            { pct: "70%", label: "People & Process", color: P.coral },
          ].map((item) => (
            <div key={item.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 300, color: item.color }}>{item.pct}</div>
              <div style={{ fontSize: 9, color: P.muted, marginTop: 2 }}>{item.label}</div>
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: P.muted, marginBottom: 4 }}>
            BCG's 10-20-70 rule
          </div>
          <p style={{ fontSize: 12, color: P.sub, margin: 0, fontFamily: "Georgia, serif", lineHeight: 1.45 }}>
            Organisations that succeed allocate roughly 10% to algorithms, 20% to technology and data infrastructure, and 70% to people and process change. Organisations that fail typically invert this ratio.
          </p>
        </div>
      </div>
    </div>
  );
}
