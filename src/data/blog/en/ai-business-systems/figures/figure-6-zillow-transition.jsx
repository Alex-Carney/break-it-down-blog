import { useState } from "react";

const PALETTE = {
  bg: "#FAFAF8", surface: "#FFFFFF", border: "#E8E6E1",
  text: "#1A1A1A", textSecondary: "#6B6560", textTertiary: "#9C9690",
  accent: "#264653", teal: "#2A9D8F", coral: "#E76F51",
  gold: "#E9C46A", warm: "#F4A261",
  positive: "#2D6A4F", positiveBg: "#D8F3DC",
  negative: "#9B2226", negativeBg: "#FDDEDE",
};

const PRODUCT_A = {
  name: "Zestimate",
  subtitle: "Informational product",
  period: "2006–present",
  color: PALETTE.teal,
  bgColor: `${PALETTE.teal}08`,
  dimensions: [
    { label: "Function", value: "Estimates value", detail: "Users see a number; they decide what to do with it" },
    { label: "Risk profile", value: "Symmetric", detail: "Over- and under-estimates equally inconvenient" },
    { label: "Error cost", value: "Low", detail: "An inaccurate estimate costs the user nothing directly" },
    { label: "Selection bias", value: "None", detail: "Everyone gets an estimate; no adversarial dynamics" },
    { label: "Maturity", value: "15 years", detail: "Iterated over >100 million homes, continuously improved" },
    { label: "Accuracy", value: "~2% median error", detail: "For on-market homes — among the best in the industry" },
  ],
  outcome: { label: "Outcome", value: "Successful product", color: PALETTE.positive },
};

const PRODUCT_B = {
  name: "Zillow Offers",
  subtitle: "Transactional product",
  period: "2018–2021",
  color: PALETTE.coral,
  bgColor: `${PALETTE.coral}08`,
  dimensions: [
    { label: "Function", value: "Makes cash offers", detail: "Zillow buys the house — errors mean owning depreciating assets" },
    { label: "Risk profile", value: "Asymmetric", detail: "Overpaying is catastrophic; underpaying means losing deals" },
    { label: "Error cost", value: "Extreme", detail: "Every overvaluation becomes an asset on Zillow's balance sheet" },
    { label: "Selection bias", value: "Adversarial", detail: "Sellers with overvalued homes disproportionately accepted offers" },
    { label: "Maturity", value: "3 years", detail: "New product, new domain dynamics, insufficient iteration time" },
    { label: "Accuracy", value: "Same model", detail: "Identical algorithmic foundations, fundamentally different context" },
  ],
  outcome: { label: "Outcome", value: "$500M+ losses", color: PALETTE.coral },
};

const TIMELINE = [
  { year: "2006", event: "Zestimate launches", type: "neutral" },
  { year: "2018", event: "Zillow Offers launches", type: "neutral" },
  { year: "2021 Q2", event: "\"Project Ketchup\": Zestimate used directly as cash offers", type: "warning" },
  { year: "2021 Q3", event: "Pricing experts overridden by algorithm", type: "warning" },
  { year: "Nov 2021", event: "Shutdown announced. $500M+ losses.", type: "negative" },
  { year: "9 months", event: "Market cap: $48B → $16B", type: "negative" },
];

