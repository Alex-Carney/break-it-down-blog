import { useState, useMemo } from "react";

const PALETTE = {
  bg: "#F6F5F9", surface: "#FFFFFF", border: "#D0CEE0",
  text: "#1A1830", textSecondary: "#3A3856", textTertiary: "#6E6C8A",
  positive: "#0F7B4F", positiveBg: "rgba(15, 123, 79, 0.06)",
  negative: "#A83E54", negativeBg: "rgba(168, 62, 84, 0.06)",
  accent: "#6B4FCF",
};

const STUDIES = [
  { id: "brynjolfsson", label: "Brynjolfsson et al.", year: 2025, n: "5,172", journal: "QJE", color: "#3458A8" },
  { id: "noy", label: "Noy & Zhang", year: 2023, n: "453", journal: "Science", color: "#0EA5A5" },
  { id: "dellacqua", label: "Dell'Acqua et al.", year: 2023, n: "758", journal: "HBS", color: "#6B4FCF" },
  { id: "peng", label: "Peng et al.", year: 2023, n: "95", journal: "arXiv", color: "#0F7B4F" },
  { id: "cui", label: "Cui et al.", year: 2025, n: "4,867", journal: "SSRN", color: "#7A9EF0" },
  { id: "metr", label: "METR", year: 2025, n: "16", journal: "RCT", color: "#A83E54" },
];

const DOMAINS = ["Customer Support", "Writing", "Consulting", "Software Dev", "Medical", "Legal"];

const TASKS = [
  // Brynjolfsson - customer support
  { study: "brynjolfsson", domain: "Customer Support", task: "Issue resolution — least experienced agents", effect: 30, inside: true, detail: "~30% productivity gain. Largest effect for lowest-skilled workers." },
  { study: "brynjolfsson", domain: "Customer Support", task: "Issue resolution — average agents", effect: 15, inside: true, detail: "15% increase in issues resolved per hour. N=5,172." },
  { study: "brynjolfsson", domain: "Customer Support", task: "Issue resolution — most experienced agents", effect: 3, inside: true, detail: "Marginal speed gains, slight quality decline. AI compresses the skill distribution." },
  { study: "brynjolfsson", domain: "Customer Support", task: "Customer sentiment scores", effect: 11, inside: true, detail: "Customer satisfaction improved 11%. Tone and empathy coaching from AI." },

  // Noy & Zhang - writing
  { study: "noy", domain: "Writing", task: "Professional writing — lower-ability writers", effect: 35, inside: true, detail: "Largest quality gains for lower-ability writers. Gap between best and worst narrowed." },
  { study: "noy", domain: "Writing", task: "Professional writing — average", effect: 18, inside: true, detail: "18% quality increase. Time reduced ~40%. Writing tasks: press releases, reports, emails." },
  { study: "noy", domain: "Writing", task: "Professional writing — high-ability writers", effect: 8, inside: true, detail: "Modest gains. High-ability writers already near quality ceiling." },

  // Dell'Acqua - consulting (the core jagged frontier study)
  { study: "dellacqua", domain: "Consulting", task: "Creative ideation (inside frontier)", effect: 40, inside: true, detail: "12.2% more tasks, 25% faster, 40%+ higher quality. GPT-4 inside its capability range." },
  { study: "dellacqua", domain: "Consulting", task: "Market sizing (inside frontier)", effect: 30, inside: true, detail: "Consultants with AI produced significantly higher-quality market analyses." },
  { study: "dellacqua", domain: "Consulting", task: "Business case development (inside frontier)", effect: 25, inside: true, detail: "Faster, more structured output. AI helped organise and synthesise information." },
  { study: "dellacqua", domain: "Consulting", task: "HR candidate evaluation (outside frontier)", effect: -19, inside: false, detail: "19pp less likely to produce correct solution vs. no AI. Task required non-obvious integration of qualitative signals." },
  { study: "dellacqua", domain: "Consulting", task: "Recommendation with high-quality AI output (85% accurate)", effect: -8, inside: false, detail: "Consultants given more accurate AI performed worse — blind trust in confident-sounding output." },

  // Peng - software dev
  { study: "peng", domain: "Software Dev", task: "HTTP server implementation (Copilot)", effect: 56, inside: true, detail: "55.8% faster task completion. N=95 professional devs. Small sample, narrow task." },

  // Cui - software dev at scale
  { study: "cui", domain: "Software Dev", task: "Pull request volume (Microsoft)", effect: 26, inside: true, detail: "26% more completed PRs/week. Quality explicitly unmeasured. Largest enterprise RCT." },
  { study: "cui", domain: "Software Dev", task: "Pull request volume (Accenture)", effect: 13, inside: true, detail: "13% increase. Lower than Microsoft, possibly due to task complexity differences." },
  { study: "cui", domain: "Software Dev", task: "Pull request volume (Fortune 100)", effect: 20, inside: true, detail: "20% increase. Third independent replication of positive effect on code quantity." },

  // METR - experienced devs
  { study: "metr", domain: "Software Dev", task: "Real repository tasks — experienced developers", effect: -19, inside: false, detail: "19% SLOWER with AI. But devs believed they were 24% faster. N=16, small but striking." },

  // Medical - from systematic reviews cited in the literature
  { study: "dellacqua", domain: "Medical", task: "Radiologist accuracy — correct AI suggestions", effect: 12, inside: true, detail: "Improved detection when AI predictions were correct. Zhou et al., Nature 2024." },
  { study: "dellacqua", domain: "Medical", task: "Radiologist accuracy — incorrect AI suggestions", effect: -60, inside: false, detail: "Accuracy dropped from ~80% to ~20% when AI was wrong. Automation bias overrode expertise." },
  { study: "dellacqua", domain: "Medical", task: "Colonoscopy detection after AI removal", effect: -21, inside: false, detail: "Adenoma detection dropped from 28.4% to 22.4% after AI was removed. Skill atrophy. Budzyń et al., Lancet 2025." },

  // Legal - from Magesh et al.
  { study: "dellacqua", domain: "Legal", task: "Contract analysis (inside frontier)", effect: 25, inside: true, detail: "Strong AI performance on well-defined legal research within training domain." },
  { study: "dellacqua", domain: "Legal", task: "Legal research — AI tools (LexisNexis, Westlaw)", effect: -25, inside: false, detail: "Hallucination rate: 17–33% in leading legal AI tools. Magesh et al., J. Empirical Legal Studies 2025." },
  { study: "dellacqua", domain: "Legal", task: "Legal questions — general-purpose LLMs", effect: -58, inside: false, detail: "Hallucination rate: 58–82%. Fabricated case law, invented citations." },
];

