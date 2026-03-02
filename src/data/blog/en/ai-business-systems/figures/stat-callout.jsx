import { fonts } from './theme';

export default function StatCallout({ t, value, label, source, color }) {
  const c = color === "negative" ? t.negative
    : color === "positive" ? t.positive
    : color === "blue" ? t.blue
    : t.accent;
  const bg = color === "negative" ? t.negBg
    : color === "positive" ? t.posBg
    : color === "blue" ? t.blueBg
    : t.accentBg;

  return (
    <div style={{
      display: "inline-flex", flexDirection: "column",
      alignItems: "center", textAlign: "center",
      padding: "16px 24px",
      background: bg,
      borderTop: `3px solid ${c}`,
      borderRadius: "0 0 6px 6px",
      fontFamily: fonts.ui,
      margin: "16px 0",
      minWidth: 140,
    }}>
      <div style={{
        fontSize: 28, fontWeight: 300, color: c,
        lineHeight: 1, fontVariantNumeric: "tabular-nums",
      }}>
        {value}
      </div>
      <div style={{
        fontSize: 11, color: t.textSub, marginTop: 5, lineHeight: 1.4,
        maxWidth: 200,
      }}>
        {label}
      </div>
      {source && (
        <div style={{
          fontSize: 9, color: t.textFaint, marginTop: 4, fontStyle: "italic",
        }}>
          {source}
        </div>
      )}
    </div>
  );
}

export function StatRow({ children }) {
  return (
    <div style={{
      display: "flex", flexWrap: "wrap", gap: 12,
      justifyContent: "center",
      margin: "20px 0",
    }}>
      {children}
    </div>
  );
}