export default function ZillowTransition() {
  const [activeRow, setActiveRow] = useState("all"); // show all by default
  const [showTimeline, setShowTimeline] = useState(false);

  return (
    <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", background: PALETTE.bg, padding: "24px" }}>
      {/* Side-by-side comparison */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0,
        border: `1px solid ${PALETTE.border}`,
      }}>
        {/* Headers */}
        <div style={{
          padding: "16px 20px", background: PRODUCT_A.bgColor,
          borderBottom: `1px solid ${PALETTE.border}`, borderRight: `1px solid ${PALETTE.border}`,
        }}>
          <div style={{ fontSize: 18, fontWeight: 400, color: PRODUCT_A.color, fontFamily: "Georgia, serif" }}>
            {PRODUCT_A.name}
          </div>
          <div style={{ fontSize: 11, color: PALETTE.textTertiary, marginTop: 2 }}>
            {PRODUCT_A.subtitle} · {PRODUCT_A.period}
          </div>
        </div>
        <div style={{
          padding: "16px 20px", background: PRODUCT_B.bgColor,
          borderBottom: `1px solid ${PALETTE.border}`,
        }}>
          <div style={{ fontSize: 18, fontWeight: 400, color: PRODUCT_B.color, fontFamily: "Georgia, serif" }}>
            {PRODUCT_B.name}
          </div>
          <div style={{ fontSize: 11, color: PALETTE.textTertiary, marginTop: 2 }}>
            {PRODUCT_B.subtitle} · {PRODUCT_B.period}
          </div>
        </div>

        {/* Dimension rows */}
        {PRODUCT_A.dimensions.map((dimA, i) => {
          const dimB = PRODUCT_B.dimensions[i];
          const isActive = activeRow === "all" || activeRow === i;
          return [
            <button
              key={`a-${i}`}
              onClick={() => setActiveRow(isActive ? null : i)}
              style={{
                padding: "12px 20px", background: isActive ? `${PALETTE.teal}06` : PALETTE.surface,
                border: "none", borderBottom: `1px solid ${PALETTE.border}`,
                borderRight: `1px solid ${PALETTE.border}`,
                cursor: "pointer", textAlign: "left", transition: "background 0.15s ease",
              }}
            >
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: PALETTE.textTertiary }}>
                {dimA.label}
              </div>
              <div style={{ fontSize: 14, fontWeight: 400, color: PRODUCT_A.color, marginTop: 4 }}>
                {dimA.value}
              </div>
              {isActive && (
                <div style={{ fontSize: 12, color: PALETTE.textSecondary, marginTop: 4, fontFamily: "Georgia, serif", lineHeight: 1.4 }}>
                  {dimA.detail}
                </div>
              )}
            </button>,
            <button
              key={`b-${i}`}
              onClick={() => setActiveRow(isActive ? null : i)}
              style={{
                padding: "12px 20px", background: isActive ? `${PALETTE.coral}06` : PALETTE.surface,
                border: "none", borderBottom: `1px solid ${PALETTE.border}`,
                cursor: "pointer", textAlign: "left", transition: "background 0.15s ease",
              }}
            >
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: PALETTE.textTertiary }}>
                {dimB.label}
              </div>
              <div style={{ fontSize: 14, fontWeight: 400, color: PRODUCT_B.color, marginTop: 4 }}>
                {dimB.value}
              </div>
              {isActive && (
                <div style={{ fontSize: 12, color: PALETTE.textSecondary, marginTop: 4, fontFamily: "Georgia, serif", lineHeight: 1.4 }}>
                  {dimB.detail}
                </div>
              )}
            </button>,
          ];
        })}

        {/* Outcome row */}
        <div style={{
          padding: "14px 20px", background: PALETTE.positiveBg,
          borderRight: `1px solid ${PALETTE.border}`,
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: PALETTE.positive }}>
            {PRODUCT_A.outcome.label}:
          </span>
          <span style={{ fontSize: 14, fontWeight: 400, color: PALETTE.positive }}>
            {PRODUCT_A.outcome.value}
          </span>
        </div>
        <div style={{
          padding: "14px 20px", background: PALETTE.negativeBg,
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: PALETTE.coral }}>
            {PRODUCT_B.outcome.label}:
          </span>
          <span style={{ fontSize: 14, fontWeight: 400, color: PALETTE.coral }}>
            {PRODUCT_B.outcome.value}
          </span>
        </div>
      </div>

      {/* Timeline toggle */}
      <button
        onClick={() => setShowTimeline(!showTimeline)}
        style={{
          width: "100%", marginTop: 16, padding: "10px 16px",
          background: PALETTE.surface, border: `1px solid ${PALETTE.border}`,
          cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: PALETTE.textSecondary }}>
          The escalation timeline
        </span>
        <span style={{ fontSize: 12, color: PALETTE.textTertiary }}>{showTimeline ? "▲" : "▼"}</span>
      </button>

      {showTimeline && (
        <div style={{
          background: PALETTE.surface, border: `1px solid ${PALETTE.border}`, borderTop: "none",
          padding: "16px 20px",
        }}>
          {TIMELINE.map((evt, i) => {
            const c = evt.type === "negative" ? PALETTE.coral : evt.type === "warning" ? PALETTE.warm : PALETTE.textTertiary;
            return (
              <div key={i} style={{
                display: "flex", gap: 12, alignItems: "flex-start",
                marginBottom: i < TIMELINE.length - 1 ? 10 : 0,
                paddingLeft: 8,
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%", background: c,
                  flexShrink: 0, marginTop: 4,
                }} />
                <div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: c }}>{evt.year}</span>
                  <span style={{ fontSize: 12, color: PALETTE.textSecondary, marginLeft: 8, fontFamily: "Georgia, serif" }}>
                    {evt.event}
                  </span>
                </div>
              </div>
            );
          })}

          <div style={{
            marginTop: 14, padding: "10px 12px", background: `${PALETTE.coral}06`,
            borderLeft: `3px solid ${PALETTE.coral}40`,
          }}>
            <p style={{ fontSize: 12, color: PALETTE.textSecondary, margin: 0, fontFamily: "Georgia, serif", lineHeight: 1.5 }}>
              Competitors using similar models — Opendoor, Offerpad — weathered the same market conditions.
              Their algorithms adjusted. Zillow's did not. The failure was in the operating model, not the model.
            </p>
          </div>
        </div>
      )}

      {/* Lesson */}
      <div style={{
        marginTop: 16, padding: "12px 16px",
        background: `${PALETTE.accent}08`, borderLeft: `3px solid ${PALETTE.accent}40`,
      }}>
        <p style={{ fontSize: 12, color: PALETTE.textSecondary, margin: 0, fontFamily: "Georgia, serif", lineHeight: 1.5 }}>
          <strong style={{ color: PALETTE.accent }}>Same algorithm. Different category.</strong>{" "}
          The problems at transactional scale were not amplified versions of informational problems.
          They were qualitatively different — adversarial selection, asymmetric risk, temporal uncertainty.
          POC success is an insufficient predictor of production success.
        </p>
      </div>
    </div>
  );
}
