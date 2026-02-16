import { useState } from "react";

const PALETTE = {
  bg: "#FAFAF8", surface: "#FFFFFF", border: "#E8E6E1",
  text: "#1A1A1A", textSecondary: "#6B6560", textTertiary: "#9C9690",
  accent: "#264653", highlight: "#2A9D8F",
};

const DIMS = [
  { id: "cost", label: "Cost" },
  { id: "control", label: "Data Control" },
  { id: "speed", label: "Speed to Deploy" },
  { id: "custom", label: "Customisation" },
  { id: "complexity", label: "Simplicity" },
  { id: "sensitivity", label: "Regulatory Fit" },
];

const MODELS = [
  {
    id: "api", label: "Cloud API", sub: "Third-party model via API (e.g., OpenAI, Anthropic)",
    share: "Most common entry point",
    scores: { cost: 4, control: 1, speed: 5, custom: 2, complexity: 5, sensitivity: 1 },
    bestFor: "Fast prototyping, non-sensitive data, general-purpose tasks",
    watchOut: "Data leaves your environment. Limited customisation. Vendor lock-in risk.",
    costNote: "$0.50–$60 per million tokens. Zero upfront.",
  },
  {
    id: "purchased", label: "AI-Powered Software", sub: "Vertical SaaS with embedded AI (e.g., domain-specific tools)",
    share: "76% of enterprise use cases",
    scores: { cost: 3, control: 2, speed: 4, custom: 1, complexity: 4, sensitivity: 3 },
    bestFor: "Well-defined use cases, limited internal AI capability, predictable budgets",
    watchOut: "Minimal customisation. Vendor controls the model, updates, and data handling.",
    costNote: "Subscription pricing. Predictable. Vendor manages infrastructure.",
  },
  {
    id: "opensource", label: "Self-Hosted Open-Source", sub: "Open-weight models on your infrastructure (e.g., Llama, Mistral)",
    share: "Fastest-growing segment",
    scores: { cost: 3, control: 5, speed: 2, custom: 4, complexity: 2, sensitivity: 5 },
    bestFor: "Regulated industries, proprietary data, organisations with ML engineering talent",
    watchOut: "Requires GPU procurement + 1–2 MLOps engineers minimum. Ongoing maintenance.",
    costNote: "86% cheaper per token at scale. $50K–$200K+ upfront.",
  },
  {
    id: "finetune", label: "Fine-Tuned Model", sub: "Model trained on your proprietary data",
    share: "Specialist applications",
    scores: { cost: 2, control: 4, speed: 1, custom: 5, complexity: 1, sensitivity: 4 },
    bestFor: "Domain-specific language, proprietary processes, defensible competitive advantage",
    watchOut: "Months to build. Requires curated training data + evaluation pipeline. Retraining needed as data shifts.",
    costNote: "$10K–$100K+ per training run. Highest total cost.",
  },
];

const PROFILES = [
  { id: "speed", label: "Speed & simplicity", weights: { cost: 2, control: 1, speed: 5, custom: 1, complexity: 5, sensitivity: 1 } },
  { id: "regulated", label: "Regulated industry", weights: { cost: 2, control: 5, speed: 1, custom: 3, complexity: 2, sensitivity: 5 } },
  { id: "competitive", label: "Competitive advantage", weights: { cost: 1, control: 4, speed: 1, custom: 5, complexity: 2, sensitivity: 3 } },
  { id: "balanced", label: "Balanced", weights: { cost: 3, control: 3, speed: 3, custom: 3, complexity: 3, sensitivity: 3 } },
];

function scoreModel(model, weights) {
  let s = 0, max = 0;
  for (const d of DIMS) { s += model.scores[d.id] * weights[d.id]; max += 5 * weights[d.id]; }
  return Math.round((s / max) * 100);
}

