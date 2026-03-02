import { useState, useEffect, useRef } from "react";

/* ── Dark mode detection (same hook as faster-worse-figures.jsx) ── */
function useDarkMode() {
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    const obs = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return isDark;
}

/* ── Theme palettes ── */
const PALETTE = {
  dark: {
    bg: "linear-gradient(180deg, #080620 0%, #0c0a24 100%)",
    surface: "#141230",
    text: "#c8c5e2",
    textMuted: "#8886a4",
    textFaint: "#6E6C8A",
    textDim: "#4a4868",
    grid: "rgba(200,197,226,0.08)",
    arrow: "rgba(200,197,226,0.2)",
    arrowHead: "rgba(200,197,226,0.3)",
    bracket: "rgba(200,197,226,0.18)",
    btnBorder: "rgba(200,197,226,0.18)",
    btnBg: "rgba(255,255,255,0.04)",
    tooltipBg: "rgba(14,12,36,0.94)",
    tooltipText: "#c8c5e2",
    tooltipLabel: "#eee",
    tooltipDetail: "#a09db8",
    dotStroke: "rgba(255,255,255,0.2)",
    dotStrokeHover: "#fff",
    insightText: "#a09db8",
    purpleActive: "#c4b5fd",
    purpleBg: "rgba(131,101,238,0.15)",
    purpleBorder: "#8365EE",
    purpleInsightBg: "rgba(131,101,238,0.06)",
    purpleInsightBorder: "rgba(131,101,238,0.12)",
    tealActive: "#5EEEDE",
    tealBg: "rgba(14,165,165,0.15)",
    tealBorder: "#0EA5A5",
    tealInsightBg: "rgba(14,165,165,0.08)",
    tealInsightBorder: "rgba(14,165,165,0.2)",
    warnActive: "#F0708A",
    warnInsightBg: "rgba(240,112,138,0.08)",
    warnInsightBorder: "rgba(240,112,138,0.2)",
  },
  light: {
    bg: "#FFFFFF",
    surface: "#F6F5F9",
    text: "#3A3856",
    textMuted: "#6E6C8A",
    textFaint: "#6E6C8A",
    textDim: "#B0AEC6",
    grid: "rgba(26,24,48,0.07)",
    arrow: "rgba(26,24,48,0.15)",
    arrowHead: "rgba(26,24,48,0.25)",
    bracket: "rgba(26,24,48,0.12)",
    btnBorder: "rgba(26,24,48,0.15)",
    btnBg: "rgba(26,24,48,0.03)",
    tooltipBg: "rgba(255,255,255,0.96)",
    tooltipText: "#3A3856",
    tooltipLabel: "#1A1830",
    tooltipDetail: "#6E6C8A",
    dotStroke: "rgba(0,0,0,0.1)",
    dotStrokeHover: "#1A1830",
    insightText: "#3A3856",
    purpleActive: "#6B4FCF",
    purpleBg: "rgba(107,79,207,0.08)",
    purpleBorder: "#6B4FCF",
    purpleInsightBg: "rgba(107,79,207,0.05)",
    purpleInsightBorder: "rgba(107,79,207,0.15)",
    tealActive: "#0E8E8E",
    tealBg: "rgba(14,165,165,0.08)",
    tealBorder: "#0EA5A5",
    tealInsightBg: "rgba(14,165,165,0.05)",
    tealInsightBorder: "rgba(14,165,165,0.15)",
    warnActive: "#C4506A",
    warnInsightBg: "rgba(196,80,106,0.05)",
    warnInsightBorder: "rgba(196,80,106,0.15)",
  },
};

const STUDIES = {
  shen: { name: "Shen & Tamkin", color: "#8365EE", n: 52 },
  bcg: { name: "Dell'Acqua et al.", color: "#4A7CCE", n: 758 },
  randazzo: { name: "Randazzo et al.", color: "#0EA5A5", n: 244 },
  wharton: { name: "Bastani et al.", color: "#6B9BDE", n: null },
};

