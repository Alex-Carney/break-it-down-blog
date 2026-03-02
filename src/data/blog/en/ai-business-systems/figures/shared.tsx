/* ─────────────────────────────────────────────────────────────
   Break it Down — Shared Figure Components
   ───────────────────────────────────────────────────────────── */

import type { Theme } from "./tokens";

/* ─── Figure Container ─── */

export const FigureContainer = ({
  children,
  t,
  title,
  subtitle,
  source,
  number,
  footnote,
}: {
  children: React.ReactNode;
  t: Theme;
  title?: string;
  subtitle?: string;
  source?: string;
  number?: string;
  footnote?: string;
}) => (
  <div
    style={{
      padding: "24px 20px 18px",
      background: t.surface,
      border: `1px solid ${t.border}`,
      borderRadius: 6,
      marginBottom: 48,
      fontFamily: "Inter, system-ui, sans-serif",
    }}
  >
    {(number || title) && (
      <div style={{ marginBottom: subtitle ? 4 : 16 }}>
        {number && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: t.accent,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 4,
              display: "block",
            }}
          >
            Figure {number}
          </span>
        )}
        {title && (
          <div style={{ fontSize: 14, fontWeight: 600, color: t.text, lineHeight: 1.4 }}>
            {title}
          </div>
        )}
      </div>
    )}
    {subtitle && (
      <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 16, lineHeight: 1.5 }}>
        {subtitle}
      </div>
    )}
    {children}
    {footnote && (
      <div
        style={{
          fontSize: 9,
          color: t.textFaint,
          marginTop: 12,
          lineHeight: 1.5,
          paddingTop: 8,
          borderTop: `1px solid ${t.borderLight}`,
          fontStyle: "italic",
        }}
      >
        {footnote}
      </div>
    )}
    {source && (
      <div
        style={{
          fontSize: 9,
          color: t.textMuted,
          marginTop: footnote ? 6 : 14,
          fontStyle: "italic",
          lineHeight: 1.5,
          borderTop: footnote ? "none" : `1px solid ${t.borderLight}`,
          paddingTop: footnote ? 0 : 10,
        }}
      >
        {source}
      </div>
    )}
  </div>
);

/* ─── Stat Card ─── */

export const StatCard = ({
  value,
  label,
  accent,
  t,
  delay = 0,
}: {
  value: string;
  label: string;
  accent: "positive" | "negative";
  t: Theme;
  delay?: number;
}) => {
  const isPositive = accent === "positive";
  const color = isPositive ? t.positive : t.negative;
  const bg = isPositive ? t.posBg : t.negBg;
  return (
    <div
      style={{
        flex: 1,
        padding: "14px 12px",
        borderRadius: 6,
        background: bg,
        borderTop: `3px solid ${color}`,
        animation: `fadeSlideIn 0.35s ease ${delay}s both`,
        minWidth: 0,
      }}
    >
      <div style={{ fontSize: 26, fontWeight: 300, color, lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: 10, color: t.textSub, marginTop: 6, lineHeight: 1.4 }}>
        {label}
      </div>
    </div>
  );
};

/* ─── Toggle Button ─── */

export const ToggleButton = ({
  active,
  onClick,
  children,
  t,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  t: Theme;
}) => (
  <button
    onClick={onClick}
    style={{
      padding: "8px 18px",
      fontSize: 12,
      fontWeight: 600,
      fontFamily: "Inter, system-ui, sans-serif",
      background: active ? t.tealBg : "transparent",
      color: active ? t.teal : t.textMuted,
      border: "none",
      borderBottom: active ? `3px solid ${t.teal}` : "3px solid transparent",
      cursor: "pointer",
      transition: "all 0.15s ease",
    }}
  >
    {children}
  </button>
);

/* ─── Callout ─── */

