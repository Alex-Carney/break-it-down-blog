import { useState, useCallback } from "react";
import type { Theme } from "./tokens";
import {
  FigureContainer,
  StatCard,
  ToggleButton,
  Callout,
  WireframePerson,
  WireframeCube,
} from "./shared";

const DELEGATION_STATS = [
  {
    value: "−19%",
    label: "accuracy on judgment tasks (BCG, N=758)",
    accent: "negative" as const,
  },
  {
    value: "+19%",
    label: "slower in own codebase (METR, N=16)",
    accent: "negative" as const,
  },
  {
    value: "−17%",
    label: "knowledge retention (Anthropic, N=52)",
    accent: "negative" as const,
  },
];

const DECOMPOSITION_STATS = [
  {
    value: "+40%",
    label: "quality on structured tasks (BCG, N=758)",
    accent: "positive" as const,
  },
  {
    value: "86%",
    label: "score with generation-then-comprehension (Anthropic, N=52)",
    accent: "positive" as const,
  },
  {
    value: "+34%",
    label: "productivity for newer workers (QJE, N=5,172)",
    accent: "positive" as const,
  },
];

export default function ThesisToggle({ t }: { t: Theme }) {
  const [mode, setMode] = useState<"delegation" | "decomposition">("delegation");
  const isDelegation = mode === "delegation";
  const stats = isDelegation ? DELEGATION_STATS : DECOMPOSITION_STATS;
  const outcomeColor = isDelegation ? t.negative : t.positive;
  const outcomeBg = isDelegation ? t.negBg : t.posBg;
  const [animKey, setAnimKey] = useState(0);

  const handleToggle = useCallback((m: "delegation" | "decomposition") => {
    setMode(m);
    setAnimKey((k) => k + 1);
  }, []);

  const iconColor = t.accent;
  const iconGlow = t.teal;

  return (
    <FigureContainer
      t={t}
      number="1"
      title="The Central Finding"
      subtitle="Across multiple controlled studies, the way people collaborate with AI — not the tool, the prompt, or years of experience — is the strongest predictor of whether outcomes improve or degrade."
      source="Dell'Acqua et al. (HBS 2023, N=758); Becker et al. / METR (2025, N=16); Shen & Tamkin (Anthropic 2026, N=52); Brynjolfsson et al. (QJE 2025, N=5,172)."
      footnote="* These studies compare groups of workers using different collaboration modes, not the same individual tested twice. 'Same worker' reflects that the studies controlled for skill level, tool access, and task type — isolating the mode as the key variable. Effect sizes are primary reported outcomes."
    >
      {/* Equation row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          marginBottom: 20,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            padding: "6px 14px",
            borderRadius: 6,
            background: t.surfaceAlt,
            border: `1px solid ${t.borderLight}`,
            fontSize: 12,
            fontWeight: 500,
            color: t.text,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <WireframePerson size={28} color={iconColor} glow={iconGlow} />
          <span>Same worker*</span>
        </div>
        <span style={{ fontSize: 18, fontWeight: 300, color: t.textFaint }}>+</span>
        <div
          style={{
            padding: "6px 14px",
            borderRadius: 6,
            background: t.surfaceAlt,
            border: `1px solid ${t.borderLight}`,
            fontSize: 12,
            fontWeight: 500,
            color: t.text,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <WireframeCube size={28} color={iconColor} glow={iconGlow} />
          <span>Same tool</span>
        </div>
        <span style={{ fontSize: 18, fontWeight: 300, color: t.textFaint }}>→</span>
        <div
          style={{
            padding: "8px 16px",
            borderRadius: 6,
            background: outcomeBg,
            border: `1px solid ${outcomeColor}40`,
            fontSize: 14,
            fontWeight: 700,
            color: outcomeColor,
            transition: "all 0.3s ease",
            minWidth: 80,
            textAlign: "center",
          }}
        >
          {isDelegation ? "Worse" : "Better"}
        </div>
      </div>

      {/* Toggle */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 0,
          borderBottom: `1px solid ${t.borderLight}`,
          marginBottom: 18,
        }}
      >
        <ToggleButton
          active={isDelegation}
          onClick={() => handleToggle("delegation")}
          t={t}
        >
          Delegation mode
        </ToggleButton>
        <ToggleButton
          active={!isDelegation}
          onClick={() => handleToggle("decomposition")}
          t={t}
        >
          Decomposition mode
        </ToggleButton>
      </div>

      {/* Mode description */}
      <div
        style={{
          fontSize: 11,
          color: t.textMuted,
          textAlign: "center",
          marginBottom: 16,
          lineHeight: 1.5,
          maxWidth: 520,
          margin: "0 auto 16px",
        }}
      >
        {isDelegation
          ? "Send the full task to AI. Paste the output. Move on. Fast — but you never engage with why the output works or whether it's right."
          : "Break the task into sub-steps. Direct the AI through each one. Ask follow-up questions. Validate against what you know. Takes ~4 minutes longer."}
      </div>

      {/* Stats */}
      <div key={animKey} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {stats.map((s, i) => (
          <StatCard key={`${mode}-${i}`} {...s} t={t} delay={i * 0.07} />
        ))}
      </div>

      <Callout type={isDelegation ? "warning" : "evidence"} t={t}>
        {isDelegation
          ? "The default way most people use AI — sending full tasks and accepting outputs — consistently produces worse outcomes on complex work requiring judgment."
          : "Breaking tasks into directed sub-steps and interrogating AI outputs produces gains of 40–86% — but only ~14% of users in the Shen study naturally adopted this mode."}
      </Callout>
    </FigureContainer>
  );
}
