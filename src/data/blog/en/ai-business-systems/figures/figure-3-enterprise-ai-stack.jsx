import { useState } from "react";

const P = {
  bg: "#FAFAF8", surface: "#FFFFFF", border: "#E8E6E1",
  text: "#1A1A1A", sub: "#6B6560", muted: "#9C9690",
  accent: "#264653",
};

const LAYERS = [
  { id: "app", label: "Change Management", sub: "Training, adoption, workflow redesign", pct: 30, color: "#E76F51", detail: "BCG's 10-20-70 rule: 70% of AI value comes from people and process change. This is where adoption happens — or doesn't." },
  { id: "orch", label: "Orchestration & Integration", sub: "RAG pipelines, APIs, monitoring, guardrails", pct: 20, color: "#F4A261", detail: "The connective tissue between the model and your systems. Gartner documents 500–1,000% cost overruns here." },
  { id: "model", label: "Model", sub: "Foundation models, APIs, fine-tuning", pct: 15, color: "#E9C46A", vendor: true, detail: "This is what appears on the vendor quote. Per-token API pricing or license fees. Depreciates every 3–6 months." },
  { id: "data", label: "Data Infrastructure", sub: "Pipelines, governance, quality, storage", pct: 25, color: "#2A9D8F", detail: "30–50% of total project cost. 73% of leaders cite data quality as the primary barrier to AI deployment." },
  { id: "compute", label: "Compute Infrastructure", sub: "GPUs, cloud resources, networking", pct: 10, color: "#264653", detail: "Hardware and cloud compute. Relevant primarily for self-hosted deployments." },
];

export default function EnterpriseAIStack() {
  const [revealed, setRevealed] = useState(false);
  const [hovered, setHovered] = useState(null);
  const modelPct = 15;
  const maxBar = 380;

  return (
    <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", background: P.bg, padding: "24px" }}>
      <div style={{ background: P.surface, border: `1px solid ${P.border}`, padding: "24px 28px" }}>
        {/* Stack rows — all labels always visible */}
        {LAYERS.map((layer, i) => {
          const isModel = layer.vendor;
          const barVisible = revealed || isModel;
          const isHovered = hovered === layer.id;
          const barW = (layer.pct / 100) * maxBar;

          return (
            <div
              key={layer.id}
              onMouseEnter={() => barVisible ? setHovered(layer.id) : null}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "flex", alignItems: "center", gap: 16,
                padding: "12px 0",
                borderBottom: i < LAYERS.length - 1 ? `1px solid ${P.border}` : "none",
                opacity: (!revealed && !isModel) ? 0.45 : 1,
                transition: "opacity 0.5s ease",
              }}
            >
              <div style={{ width: 200, flexShrink: 0 }}>
                <div style={{ fontSize: 13, color: P.text, fontWeight: isHovered ? 500 : 400 }}>{layer.label}</div>
                <div style={{ fontSize: 11, color: P.muted, marginTop: 2 }}>{layer.sub}</div>
              </div>
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  height: 24, borderRadius: 3,
                  width: barVisible ? barW : 0,
                  background: layer.color,
                  opacity: isHovered ? 1 : 0.8,
                  transition: "width 0.6s ease, opacity 0.3s ease",
                }} />
                <span style={{
                  fontSize: 13, fontWeight: 500, minWidth: 36,
                  color: barVisible ? P.text : "transparent",
                  transition: "color 0.5s ease",
                }}>{layer.pct}%</span>
              </div>
              {isModel && !revealed && (
                <div style={{
                  padding: "3px 10px", background: "#FFF9E6", border: "1px solid #E9C46A",
                  borderRadius: 3, fontSize: 10, color: "#8B7A3B", whiteSpace: "nowrap",
                }}>← What vendors quote</div>
              )}
            </div>
          );
        })}

        {/* Reveal area */}
        <div style={{ marginTop: 18, paddingTop: 16, borderTop: `2px solid ${P.border}` }}>
          {!revealed ? (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 13, color: P.sub }}>
                  The vendor quote covers <strong style={{ color: P.text }}>{modelPct}%</strong> of the actual system.
                </div>
                <div style={{ fontSize: 12, color: P.muted, marginTop: 4 }}>
                  The other {100 - modelPct}% is invisible in most proposals.
                </div>
              </div>
              <button onClick={() => setRevealed(true)} style={{
                padding: "10px 24px", background: P.accent, color: "#fff",
                border: "none", borderRadius: 3, cursor: "pointer", fontSize: 13, fontWeight: 500,
              }}>Show full cost →</button>
            </div>
          ) : (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 13, color: P.text }}>
                  Total system cost: <strong>5–10× the vendor quote</strong>
                </div>
                <div style={{ fontSize: 12, color: P.muted, marginTop: 4 }}>
                  Gartner documents 500–1,000% cost estimation errors at the pilot-to-production step.
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, flexShrink: 0, alignItems: "baseline" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 26, fontWeight: 300, color: "#E9C46A" }}>{modelPct}%</div>
                  <div style={{ fontSize: 9, color: P.muted }}>quoted</div>
                </div>
                <div style={{ fontSize: 14, color: P.muted }}>→</div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 26, fontWeight: 300, color: P.accent }}>100%</div>
                  <div style={{ fontSize: 9, color: P.muted }}>actual</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hover detail */}
      {hovered && (
        <div style={{
          marginTop: 8, padding: "12px 18px",
          background: P.surface, border: `1px solid ${P.border}`, borderRadius: 3,
        }}>
          <p style={{ fontSize: 13, color: P.sub, lineHeight: 1.55, margin: 0, fontFamily: "Georgia, serif" }}>
            <strong style={{ color: P.text }}>{LAYERS.find((l) => l.id === hovered)?.label}:</strong>{" "}
            {LAYERS.find((l) => l.id === hovered)?.detail}
          </p>
        </div>
      )}

      {/* BCG callout — always visible after reveal */}
      {revealed && (
        <div style={{
          marginTop: 12, padding: "14px 20px",
          background: P.surface, border: `1px solid ${P.border}`,
          display: "flex", gap: 20, alignItems: "center",
        }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: P.muted, margin: "0 0 4px" }}>BCG's 10-20-70 rule</p>
            <p style={{ fontSize: 13, color: P.sub, lineHeight: 1.45, margin: 0, fontFamily: "Georgia, serif" }}>
              Successful implementations allocate roughly 10% to algorithms, 20% to technology, and 70% to people and process. Organisations that fail typically invert this ratio.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
            {[{ p: "10%", l: "Models", c: "#E9C46A" }, { p: "20%", l: "Tech", c: "#2A9D8F" }, { p: "70%", l: "People", c: "#E76F51" }].map((i) => (
              <div key={i.l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 300, color: i.c }}>{i.p}</div>
                <div style={{ fontSize: 9, color: P.muted, marginTop: 2 }}>{i.l}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
