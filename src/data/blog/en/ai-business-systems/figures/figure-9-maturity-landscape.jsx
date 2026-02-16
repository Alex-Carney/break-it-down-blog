import { useState } from "react";

const PALETTE = {
  bg: "#FAFAF8", surface: "#FFFFFF", border: "#E8E6E1",
  text: "#1A1A1A", textSecondary: "#6B6560", textTertiary: "#9C9690",
  accent: "#264653", teal: "#2A9D8F", coral: "#E76F51",
  gold: "#E9C46A", warm: "#F4A261",
  positive: "#2D6A4F", positiveBg: "#D8F3DC",
  negative: "#9B2226", negativeBg: "#FDDEDE",
};

const STAGES = [
  {
    id: "exploring",
    label: "Exploring",
    share: "28%",
    shareLabel: "of organisations",
    growth: "−12.6pp",
    profit: "−9.6pp",
    growthDir: "under",
    color: PALETTE.coral,
    bgColor: `${PALETTE.coral}08`,
    description: "Running pilots and proofs of concept. AI strategy is project-by-project. No centralised data infrastructure. Success measured by whether the pilot works, not whether it generates business value.",
    recogniseIf: [
      "You have multiple AI pilots but no production deployments",
      "Each team is choosing its own tools and vendors",
      "No one owns AI strategy at the executive level",
      "You don't know your total AI spend",
    ],
    topRisks: [
      { dynamic: "Readiness paradox", detail: "Individual pilots succeed but nothing scales" },
      { dynamic: "Scale distortion", detail: "Pilot costs bear no resemblance to production costs" },
    ],
    priority: "Don't scale yet. Audit the data estate. Select one use case with measurable business criteria. Assign executive ownership.",
    priorityIcon: "◈",
  },
  {
    id: "building",
    label: "Building Foundations",
    share: "34%",
    shareLabel: "of organisations",
    growth: "−3.2pp",
    profit: "−1.8pp",
    growthDir: "under",
    color: PALETTE.warm,
    bgColor: `${PALETTE.warm}08`,
    description: "Moving first projects to production. Beginning to invest in data infrastructure and governance. Executive sponsorship exists but may be passive. Change management is recognised as a need but underfunded.",
    recogniseIf: [
      "You have 1–3 AI systems in production",
      "Data quality is a known problem with a plan to address it",
      "An executive sponsor exists but isn't actively championing",
      "Budget exists but integration costs keep surprising you",
    ],
    topRisks: [
      { dynamic: "Integration gap", detail: "30–50% cost overruns at the pilot-to-production step" },
      { dynamic: "Organisational immune response", detail: "Working systems that nobody uses" },
    ],
    priority: "Fund integration and change management at 3–5× the model budget. Convert passive sponsorship to active championing. Track business-linked metrics, not just technical performance.",
    priorityIcon: "◇",
  },
  {
    id: "scaling",
    label: "Scaling",
    share: "31%",
    shareLabel: "of organisations",
    growth: "+4.5pp",
    profit: "+3.8pp",
    growthDir: "over",
    color: PALETTE.teal,
    bgColor: `${PALETTE.teal}08`,
    description: "Multiple AI systems in production with shared infrastructure. Centralised data platform and governance. Active workflow redesign, not just tool addition. Measuring ROI against business outcomes.",
    recogniseIf: [
      "You have a centralised AI platform or data infrastructure",
      "AI is changing how work gets done, not just automating tasks",
      "You track AI-specific ROI metrics linked to business outcomes",
      "You're investing >20% of digital budget in AI",
    ],
    topRisks: [
      { dynamic: "Scale distortion", detail: "New failure modes emerge that didn't exist at smaller scale" },
      { dynamic: "Organisational immune response", detail: "Middle management resistance as AI changes roles" },
    ],
    priority: "Focus rather than expand. Struggling companies pursue 6.1 use cases vs. 3.5 for leaders. Deepen AI in 2–3 high-value workflows rather than spreading thin.",
    priorityIcon: "△",
  },
  {
    id: "transforming",
    label: "Transforming",
    share: "7%",
    shareLabel: "of organisations",
    growth: "+17.1pp",
    profit: "+10.4pp",
    growthDir: "over",
    color: PALETTE.positive,
    bgColor: `${PALETTE.positive}0A`,
    description: "AI embedded in core business processes and strategy. Organisation redesigned around AI-augmented workflows. Continuous model evaluation and replacement. The 6% capturing meaningful financial returns.",
    recogniseIf: [
      "AI is integral to your competitive strategy, not a support function",
      "You've redesigned core workflows (not just added AI to existing ones)",
      "Model evaluation and replacement is routine, not a project",
      "You attribute 5+ percentage points of earnings to AI",
    ],
    topRisks: [
      { dynamic: "Capability dependency", detail: "Klarna pattern — over-reliance degrades human judgment" },
      { dynamic: "Vendor concentration", detail: "Model changes disrupt production systems" },
    ],
    priority: "Maintain the hybrid model. Invest in the human capabilities that complement AI. Build model-agnostic architecture so you can swap providers without rebuilding.",
    priorityIcon: "○",
  },
];