export default function DeploymentComparator() {
  const [profile, setProfile] = useState("balanced");
  const [expandedModel, setExpandedModel] = useState(null);

  const weights = PROFILES.find((p) => p.id === profile)?.weights || PROFILES[3].weights;
  const scored = MODELS.map((m) => ({ ...m, score: scoreModel(m, weights) })).sort((a, b) => b.score - a.score);
  const topId = scored[0].id;

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: PALETTE.bg, padding: "24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* Profile selector */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 10, fontFamily: "'Helvetica Neue', Arial, sans-serif", textTransform: "uppercase", letterSpacing: "0.1em", color: PALETTE.textTertiary, marginBottom: 8 }}>What matters most?</p>
          <div style={{ display: "flex", gap: 6 }}>
            {PROFILES.map((p) => (
              <button key={p.id} onClick={() => setProfile(p.id)} style={{
                flex: 1, padding: "10px 12px", textAlign: "center",
                background: profile === p.id ? PALETTE.accent : PALETTE.surface,
                color: profile === p.id ? "#fff" : PALETTE.textSecondary,
                border: `1px solid ${profile === p.id ? PALETTE.accent : PALETTE.border}`,
                borderRadius: 3, cursor: "pointer", fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, fontWeight: 500,
              }}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Ranked cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {scored.map((model, rank) => {
            const isTop = rank === 0;
            const isExpanded = expandedModel === model.id;
            return (
              <div key={model.id}
                onClick={() => setExpandedModel(isExpanded ? null : model.id)}
                style={{
                  background: PALETTE.surface,
                  border: `${isTop ? 2 : 1}px solid ${isTop ? PALETTE.highlight : PALETTE.border}`,
                  borderRadius: 4, cursor: "pointer",
                  transition: "border-color 0.3s",
                }}
              >
                <div style={{ padding: "18px 24px", display: "flex", alignItems: "center", gap: 20 }}>
                  {/* Rank */}
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: isTop ? PALETTE.highlight : PALETTE.border,
                    color: isTop ? "#fff" : PALETTE.textSecondary,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 500, flexShrink: 0,
                  }}>
                    {rank + 1}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                      <span style={{ fontSize: 15, fontFamily: "'Helvetica Neue', Arial, sans-serif", color: PALETTE.text, fontWeight: 500 }}>{model.label}</span>
                      <span style={{ fontSize: 11, fontFamily: "'Helvetica Neue', Arial, sans-serif", color: PALETTE.textTertiary }}>{model.share}</span>
                    </div>
                    <div style={{ fontSize: 12, fontFamily: "'Helvetica Neue', Arial, sans-serif", color: PALETTE.textTertiary, marginTop: 2 }}>{model.sub}</div>
                  </div>

                  {/* Score + mini bars */}
                  <div style={{ flexShrink: 0, textAlign: "right" }}>
                    <div style={{ fontSize: 22, fontWeight: 300, color: isTop ? PALETTE.highlight : PALETTE.text, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
                      {model.score}
                    </div>
                    <div style={{ fontSize: 9, fontFamily: "'Helvetica Neue', Arial, sans-serif", color: PALETTE.textTertiary }}>fit score</div>
                  </div>
                </div>

                {/* Dimension bars */}
                <div style={{ padding: "0 24px 14px 76px", display: "flex", gap: 6 }}>
                  {DIMS.map((d) => {
                    const score = model.scores[d.id];
                    const w = weights[d.id];
                    return (
                      <div key={d.id} style={{ flex: 1 }}>
                        <div style={{ display: "flex", gap: 1, marginBottom: 2 }}>
                          {[1, 2, 3, 4, 5].map((v) => (
                            <div key={v} style={{
                              flex: 1, height: 4, borderRadius: 1,
                              background: v <= score ? (isTop ? PALETTE.highlight : PALETTE.accent) : PALETTE.border,
                              opacity: v <= score ? (0.4 + w * 0.12) : 0.25,
                            }} />
                          ))}
                        </div>
                        <div style={{ fontSize: 8, fontFamily: "'Helvetica Neue', Arial, sans-serif", color: PALETTE.textTertiary, textAlign: "center" }}>{d.label}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <div style={{ padding: "0 24px 20px 24px", borderTop: `1px solid ${PALETTE.border}`, marginTop: 4, paddingTop: 16 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                      <div>
                        <p style={{ fontSize: 10, fontFamily: "'Helvetica Neue', Arial, sans-serif", textTransform: "uppercase", letterSpacing: "0.08em", color: PALETTE.highlight, margin: "0 0 4px 0" }}>Best for</p>
                        <p style={{ fontSize: 12, fontFamily: "'Helvetica Neue', Arial, sans-serif", color: PALETTE.textSecondary, margin: 0, lineHeight: 1.5 }}>{model.bestFor}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: 10, fontFamily: "'Helvetica Neue', Arial, sans-serif", textTransform: "uppercase", letterSpacing: "0.08em", color: "#E76F51", margin: "0 0 4px 0" }}>Watch out</p>
                        <p style={{ fontSize: 12, fontFamily: "'Helvetica Neue', Arial, sans-serif", color: PALETTE.textSecondary, margin: 0, lineHeight: 1.5 }}>{model.watchOut}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: 10, fontFamily: "'Helvetica Neue', Arial, sans-serif", textTransform: "uppercase", letterSpacing: "0.08em", color: PALETTE.textTertiary, margin: "0 0 4px 0" }}>Cost structure</p>
                        <p style={{ fontSize: 12, fontFamily: "'Helvetica Neue', Arial, sans-serif", color: PALETTE.textSecondary, margin: 0, lineHeight: 1.5 }}>{model.costNote}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p style={{ fontSize: 11, fontFamily: "'Helvetica Neue', Arial, sans-serif", color: PALETTE.textTertiary, marginTop: 10, fontStyle: "italic" }}>
          Click any card for detail. Scores reflect general patterns; actual suitability varies by vendor and organisational context.
        </p>

        <p style={{ fontSize: 10, fontFamily: "'Helvetica Neue', Arial, sans-serif", color: PALETTE.textTertiary, marginTop: 12, lineHeight: 1.5 }}>
          Market share data from Menlo Ventures (2025) and MIT NANDA. Cost ranges from Benchmarkit/Mavvrik (2025) and Stanford HAI. Dimension ratings are editorial assessments.
        </p>
      </div>
    </div>
  );
}