export default function JaggedFrontier() {
  const [activeStudy, setActiveStudy] = useState(null);
  const [activeDomain, setActiveDomain] = useState(null);
  const [hoveredTask, setHoveredTask] = useState(null);

  const filtered = useMemo(() => {
    return TASKS.filter((t) => {
      if (activeStudy && t.study !== activeStudy) return false;
      if (activeDomain && t.domain !== activeDomain) return false;
      return true;
    });
  }, [activeStudy, activeDomain]);

  const chartW = 720; const chartH = 420;
  const pad = { top: 40, right: 30, bottom: 55, left: 55 };
  const plotW = chartW - pad.left - pad.right;
  const plotH = chartH - pad.top - pad.bottom;
  const yMin = -70; const yMax = 65;

  const scaleY = (v) => pad.top + plotH - ((v - yMin) / (yMax - yMin)) * plotH;
  const zeroY = scaleY(0);

  const getX = (task) => {
    const di = DOMAINS.indexOf(task.domain);
    const inDomain = filtered.filter((t) => t.domain === task.domain);
    const ti = inDomain.indexOf(task);
    const dw = plotW / DOMAINS.length;
    const start = pad.left + di * dw;
    const spacing = dw / (inDomain.length + 1);
    return start + spacing * (ti + 1);
  };

  const insideCount = filtered.filter((t) => t.inside).length;
  const outsideCount = filtered.filter((t) => !t.inside).length;

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: PALETTE.bg, padding: "24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* Filters */}
        <div style={{ display: "flex", gap: 20, marginBottom: 20, flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: 10, fontFamily: "'Helvetica Neue', Arial, sans-serif", textTransform: "uppercase", letterSpacing: "0.1em", color: PALETTE.textTertiary, marginBottom: 6 }}>Study</p>
            <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
              <button onClick={() => setActiveStudy(null)} style={{
                fontSize: 10, fontFamily: "'Helvetica Neue', Arial, sans-serif", padding: "4px 9px",
                border: `1px solid ${!activeStudy ? PALETTE.accent : PALETTE.border}`,
                background: !activeStudy ? PALETTE.accent : "transparent",
                color: !activeStudy ? "#fff" : PALETTE.textSecondary, borderRadius: 2, cursor: "pointer",
              }}>All</button>
              {STUDIES.map((s) => (
                <button key={s.id} onClick={() => setActiveStudy(activeStudy === s.id ? null : s.id)} style={{
                  fontSize: 10, fontFamily: "'Helvetica Neue', Arial, sans-serif", padding: "4px 9px",
                  border: `1px solid ${activeStudy === s.id ? s.color : PALETTE.border}`,
                  background: activeStudy === s.id ? s.color : "transparent",
                  color: activeStudy === s.id ? "#fff" : PALETTE.textSecondary, borderRadius: 2, cursor: "pointer",
                }}>{s.label.split(" ")[0]} '{String(s.year).slice(2)}</button>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: 10, fontFamily: "'Helvetica Neue', Arial, sans-serif", textTransform: "uppercase", letterSpacing: "0.1em", color: PALETTE.textTertiary, marginBottom: 6 }}>Domain</p>
            <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
              <button onClick={() => setActiveDomain(null)} style={{
                fontSize: 10, fontFamily: "'Helvetica Neue', Arial, sans-serif", padding: "4px 9px",
                border: `1px solid ${!activeDomain ? PALETTE.accent : PALETTE.border}`,
                background: !activeDomain ? PALETTE.accent : "transparent",
                color: !activeDomain ? "#fff" : PALETTE.textSecondary, borderRadius: 2, cursor: "pointer",
              }}>All</button>
              {DOMAINS.map((d) => (
                <button key={d} onClick={() => setActiveDomain(activeDomain === d ? null : d)} style={{
                  fontSize: 10, fontFamily: "'Helvetica Neue', Arial, sans-serif", padding: "4px 9px",
                  border: `1px solid ${activeDomain === d ? PALETTE.accent : PALETTE.border}`,
                  background: activeDomain === d ? PALETTE.accent : "transparent",
                  color: activeDomain === d ? "#fff" : PALETTE.textSecondary, borderRadius: 2, cursor: "pointer",
                }}>{d}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Chart */}
        <div style={{ background: PALETTE.surface, border: `1px solid ${PALETTE.border}`, padding: "16px 12px 8px" }}>
          <svg width={chartW} height={chartH} viewBox={`0 0 ${chartW} ${chartH}`} style={{ display: "block", width: "100%", height: "auto" }}>
            {/* Shaded regions */}
            <rect x={pad.left} y={pad.top} width={plotW} height={zeroY - pad.top} fill={PALETTE.positive} opacity={0.03} />
            <rect x={pad.left} y={zeroY} width={plotW} height={chartH - pad.bottom - zeroY} fill={PALETTE.negative} opacity={0.03} />

            {/* Grid */}
            {[-60, -40, -20, 0, 20, 40, 60].map((v) => (
              <g key={v}>
                <line x1={pad.left} x2={chartW - pad.right} y1={scaleY(v)} y2={scaleY(v)}
                  stroke={v === 0 ? PALETTE.text : PALETTE.border}
                  strokeWidth={v === 0 ? 1.5 : 0.5}
                  strokeDasharray={v === 0 ? "none" : "4,3"} />
                <text x={pad.left - 8} y={scaleY(v) + 4} textAnchor="end" fontSize={10}
                  fontFamily="'Helvetica Neue', Arial, sans-serif" fill={PALETTE.textTertiary}>
                  {v > 0 ? `+${v}%` : `${v}%`}
                </text>
              </g>
            ))}

            {/* Region labels */}
            <text x={pad.left + 4} y={pad.top + 14} fontSize={10} fontFamily="'Helvetica Neue', Arial, sans-serif" fill={PALETTE.positive} opacity={0.6}>AI improves outcomes ↑</text>
            <text x={pad.left + 4} y={chartH - pad.bottom - 6} fontSize={10} fontFamily="'Helvetica Neue', Arial, sans-serif" fill={PALETTE.negative} opacity={0.6}>AI degrades outcomes ↓</text>

            {/* Domain columns */}
            {DOMAINS.map((d, i) => {
              const dw = plotW / DOMAINS.length;
              const cx = pad.left + i * dw + dw / 2;
              if (i > 0) {
                return (
                  <g key={d}>
                    <line x1={pad.left + i * dw} y1={pad.top} x2={pad.left + i * dw} y2={chartH - pad.bottom} stroke={PALETTE.border} strokeWidth={0.5} opacity={0.3} />
                    <text x={cx} y={chartH - 12} textAnchor="middle" fontSize={10} fontFamily="'Helvetica Neue', Arial, sans-serif" fill={PALETTE.textTertiary}>{d}</text>
                  </g>
                );
              }
              return <text key={d} x={cx} y={chartH - 12} textAnchor="middle" fontSize={10} fontFamily="'Helvetica Neue', Arial, sans-serif" fill={PALETTE.textTertiary}>{d}</text>;
            })}

            {/* Data points */}
            {filtered.map((t, i) => {
              const cx = getX(t);
              const cy = scaleY(t.effect);
              const isHov = hoveredTask === i;
              const study = STUDIES.find((s) => s.id === t.study);
              const r = isHov ? 7 : 5;

              return (
                <g key={i} onMouseEnter={() => setHoveredTask(i)} onMouseLeave={() => setHoveredTask(null)} style={{ cursor: "pointer" }}>
                  <circle cx={cx} cy={cy} r={r + 5} fill="transparent" />
                  <circle cx={cx} cy={cy} r={r}
                    fill={t.inside ? PALETTE.positive : PALETTE.negative}
                    opacity={isHov ? 1 : 0.7}
                    stroke={isHov ? PALETTE.text : "none"} strokeWidth={1.5}
                  />
                  {isHov && (
                    <g>
                      <rect x={Math.min(cx - 150, chartW - 310)} y={cy < 200 ? cy + 14 : cy - 64}
                        width={300} height={52} rx={3} fill={PALETTE.text} opacity={0.93} />
                      <text x={Math.min(cx - 150, chartW - 310) + 10} y={cy < 200 ? cy + 32 : cy - 46}
                        fontSize={11} fontFamily="'Helvetica Neue', Arial, sans-serif" fill="#fff" fontWeight={500}>
                        {t.task}
                      </text>
                      <text x={Math.min(cx - 150, chartW - 310) + 10} y={cy < 200 ? cy + 48 : cy - 30}
                        fontSize={10} fontFamily="'Helvetica Neue', Arial, sans-serif" fill="rgba(255,255,255,0.7)">
                        {t.detail.slice(0, 80)}{t.detail.length > 80 ? "..." : ""}
                      </text>
                      <text x={Math.min(cx - 150, chartW - 310) + 290} y={cy < 200 ? cy + 32 : cy - 46}
                        textAnchor="end" fontSize={9} fontFamily="'Helvetica Neue', Arial, sans-serif" fill="rgba(255,255,255,0.5)">
                        {study?.label} {study?.year}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Legend */}
          <div style={{ display: "flex", gap: 20, justifyContent: "center", paddingTop: 6, borderTop: `1px solid ${PALETTE.border}`, marginTop: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: PALETTE.positive }} />
              <span style={{ fontSize: 11, fontFamily: "'Helvetica Neue', Arial, sans-serif", color: PALETTE.textSecondary }}>Inside frontier ({insideCount} tasks)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: PALETTE.negative }} />
              <span style={{ fontSize: 11, fontFamily: "'Helvetica Neue', Arial, sans-serif", color: PALETTE.textSecondary }}>Outside frontier ({outsideCount} tasks)</span>
            </div>
          </div>
        </div>

        {/* Benchmark callout */}
        <div style={{ marginTop: 16, padding: "16px 20px", background: PALETTE.surface, border: `1px solid ${PALETTE.border}`, display: "flex", gap: 24, alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 10, fontFamily: "'Helvetica Neue', Arial, sans-serif", textTransform: "uppercase", letterSpacing: "0.1em", color: PALETTE.textTertiary, margin: "0 0 6px 0" }}>Why benchmarks mislead</p>
            <p style={{ fontSize: 13, color: PALETTE.textSecondary, lineHeight: 1.5, margin: 0 }}>
              Same models, different conditions. SWE-bench evaluates AI on curated coding tasks; SWE-Lancer uses real freelance tasks with monetary stakes. The gap illustrates why demo performance does not predict production performance.
            </p>
          </div>
          <div style={{ display: "flex", gap: 16, flexShrink: 0 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 300, color: PALETTE.positive }}>80.9%</div>
              <div style={{ fontSize: 9, fontFamily: "'Helvetica Neue', Arial, sans-serif", color: PALETTE.textTertiary, marginTop: 3 }}>SWE-bench</div>
              <div style={{ fontSize: 8, fontFamily: "'Helvetica Neue', Arial, sans-serif", color: PALETTE.textTertiary }}>curated tasks</div>
            </div>
            <div style={{ width: 1, background: PALETTE.border, alignSelf: "stretch" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 300, color: PALETTE.negative }}>26.2%</div>
              <div style={{ fontSize: 9, fontFamily: "'Helvetica Neue', Arial, sans-serif", color: PALETTE.textTertiary, marginTop: 3 }}>SWE-Lancer</div>
              <div style={{ fontSize: 8, fontFamily: "'Helvetica Neue', Arial, sans-serif", color: PALETTE.textTertiary }}>real-world tasks</div>
            </div>
          </div>
        </div>

        <p style={{ fontSize: 10, fontFamily: "'Helvetica Neue', Arial, sans-serif", color: PALETTE.textTertiary, marginTop: 12, lineHeight: 1.5 }}>
          Sources: Brynjolfsson, Li & Raymond (QJE 2025, N=5,172); Noy & Zhang (Science 2023, N=453); Dell'Acqua et al. (HBS 2023, N=758); Peng et al. (arXiv 2023, N=95); Cui, Demirer et al. (SSRN 2025, N=4,867); METR (2025, N=16). Medical data from Zhou et al. (Nature 2024) and Budzyń et al. (Lancet 2025). Legal data from Magesh et al. (J. Empirical Legal Studies 2025). Effect sizes approximate where studies report ranges. Hover over any point for study detail.
        </p>
      </div>
    </div>
  );
}
