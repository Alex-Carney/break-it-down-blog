import { fonts } from './theme';

export default function KeyInsight({ children, t }) {
  return (
    <div style={{
      padding: "12px 16px",
      borderLeft: `3px solid ${t.accent}`,
      borderRadius: "0 6px 6px 0",
      background: t.accentBg,
      fontFamily: fonts.ui,
      margin: "20px 0",
    }}>
      <div style={{
        fontSize: 10, fontWeight: 700, color: t.accent,
        textTransform: "uppercase", letterSpacing: "0.08em",
        marginBottom: 6, display: "flex", alignItems: "center", gap: 5,
      }}>
        <span style={{ fontSize: 12 }}>◆</span>
        Key insight
      </div>
      <div style={{
        fontSize: 13, color: t.textSub, lineHeight: 1.6,
        fontFamily: fonts.body,
      }}>
        {children}
      </div>
    </div>
  );
}
