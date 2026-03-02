import FigureContainer from './figure-container';

const DATA = [
  { label: "Pre-study prediction", value: -24, note: '"AI will save me 24% of my time"' },
  { label: "Post-study belief", value: -20, note: '"I think it saved me ~20%"' },
  { label: "Actual result", value: 19, note: "Measured: 19% slower" },
];

export default function PerceptionGap({ t }) {
  const barH = 36;
  const gapBetween = 10;
  const maxWidth = 380;
  const maxVal = 30;
  const scale = (v) => (Math.abs(v) / maxVal) * (maxWidth / 2);

  return (
    <FigureContainer
      t={t}
      title="The Perception Gap"
      subtitle="Experienced developers predicted AI would save them 24% of their time. They actually got 19% slower — and didn't notice."
      source="Becker et al. / METR (arXiv 2025). N=16 experienced open-source developers, 246 tasks, $150/hr."
    >
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        {/* Axis labels */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: 110,
            marginBottom: 6,
          }}
        >
          <span style={{ fontSize: 9, fontWeight: 600, color: t.positive }}>← Faster</span>
          <span style={{ fontSize: 9, fontWeight: 600, color: t.negative }}>Slower →</span>
        </div>

        {DATA.map((d, i) => {
          const isPositive = d.value < 0;
          const width = scale(d.value);
          const color = isPositive ? t.positive : t.negative;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: gapBetween,
                height: barH,
              }}
            >
              <div
                style={{
                  width: 105,
                  textAlign: "right",
                  paddingRight: 10,
                  fontSize: 10,
                  color: t.textSub,
                  fontWeight: 500,
                  lineHeight: 1.3,
                  flexShrink: 0,
                }}
              >
                {d.label}
              </div>

              <div style={{ flex: 1, position: "relative", height: barH }}>
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: 0,
                    bottom: 0,
                    width: 1,
                    background: t.border,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 4,
                    height: barH - 8,
                    left: isPositive ? `calc(50% - ${width}px)` : "50%",
                    width: width,
                    background: color,
                    opacity: 0.75,
                    borderRadius: isPositive ? "4px 0 0 4px" : "0 4px 4px 0",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    left: isPositive
                      ? `calc(50% - ${width + 40}px)`
                      : `calc(50% + ${width + 6}px)`,
                    fontSize: 12,
                    fontWeight: 700,
                    color,
                  }}
                >
                  {d.value > 0 ? `+${d.value}%` : `${d.value}%`}
                </div>
              </div>
            </div>
          );
        })}

        {/* 43pp gap callout */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 28,
            padding: "12px 18px",
            borderRadius: 6,
            background: t.blueBg,
            border: `1px solid ${t.blue}20`,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: t.blue, lineHeight: 1 }}>
              43
            </div>
            <div style={{ fontSize: 11, fontWeight: 500, color: t.blue, marginTop: 2 }}>
              percentage points
            </div>
            <div
              style={{ fontSize: 10, color: t.textMuted, marginTop: 6, lineHeight: 1.4 }}
            >
              The gap between what developers believed and what was measured.
              <br />
              They felt 20% faster. They were 19% slower.
            </div>
          </div>
        </div>
      </div>
    </FigureContainer>
  );
}
