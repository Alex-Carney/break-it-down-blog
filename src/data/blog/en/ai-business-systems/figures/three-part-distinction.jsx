import FigureContainer from './figure-container';

export default function ThreePartDistinction({ t }) {
  const categories = [
    {
      name: "Pattern Execution",
      example: "Boilerplate, established procedures, known answers",
      delegation: { outcome: "Works", detail: "+40% quality, +25% speed", color: t.positive },
      engagement: { outcome: "Unnecessary cost", detail: "~4 min overhead, no quality gain" },
      metric: { label: "Correct", color: t.positive },
      evidence: "BCG inside-frontier tasks",
    },
    {
      name: "Judgment Tasks",
      example: "Conflicting evidence, contextual evaluation, novel tradeoffs",
      delegation: { outcome: "Fails", detail: "−19pp vs. control, wrong answers delivered faster", color: t.negative },
      engagement: { outcome: "Produces correct output", detail: "Engaged consultants more likely to reach right conclusion" },
      metric: { label: "Misleading", color: t.negative },
      evidence: "BCG outside-frontier tasks",
    },
    {
      name: "Learning Tasks",
      example: "Unfamiliar systems, new domains, skill building",
      delegation: { outcome: "Erodes capability", detail: "39% score vs. 86% with engagement", color: t.negative },
      engagement: { outcome: "Builds understanding", detail: "~4.5 min cost, 47pp comprehension gain" },
      metric: { label: "Myopic", color: t.blue },
      evidence: "Shen & Tamkin, N=52",
    },
  ];

  return (
    <FigureContainer t={t}
      title="The productivity metric is correct on pattern execution, misleading on judgment, and myopic on learning"
      subtitle="Organizations apply one metric (output per unit time) to three fundamentally different task types. The metric rewards delegation on all three. Delegation only works on one."
    >
      <div style={{ maxWidth: 540, margin: "0 auto" }}>
        {categories.map((cat, i) => (
          <div key={i} style={{
            marginBottom: i < categories.length - 1 ? 12 : 0,
            padding: "16px 18px", background: t.surfaceAlt,
            borderRadius: 6, border: `1px solid ${t.borderLight}`,
          }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>{cat.name}</div>
                <div style={{ fontSize: 10, color: t.textMuted, marginTop: 2 }}>{cat.example}</div>
              </div>
              <span style={{
                fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 4, flexShrink: 0,
                background: cat.metric.color + "12", color: cat.metric.color,
              }}>Metric: {cat.metric.label}</span>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <div style={{
                flex: 1, padding: "10px 12px", borderRadius: 5,
                background: cat.delegation.color === t.positive ? t.posBg : t.negBg,
                border: `1px solid ${cat.delegation.color}15`,
              }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: t.textMuted, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>If delegated</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: cat.delegation.color, marginBottom: 3 }}>{cat.delegation.outcome}</div>
                <div style={{ fontSize: 10, color: t.textSub, lineHeight: 1.45 }}>{cat.delegation.detail}</div>
              </div>
              <div style={{
                flex: 1, padding: "10px 12px", borderRadius: 5,
                background: i === 0 ? t.surfaceAlt : t.posBg,
                border: `1px solid ${i === 0 ? t.borderLight : t.positive + "15"}`,
              }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: t.textMuted, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>If engaged</div>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 3, color: i === 0 ? t.textMuted : t.positive }}>{cat.engagement.outcome}</div>
                <div style={{ fontSize: 10, color: t.textSub, lineHeight: 1.45 }}>{cat.engagement.detail}</div>
              </div>
            </div>

            <div style={{ fontSize: 9.5, color: t.textFaint, marginTop: 8, fontStyle: "italic" }}>{cat.evidence}</div>
          </div>
        ))}

        <div style={{
          marginTop: 16, padding: "12px 16px",
          background: t.accentBg, borderRadius: 6, border: `1px solid ${t.accent}15`,
          fontSize: 11, color: t.textSub, lineHeight: 1.5,
        }}>
          <span style={{ fontWeight: 600, color: t.accent }}>The asymmetry: </span>
          Engagement on a pattern-execution task costs four minutes. Delegation on a judgment task produces wrong answers. When in doubt, engagement is the safer default.
        </div>
      </div>
    </FigureContainer>
  );
}
