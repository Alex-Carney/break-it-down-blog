import FigureContainer from './figure-container';

export default function CollaborationModes({ t }) {
  const modes = [
    {
      id: "integrated",
      name: "Integrated Engagement",
      pct: 60, n: 146,
      accuracy: "medium-high", persuasiveness: "high",
      skilling: "AI fluency + domain maintenance",
      color: t.positive, bg: t.posBg,
      desc: "Used AI throughout all stages of problem-solving. Iterative dialogue: probing outputs, extending ideas, pushing back, validating results.",
      practices: ["Modularizing tasks into sub-steps", "Pushing back on outputs", "Exposing contradictions", "Adding data to force reanalysis", "Demanding explanations"],
    },
    {
      id: "selective",
      name: "Selective Engagement",
      pct: 14, n: 34,
      accuracy: "highest", persuasiveness: "high",
      skilling: "Domain deepening",
      color: t.positive, bg: t.posBg,
      desc: "Used AI selectively for specific sub-tasks. Maintained control over analytical logic. Did core work themselves.",
      practices: ["Mapping problem domain", "Gathering methods information", "Refining human-generated content"],
    },
    {
      id: "delegation",
      name: "Full Delegation",
      pct: 27, n: 63,
      accuracy: "lowest", persuasiveness: "lowest",
      skilling: "Neither domain nor AI skills",
      color: t.negative, bg: t.negBg,
      desc: "Handed off the entire task. Accepted AI output with minimal or no modification. Fast, polished, shallow.",
      practices: ["Copy-paste inputs", "Accept output wholesale", "Superficial editorial changes only"],
    },
  ];

  const bad = (m) => m.id === "delegation";

  return (
    <FigureContainer t={t}
      title="Two modes of collaboration succeed. Only delegation fails."
      subtitle="244 BCG consultants, same task, same tool. The variable was not how much they used AI. It was whether they remained the active cognitive agent in the work."
      source="Randazzo et al. (Harvard Business School, 2025). N=244 BCG consultants, 4,975 human–AI interactions."
    >
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        {modes.map((m, i) => (
          <div key={m.id} style={{
            padding: "16px 18px", background: m.bg,
            border: `1px solid ${m.color}20`, borderRadius: 6,
            marginBottom: i < modes.length - 1 ? 10 : 0,
          }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: m.color }}>{m.pct}%</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{m.name}</span>
              </div>
              <span style={{ fontSize: 10, color: t.textFaint }}>N={m.n}</span>
            </div>

            <div style={{ height: 6, background: t.borderLight, borderRadius: 3, marginBottom: 10, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${m.pct}%`, background: m.color, borderRadius: 3, opacity: 0.8 }} />
            </div>

            <div style={{ fontSize: 11, color: t.textSub, lineHeight: 1.5, marginBottom: 10 }}>{m.desc}</div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
              {[
                { k: "Accuracy", v: m.accuracy },
                { k: "Persuasiveness", v: m.persuasiveness },
              ].map((tag) => (
                <span key={tag.k} style={{
                  fontSize: 10, padding: "3px 8px", borderRadius: 4, fontWeight: 500,
                  background: bad(m) ? t.negBg : t.posBg,
                  color: bad(m) ? t.negative : t.positive,
                }}>{tag.k}: {tag.v}</span>
              ))}
              <span style={{
                fontSize: 10, padding: "3px 8px", borderRadius: 4, fontWeight: 500,
                background: t.blueBg, color: t.blue,
              }}>{m.skilling}</span>
            </div>

            <div style={{
              paddingTop: 10, borderTop: `1px solid ${t.borderLight}`,
              fontSize: 10, color: t.textMuted, lineHeight: 1.6,
            }}>
              <span style={{ fontWeight: 600, color: t.textSub }}>Key practices: </span>
              {m.practices.join(" · ")}
            </div>
          </div>
        ))}

        <div style={{
          marginTop: 16, padding: "12px 16px",
          background: t.accentBg, borderRadius: 6, border: `1px solid ${t.accent}15`,
          fontSize: 11, color: t.textSub, lineHeight: 1.5,
        }}>
          <span style={{ fontWeight: 600, color: t.accent }}>The test: </span>
          Is the practitioner contributing something the AI cannot supply on its own? Both integrated and selective engagement pass this test. Only delegation fails it.
        </div>
      </div>
    </FigureContainer>
  );
}
