import { useState } from "react";
import { fonts } from './theme';
import FigureContainer from './figure-container';

export default function TwoLoops({ t }) {
  const [hoveredNode, setHoveredNode] = useState(null);

  const cognitiveSteps = [
    { id: "c1", label: "Delegation", detail: "Practitioner accepts AI output without interrogation" },
    { id: "c2", label: "Reduced friction", detail: "Fewer errors encountered (median 1 vs. 3 without AI)" },
    { id: "c3", label: "Less understanding", detail: "Mental model of the domain stops updating" },
    { id: "c4", label: "Can't detect failures", detail: "Unable to recognize when AI output crosses the frontier" },
  ];

  const motivationalSteps = [
    { id: "m1", label: "AI feels easy", detail: "Smooth interaction creates subjective sense of productivity" },
    { id: "m2", label: "Less intrinsic motivation", detail: "Decreased drive for independent work, even when feeling in control" },
    { id: "m3", label: "Preference for AI", detail: "Even when recognizing capacity, participants preferred AI assistance" },
    { id: "m4", label: "Less willingness to engage", detail: "The effort of interrogation feels unnecessary" },
  ];

  const ringR = 85, centerGap = 50, svgW = 580, svgH = 260;
  const leftCx = svgW / 2 - ringR - centerGap;
  const rightCx = svgW / 2 + ringR + centerGap;
  const cy = svgH / 2 + 5;

  const nodePos = (cx, i, total) => {
    const a = -Math.PI / 2 + (i / total) * 2 * Math.PI;
    return { x: cx + ringR * Math.cos(a), y: cy + ringR * Math.sin(a) };
  };

  const renderLoop = (steps, cx, label, color) => (
    <g>
      {/* Dashed ring */}
      <circle cx={cx} cy={cy} r={ringR} fill="none" stroke={t.borderLight} strokeWidth={1.5} strokeDasharray="4,4" />

      {/* Direction arrows at 4 positions around the ring */}
      {[0.15, 0.4, 0.65, 0.9].map((f, i) => {
        const a = -Math.PI / 2 + f * 2 * Math.PI;
        const ax = cx + ringR * Math.cos(a), ay = cy + ringR * Math.sin(a);
        const ta = a + Math.PI / 2, s = 4;
        return (
          <polygon
            key={i}
            points={`${ax + s * Math.cos(ta)},${ay + s * Math.sin(ta)} ${ax + s * Math.cos(ta + 2.5)},${ay + s * Math.sin(ta + 2.5)} ${ax + s * Math.cos(ta - 2.5)},${ay + s * Math.sin(ta - 2.5)}`}
            fill={t.textFaint}
            opacity={0.5}
          />
        );
      })}

      {/* Center label */}
      <text x={cx} y={cy - 6} textAnchor="middle" fill={color} fontSize={11} fontWeight={700} fontFamily={fonts.ui}>
        {label}
      </text>
      <text x={cx} y={cy + 8} textAnchor="middle" fill={t.textFaint} fontSize={9} fontFamily={fonts.ui}>
        loop
      </text>

      {/* Numbered nodes */}
      {steps.map((step, i) => {
        const p = nodePos(cx, i, steps.length);
        const hov = hoveredNode === step.id;
        return (
          <g
            key={step.id}
            onMouseEnter={() => setHoveredNode(step.id)}
            onMouseLeave={() => setHoveredNode(null)}
            style={{ cursor: "default" }}
          >
            {hov && <circle cx={p.x} cy={p.y} r={20} fill={color} opacity={0.1} />}
            <circle
              cx={p.x} cy={p.y} r={14}
              fill={hov ? color + "20" : t.surfaceAlt}
              stroke={hov ? color : t.border}
              strokeWidth={hov ? 2 : 1}
            />
            <text
              x={p.x} y={p.y + 1}
              textAnchor="middle" dominantBaseline="middle"
              fill={hov ? color : t.textSub}
              fontSize={11} fontWeight={600} fontFamily={fonts.ui}
            >
              {i + 1}
            </text>
          </g>
        );
      })}
    </g>
  );

  /* "Mutually reinforcing" connector lines between the two loops */
  const connectorY1 = cy - 28;
  const connectorY2 = cy + 28;
  const leftEdge = leftCx + ringR + 4;
  const rightEdge = rightCx - ringR - 4;

  const active = hoveredNode
    ? [...cognitiveSteps, ...motivationalSteps].find(s => s.id === hoveredNode)
    : null;
  const isCog = hoveredNode?.startsWith("c");

  return (
    <FigureContainer
      t={t}
      title="Delegation creates two reinforcing loops that degrade both the capacity and the desire to evaluate AI output"
      source="Cognitive loop: Shen & Tamkin (2026), Budzyń et al. (2025). Motivational loop: Wu et al. (2025), N=3,562."
    >
      {/* SVG with both loops */}
      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        style={{ width: "100%", maxWidth: svgW, display: "block", margin: "0 auto" }}
      >
        {/* Left loop — Ability (cognitive) */}
        {renderLoop(cognitiveSteps, leftCx, "Ability", t.negative)}

        {/* Right loop — Desire (motivational) */}
        {renderLoop(motivationalSteps, rightCx, "Desire", t.blue)}

      </svg>

      {/* Label between the loops — below SVG */}
      <div style={{
        textAlign: "center", marginTop: 4, marginBottom: 8,
        fontSize: 10, fontStyle: "italic", color: t.textMuted,
        letterSpacing: "0.04em",
      }}>
        These loops are mutually reinforcing
      </div>

      {/* Detail panel — shows hovered node info */}
      {active && (
        <div style={{
          marginTop: 10,
          padding: "10px 14px",
          borderRadius: 6,
          background: t.surface,
          border: `1px solid ${(isCog ? t.negative : t.blue)}30`,
          borderLeft: `3px solid ${isCog ? t.negative : t.blue}`,
          transition: "all 0.2s ease",
        }}>
          <div style={{
            fontSize: 11, fontWeight: 600,
            color: isCog ? t.negative : t.blue,
            marginBottom: 3, fontFamily: fonts.ui,
          }}>
            {active.label}
          </div>
          <div style={{ fontSize: 10, color: t.textSub, lineHeight: 1.5, fontFamily: fonts.ui }}>
            {active.detail}
          </div>
        </div>
      )}

      {/* Two-column step lists */}
      <div style={{
        display: "flex", gap: 24, justifyContent: "center",
        flexWrap: "wrap", marginTop: 14,
      }}>
        {/* Cognitive (Ability) column */}
        <div style={{ flex: 1, minWidth: 190 }}>
          <div style={{
            fontSize: 9, fontWeight: 700, color: t.negative,
            textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6,
            fontFamily: fonts.ui,
          }}>
            Cognitive loop
          </div>
          {cognitiveSteps.map((s, i) => {
            const isActive = hoveredNode === s.id;
            return (
              <div
                key={s.id}
                onMouseEnter={() => setHoveredNode(s.id)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{
                  fontSize: 10, fontFamily: fonts.ui,
                  color: isActive ? t.negative : t.textSub,
                  fontWeight: isActive ? 600 : 400,
                  padding: "3px 0", display: "flex", gap: 5,
                  cursor: "default", transition: "all 0.15s ease",
                }}
              >
                <span style={{ fontWeight: 600, width: 14, flexShrink: 0 }}>{i + 1}.</span>
                {s.label}
              </div>
            );
          })}
        </div>

        {/* Motivational (Desire) column */}
        <div style={{ flex: 1, minWidth: 190 }}>
          <div style={{
            fontSize: 9, fontWeight: 700, color: t.blue,
            textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6,
            fontFamily: fonts.ui,
          }}>
            Motivational loop
          </div>
          {motivationalSteps.map((s, i) => {
            const isActive = hoveredNode === s.id;
            return (
              <div
                key={s.id}
                onMouseEnter={() => setHoveredNode(s.id)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{
                  fontSize: 10, fontFamily: fonts.ui,
                  color: isActive ? t.blue : t.textSub,
                  fontWeight: isActive ? 600 : 400,
                  padding: "3px 0", display: "flex", gap: 5,
                  cursor: "default", transition: "all 0.15s ease",
                }}
              >
                <span style={{ fontWeight: 600, width: 14, flexShrink: 0 }}>{i + 1}.</span>
                {s.label}
              </div>
            );
          })}
        </div>
      </div>

      {/* Evidence callout */}
      <div style={{
        marginTop: 14, padding: "9px 12px",
        borderLeft: `3px solid ${t.accent}`,
        borderRadius: "0 4px 4px 0",
        background: t.accentBg,
        fontSize: 11, color: t.textSub, lineHeight: 1.6,
        fontFamily: fonts.ui,
      }}>
        <strong style={{ color: t.accent }}>Key finding:</strong>{" "}
        Endoscopists lost 22% detection accuracy after just three months with AI assistance
        (Budzyń et al., Lancet 2025). The cognitive loop can onset in as little as one hour;
        the motivational loop has immediate onset. Together they create a dependency where you lose
        both the capacity and the desire to evaluate AI output — exactly when critical evaluation
        matters most.
      </div>
    </FigureContainer>
  );
}
