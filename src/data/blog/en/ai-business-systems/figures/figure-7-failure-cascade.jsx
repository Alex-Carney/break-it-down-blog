import { useState, useMemo, useEffect } from "react";

const PALETTE = {
  bg: "#FAFAF8", surface: "#FFFFFF", border: "#E8E6E1",
  text: "#1A1A1A", textSecondary: "#6B6560", textTertiary: "#9C9690",
  healthy: "#2D6A4F", healthyBg: "#D8F3DC",
  stressed: "#D4A373", stressedBg: "#FFF3CD",
  failing: "#9B2226", failingBg: "#FDDEDE",
  accent: "#264653",
};

const NODES = [
  { id: "data", label: "Data Quality", x: 130, y: 60 },
  { id: "model", label: "Model Accuracy", x: 370, y: 60 },
  { id: "integration", label: "System Integration", x: 250, y: 170 },
  { id: "trust", label: "User Trust", x: 110, y: 290 },
  { id: "adoption", label: "Adoption Rate", x: 390, y: 290 },
  { id: "roi", label: "Measurable ROI", x: 250, y: 390 },
  { id: "sponsorship", label: "Exec. Sponsorship", x: 250, y: 490 },
];

const EDGES = [
  { from: "data", to: "model", weight: 0.8, reason: "Poor data → inaccurate model outputs" },
  { from: "data", to: "integration", weight: 0.6, reason: "Data gaps surface during integration" },
  { from: "model", to: "trust", weight: 0.9, reason: "Inaccurate outputs → users stop trusting" },
  { from: "model", to: "integration", weight: 0.5, reason: "Model limitations constrain integration" },
  { from: "integration", to: "adoption", weight: 0.85, reason: "Poor integration → friction in workflows" },
  { from: "integration", to: "trust", weight: 0.6, reason: "Buggy integration → erodes confidence" },
  { from: "trust", to: "adoption", weight: 0.95, reason: "Low trust → users revert to old methods" },
  { from: "adoption", to: "roi", weight: 0.9, reason: "No adoption → no measurable value" },
  { from: "roi", to: "sponsorship", weight: 0.85, reason: "No ROI → leadership withdraws support" },
  { from: "sponsorship", to: "data", weight: 0.7, reason: "No sponsorship → data funding cut" },
];

const SHOCKS = [
  { id: "data_quality", label: "Reduce data quality", description: "73% of data leaders cite data quality as the primary barrier to AI success.", directEffects: { data: -60 } },
  { id: "cut_integration", label: "Underfund integration", description: "Gartner documents 500–1,000% cost estimation errors at the pilot-to-production step.", directEffects: { integration: -65 } },
  { id: "compress_timeline", label: "Compress timeline", description: "Shortened from 2–4 years to under 12 months. Skips testing, change management, evaluation.", directEffects: { integration: -40, trust: -30, adoption: -25 } },
  { id: "skip_change", label: "Skip change management", description: "BCG: 70% of AI value comes from people, process, and organisational change.", directEffects: { trust: -35, adoption: -55 } },
  { id: "weak_sponsorship", label: "Passive leadership", description: "McKinsey: leadership indecision predicts failure more than technology limitations.", directEffects: { sponsorship: -55, adoption: -20 } },
];

const HIGH_PERFORMER = {
  data: { invested: true, label: "Data governance first", stat: "96% find data insufficient without it" },
  model: { invested: false, label: "10–20% of budget", stat: "Depreciates every 3–6 months" },
  integration: { invested: true, label: "3–5× vendor quote", stat: "30–50% of total project cost" },
  trust: { invested: true, label: "Active change mgmt", stat: "70% of value from people & process" },
  adoption: { invested: true, label: "Workflow redesign", stat: "3× more likely to redesign" },
  roi: { invested: false, label: "Patient: 2–4 yr ROI", stat: "Only 6% see payback under 1 year" },
  sponsorship: { invested: true, label: "Active championing", stat: "Not passive endorsement" },
};

function propagateHealth(directHealth) {
  const health = {};
  NODES.forEach((n) => { health[n.id] = directHealth[n.id] ?? 100; });
  for (let round = 0; round < 8; round++) {
    const prev = { ...health };
    for (const edge of EDGES) {
      if (prev[edge.from] < 50) {
        const damage = (50 - prev[edge.from]) * edge.weight * 0.3;
        health[edge.to] = Math.max(0, health[edge.to] - damage);
      }
    }
  }
  return health;
}

