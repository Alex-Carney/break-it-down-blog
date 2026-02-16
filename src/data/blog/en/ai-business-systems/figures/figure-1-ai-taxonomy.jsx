const P = {
  bg: "#FAFAF8", surface: "#FFFFFF", border: "#E8E6E1",
  text: "#1A1A1A", sub: "#6B6560", muted: "#9C9690",
  accent: "#264653", teal: "#2A9D8F", coral: "#E76F51",
  gold: "#E9C46A", warm: "#F4A261",
};

const LAYERS = [
  { short: "ML", label: "Machine Learning", what: "Learns patterns from data", enterprise: "Predictive maintenance, credit scoring, demand forecasting. The workhorse — most production AI is ML, not generative AI.", spend: 15, value: 45, cost: "$50K–$500K to deploy" },
  { short: "DL", label: "Deep Learning", what: "Neural networks, many layers", enterprise: "Image recognition, speech-to-text, medical imaging. Where capability jumps — and GPU costs start mattering.", spend: 20, value: 20, cost: "$100K–$2M to deploy" },
  { short: "FM", label: "Foundation Models", what: "Pre-trained on massive data", enterprise: "GPT-4, Claude, Gemini. Training costs $100M–$1B+. Enterprises pay per-token, not per-training-run.", spend: 55, value: 15, cost: "$0.001–$0.06 per 1K tokens" },
  { short: "GenAI", label: "Generative AI", what: "Creates new content", enterprise: "Chatbots, code assistants, summarisation. Where 88% of executive attention goes.", spend: 10, value: 5, cost: "Per-token + integration", highlight: true },
];

const MAX = 55;

export default function AITaxonomy() {
  return (
    <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", background: P.bg, padding: "24px" }}>
      <div style={{ background: P.surface, border: `1px solid ${P.border}`, overflow: "hidden" }}>
        {/* Column headers */}
        <div style={{
          display: "grid", gridTemplateColumns: "140px 1fr 120px 120px",
          padding: "10px 20px", borderBottom: `2px solid ${P.border}`,
          gap: 12,
        }}>
          {["Layer", "Enterprise reality", "Spend share", "Value share"].map((h, i) => (
            <span key={h} style={{
              fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
              color: i === 2 ? P.coral : i === 3 ? P.teal : P.muted,
              textAlign: i >= 2 ? "right" : "left",
            }}>{h}</span>
          ))}
        </div>

        {/* Rows */}
        {LAYERS.map((l, i) => (
          <div key={l.short} style={{
            display: "grid", gridTemplateColumns: "140px 1fr 120px 120px",
            alignItems: "start", padding: "14px 20px", gap: 12,
            borderBottom: i < LAYERS.length - 1 ? `1px solid ${P.border}` : "none",
            background: l.highlight ? `${P.coral}04` : "transparent",
          }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: P.text }}>{l.label}</div>
              <div style={{ fontSize: 11, color: P.muted, marginTop: 2 }}>{l.what}</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: P.sub, fontFamily: "Georgia, serif", lineHeight: 1.45 }}>{l.enterprise}</div>
              <div style={{ fontSize: 10, color: P.muted, marginTop: 4 }}>{l.cost}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6 }}>
                <div style={{
                  height: 8, width: Math.max(3, (l.spend / MAX) * 64),
                  background: l.highlight ? P.coral : `${P.coral}80`, borderRadius: 1,
                }} />
                <span style={{ fontSize: 14, fontWeight: 500, color: P.coral, minWidth: 30 }}>{l.spend}%</span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6 }}>
                <div style={{
                  height: 8, width: Math.max(3, (l.value / MAX) * 64),
                  background: P.teal, borderRadius: 1,
                }} />
                <span style={{ fontSize: 14, fontWeight: 500, color: P.teal, minWidth: 30 }}>{l.value}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Punchline */}
      <div style={{
        marginTop: 12, padding: "14px 20px",
        background: `${P.coral}06`, borderLeft: `3px solid ${P.coral}50`,
      }}>
        <p style={{ fontSize: 13, color: P.sub, margin: 0, fontFamily: "Georgia, serif", lineHeight: 1.55 }}>
          <strong style={{ color: P.coral }}>The attention-value inversion.</strong>{" "}
          Foundation models and generative AI absorb ~65% of enterprise AI spending but account for ~20% of documented value.
          Traditional ML — less glamorous, better understood — delivers more per dollar. The model is the most visible line item and the least durable investment.
        </p>
      </div>
    </div>
  );
}
