import type { Theme } from "./tokens";
import { FigureContainer, StatCard, Callout } from "./shared";

interface Segment {
  pct: number;
  color: string;
  label: string;
}

const SegmentedBar = ({
  segments,
  label,
  barHeight = 30,
  barMaxWidth = 420,
  t,
}: {
  segments: Segment[];
  label: string;
  barHeight?: number;
  barMaxWidth?: number;
  t: Theme;
}) => (
  <div style={{ marginBottom: 22 }}>
    <div style={{ fontSize: 11, fontWeight: 600, color: t.text, marginBottom: 6 }}>
      {label}
    </div>
    <div
      style={{
        display: "flex",
        borderRadius: 4,
        overflow: "hidden",
        height: barHeight,
        maxWidth: barMaxWidth,
        border: `1px solid ${t.borderLight}`,
      }}
    >
      {segments.map((s, i) => (
        <div
          key={i}
          style={{
            width: `${s.pct}%`,
            background: s.color,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRight: i < segments.length - 1 ? `1px solid ${t.surface}` : "none",
          }}
        >
          {s.pct >= 10 && (
            <span
              style={{
                fontSize: s.pct >= 20 ? 11 : 9,
                fontWeight: 700,
                color: "#fff",
                whiteSpace: "nowrap",
              }}
            >
              {s.pct}%
            </span>
          )}
        </div>
      ))}
    </div>
    <div style={{ display: "flex", maxWidth: barMaxWidth, marginTop: 4 }}>
      {segments.map((s, i) => (
        <div key={i} style={{ width: `${s.pct}%`, textAlign: "center" }}>
          <span
            style={{
              fontSize: s.pct < 12 ? 7.5 : 9,
              color: t.textMuted,
              lineHeight: 1.2,
              display: "block",
            }}
          >
            {s.label}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default function SpendingInversion({ t }: { t: Theme }) {
  return (
    <FigureContainer
      t={t}
      number="5"
      title="The Spending Inversion"
      subtitle="Companies invest 93% of AI budgets on technology and 7% on people — almost exactly inverting the ratio that predicts success."
      source="Deloitte CTO analysis (Fortune, Jan 2026); BCG Henderson Institute 10-20-70 framework; McKinsey State of AI 2025."
    >
      <SegmentedBar
        t={t}
        label="Current enterprise AI spending"
        segments={[
          { pct: 93, color: `${t.negative}CC`, label: "Technology" },
          { pct: 7, color: `${t.positive}CC`, label: "People" },
        ]}
      />

      <SegmentedBar
        t={t}
        label="BCG recommended allocation (10-20-70)"
        segments={[
          { pct: 10, color: `${t.blue}BB`, label: "Technology" },
          { pct: 20, color: `${t.accent}BB`, label: "Process redesign" },
          { pct: 70, color: `${t.positive}CC`, label: "People & change mgmt" },
        ]}
      />

      {/* Key stats */}
      <div style={{ display: "flex", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
        <StatCard
          value="~6%"
          label="of organizations capture meaningful AI value"
          accent="positive"
          t={t}
        />
        <StatCard
          value="95%"
          label="of enterprise AI pilots deliver zero return"
          accent="negative"
          t={t}
        />
        <StatCard
          value="60%"
          label="adoption ceiling even with free access and training"
          accent="negative"
          t={t}
        />
      </div>

      <Callout type="finding" t={t}>
        The organizations that succeed are 3× more likely to have fundamentally redesigned
        individual workflows — not just deployed the technology. McKinsey describes workflow
        redesign as "non-negotiable" for value capture.
      </Callout>
    </FigureContainer>
  );
}
