import { useState } from "react";
import type { Theme } from "./tokens";
import { FigureContainer } from "./shared";

const PATTERNS = [
  {
    id: "GTC",
    name: "Generation-Then-Comprehension",
    time: 24,
    score: 86,
    group: "high",
    detail:
      "Used AI to generate code, then asked follow-up questions to understand what it produced and why.",
  },
  {
    id: "HYB",
    name: "Hybrid Code-Explanation",
    time: 24,
    score: 68,
    group: "high",
    detail:
      "Asked for code and explanations simultaneously — learning and producing in parallel.",
  },
  {
    id: "INQ",
    name: "Conceptual Inquiry",
    time: 22,
    score: 65,
    group: "high",
    detail: "Asked the AI only conceptual questions, then wrote all code themselves.",
  },
  {
    id: "DEL",
    name: "AI Delegation",
    time: 19.5,
    score: 39,
    group: "low",
    detail: "Sent the full task to AI, received code, pasted it in. Fast and empty.",
  },
  {
    id: "REL",
    name: "Progressive Reliance",
    time: 22,
    score: 35,
    group: "low",
    detail: "Started independently but increasingly offloaded to AI as tasks got harder.",
  },
  {
    id: "DBG",
    name: "Iterative Debugging",
    time: 31,
    score: 24,
    group: "low",
    detail:
      "Used AI to debug AI-generated code — delegation with extra steps. Slowest and lowest.",
  },
];

