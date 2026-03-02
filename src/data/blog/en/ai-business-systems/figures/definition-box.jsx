import { fonts } from './theme';

export default function DefinitionBox({ children, t, term }) {
  return (
    <div style={{
      padding: "14px 16px",
      borderLeft: `3px solid ${t.blue}`,
      borderRadius: "0 6px 6px 0",
      background: t.blueBg,
      fontFamily: fonts.ui,
      margin: "20px 0",
    }}>
      <div style={{
        fontSize: 13, fontWeight: 700, color: t.text,
        marginBottom: 4, display: "flex", alignItems: "center", gap: 6,
      }}>
        <span style={{ fontSize: 10, color: t.blue }}>◆</span>
        {term}
      </div>
      <div style={{
        fontSize: 12.5, color: t.textSub, lineHeight: 1.6,
        fontFamily: fonts.body,
      }}>
        {children}
      </div>
    </div>
  );
}
