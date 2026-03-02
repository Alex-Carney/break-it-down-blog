import { fonts } from './theme';

export default function FigureContainer({ children, t, title, subtitle, source, footnote }) {
  return (
    <div style={{
      padding: "28px 24px 20px", background: t.surface,
      border: `1px solid ${t.border}`, borderRadius: 8,
      fontFamily: fonts.ui,
    }}>
      {title && (
        <div style={{ marginBottom: subtitle ? 6 : 18 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: t.text, lineHeight: 1.45 }}>
            {title}
          </div>
        </div>
      )}
      {subtitle && (
        <div style={{ fontSize: 12, color: t.textMuted, marginBottom: 20, lineHeight: 1.55, maxWidth: 520 }}>
          {subtitle}
        </div>
      )}
      {children}
      {footnote && (
        <div style={{
          fontSize: 9.5, color: t.textFaint, marginTop: 14, lineHeight: 1.55,
          paddingTop: 10, borderTop: `1px solid ${t.borderLight}`, fontStyle: "italic",
        }}>{footnote}</div>
      )}
      {source && (
        <div style={{
          fontSize: 9.5, color: t.textMuted, marginTop: footnote ? 6 : 16,
          fontStyle: "italic", lineHeight: 1.55,
          borderTop: footnote ? "none" : `1px solid ${t.borderLight}`,
          paddingTop: footnote ? 0 : 10,
        }}>{source}</div>
      )}
    </div>
  );
}

export const KEYFRAMES_CSS = `
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
`;