export default function SixPatterns({ t }: { t: Theme }) {
  const [hovered, setHovered] = useState<string | null>(null);

  const W = 520,
    H = 340;
  const pad = { top: 30, right: 30, bottom: 50, left: 55 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;

  const xMin = 17,
    xMax = 34,
    yMin = 15,
    yMax = 95;
  const toX = (v: number) => pad.left + ((v - xMin) / (xMax - xMin)) * plotW;
  const toY = (v: number) => pad.top + plotH - ((v - yMin) / (yMax - yMin)) * plotH;

  const best = PATTERNS.find((p) => p.id === "GTC")!;
  const worst = PATTERNS.find((p) => p.id === "DBG")!;

  return (
    <FigureContainer
      t={t}
      number="2"
      title="Six Ways to Use the Same Tool"
      subtitle="52 developers used the same AI on the same task. Researchers identified six distinct interaction patterns from screen recordings. The best pattern scored 86%; the worst scored 24%."
      source="Shen & Tamkin (arXiv 2026, Anthropic). N=52 professional software developers learning an unfamiliar Python library."
    >
      <div style={{ position: "relative" }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{ width: "100%", maxWidth: W, display: "block", margin: "0 auto" }}
        >
          {/* Grid lines */}
          {[20, 40, 60, 80].map((v) => (
            <g key={`gy-${v}`}>
              <line
                x1={pad.left}
                y1={toY(v)}
                x2={W - pad.right}
                y2={toY(v)}
                stroke={t.borderLight}
                strokeWidth={0.7}
              />
              <text
                x={pad.left - 8}
                y={toY(v) + 4}
                textAnchor="end"
                fontSize={9}
                fill={t.textFaint}
                fontFamily="Inter, system-ui"
              >
                {v}%
              </text>
            </g>
          ))}
          {[20, 25, 30].map((v) => (
            <g key={`gx-${v}`}>
              <line
                x1={toX(v)}
                y1={pad.top}
                x2={toX(v)}
                y2={H - pad.bottom}
                stroke={t.borderLight}
                strokeWidth={0.7}
              />
              <text
                x={toX(v)}
                y={H - pad.bottom + 16}
                textAnchor="middle"
                fontSize={9}
                fill={t.textFaint}
                fontFamily="Inter, system-ui"
              >
                {v} min
              </text>
            </g>
          ))}

          {/* Axis labels */}
          <text
            x={W / 2}
            y={H - 4}
            textAnchor="middle"
            fontSize={10}
            fill={t.textMuted}
            fontFamily="Inter, system-ui"
            fontWeight={500}
          >
            Time on task
          </text>
          <text
            x={14}
            y={H / 2}
            textAnchor="middle"
            fontSize={10}
            fill={t.textMuted}
            fontFamily="Inter, system-ui"
            fontWeight={500}
            transform={`rotate(-90, 14, ${H / 2})`}
          >
            Knowledge score
          </text>

          {/* Best-to-worst bracket */}
          {(() => {
            const bracketX = W - pad.right + 6;
            const topY = toY(best.score);
            const botY = toY(worst.score);
            const midY = (topY + botY) / 2;
            return (
              <g>
                <line
                  x1={bracketX}
                  y1={topY}
                  x2={bracketX}
                  y2={botY}
                  stroke={t.blue}
                  strokeWidth={1.5}
                  opacity={0.5}
                />
                <line
                  x1={bracketX - 4}
                  y1={topY}
                  x2={bracketX}
                  y2={topY}
                  stroke={t.blue}
                  strokeWidth={1.5}
                  opacity={0.5}
                />
                <line
                  x1={bracketX - 4}
                  y1={botY}
                  x2={bracketX}
                  y2={botY}
                  stroke={t.blue}
                  strokeWidth={1.5}
                  opacity={0.5}
                />
                <text
                  x={bracketX + 6}
                  y={midY - 4}
                  fontSize={11}
                  fontWeight={700}
                  fill={t.blue}
                  fontFamily="Inter, system-ui"
                >
                  62pp
                </text>
                <text
                  x={bracketX + 6}
                  y={midY + 8}
                  fontSize={8}
                  fill={t.textMuted}
                  fontFamily="Inter, system-ui"
                >
                  best to worst
                </text>
                <text
                  x={bracketX + 6}
                  y={midY + 18}
                  fontSize={8}
                  fill={t.textMuted}
                  fontFamily="Inter, system-ui"
                >
                  AI pattern
                </text>
              </g>
            );
          })()}

          {/* Data points */}
          {PATTERNS.map((p) => {
            const cx = toX(p.time);
            const cy = toY(p.score);
            const color = p.group === "high" ? t.positive : t.negative;
            const isHovered = hovered === p.id;
            return (
              <g
                key={p.id}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
              >
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 16 : 10}
                  fill={color}
                  opacity={isHovered ? 0.12 : 0.06}
                  style={{ transition: "all 0.2s ease" }}
                />
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 7 : 5.5}
                  fill={color}
                  opacity={0.9}
                  style={{ transition: "all 0.15s ease" }}
                />
                <text
                  x={cx}
                  y={cy - (isHovered ? 12 : 10)}
                  textAnchor="middle"
                  fontSize={isHovered ? 10 : 8.5}
                  fontWeight={isHovered ? 700 : 600}
                  fill={color}
                  fontFamily="Inter, system-ui"
                  style={{ transition: "all 0.15s ease" }}
                >
                  {p.id}
                </text>
                <text
                  x={cx}
                  y={cy + (isHovered ? 16 : 14)}
                  textAnchor="middle"
                  fontSize={8}
                  fill={t.textMuted}
                  fontFamily="Inter, system-ui"
                >
                  {p.score}%
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover tooltip */}
        {hovered &&
          (() => {
            const p = PATTERNS.find((d) => d.id === hovered)!;
            const color = p.group === "high" ? t.positive : t.negative;
            return (
              <div
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  padding: "10px 12px",
                  borderRadius: 6,
                  background: t.surface,
                  border: `1px solid ${t.border}`,
                  boxShadow: `0 4px 16px ${t.bg}80`,
                  maxWidth: 220,
                  zIndex: 10,
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color, marginBottom: 4 }}>
                  {p.name}
                </div>
                <div
                  style={{ fontSize: 10, color: t.textSub, lineHeight: 1.5, marginBottom: 6 }}
                >
                  {p.detail}
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <span style={{ fontSize: 11, color: t.textMuted }}>
                    Score: <strong style={{ color }}>{p.score}%</strong>
                  </span>
                  <span style={{ fontSize: 11, color: t.textMuted }}>
                    Time: <strong style={{ color: t.text }}>{p.time} min</strong>
                  </span>
                </div>
              </div>
            );
          })()}
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          marginTop: 10,
          marginBottom: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: t.positive }} />
          <span style={{ fontSize: 11, color: t.textMuted }}>
            High-scoring patterns (engaged with output)
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: t.negative }} />
          <span style={{ fontSize: 11, color: t.textMuted }}>
            Low-scoring patterns (accepted output)
          </span>
        </div>
      </div>

      {/* Spot the Difference */}
      <div style={{ borderTop: `1px solid ${t.borderLight}`, paddingTop: 16, marginTop: 4 }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: t.accent,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 10,
          }}
        >
          Spot the difference
        </div>
        <div style={{ fontSize: 12, color: t.textMuted, marginBottom: 14, lineHeight: 1.5 }}>
          From the outside, both developers look identical. The invisible difference is four
          minutes of follow-up questions.
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {/* Developer A */}
          <div
            style={{
              flex: 1,
              minWidth: 200,
              padding: "12px 14px",
              borderRadius: 6,
              background: t.negBg,
              border: `1px solid ${t.negative}20`,
            }}
          >
            <div
              style={{ fontSize: 11, fontWeight: 700, color: t.negative, marginBottom: 8 }}
            >
              Developer A — Score: 39%
            </div>
            {[
              "Opens chat window",
              "Types request",
              "Receives code",
              "Pastes into project",
              "Moves to next task",
            ].map((step, i) => (
              <div
                key={i}
                style={{
                  fontSize: 11,
                  color: t.textSub,
                  padding: "3px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span
                  style={{ color: t.textFaint, fontSize: 9, fontWeight: 600, width: 14, flexShrink: 0 }}
                >
                  {i + 1}.
                </span>
                {step}
              </div>
            ))}
          </div>

          {/* Developer B */}
          <div
            style={{
              flex: 1,
              minWidth: 200,
              padding: "12px 14px",
              borderRadius: 6,
              background: t.posBg,
              border: `1px solid ${t.positive}20`,
            }}
          >
            <div
              style={{ fontSize: 11, fontWeight: 700, color: t.positive, marginBottom: 8 }}
            >
              Developer B — Score: 86%
            </div>
            {(
              [
                "Opens chat window",
                "Types request",
                "Receives code",
                { text: '"Why did you structure it this way?"', highlight: true },
                { text: '"What could break this under pressure?"', highlight: true },
                "Pastes into project",
                "Moves to next task",
              ] as (string | { text: string; highlight: boolean })[]
            ).map((step, i) => {
              const isObj = typeof step === "object";
              return (
                <div
                  key={i}
                  style={{
                    fontSize: 11,
                    color: isObj ? t.positive : t.textSub,
                    fontWeight: isObj ? 600 : 400,
                    padding: "3px 0",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: isObj ? `${t.positive}08` : "transparent",
                    borderRadius: isObj ? 3 : 0,
                    paddingLeft: isObj ? 4 : 0,
                    marginLeft: isObj ? -4 : 0,
                  }}
                >
                  <span
                    style={{ color: t.textFaint, fontSize: 9, fontWeight: 600, width: 14, flexShrink: 0 }}
                  >
                    {i + 1}.
                  </span>
                  {isObj ? step.text : step}
                </div>
              );
            })}
            <div
              style={{
                marginTop: 6,
                fontSize: 11,
                color: t.blue,
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              → +4 minutes. That's the entire investment.
            </div>
          </div>
        </div>
      </div>
    </FigureContainer>
  );
}
