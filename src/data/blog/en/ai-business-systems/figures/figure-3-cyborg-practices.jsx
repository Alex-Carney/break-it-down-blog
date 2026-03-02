import { useState } from "react";

/*
  Figure: Centaur & Cyborg Practices
  Source: Dell'Acqua et al. (2023), HBS Working Paper 24-013, Appendix E
  Catalogues the observed behaviors of 244 BCG consultants' AI collaboration.
  Dark-mode aware.
*/

const PRACTICES = {
  centaur: {
    label: "Centaur Practices",
    desc: "Strategic division of labor — human does some sub-tasks, AI does others. Attuned to the jagged frontier.",
    practices: [
      { name: "Mapping the problem domain", detail: "Asking AI for general information related to the problem's domain, then using it to inform human-led analysis.", when: "Start of workflow" },
      { name: "Gathering methods info", detail: "Asking AI for specific information on methods the human is employing to solve a sub-task.", when: "During analysis" },
      { name: "Refining human output", detail: "Providing own output and using AI to refine presentation, structure, and clarity.", when: "End of workflow" },
    ],
  },
  cyborg: {
    label: "Cyborg Practices",
    desc: "Tight integration at every sub-task — intertwining efforts with AI at the frontier. For an observer, hard to tell where human ends and AI begins.",
    practices: [
      { name: "Modularising tasks", detail: "Breaking down tasks into multiple sub-steps for AI to execute — decomposition in action.", when: "Throughout", key: true },
      { name: "Demanding logic explanations", detail: "Asking AI to explain confusing output or why a particular recommendation was made.", when: "After generation", key: true },
      { name: "Exposing contradictions", detail: "Pointing out logical or factual inconsistencies in AI output.", when: "Evaluation", key: true },
      { name: "Pushing back", detail: "Disagreeing with output and asking AI to reconsider with additional context.", when: "Evaluation", key: true },
      { name: "Validating", detail: "Asking AI to check its own inputs, analysis, and outputs for consistency.", when: "Quality control" },
      { name: "Directing deep dives", detail: "Focusing AI on a particular data point, content area, or sub-task for elaboration.", when: "Exploration" },
      { name: "Adding own data", detail: "Feeding data back after AI produces initial analysis — iterative refinement cycles.", when: "Iteration" },
      { name: "Assigning a persona", detail: "Instructing AI to simulate a specific professional role — guiding it to relevant training data.", when: "Setup" },
      { name: "Teaching through examples", detail: "Giving examples of correct answers before asking AI a question.", when: "Setup" },
      { name: "Requesting editorial changes", detail: "Asking AI to make specific editorial modifications to its own outputs.", when: "Refinement" },
      { name: "Elaborating", detail: "Asking AI to bring more breadth, detail, and nuance on an interesting or unexpected point.", when: "Exploration" },
    ],
  },
};

function useDarkMode() {
  if (typeof window === "undefined") return false;
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ||
      document.documentElement.classList.contains("dark");
  } catch { return false; }
}

