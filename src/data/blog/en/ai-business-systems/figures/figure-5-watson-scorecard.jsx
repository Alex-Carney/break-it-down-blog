import { useState } from "react";

const PALETTE = {
  bg: "#FAFAF8", surface: "#FFFFFF", border: "#E8E6E1",
  text: "#1A1A1A", textSecondary: "#6B6560", textTertiary: "#9C9690",
  accent: "#264653", teal: "#2A9D8F", coral: "#E76F51",
  gold: "#E9C46A", warm: "#F4A261",
  positive: "#2D6A4F", positiveBg: "#D8F3DC",
  negative: "#9B2226", negativeBg: "#FDDEDE",
};

const DIMENSIONS = [
  {
    id: "sponsorship",
    label: "Executive Sponsorship",
    score: "A+",
    status: "green",
    evidence: "CEO Ginni Rometty staked IBM's future on Watson. $4B+ total investment. Public commitment at the highest level.",
    interaction: "Aggressive marketing created pressure to deploy before the system was ready. Sponsorship became a liability when it demanded premature results.",
    interactsWith: ["timeline", "deployment"],
  },
  {
    id: "budget",
    label: "Budget & Resources",
    score: "A+",
    status: "green",
    evidence: "More than $4 billion invested. 2,000+ dedicated employees. Among the largest enterprise AI investments ever made.",
    interaction: "Massive budget combined with unrealistic timeline produced premature deployment. Resources couldn't compensate for misaligned incentives.",
    interactsWith: ["timeline", "talent"],
  },
  {
    id: "talent",
    label: "Talent & Partnerships",
    score: "A",
    status: "green",
    evidence: "Memorial Sloan Kettering. MD Anderson. Two of the world's most prestigious oncology institutions.",
    interaction: "World-class talent created synthetic training data — hypothetical patients designed to be clean and complete. Watson learned what doctors thought should happen, not what actually happened.",
    interactsWith: ["data", "sponsorship"],
  },
  {
    id: "data",
    label: "Data Strategy",
    score: "B+",
    status: "green",
    evidence: "Access to institutional oncology data from leading cancer centres. Structured training programme with expert clinicians.",
    interaction: "Real clinical data proved too inconsistent. Training was performed by one or two physicians whose preferences became embedded. Synthetic data replaced messy reality with clean fiction.",
    interactsWith: ["talent", "technology"],
  },
  {
    id: "technology",
    label: "Technology Platform",
    score: "A",
    status: "green",
    evidence: "Watson's NLP won Jeopardy! — the most impressive public AI demonstration of its era. Proven technical capability.",
    interaction: "NLP built for factual retrieval could not parse medical ambiguity. The technology that succeeded spectacularly in one domain was fundamentally mismatched to another.",
    interactsWith: ["data", "deployment"],
  },
  {
    id: "timeline",
    label: "Market Positioning",
    score: "A",
    status: "green",
    evidence: "First mover in AI-powered oncology. No serious competitors. Massive brand recognition.",
    interaction: "First-mover pressure compressed timelines. Marketing commitments outpaced technical readiness. Internal documents revealed unsafe recommendations were being generated.",
    interactsWith: ["sponsorship", "deployment"],
  },
];

const OUTCOME = {
  label: "Outcome",
  score: "F",
  status: "red",
  summary: "Internal documents: unsafe recommendations including drugs with severe contraindications. MD Anderson audit: $62M spent before cancellation. IBM sold Watson Health in 2022 for roughly a quarter of cumulative investment.",
  financials: [
    { label: "Total invested", value: ">$4B", color: PALETTE.textSecondary },
    { label: "Sold for", value: "~$1B", color: PALETTE.coral },
    { label: "MD Anderson alone", value: "$62M wasted", color: PALETTE.coral },
    { label: "Time to shutdown", value: "~7 years", color: PALETTE.textSecondary },
  ],
};