function getStatus(h) {
  if (h >= 65) return { color: PALETTE.healthy, bg: PALETTE.healthyBg };
  if (h >= 35) return { color: PALETTE.stressed, bg: PALETTE.stressedBg };
  return { color: PALETTE.failing, bg: PALETTE.failingBg };
}

export default function FailureCascade() {
  const [activeShocks, setActiveShocks] = useState([]);
  const [showHP, setShowHP] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [displayHealth, setDisplayHealth] = useState(() => {
    const h = {}; NODES.forEach((n) => { h[n.id] = 100; }); return h;
  });

  const directHealth = useMemo(() => {
    const h = {}; NODES.forEach((n) => { h[n.id] = 100; });
    for (const sid of activeShocks) {
      const shock = SHOCKS.find((s) => s.id === sid);
      if (shock) for (const [t, d] of Object.entries(shock.directEffects)) h[t] = Math.max(0, h[t] + d);
    }
    return h;
  }, [activeShocks]);

  const finalHealth = useMemo(() => propagateHealth(directHealth), [directHealth]);

  useEffect(() => {
    let frame;
    const animate = () => {
      setDisplayHealth((prev) => {
        const next = {}; let done = true;
        for (const n of NODES) {
          const target = finalHealth[n.id];
          const diff = target - prev[n.id];
          if (Math.abs(diff) < 0.5) { next[n.id] = target; }
          else { next[n.id] = prev[n.id] + diff * 0.12; done = false; }
        }
        if (!done) frame = requestAnimationFrame(animate);
        return next;
      });
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [finalHealth]);

  const h = displayHealth;
  const failCount = NODES.filter((n) => finalHealth[n.id] < 35).length;
  const stressCount = NODES.filter((n) => finalHealth[n.id] >= 35 && finalHealth[n.id] < 65).length;
  const svgW = 500; const svgH = 550;

  const toggleShock = (id) => { setActiveShocks((p) => p.includes(id) ? p.filter((s) => s !== id) : [...p, id]); setShowHP(false); };

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: PALETTE.bg, padding: "24px" }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 28, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ width: 280, flexShrink: 0 }}>
            <p style={{ fontSize: 10, fontFamily: "'Helvetica Neue', Arial, sans-serif", textTransform: "uppercase", letterSpacing: "0.1em", color: PALETTE.textTertiary, marginBottom: 8 }}>Introduce constraints</p>
            {SHOCKS.map((shock) => {
              const on = activeShocks.includes(shock.id);
              return (
                <button key={shock.id} onClick={() => toggleShock(shock.id)} style={{
                  display: "block", width: "100%", textAlign: "left", padding: "10px 14px", marginBottom: 6,
                  background: on ? PALETTE.failingBg : PALETTE.surface, border: `1px solid ${on ? PALETTE.failing : PALETTE.border}`,
                  borderRadius: 3, cursor: "pointer",
                }}>
                  <div style={{ fontSize: 12, fontFamily: "'Helvetica Neue', Arial, sans-serif", color: on ? PALETTE.failing : PALETTE.text, fontWeight: on ? 600 : 400 }}>{on ? "✕ " : ""}{shock.label}</div>
                  <div style={{ fontSize: 10, fontFamily: "'Helvetica Neue', Arial, sans-serif", color: PALETTE.textTertiary, marginTop: 3, lineHeight: 1.4 }}>{shock.description}</div>
                </button>
              );
            })}

            {activeShocks.length > 0 && (
              <div style={{ marginTop: 14, padding: "14px 16px", background: PALETTE.surface, border: `1px solid ${PALETTE.border}`, borderRadius: 3 }}>
                <p style={{ fontSize: 10, fontFamily: "'Helvetica Neue', Arial, sans-serif", textTransform: "uppercase", letterSpacing: "0.1em", color: PALETTE.textTertiary, margin: "0 0 8px 0" }}>System health</p>
                <div style={{ display: "flex", gap: 12 }}>
                  {[{ c: failCount, l: "Failing", co: PALETTE.failing }, { c: stressCount, l: "Stressed", co: PALETTE.stressed }, { c: 7 - failCount - stressCount, l: "Healthy", co: PALETTE.healthy }].map((s) => (
                    <div key={s.l} style={{ textAlign: "center", flex: 1 }}>
                      <div style={{ fontSize: 24, fontWeight: 300, color: s.co }}>{s.c}</div>
                      <div style={{ fontSize: 9, fontFamily: "'Helvetica Neue', Arial, sans-serif", color: PALETTE.textTertiary }}>{s.l}</div>
                    </div>
                  ))}
                </div>
                {failCount >= 4 && (
                  <p style={{ fontSize: 11, fontFamily: "'Helvetica Neue', Arial, sans-serif", color: PALETTE.failing, marginTop: 10, marginBottom: 0, lineHeight: 1.4, borderTop: `1px solid ${PALETTE.border}`, paddingTop: 10 }}>
                    System-level failure. {failCount} of 7 components degraded beyond recovery. This pattern matches 70–80% of enterprise implementations.
                  </p>
                )}
              </div>
            )}

            <button onClick={() => { setShowHP(!showHP); if (!showHP) setActiveShocks([]); }} style={{
              width: "100%", padding: "12px 14px", marginTop: 14, textAlign: "left",
              background: showHP ? PALETTE.accent : PALETTE.surface,
              border: `1px solid ${showHP ? PALETTE.accent : PALETTE.border}`,
              color: showHP ? "#fff" : PALETTE.text, borderRadius: 3, cursor: "pointer",
              fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12,
            }}>
              <div style={{ fontWeight: 500 }}>{showHP ? "✓ " : ""}How the 6% invest differently</div>
              <div style={{ fontSize: 10, opacity: 0.8, marginTop: 2 }}>Where they concentrate resources to prevent cascades</div>
            </button>

            {activeShocks.length > 0 && (
              <button onClick={() => setActiveShocks([])} style={{ width: "100%", padding: "8px", marginTop: 8, textAlign: "center", background: "transparent", border: `1px solid ${PALETTE.border}`, color: PALETTE.textSecondary, borderRadius: 3, cursor: "pointer", fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 11 }}>Reset</button>
            )}
          </div>

          <div style={{ flex: 1, minWidth: 420 }}>
            <div style={{ background: PALETTE.surface, border: `1px solid ${PALETTE.border}`, padding: 16, position: "relative" }}>
              <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} style={{ display: "block", width: "100%", height: "auto" }}>
                {EDGES.map((edge, i) => {
                  const from = NODES.find((n) => n.id === edge.from);
                  const to = NODES.find((n) => n.id === edge.to);
                  const fH = h[edge.from] ?? 100;
                  const cascading = fH < 50 && activeShocks.length > 0;
                  const hovered = hoveredNode === edge.from || hoveredNode === edge.to;
                  const dx = to.x - from.x; const dy = to.y - from.y;
                  const dist = Math.sqrt(dx * dx + dy * dy);
                  const r = 34;
                  const x1 = from.x + (dx / dist) * r; const y1 = from.y + (dy / dist) * r;
                  const x2 = to.x - (dx / dist) * (r + 6); const y2 = to.y - (dy / dist) * (r + 6);
                  return (
                    <g key={i}>
                      <defs>
                        <marker id={`a${i}`} markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
                          <path d="M0,0 L6,2 L0,4" fill={cascading ? PALETTE.failing : "#C8C4BE"} opacity={cascading ? 0.85 : 0.4} />
                        </marker>
                      </defs>
                      <line x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke={cascading ? PALETTE.failing : "#C8C4BE"}
                        strokeWidth={cascading ? 2.5 : hovered ? 1.5 : 1}
                        strokeOpacity={cascading ? 0.75 : hovered ? 0.5 : 0.3}
                        markerEnd={`url(#a${i})`}
                        strokeDasharray={cascading ? "none" : "5,4"}
                      />
                      {hovered && cascading && (
                        <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 8} textAnchor="middle" fontSize={9} fontFamily="'Helvetica Neue', Arial, sans-serif" fill={PALETTE.failing} fontWeight={500}>
                          {edge.reason}
                        </text>
                      )}
                    </g>
                  );
                })}

                {NODES.map((node) => {
                  const nH = h[node.id] ?? 100;
                  const status = getStatus(nH);
                  const active = activeShocks.length > 0 || showHP;
                  const r = 33;
                  const circumference = 2 * Math.PI * (r + 4);
                  const hp = HIGH_PERFORMER[node.id];

                  return (
                    <g key={node.id} onMouseEnter={() => setHoveredNode(node.id)} onMouseLeave={() => setHoveredNode(null)} style={{ cursor: "pointer" }}>
                      <circle cx={node.x} cy={node.y} r={r + 4} fill="none" stroke={PALETTE.border} strokeWidth={1.5} opacity={0.3} />
                      {activeShocks.length > 0 && (
                        <circle cx={node.x} cy={node.y} r={r + 4} fill="none"
                          stroke={status.color} strokeWidth={3}
                          strokeDasharray={`${(nH / 100) * circumference} ${circumference}`}
                          transform={`rotate(-90 ${node.x} ${node.y})`}
                        />
                      )}
                      <circle cx={node.x} cy={node.y} r={r}
                        fill={active ? status.bg : "#F7F6F4"}
                        stroke={active && activeShocks.length > 0 ? status.color : PALETTE.border} strokeWidth={1}
                      />
                      <text x={node.x} y={node.y + (activeShocks.length > 0 ? -6 : 0)} textAnchor="middle" dominantBaseline="central"
                        fontSize={11} fontFamily="'Helvetica Neue', Arial, sans-serif"
                        fill={activeShocks.length > 0 ? status.color : PALETTE.text}
                        fontWeight={nH < 35 ? 600 : 400}
                      >{node.label}</text>
                      {activeShocks.length > 0 && (
                        <text x={node.x} y={node.y + 11} textAnchor="middle" fontSize={14}
                          fontFamily="'Helvetica Neue', Arial, sans-serif" fill={status.color} fontWeight={300}
                        >{Math.round(nH)}%</text>
                      )}

                      {showHP && hp && (
                        <g>
                          <circle cx={node.x} cy={node.y} r={r}
                            fill={hp.invested ? PALETTE.healthyBg : "#F7F6F4"}
                            stroke={hp.invested ? PALETTE.healthy : PALETTE.border} strokeWidth={hp.invested ? 2.5 : 1}
                          />
                          <text x={node.x} y={node.y - 8} textAnchor="middle" dominantBaseline="central"
                            fontSize={10} fontFamily="'Helvetica Neue', Arial, sans-serif"
                            fill={hp.invested ? PALETTE.healthy : PALETTE.textTertiary} fontWeight={500}
                          >{node.label}</text>
                          <text x={node.x} y={node.y + 6} textAnchor="middle"
                            fontSize={8.5} fontFamily="'Helvetica Neue', Arial, sans-serif"
                            fill={hp.invested ? PALETTE.healthy : PALETTE.textTertiary}
                          >{hp.label}</text>
                          <text x={node.x} y={node.y + 18} textAnchor="middle"
                            fontSize={7.5} fontFamily="'Helvetica Neue', Arial, sans-serif"
                            fill={PALETTE.textTertiary}
                          >{hp.stat}</text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>

              {showHP && (
                <div style={{ position: "absolute", bottom: 16, left: 16, right: 16, padding: "14px 18px", background: PALETTE.accent, borderRadius: 3, color: "#fff" }}>
                  <p style={{ fontSize: 13, fontFamily: "'Helvetica Neue', Arial, sans-serif", margin: "0 0 4px 0", fontWeight: 500 }}>
                    The model is the only node they don't prioritise.
                  </p>
                  <p style={{ fontSize: 11, fontFamily: "'Helvetica Neue', Arial, sans-serif", margin: 0, opacity: 0.85, lineHeight: 1.5 }}>
                    High-performing organisations invest heavily in data, integration, change management, and executive championing — the nodes that prevent cascades. The model layer, where most organisations concentrate spending, is the fastest-depreciating component and represents only 10–20% of total system cost.
                  </p>
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: 14, marginTop: 10 }}>
              {[{ c: PALETTE.healthy, l: "Healthy (65–100%)" }, { c: PALETTE.stressed, l: "Stressed (35–64%)" }, { c: PALETTE.failing, l: "Failing (0–34%)" }].map((s) => (
                <div key={s.l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 9, height: 9, borderRadius: "50%", background: s.c }} />
                  <span style={{ fontSize: 10, fontFamily: "'Helvetica Neue', Arial, sans-serif", color: PALETTE.textTertiary }}>{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p style={{ fontSize: 10, fontFamily: "'Helvetica Neue', Arial, sans-serif", color: PALETTE.textTertiary, marginTop: 16, lineHeight: 1.5 }}>
          Analytical framework derived from McKinsey (2025), BCG/MIT SMR (2024–25), RAND (2024), and case analyses. Propagation weights are editorial estimates. This is an illustrative model, not a predictive tool.
        </p>
      </div>
    </div>
  );
}