export const Callout = ({
  type,
  children,
  t,
}: {
  type: "evidence" | "warning" | "finding" | "data";
  children: React.ReactNode;
  t: Theme;
}) => {
  const colors = {
    evidence: { border: t.positive, bg: t.posBg },
    warning: { border: t.negative, bg: t.negBg },
    finding: { border: t.accent, bg: t.accentBg },
    data: { border: t.blue, bg: t.blueBg },
  };
  const labels = {
    evidence: "Evidence",
    warning: "Warning",
    finding: "Key finding",
    data: "Data note",
  };
  const c = colors[type] ?? colors.data;
  return (
    <div
      style={{
        padding: "9px 12px",
        borderLeft: `3px solid ${c.border}`,
        borderRadius: "0 4px 4px 0",
        background: c.bg,
        fontSize: 11,
        color: t.textSub,
        lineHeight: 1.6,
        marginTop: 12,
      }}
    >
      <strong style={{ color: c.border }}>{labels[type]}:</strong> {children}
    </div>
  );
};

/* ─── Wireframe Icons (Break it Down identity) ─── */

export const WireframePerson = ({
  size = 32,
  color,
  glow,
}: {
  size?: number;
  color: string;
  glow: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="10" r="5" stroke={color} strokeWidth="1" opacity="0.15" />
    <circle cx="16" cy="10" r="4" stroke={color} strokeWidth="1.2" opacity="0.7" />
    <circle cx="16" cy="6" r="1.5" fill={glow} opacity="0.9" />
    <circle cx="12" cy="10" r="1.2" fill={glow} opacity="0.7" />
    <circle cx="20" cy="10" r="1.2" fill={glow} opacity="0.7" />
    <line x1="16" y1="14" x2="16" y2="22" stroke={color} strokeWidth="1.2" opacity="0.7" />
    <line x1="16" y1="16" x2="10" y2="20" stroke={color} strokeWidth="1" opacity="0.5" />
    <line x1="16" y1="16" x2="22" y2="20" stroke={color} strokeWidth="1" opacity="0.5" />
    <line x1="16" y1="22" x2="11" y2="28" stroke={color} strokeWidth="1" opacity="0.5" />
    <line x1="16" y1="22" x2="21" y2="28" stroke={color} strokeWidth="1" opacity="0.5" />
    <circle cx="16" cy="14" r="1.2" fill={glow} opacity="0.8" />
    <circle cx="10" cy="20" r="1" fill={glow} opacity="0.6" />
    <circle cx="22" cy="20" r="1" fill={glow} opacity="0.6" />
    <circle cx="11" cy="28" r="1" fill={glow} opacity="0.6" />
    <circle cx="21" cy="28" r="1" fill={glow} opacity="0.6" />
  </svg>
);

export const WireframeCube = ({
  size = 32,
  color,
  glow,
}: {
  size?: number;
  color: string;
  glow: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <line x1="6" y1="9" x2="16" y2="4" stroke={color} strokeWidth="0.8" opacity="0.3" />
    <line x1="16" y1="4" x2="26" y2="9" stroke={color} strokeWidth="0.8" opacity="0.3" />
    <line x1="6" y1="9" x2="6" y2="21" stroke={color} strokeWidth="0.8" opacity="0.3" />
    <line x1="26" y1="9" x2="26" y2="21" stroke={color} strokeWidth="1.2" opacity="0.7" />
    <line x1="26" y1="21" x2="16" y2="26" stroke={color} strokeWidth="1.2" opacity="0.7" />
    <line x1="16" y1="26" x2="6" y2="21" stroke={color} strokeWidth="1.2" opacity="0.7" />
    <line x1="16" y1="10" x2="26" y2="15" stroke={color} strokeWidth="0.8" opacity="0.4" />
    <line x1="16" y1="10" x2="6" y2="15" stroke={color} strokeWidth="0.8" opacity="0.4" />
    <line
      x1="16"
      y1="10"
      x2="16"
      y2="26"
      stroke={color}
      strokeWidth="0.8"
      opacity="0.25"
      strokeDasharray="2,2"
    />
    {(
      [
        [16, 4],
        [26, 9],
        [26, 21],
        [16, 26],
        [6, 21],
        [6, 9],
        [16, 10],
      ] as [number, number][]
    ).map(([cx, cy], i) => (
      <g key={i}>
        <circle cx={cx} cy={cy} r="2.5" fill={glow} opacity="0.15" />
        <circle cx={cx} cy={cy} r="1.3" fill={glow} opacity="0.85" />
      </g>
    ))}
  </svg>
);

/* ─── Shared keyframes (inject once per figure that uses StatCard) ─── */

export const KEYFRAMES_CSS = `
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
