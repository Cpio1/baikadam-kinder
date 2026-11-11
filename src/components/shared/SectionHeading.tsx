import type { ReactNode } from "react";
import { Sparkle } from "./FloatingShapes";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  size?: "md" | "sm";
  as?: "h2" | "h3";
  id?: string;
  className?: string;
};

/** Заголовок раздела: маленькая надпись, заголовок и подзаголовок. */
export function SectionHeading({ eyebrow, title, subtitle, align = "left", size = "md", as = "h2", id, className = "" }: Props) {
  const Tag = as;
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && (
        <p
          className={`mb-3 inline-flex items-center gap-2 rounded-full bg-sky px-3.5 py-1.5 text-[0.8rem] font-bold tracking-wide text-blue ${centered ? "" : ""}`}
        >
          <Sparkle className="size-3.5 text-brown-soft" />
          {eyebrow}
        </p>
      )}
      <Tag
        id={id}
        className={`font-display font-extrabold leading-[1.12] tracking-[-0.01em] text-ink text-balance ${
          size === "md" ? "text-[1.75rem] sm:text-[2rem] lg:text-[2.25rem] 2xl:text-[2.6rem]" : "text-[1.4rem] lg:text-[1.75rem]"
        }`}
      >
        {title}
      </Tag>
      {subtitle && (
        <p className={`mt-3 text-[1rem] leading-relaxed text-ink-soft lg:text-[1.075rem] ${centered ? "mx-auto max-w-xl" : "max-w-xl"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