const DATA = [
  { id: "shen-gtc", label: "Generation\u2013Comprehension", study: "shen", outcome: 86, detail: "Score: 86/100", engagement: 0.93, experience: 0.45, aiUse: 0.85 },
  { id: "shen-hybrid", label: "Hybrid Code-Explanation", study: "shen", outcome: 68, detail: "Score: 68/100", engagement: 0.72, experience: 0.5, aiUse: 0.7 },
  { id: "shen-conceptual", label: "Conceptual Inquiry", study: "shen", outcome: 65, detail: "Score: 65/100", engagement: 0.78, experience: 0.52, aiUse: 0.25 },
  { id: "shen-delegation", label: "AI Delegation", study: "shen", outcome: 39, detail: "Score: 39/100", engagement: 0.08, experience: 0.48, aiUse: 0.9 },
  { id: "shen-progressive", label: "Progressive AI Reliance", study: "shen", outcome: 35, detail: "Score: 35/100", engagement: 0.15, experience: 0.55, aiUse: 0.8 },
  { id: "shen-debugging", label: "Iterative AI Debugging", study: "shen", outcome: 24, detail: "Score: 24/100", engagement: 0.12, experience: 0.42, aiUse: 0.75 },
  { id: "bcg-inside", label: "Pattern tasks (AI-assisted)", study: "bcg", outcome: 84, detail: "+40% quality vs. control", engagement: 0.5, experience: 0.9, aiUse: 0.88 },
  { id: "bcg-outside-engaged", label: "Judgment tasks (engaged)", study: "bcg", outcome: 62, detail: "Above control on correctness", engagement: 0.88, experience: 0.92, aiUse: 0.75 },
  { id: "bcg-outside-delegated", label: "Judgment tasks (delegated)", study: "bcg", outcome: 30, detail: "\u221219pp vs. control", engagement: 0.1, experience: 0.88, aiUse: 0.92 },
  { id: "rand-integrated", label: "Integrated engagement", study: "randazzo", outcome: 76, detail: "60% of sample \u00b7 Newskilling", engagement: 0.9, experience: 0.55, aiUse: 0.9 },
  { id: "rand-selective", label: "Selective engagement", study: "randazzo", outcome: 82, detail: "14% of sample \u00b7 Highest accuracy", engagement: 0.8, experience: 0.58, aiUse: 0.3 },
  { id: "rand-delegation", label: "Full delegation", study: "randazzo", outcome: 32, detail: "27% of sample \u00b7 No skilling", engagement: 0.07, experience: 0.5, aiUse: 0.95 },
  { id: "wharton-scaffolded", label: "Structured engagement", study: "wharton", outcome: 90, detail: "+127% vs. control", engagement: 0.92, experience: 0.18, aiUse: 0.8 },
  { id: "wharton-standard", label: "Unstructured AI access", study: "wharton", outcome: 34, detail: "\u221217% vs. control", engagement: 0.12, experience: 0.15, aiUse: 0.65 },
];

const SPOTLIGHTS = {
  experience: {
    callouts: [
      { ids: ["wharton-scaffolded", "wharton-standard"], text: "Same students, same AI tool", position: "left" },
      { ids: ["bcg-outside-engaged", "bcg-outside-delegated"], text: "Same elite consultants, same session", position: "right" },
    ],
  },
  aiUse: {
    callouts: [
      { ids: ["shen-conceptual", "rand-selective"], text: "Minimal AI use, strong outcomes", position: "left" },
      { ids: ["shen-delegation", "rand-delegation"], text: "Heavy AI use, worst outcomes", position: "right" },
    ],
  },
  engagement: {
    callouts: [
      { ids: ["shen-delegation", "bcg-outside-delegated", "rand-delegation", "wharton-standard"], text: "Delegation cluster", position: "left" },
      { ids: ["shen-gtc", "rand-integrated", "rand-selective", "wharton-scaffolded"], text: "Engagement cluster", position: "right" },
    ],
  },
};