export default function MaturityLandscape() {
  const [activeStage, setActiveStage] = useState(0);
  const active = STAGES[activeStage];

  return (
    <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", background: PALETTE.bg, padding: "24px" }}>
      {/* Stage selector - horizontal cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: PALETTE.border, border: `1px solid ${PALETTE.border}`, marginBottom: 24 }}>
        {STAGES.map((stage, i) => {
          const isActive = activeStage === i;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStage(i)}
              style={{
                background: isActive ? stage.bgColor : PALETTE.surface,
                border: "none", cursor: "pointer", padding: "16px 12px", textAlign: "center",
                borderBottom: isActive ? `3px solid ${stage.color}` : `3px solid transparent`,
                transition: "all 0.15s ease",
              }}
            >
              <div style={{
                fontSize: 24, fontWeight: 300, color: stage.color, lineHeight: 1,
                letterSpacing: "-0.02em",
              }}>{stage.share}</div>
              <div style={{
                fontSize: 12, fontWeight: 600, color: isActive ? stage.color : PALETTE.textSecondary,
                marginTop: 6, letterSpacing: "0.02em",
              }}>{stage.label}</div>
              <div style={{
                fontSize: 10, color: PALETTE.textTertiary, marginTop: 4,
              }}>
                {stage.growthDir === "over" ? "+" : ""}{stage.growth} growth
              </div>
            </button>
          );
        })}
      </div>

      {/* Performance spread bar */}
      <div style={{
        background: PALETTE.surface, border: `1px solid ${PALETTE.border}`, padding: "12px 16px",
        marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 18, fontWeight: 300, color: PALETTE.coral }}>−12.6pp</div>
          <div style={{ fontSize: 10, color: PALETTE.textTertiary }}>Exploring</div>
        </div>
        <div style={{ flex: 1, margin: "0 16px", position: "relative", height: 8 }}>
          <div style={{ position: "absolute", top: 3, left: 0, right: 0, height: 2, background: PALETTE.border }} />
          {STAGES.map((s, i) => (
            <div key={s.id} style={{
              position: "absolute", top: 0,
              left: `${(i / 3) * 100}%`, width: 8, height: 8,
              borderRadius: "50%", background: s.color,
              border: `2px solid ${PALETTE.surface}`,
              boxShadow: activeStage === i ? `0 0 0 3px ${s.color}30` : "none",
              transition: "box-shadow 0.15s ease",
            }} />
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 18, fontWeight: 300, color: PALETTE.positive }}>+17.1pp</div>
          <div style={{ fontSize: 10, color: PALETTE.textTertiary }}>Transforming</div>
        </div>
        <div style={{ marginLeft: 16, textAlign: "right" }}>
          <div style={{ fontSize: 22, fontWeight: 300, color: PALETTE.accent }}>30pp</div>
          <div style={{ fontSize: 10, color: PALETTE.textTertiary }}>total spread</div>
        </div>
      </div>

      {/* Active stage detail */}
      <div style={{
        background: PALETTE.surface, border: `1px solid ${PALETTE.border}`,
        borderLeft: `4px solid ${active.color}`,
      }}>
          {/* Header */}
          <div style={{ padding: "20px 24px", borderBottom: `1px solid ${PALETTE.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div>
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: active.color }}>
                  Stage: {active.label}
                </span>
                <span style={{ fontSize: 10, color: PALETTE.textTertiary, marginLeft: 12 }}>
                  {active.share} {active.shareLabel}
                </span>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: 16, fontWeight: 300, color: active.color }}>{active.growth}</span>
                <span style={{ fontSize: 10, color: PALETTE.textTertiary, marginLeft: 4 }}>growth vs. industry</span>
              </div>
            </div>
            <p style={{
              fontSize: 14, color: PALETTE.textSecondary, margin: "12px 0 0",
              fontFamily: "Georgia, serif", lineHeight: 1.6,
            }}>{active.description}</p>
          </div>

          {/* Recognise if */}
          <div style={{ padding: "16px 24px", borderBottom: `1px solid ${PALETTE.border}` }}>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: PALETTE.textTertiary, margin: "0 0 10px" }}>
              You're likely here if
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px" }}>
              {active.recogniseIf.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 8, color: active.color, marginTop: 4, flexShrink: 0 }}>●</span>
                  <span style={{ fontSize: 12, color: PALETTE.textSecondary, fontFamily: "Georgia, serif", lineHeight: 1.4 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top risks */}
          <div style={{ padding: "16px 24px", borderBottom: `1px solid ${PALETTE.border}` }}>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: PALETTE.textTertiary, margin: "0 0 10px" }}>
              Highest-risk failure dynamics
            </p>
            {active.topRisks.map((risk, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "baseline", marginBottom: i < active.topRisks.length - 1 ? 8 : 0 }}>
                <span style={{
                  fontSize: 10, fontWeight: 600, color: PALETTE.warm,
                  background: `${PALETTE.warm}15`, padding: "2px 8px", borderRadius: 2,
                  whiteSpace: "nowrap",
                }}>{risk.dynamic}</span>
                <span style={{ fontSize: 12, color: PALETTE.textSecondary, fontFamily: "Georgia, serif" }}>{risk.detail}</span>
              </div>
            ))}
          </div>

          {/* Investment priority */}
          <div style={{ padding: "16px 24px", background: `${active.color}06` }}>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: active.color, margin: "0 0 8px" }}>
              {active.priorityIcon} Investment priority
            </p>
            <p style={{
              fontSize: 13, color: PALETTE.text, margin: 0,
              fontFamily: "Georgia, serif", lineHeight: 1.6, fontWeight: 400,
            }}>{active.priority}</p>
          </div>
        </div>

      <div style={{ marginTop: 8, fontSize: 10, color: PALETTE.textTertiary, textAlign: "right" }}>
        MIT CISR Enterprise AI Maturity Model (N=721). Performance figures are industry-relative.
      </div>
    </div>
  );
}