export default function WatsonScorecard() {
  const [activeDim, setActiveDim] = useState(0);
  const active = DIMENSIONS[activeDim];

  return (
    <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", background: PALETTE.bg, padding: "24px" }}>
      {/* Scorecard grid */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1,
        background: PALETTE.border, border: `1px solid ${PALETTE.border}`, marginBottom: 2,
      }}>
        {DIMENSIONS.map((dim, i) => {
          const isActive = activeDim === i;
          const isLinked = active && active.interactsWith.includes(dim.id);
          return (
            <button
              key={dim.id}
              onClick={() => setActiveDim(i)}
              style={{
                background: isActive ? `${PALETTE.positive}0A` : isLinked ? `${PALETTE.warm}0A` : PALETTE.surface,
                border: "none", cursor: "pointer", padding: "14px 12px",
                textAlign: "center", transition: "all 0.15s ease",
                outline: isLinked ? `2px dashed ${PALETTE.warm}60` : "none",
                outlineOffset: "-2px",
              }}
            >
              <div style={{
                fontSize: 28, fontWeight: 300, color: PALETTE.positive,
                lineHeight: 1, letterSpacing: "-0.02em",
              }}>{dim.score}</div>
              <div style={{
                fontSize: 11, fontWeight: 600, color: isActive ? PALETTE.positive : PALETTE.textSecondary,
                marginTop: 6, letterSpacing: "0.02em",
              }}>{dim.label}</div>
              <div style={{
                width: 6, height: 6, borderRadius: "50%", background: PALETTE.positive,
                margin: "6px auto 0", opacity: 0.6,
              }} />
            </button>
          );
        })}
      </div>

      {/* Outcome bar — always visible */}
      <div style={{
        background: `${PALETTE.coral}08`, border: `1px solid ${PALETTE.border}`,
        borderTop: `3px solid ${PALETTE.coral}`,
        padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: 24,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{
            fontSize: 28, fontWeight: 300, color: PALETTE.coral,
            lineHeight: 1, letterSpacing: "-0.02em",
          }}>F</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: PALETTE.coral }}>Outcome</div>
            <div style={{ fontSize: 10, color: PALETTE.textTertiary }}>Sold for ~25¢ on the dollar</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {OUTCOME.financials.map((f, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 14, fontWeight: 300, color: f.color, letterSpacing: "-0.01em" }}>{f.value}</div>
              <div style={{ fontSize: 9, color: PALETTE.textTertiary }}>{f.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Interaction detail */}
      <div style={{
        background: PALETTE.surface, border: `1px solid ${PALETTE.border}`,
        borderLeft: `4px solid ${PALETTE.warm}`,
      }}>
        {/* What the scorecard showed */}
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${PALETTE.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: PALETTE.positive }}>
              {active.label}: {active.score}
            </span>
            <span style={{
              fontSize: 10, padding: "2px 8px", background: PALETTE.positiveBg,
              color: PALETTE.positive, borderRadius: 2, fontWeight: 600,
            }}>✓ Ready</span>
          </div>
          <p style={{
            fontSize: 13, color: PALETTE.textSecondary, margin: "8px 0 0",
            fontFamily: "Georgia, serif", lineHeight: 1.5,
          }}>{active.evidence}</p>
        </div>

        {/* How it actually interacted */}
        <div style={{ padding: "16px 20px", background: `${PALETTE.warm}06` }}>
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: PALETTE.warm }}>
            How it interacted → failure
          </span>
          <p style={{
            fontSize: 13, color: PALETTE.text, margin: "8px 0 0",
            fontFamily: "Georgia, serif", lineHeight: 1.6,
          }}>{active.interaction}</p>
          <div style={{ marginTop: 10, display: "flex", gap: 6 }}>
            <span style={{ fontSize: 10, color: PALETTE.textTertiary }}>Interacted with:</span>
            {active.interactsWith.map((id) => {
              const linked = DIMENSIONS.find((d) => d.id === id);
              return (
                <span key={id} style={{
                  fontSize: 10, fontWeight: 600, color: PALETTE.warm,
                  background: `${PALETTE.warm}15`, padding: "1px 6px", borderRadius: 2,
                }}>{linked?.label}</span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lesson */}
      <div style={{
        marginTop: 16, padding: "12px 16px",
        background: `${PALETTE.accent}08`, borderLeft: `3px solid ${PALETTE.accent}40`,
      }}>
        <p style={{ fontSize: 12, color: PALETTE.textSecondary, margin: 0, fontFamily: "Georgia, serif", lineHeight: 1.5 }}>
          <strong style={{ color: PALETTE.accent }}>Readiness is not additive.</strong>{" "}
          Every dimension scored green. The outcome scored red. Strong individual dimensions interacted to produce weak outcomes — 
          world-class talent created biased training data, massive budgets compressed timelines, 
          and proven technology was deployed in a domain it wasn't designed for.
        </p>
      </div>
    </div>
  );
}