export default function CyborgPractices() {
  const [activeTab, setActiveTab] = useState("cyborg");
  const [hoveredPractice, setHoveredPractice] = useState(null);
  const dark = useDarkMode();

  const C = {
    bg: dark ? "#0E0C22" : "#F6F5F9",
    surface: dark ? "#141230" : "#FFFFFF",
    border: dark ? "#2A2850" : "#D0CEE0",
    text: dark ? "#ECE8F8" : "#1A1830",
    sub: dark ? "#B4B0CE" : "#3A3856",
    muted: dark ? "#7A78A0" : "#6E6C8A",
    teal: dark ? "#0EA5A5" : "#0EA5A5",
    tealBg: dark ? "rgba(14,165,165,0.08)" : "rgba(14,165,165,0.05)",
    blue: dark ? "#7A9EF0" : "#3458A8",
    blueBg: dark ? "rgba(122,158,240,0.08)" : "rgba(52,88,168,0.05)",
    keyBg: dark ? "rgba(14,165,165,0.12)" : "rgba(14,165,165,0.07)",
  };

  const data = PRACTICES[activeTab];
  const accentColor = activeTab === "cyborg" ? C.teal : C.blue;
  const accentBg = activeTab === "cyborg" ? C.tealBg : C.blueBg;

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: C.bg, padding: "20px 24px" }}>
      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, marginBottom: 16, borderBottom: `1px solid ${C.border}` }}>
        {Object.entries(PRACTICES).map(([key, val]) => (
          <button
            key={key}
            onClick={() => { setActiveTab(key); setHoveredPractice(null); }}
            style={{
              fontSize: 12, fontFamily: "'Helvetica Neue', Arial, sans-serif",
              padding: "10px 20px", cursor: "pointer",
              border: "none", borderBottom: `2px solid ${activeTab === key ? (key === "cyborg" ? C.teal : C.blue) : "transparent"}`,
              background: "transparent",
              color: activeTab === key ? C.text : C.muted,
              fontWeight: activeTab === key ? 600 : 400,
              textTransform: "uppercase", letterSpacing: "0.06em",
            }}
          >
            {val.label}
          </button>
        ))}
      </div>

      {/* Description */}
      <p style={{ fontSize: 13, color: C.sub, lineHeight: 1.6, margin: "0 0 16px 0" }}>
        {data.desc}
      </p>

      {/* Practices list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {data.practices.map((p, i) => {
          const isHov = hoveredPractice === i;
          const isKey = p.key;

          return (
            <div
              key={p.name}
              onMouseEnter={() => setHoveredPractice(i)}
              onMouseLeave={() => setHoveredPractice(null)}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 12,
                alignItems: "start",
                padding: "10px 14px",
                background: isHov ? accentBg : isKey ? C.keyBg : C.surface,
                border: `1px solid ${isHov ? accentColor + "40" : isKey ? accentColor + "20" : C.border}`,
                borderRadius: 3,
                cursor: "default",
                transition: "all 0.15s ease",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{
                    fontSize: 13, fontWeight: 600, color: C.text,
                    fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  }}>
                    {p.name}
                  </span>
                  {isKey && (
                    <span style={{
                      fontSize: 8, fontFamily: "'Helvetica Neue', Arial, sans-serif",
                      textTransform: "uppercase", letterSpacing: "0.1em",
                      color: accentColor, fontWeight: 700,
                      padding: "2px 6px", background: accentColor + "15",
                      borderRadius: 2,
                    }}>
                      Core practice
                    </span>
                  )}
                </div>
                {isHov && (
                  <p style={{ fontSize: 12, color: C.sub, margin: "6px 0 0 0", lineHeight: 1.5 }}>
                    {p.detail}
                  </p>
                )}
              </div>
              <span style={{
                fontSize: 10, fontFamily: "'Helvetica Neue', Arial, sans-serif",
                color: C.muted, whiteSpace: "nowrap",
              }}>
                {p.when}
              </span>
            </div>
          );
        })}
      </div>

      {/* Connection callout */}
      <div style={{
        marginTop: 16, padding: "14px 18px",
        background: C.surface, border: `1px solid ${C.border}`,
        borderLeft: `3px solid ${C.teal}`, borderRadius: 3,
      }}>
        <p style={{ fontSize: 12, color: C.sub, margin: 0, lineHeight: 1.6, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
          <strong style={{ color: C.text }}>The connection:</strong> The four core Cyborg practices — modularising, demanding explanations, exposing contradictions, pushing back — map directly onto the high-scoring patterns in the Shen study. Modularising <em>is</em> decomposition. Demanding explanations <em>is</em> Generation-Then-Comprehension. These are the same skill observed independently in two different studies, two different domains, two different populations.
        </p>
      </div>

      <p style={{ fontSize: 10, fontFamily: "'Helvetica Neue', Arial, sans-serif", color: C.muted, marginTop: 10, lineHeight: 1.5 }}>
        Source: Dell'Acqua et al. (2023), Harvard Business School Working Paper 24-013, Appendix E. Observed behaviors of 244 BCG consultants' GPT interaction logs during a realistic analytic task.
      </p>
    </div>
  );
}
