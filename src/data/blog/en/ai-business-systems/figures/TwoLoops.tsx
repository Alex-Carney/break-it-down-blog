import { useState } from "react";
import type { Theme } from "./tokens";
import { FigureContainer, Callout } from "./shared";

const COGNITIVE_STEPS = [
  {
    label: "Delegate to AI",
    detail: "Send full tasks to AI and accept outputs without interrogation.",
    evidence: null,
  },
  {
    label: "Encounter fewer errors",
    detail:
      "AI shields you from the friction — the specific, informative errors that force understanding.",
    evidence:
      "AI-assisted devs hit 1 error (median) vs. 3 without AI. — Shen & Tamkin (2026)",
  },
  {
    label: "Build less understanding",
    detail: "Without confronting errors, you don't learn how the system actually works.",
    evidence:
      "−17% on knowledge test, largest gap on debugging questions. — Shen & Tamkin (2026)",
  },
  {
    label: "Less able to evaluate AI",
    detail:
      "You can no longer tell when AI output is wrong — the skill you most need erodes first.",
    evidence:
      "Endoscopists lost 22% detection accuracy after 3 months with AI. — Budzyń et al. (Lancet 2025)",
  },
];

const MOTIVATIONAL_STEPS = [
  {
    label: "Collaborate with AI",
    detail: "Experience the ease and fluency of AI-assisted work.",
    evidence: null,
  },
  {
    label: "Solo work feels boring",
    detail:
      "After AI collaboration, unassisted work feels like drudgery — even when you know you're in control.",
    evidence:
      "Decreased intrinsic motivation + increased boredom after AI collaboration. — Wu et al. (Sci Reports, N=3,562)",
  },
  {
    label: "Motivation drops",
    detail: "You feel more in control during solo work. You just don't want to be doing it.",
    evidence: "Immediate onset, measured across 4 experiments. — Wu et al. (2025)",
  },
  {
    label: "Reach for AI more",
    detail:
      "Lower motivation → more AI use → less solo practice → solo capacity shrinks further.",
    evidence:
      "Students using unguarded AI scored 17% worse after access removed. — Bastani et al. (Wharton 2024)",
  },
];

interface HoveredStep {
  loop: "cognitive" | "motivational";
  index: number;
}

