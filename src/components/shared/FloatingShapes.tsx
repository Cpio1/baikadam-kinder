import type { CSSProperties, ReactNode, SVGProps } from "react";

/** Набор аккуратных декоративных SVG-элементов. Все они aria-hidden. */
type ShapeProps = SVGProps<SVGSVGElement>;

export function Cloud(props: ShapeProps) {
  return (
    <svg viewBox="0 0 120 64" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M30 60h66a22 22 0 0 0 2.6-43.84A28 28 0 0 0 46.2 12.4 20 20 0 0 0 30 60Z" />
    </svg>
  );
}

export function Star(props: ShapeProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2.5c.5 0 .9.3 1.1.8l2 4.6 5 .5c1 .1 1.4 1.3.6 2l-3.8 3.4 1.1 4.9c.2 1-.8 1.7-1.7 1.2L12 17.3l-4.3 2.6c-.9.5-1.9-.2-1.7-1.2l1.1-4.9-3.8-3.4c-.8-.7-.4-1.9.6-2l5-.5 2-4.6c.2-.5.6-.8 1.1-.8Z" />
    </svg>
  );
}

export function Sparkle(props: ShapeProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 0c.6 5.8 2.2 8.9 12 12-9.8 3.1-11.4 6.2-12 12-.6-5.8-2.2-8.9-12-12C9.8 8.9 11.4 5.8 12 0Z" />
    </svg>
  );
}

export function Flower(props: ShapeProps) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" {...props}>
      <g fill="currentColor">
        <circle cx="20" cy="9" r="7.5" />
        <circle cx="31" cy="17" r="7.5" />
        <circle cx="27" cy="30" r="7.5" />
        <circle cx="13" cy="30" r="7.5" />
        <circle cx="9" cy="17" r="7.5" />
      </g>
      <circle cx="20" cy="20" r="6" fill="#f0e2cf" />
    </svg>
  );
}

export function Heart(props: ShapeProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 21s-7.5-4.6-9.6-9.4C.9 8.1 3 4 6.9 4c2.2 0 3.7 1.2 5.1 3 1.4-1.8 2.9-3 5.1-3 3.9 0 6 4.1 4.5 7.6C19.5 16.4 12 21 12 21Z" />
    </svg>
  );
}

/** Округление, чтобы координаты совпадали на сервере и клиенте. */
const r2 = (n: number) => Math.round(n * 100) / 100;

export function Sun(props: ShapeProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" {...props}>
      <g stroke="currentColor" strokeWidth="3.2" strokeLinecap="round">
        {Array.from({ length: 10 }).map((_, i) => {
          const a = (i / 10) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={r2(32 + Math.cos(a) * 20)}
              y1={r2(32 + Math.sin(a) * 20)}
              x2={r2(32 + Math.cos(a) * 28)}
              y2={r2(32 + Math.sin(a) * 28)}
            />
          );
        })}
      </g>
      <circle cx="32" cy="32" r="14" fill="currentColor" />
    </svg>
  );
}

export function Squiggle(props: ShapeProps) {
  return (
    <svg viewBox="0 0 120 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M2 12c10-12 20-12 30 0s20 12 30 0 20-12 30 0 16 10 26 4"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DotsGrid({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`dots-pattern pointer-events-none ${className}`} />;
}

/** Обёртка с мягким «плаванием» (CSS-анимация, отключается при reduced motion). */
export function Floating({
  children,
  className = "",
  delay = 0,
  slow = false,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  slow?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${slow ? "animate-float-slow" : "animate-float"} ${className}`}
      style={{ animationDelay: `${delay}s`, ...style }}
    >
      {children}
    </div>
  );
}

/** Мягкая волна-разделитель между разделами. */
export function Wave({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`block w-full ${flip ? "rotate-180" : ""} ${className}`}
    >
      <path
        fill="currentColor"
        d="M0 48c120-26 240-38 360-30s240 40 360 42 240-28 360-38 240 4 360 18v40H0Z"
      />
    </svg>
  );
}