const VIEWS = [
  {
    key: "engagement", label: "Cognitive Engagement", xLabel: "Engagement with AI Output", xKey: "engagement",
    lowLabel: "Delegation", highLabel: "Active interrogation",
    insight: "The scatter resolves into signal.",
    analysis: "Every study condition where practitioners delegated judgment to AI clusters in the bottom left. Every condition where practitioners maintained cognitive engagement, whether through heavy AI use with active interrogation or through minimal AI use with human-led analysis, clusters in the upper right. Four independent studies, conducted by different researchers on different populations, converge on the same variable.",
    correlation: "strong",
  },
  {
    key: "experience", label: "Experience Level", xLabel: "Participant Expertise", xKey: "experience",
    lowLabel: "Students", highLabel: "Elite consultants",
    insight: "No pattern emerges.",
    analysis: "Students who engaged with AI output scored +127% above control. Elite BCG consultants who delegated scored \u221219 percentage points below it. Experience level doesn\u2019t protect against the failure mode, and inexperience doesn\u2019t prevent the success mode. If the variable were expertise, the right side of this chart would be consistently higher. It isn\u2019t.",
    correlation: "none",
  },
  {
    key: "aiUse", label: "Amount of AI Use", xLabel: "AI Usage Frequency", xKey: "aiUse",
    lowLabel: "Minimal", highLabel: "Heavy",
    insight: "No pattern emerges.",
    analysis: "Developers who barely used AI scored 65%. Developers who used it heavily scored 86%. Other heavy users scored 24%. Across studies, both minimal and heavy AI users appear at the top and bottom of the outcome range. If the variable were frequency of AI use, the right side would be consistently higher or lower. It\u2019s neither. The \u201cuse AI more\u201d mandate and the \u201cuse AI less\u201d caution are both wrong.",
    correlation: "none",
  },
];

const MARGIN = { top: 28, right: 24, bottom: 52, left: 52 };

function getBounds(points, xKey) {
  const padding = 0.06;
  let xMin = 1, xMax = 0, yMin = 100, yMax = 0;
  for (const p of points) {
    const x = p[xKey], y = p.outcome;
    if (x < xMin) xMin = x;
    if (x > xMax) xMax = x;
    if (y < yMin) yMin = y;
    if (y > yMax) yMax = y;
  }
  return { xMin: Math.max(0, xMin - padding), xMax: Math.min(1, xMax + padding), yMin: Math.max(0, yMin - 8), yMax: Math.min(100, yMax + 8) };
}

function trendLine(points, xKey) {
  const n = points.length;
  let sx = 0, sy = 0, sxy = 0, sx2 = 0;
  for (const p of points) { const x = p[xKey], y = p.outcome; sx += x; sy += y; sxy += x * y; sx2 += x * x; }
  const denom = n * sx2 - sx * sx;
  if (Math.abs(denom) < 1e-10) return null;
  const slope = (n * sxy - sx * sy) / denom;
  const intercept = (sy - slope * sx) / n;
  return { slope, intercept };
}

