import { fonts } from './theme';

export default function ExampleBox({ children, t, title }) {
  return (
    <div style={{
      padding: "12px 16px",
      borderLeft: `3px solid ${t.positive}`,
      borderRadius: "0 6px 6px 0",
      background: t.posBg,
      fontFamily: fonts.ui,
      margin: "20px 0",
    }}>
      <div style={{
        fontSize: 10, fontWeight: 700, color: t.positive,
        textTransform: "uppercase", letterSpacing: "0.08em",
        marginBottom: 6, display: "flex", alignItems: "center", gap: 5,
      }}>
        <span style={{ fontSize: 12 }}>◆</span>
        {title || "Example"}
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