export default function TwoLoops({ t }: { t: Theme }) {
  const [hoveredStep, setHoveredStep] = useState<HoveredStep | null>(null);
  const [hoveredCenter, setHoveredCenter] = useState<string | null>(null);

  const dimOther = hoveredCenter !== null;

  const svgW = 540;
  const svgH = 330;
  const cogCx = 160,
    motCx = 380,
    cy = 160,
    R = 105;

  const renderLoop = (
    steps: typeof COGNITIVE_STEPS,
    loop: "cognitive" | "motivational",
    cx: number,
    label: string,
    sublabel: string,
    color: string,
    colorLight: string
  ) => {
    const isActive = !dimOther || hoveredCenter === loop;
    const groupOpacity = isActive ? 1 : 0.2;

    return (
      <g opacity={groupOpacity} style={{ transition: "opacity 0.3s ease" }}>
        {/* Ring */}
        <circle
          cx={cx}
          cy={cy}
          r={R}
          fill="none"
          stroke={color}
          strokeWidth={1.2}
          opacity={0.18}
          strokeDasharray="6,4"
        />

        {/* Directional arrows along the ring */}
        {steps.map((_, i) => {
          const a1 = (i / steps.length) * Math.PI * 2 - Math.PI / 2;
          const a2 = ((i + 1) / steps.length) * Math.PI * 2 - Math.PI / 2;
          const midA = (a1 + a2) / 2;
          const ax = cx + Math.cos(midA) * R;
          const ay = cy + Math.sin(midA) * R;
          const tangent = midA + Math.PI / 2;
          const arrowLen = 5;
          return (
            <g key={`arrow-${i}`} opacity={0.35}>
              <line
                x1={ax - Math.cos(tangent - 0.5) * arrowLen}
                y1={ay - Math.sin(tangent - 0.5) * arrowLen}
                x2={ax}
                y2={ay}
                stroke={color}
                strokeWidth={1.2}
              />
              <line
                x1={ax - Math.cos(tangent + 0.5) * arrowLen}
                y1={ay - Math.sin(tangent + 0.5) * arrowLen}
                x2={ax}
                y2={ay}
                stroke={color}
                strokeWidth={1.2}
              />
            </g>
          );
        })}

        {/* Center label */}
        <g
          style={{ cursor: "pointer" }}
          onMouseEnter={() => setHoveredCenter(loop)}
          onMouseLeave={() => setHoveredCenter(null)}
        >
          <circle
            cx={cx}
            cy={cy}
            r={30}
            fill={colorLight}
            stroke={color}
            strokeWidth={0.5}
            opacity={0.5}
          />
          <text
            x={cx}
            y={cy - 4}
            textAnchor="middle"
            fontSize={13}
            fontWeight={700}
            fill={color}
            fontFamily="Inter, system-ui"
          >
            {label}
          </text>
          <text
            x={cx}
            y={cy + 10}
            textAnchor="middle"
            fontSize={8.5}
            fill={t.textMuted}
            fontFamily="Inter, system-ui"
          >
            {sublabel}
          </text>
        </g>

        {/* Step nodes */}
        {steps.map((step, i) => {
          const angle = (i / steps.length) * Math.PI * 2 - Math.PI / 2;
          const sx = cx + Math.cos(angle) * R;
          const sy = cy + Math.sin(angle) * R;
          const isHov = hoveredStep?.loop === loop && hoveredStep?.index === i;

          return (
            <g
              key={i}
              onMouseEnter={() => {
                setHoveredStep({ loop, index: i });
                setHoveredCenter(loop);
              }}
              onMouseLeave={() => {
                setHoveredStep(null);
                setHoveredCenter(null);
              }}
              style={{ cursor: "pointer" }}
            >
              <circle
                cx={sx}
                cy={sy}
                r={isHov ? 22 : 18}
                fill={color}
                opacity={isHov ? 0.12 : 0.04}
                style={{ transition: "all 0.15s ease" }}
              />
              <circle
                cx={sx}
                cy={sy}
                r={isHov ? 16 : 14}
                fill={colorLight}
                stroke={color}
                strokeWidth={isHov ? 2 : 1}
                style={{ transition: "all 0.15s ease" }}
              />
              <text
                x={sx}
                y={sy + 1}
                textAnchor="middle"
                fontSize={12}
                fontWeight={700}
                fill={color}
                fontFamily="Inter, system-ui"
                style={{ pointerEvents: "none" }}
              >
                {i + 1}
              </text>
            </g>
          );
        })}
      </g>
    );
  };

  const activeStep = hoveredStep
    ? (hoveredStep.loop === "cognitive" ? COGNITIVE_STEPS : MOTIVATIONAL_STEPS)[
        hoveredStep.index
      ]
    : null;
  const activeColor = hoveredStep?.loop === "cognitive" ? t.accent : t.blue;

  return (
    <FigureContainer
      t={t}
      number="4"
      title="The Dependency Trap: Two Reinforcing Loops"
      subtitle="AI delegation erodes both the ability and the desire to work without AI. Hover over each step for the mechanism and evidence."
      source="Shen & Tamkin (2026); Budzyń et al. (Lancet 2025); Bastani et al. (Wharton 2024); Wu et al. (Scientific Reports 2025, N=3,562)."
    >
      <div style={{ position: "relative" }}>
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          style={{ width: "100%", maxWidth: svgW, display: "block", margin: "0 auto" }}
        >
          {renderLoop(
            COGNITIVE_STEPS,
            "cognitive",
            cogCx,
            "Skill",
            "lose the ability",
            t.accent,
            t.accentBg
          )}
          {renderLoop(
            MOTIVATIONAL_STEPS,
            "motivational",
            motCx,
            "Desire",
            "lose the appetite",
            t.blue,
            t.blueBg
          )}
        </svg>

        {/* Step labels */}
        <div
          style={{
            display: "flex",
            gap: 24,
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: 4,
          }}
        >
          <div style={{ flex: 1, minWidth: 190 }}>
            <div
              style={{
                fontSize: 9,
                fontWeight: 700,
                color: t.accent,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 6,
              }}
            >
              Cognitive loop
            </div>
            {COGNITIVE_STEPS.map((s, i) => {
              const isActive =
                hoveredStep?.loop === "cognitive" && hoveredStep.index === i;
              return (
                <div
                  key={i}
                  style={{
                    fontSize: 10,
                    color: isActive ? t.accent : t.textSub,
                    fontWeight: isActive ? 600 : 400,
                    padding: "3px 0",
                    display: "flex",
                    gap: 5,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={() => {
                    setHoveredStep({ loop: "cognitive", index: i });
                    setHoveredCenter("cognitive");
                  }}
                  onMouseLeave={() => {
                    setHoveredStep(null);
                    setHoveredCenter(null);
                  }}
                >
                  <span style={{ fontWeight: 600, width: 14, flexShrink: 0 }}>{i + 1}.</span>
                  {s.label}
                </div>
              );
            })}
          </div>
          <div style={{ flex: 1, minWidth: 190 }}>
            <div
              style={{
                fontSize: 9,
                fontWeight: 700,
                color: t.blue,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 6,
              }}
            >
              Motivational loop
            </div>
            {MOTIVATIONAL_STEPS.map((s, i) => {
              const isActive =
                hoveredStep?.loop === "motivational" && hoveredStep.index === i;
              return (
                <div
                  key={i}
                  style={{
                    fontSize: 10,
                    color: isActive ? t.blue : t.textSub,
                    fontWeight: isActive ? 600 : 400,
                    padding: "3px 0",
                    display: "flex",
                    gap: 5,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={() => {
                    setHoveredStep({ loop: "motivational", index: i });
                    setHoveredCenter("motivational");
                  }}
                  onMouseLeave={() => {
                    setHoveredStep(null);
                    setHoveredCenter(null);
                  }}
                >
                  <span style={{ fontWeight: 600, width: 14, flexShrink: 0 }}>{i + 1}.</span>
                  {s.label}
                </div>
              );
            })}
          </div>
        </div>

        {/* Detail panel */}
        {activeStep && (
          <div
            style={{
              marginTop: 12,
              padding: "10px 14px",
              borderRadius: 6,
              background: t.surface,
              border: `1px solid ${activeColor}30`,
              borderLeft: `3px solid ${activeColor}`,
              transition: "all 0.2s ease",
            }}
          >
            <div
              style={{ fontSize: 11, fontWeight: 600, color: activeColor, marginBottom: 4 }}
            >
              {activeStep.label}
            </div>
            <div style={{ fontSize: 10, color: t.textSub, lineHeight: 1.5 }}>
              {activeStep.detail}
            </div>
            {activeStep.evidence && (
              <div
                style={{
                  fontSize: 9,
                  color: t.textMuted,
                  marginTop: 6,
                  fontStyle: "italic",
                  lineHeight: 1.4,
                }}
              >
                {activeStep.evidence}
              </div>
            )}
          </div>
        )}
      </div>

      <Callout type="finding" t={t}>
        The cognitive loop operates in as little as one hour (Shen study) to three months
        (endoscopy study). The motivational loop has immediate onset. Together, they create a
        dependency where you lose both the capacity and the desire to evaluate AI output —
        exactly when critical evaluation matters most.
      </Callout>
    </FigureContainer>
  );
}