export default function CovariationDisplay() {
  const isDark = useDarkMode();
  const c = isDark ? PALETTE.dark : PALETTE.light;

  const containerRef = useRef(null);
  const [dims, setDims] = useState({ width: 640, height: 420 });
  const [activeView, setActiveView] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [showAnnotations, setShowAnnotations] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const h = Math.max(340, Math.min(480, w * 0.6));
      setDims({ width: w, height: h });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const view = VIEWS[activeView];
  const xKey = view.xKey;
  const bounds = getBounds(DATA, xKey);
  const plotW = dims.width - MARGIN.left - MARGIN.right;
  const plotH = dims.height - MARGIN.top - MARGIN.bottom;

  const scaleX = (v) => MARGIN.left + ((v - bounds.xMin) / (bounds.xMax - bounds.xMin)) * plotW;
  const scaleY = (v) => MARGIN.top + plotH - ((v - bounds.yMin) / (bounds.yMax - bounds.yMin)) * plotH;

  const trend = view.correlation === "strong" ? trendLine(DATA, xKey) : null;
  const yTicks = [20, 40, 60, 80, 100].filter(t => t >= bounds.yMin && t <= bounds.yMax);
  const spotlights = SPOTLIGHTS[view.key]?.callouts || [];

  function calloutBox(callout) {
    const pts = DATA.filter(d => callout.ids.includes(d.id));
    if (pts.length === 0) return null;
    const xs = pts.map(p => scaleX(p[xKey]));
    const ys = pts.map(p => scaleY(p.outcome));
    const pad = 18;
    const x1 = Math.min(...xs) - pad, y1 = Math.min(...ys) - pad;
    const x2 = Math.max(...xs) + pad, y2 = Math.max(...ys) + pad;
    return { x1, y1, x2, y2, cx: (x1 + x2) / 2, labelY: y1 - 8, text: callout.text };
  }

  const tooltipPoint = hovered ? DATA.find(d => d.id === hovered) : null;
  const tooltipStudy = tooltipPoint ? STUDIES[tooltipPoint.study] : null;
  const isEngagement = view.key === "engagement";

  return (
    <div
      ref={containerRef}
      style={{
        background: c.bg,
        borderRadius: 12,
        padding: "20px 16px 16px",
        fontFamily: "'Inter Variable', Inter, system-ui, sans-serif",
        color: c.text,
        position: "relative",
        maxWidth: 780,
        margin: "0 auto",
        border: isDark ? "none" : "1px solid #D0CEE0",
      }}
    >
      {/* Toggle buttons */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14, justifyContent: "center" }}>
        {VIEWS.map((v, i) => {
          const isActive = i === activeView;
          const isEng = v.key === "engagement";
          return (
            <button
              key={v.key}
              onClick={() => setActiveView(i)}
              style={{
                padding: "8px 18px",
                borderRadius: 6,
                border: isActive
                  ? `1.5px solid ${isEng ? c.tealBorder : c.btnBorder}`
                  : `1.5px solid ${c.btnBorder}`,
                background: isActive
                  ? isEng ? c.tealBg : c.btnBg
                  : c.btnBg,
                color: isActive
                  ? isEng ? c.tealActive : c.text
                  : c.textMuted,
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              {v.label}
            </button>
          );
        })}
      </div>

      {/* SVG scatter plot */}
      <svg
        width={dims.width}
        height={dims.height}
        viewBox={`0 0 ${dims.width} ${dims.height}`}
        style={{ display: "block", overflow: "visible" }}
        onMouseLeave={() => setHovered(null)}
      >
        <defs>
          {Object.entries(STUDIES).map(([key, s]) => (
            <radialGradient key={key} id={`glow-${key}`}>
              <stop offset="0%" stopColor={s.color} stopOpacity={0.5} />
              <stop offset="100%" stopColor={s.color} stopOpacity={0} />
            </radialGradient>
          ))}
          <marker id="arrowX" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill={c.arrowHead} />
          </marker>
        </defs>

        {/* Grid */}
        {yTicks.map(t => (
          <line key={`yg-${t}`} x1={MARGIN.left} x2={MARGIN.left + plotW} y1={scaleY(t)} y2={scaleY(t)} stroke={c.grid} strokeWidth={1} />
        ))}
        {yTicks.map(t => (
          <text key={`yl-${t}`} x={MARGIN.left - 8} y={scaleY(t) + 4} textAnchor="end" fill={c.textFaint} fontSize={11}>{t}</text>
        ))}

        {/* Axes */}
        <text x={MARGIN.left} y={MARGIN.top + plotH + 38} fill={c.textFaint} fontSize={11} textAnchor="start">{view.lowLabel}</text>
        <text x={MARGIN.left + plotW} y={MARGIN.top + plotH + 38} fill={c.textFaint} fontSize={11} textAnchor="end">{view.highLabel}</text>
        <text x={MARGIN.left + plotW / 2} y={MARGIN.top + plotH + 38} fill={c.textMuted} fontSize={11} textAnchor="middle" fontWeight={500}>{view.xLabel}</text>
        <text x={14} y={MARGIN.top + plotH / 2} fill={c.textMuted} fontSize={11} textAnchor="middle" fontWeight={500} transform={`rotate(-90, 14, ${MARGIN.top + plotH / 2})`}>Performance Outcome</text>
        <line x1={MARGIN.left} x2={MARGIN.left + plotW + 6} y1={MARGIN.top + plotH} y2={MARGIN.top + plotH} stroke={c.arrow} strokeWidth={1} markerEnd="url(#arrowX)" />

        {/* Trend line */}
        {trend && (
          <line
            x1={scaleX(bounds.xMin)} y1={scaleY(trend.intercept + trend.slope * bounds.xMin)}
            x2={scaleX(bounds.xMax)} y2={scaleY(trend.intercept + trend.slope * bounds.xMax)}
            stroke="#0EA5A5" strokeWidth={1.5} strokeDasharray="6 4" opacity={0.5}
          />
        )}

        {/* Annotation brackets */}
        {showAnnotations && spotlights.map((callout, i) => {
          const box = calloutBox(callout);
          if (!box) return null;
          return (
            <g key={i}>
              <rect x={box.x1} y={box.y1} width={box.x2 - box.x1} height={box.y2 - box.y1} rx={6} fill="none" stroke={c.bracket} strokeWidth={1} strokeDasharray="4 3" />
              <text x={box.cx} y={box.labelY} textAnchor="middle" fill={c.textMuted} fontSize={10} fontStyle="italic">{box.text}</text>
            </g>
          );
        })}

        {/* Data points */}
        {DATA.map(d => {
          const cx = scaleX(d[xKey]);
          const cy = scaleY(d.outcome);
          const study = STUDIES[d.study];
          const isH = hovered === d.id;
          return (
            <g key={d.id} onMouseEnter={() => setHovered(d.id)} onMouseLeave={() => setHovered(null)} style={{ cursor: "pointer" }}>
              <circle cx={cx} cy={cy} r={isH ? 22 : 16} fill={`url(#glow-${d.study})`} opacity={isH ? 0.7 : 0.35} style={{ transition: "all 0.2s" }} />
              <circle cx={cx} cy={cy} r={isH ? 6.5 : 5} fill={study.color} stroke={isH ? c.dotStrokeHover : c.dotStroke} strokeWidth={isH ? 2 : 1} style={{ transition: "all 0.2s" }} />
            </g>
          );
        })}

        {/* Tooltip */}
        {tooltipPoint && (() => {
          const tx = scaleX(tooltipPoint[xKey]);
          const ty = scaleY(tooltipPoint.outcome);
          const tooltipW = 200, tooltipH = 68;
          const ttx = tx + tooltipW + 16 > dims.width ? tx - tooltipW - 10 : tx + 14;
          const tty = ty - tooltipH - 12 < 0 ? ty + 14 : ty - tooltipH - 8;
          return (
            <foreignObject x={ttx} y={tty} width={tooltipW} height={tooltipH + 10}>
              <div style={{
                background: c.tooltipBg, border: `1px solid ${tooltipStudy.color}44`,
                borderRadius: 8, padding: "8px 10px", fontSize: 12, lineHeight: 1.45, color: c.tooltipText,
                backdropFilter: "blur(8px)", boxShadow: isDark ? "none" : "0 2px 12px rgba(0,0,0,0.08)",
              }}>
                <div style={{ fontWeight: 600, color: c.tooltipLabel, marginBottom: 2 }}>{tooltipPoint.label}</div>
                <div style={{ color: tooltipStudy.color, fontSize: 11 }}>{tooltipStudy.name}</div>
                <div style={{ marginTop: 3, fontSize: 11, color: c.tooltipDetail }}>Outcome: {tooltipPoint.outcome} \u00b7 {tooltipPoint.detail}</div>
              </div>
            </foreignObject>
          );
        })()}
      </svg>

      {/* Annotations toggle */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 6, marginBottom: 8 }}>
        <button onClick={() => setShowAnnotations(!showAnnotations)} style={{ fontSize: 11, color: c.textFaint, background: "none", border: "none", cursor: "pointer", padding: "2px 6px", borderRadius: 4 }}>
          {showAnnotations ? "Hide annotations" : "Show annotations"}
        </button>
      </div>

      {/* Insight panel */}
      <div style={{
        background: isEngagement ? c.tealInsightBg : c.warnInsightBg,
        border: `1px solid ${isEngagement ? c.tealInsightBorder : c.warnInsightBorder}`,
        borderRadius: 8, padding: "12px 14px", marginBottom: 12,
      }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: isEngagement ? c.tealActive : c.warnActive, marginBottom: 4 }}>{view.insight}</div>
        <div style={{ fontSize: 12.5, lineHeight: 1.6, color: c.insightText }}>{view.analysis}</div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 8 }}>
        {Object.entries(STUDIES).map(([key, s]) => (
          <span key={key} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, color: c.textMuted, whiteSpace: "nowrap" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: s.color, display: "inline-block", flexShrink: 0 }} />
            {s.name}{s.n ? ` (n=${s.n})` : ""}
          </span>
        ))}
      </div>

      {/* Source */}
      <div style={{ textAlign: "center", fontSize: 10, color: c.textDim, lineHeight: 1.5 }}>
        Data synthesized from Shen & Tamkin (2024), Dell'Acqua et al. (2023), Randazzo et al. (2024), and Bastani et al. (2024).
        <br />Horizontal positions normalized to common scale for cross-study comparison.
      </div>
    </div>
  );
}
