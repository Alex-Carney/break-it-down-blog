import { useState, useMemo } from "react";

const P = {
  bg: "#FAFAF8", surface: "#FFFFFF", border: "#E8E6E1",
  text: "#1A1A1A", sub: "#6B6560", muted: "#9C9690",
  accent: "#264653", teal: "#2A9D8F", coral: "#E76F51",
  gold: "#E9C46A", warm: "#F4A261",
  positive: "#2D6A4F",
};

const BENCHMARKS = [
  { steps: 5, label: "Simple task", ex: "Email triage, data formatting" },
  { steps: 10, label: "Moderate", ex: "Report generation, code review" },
  { steps: 20, label: "Complex", ex: "End-to-end process automation" },
  { steps: 50, label: "Agentic pipeline", ex: "Multi-system orchestration" },
];

const CHART_W = 520, CHART_H = 220;
const PAD = { top: 16, right: 20, bottom: 36, left: 46 };
const plotW = CHART_W - PAD.left - PAD.right;
const plotH = CHART_H - PAD.top - PAD.bottom;

function getColor(pct) {
  if (pct >= 70) return P.positive;
  if (pct >= 40) return P.warm;
  return P.coral;
}

export default function CompoundingError() {
  const [reliability, setReliability] = useState(95);
  const maxSteps = 50;

  const curve = useMemo(() => {
    const pts = [];
    for (let s = 1; s <= maxSteps; s++) pts.push({ s, p: Math.pow(reliability / 100, s) * 100 });
    return pts;
  }, [reliability]);

  const x = (s) => PAD.left + ((s - 1) / (maxSteps - 1)) * plotW;
  const y = (p) => PAD.top + plotH - (p / 100) * plotH;
  const pathD = curve.map((pt, i) => `${i === 0 ? "M" : "L"} ${x(pt.s).toFixed(1)} ${y(pt.p).toFixed(1)}`).join(" ");
  const areaD = pathD + ` L ${x(maxSteps).toFixed(1)} ${y(0).toFixed(1)} L ${x(1).toFixed(1)} ${y(0).toFixed(1)} Z`;
  const bData = BENCHMARKS.map((b) => ({ ...b, pct: Math.pow(reliability / 100, b.steps) * 100 }));

  return (
    <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", background: P.bg, padding: "24px" }}>
      {/* Punchline — visible immediately */}
      <div style={{
        background: P.surface, border: `1px solid ${P.border}`, padding: "16px 20px",
        marginBottom: 16, display: "flex", alignItems: "center", gap: 20,
      }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 14, color: P.text, margin: 0, fontFamily: "Georgia, serif", lineHeight: 1.55 }}>
            If every step in an AI workflow succeeds <strong>{reliability}%</strong> of the time, a {BENCHMARKS[2].steps}-step process succeeds only <strong style={{ color: P.coral }}>{bData[2].pct.toFixed(0)}%</strong> of the time. Reliability compounds — downward.
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, flexShrink: 0, alignItems: "baseline" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 300, color: P.accent }}>{reliability}%</div>
            <div style={{ fontSize: 9, color: P.muted }}>per step</div>
          </div>
          <div style={{ fontSize: 14, color: P.muted }}>→</div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 300, color: P.coral }}>{bData[2].pct.toFixed(0)}%</div>
            <div style={{ fontSize: 9, color: P.muted }}>over {BENCHMARKS[2].steps} steps</div>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div style={{ marginBottom: 16, padding: "0 4px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
          <label style={{ fontSize: 11, fontWeight: 600, color: P.sub, letterSpacing: "0.04em", textTransform: "uppercase" }}>
            Per-step reliability
          </label>
          <span style={{ fontSize: 20, fontWeight: 300, color: P.text }}>{reliability}%</span>
        </div>
        <input type="range" min={80} max={99} step={1} value={reliability}
          onChange={(e) => setReliability(Number(e.target.value))}
          style={{ width: "100%", accentColor: P.accent }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: P.muted }}>
          <span>80% (realistic)</span>
          <span>95% (optimistic)</span>
          <span>99% (aspirational)</span>
        </div>
      </div>

      {/* Chart */}
      <div style={{ background: P.surface, border: `1px solid ${P.border}`, padding: "12px 10px 6px" }}>
        <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} style={{ width: "100%", height: "auto" }}>
          {[0, 25, 50, 75, 100].map((pct) => (
            <g key={pct}>
              <line x1={PAD.left} y1={y(pct)} x2={PAD.left + plotW} y2={y(pct)}
                stroke={P.border} strokeWidth={pct === 0 ? 1.5 : 0.5}
                strokeDasharray={pct === 50 ? "4,3" : "none"} />
              <text x={PAD.left - 8} y={y(pct) + 4} textAnchor="end" fontSize={10} fill={P.muted}>{pct}%</text>
            </g>
          ))}
          {[1, 10, 20, 30, 40, 50].map((s) => (
            <text key={s} x={x(s)} y={CHART_H - 6} textAnchor="middle" fontSize={10} fill={P.muted}>{s}</text>
          ))}
          <text x={PAD.left + plotW / 2} y={CHART_H + 2} textAnchor="middle" fontSize={10} fill={P.muted} fontWeight={500}>
            Steps in workflow
          </text>
          <path d={areaD} fill={`${P.coral}10`} />
          <path d={pathD} fill="none" stroke={P.coral} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          {bData.map((b) => (
            <g key={b.steps}>
              <line x1={x(b.steps)} y1={y(b.pct)} x2={x(b.steps)} y2={y(0)}
                stroke={P.border} strokeWidth={0.5} strokeDasharray="3,2" />
              <circle cx={x(b.steps)} cy={y(b.pct)} r={5}
                fill={P.surface} stroke={getColor(b.pct)} strokeWidth={2} />
            </g>
          ))}
        </svg>
      </div>

      {/* Benchmark cards */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1,
        background: P.border, border: `1px solid ${P.border}`, marginTop: 12,
      }}>
        {bData.map((b) => {
          const c = getColor(b.pct);
          return (
            <div key={b.steps} style={{ background: P.surface, padding: "10px 8px", textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 300, color: c, lineHeight: 1 }}>
                {b.pct.toFixed(b.pct < 1 ? 1 : 0)}%
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, color: P.sub, marginTop: 4 }}>{b.steps} steps</div>
              <div style={{ fontSize: 10, color: P.muted, marginTop: 2 }}>{b.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
