"use client";

import { MotionConfig } from "motion/react";
import { useEffect, type ReactNode } from "react";
import { scrollToSection } from "@/lib/navigation";
import type { SectionKey } from "@/data/kindergarten";

/** Глобальные настройки анимаций: учитывает prefers-reduced-motion и обрабатывает #якорь при загрузке. */
export function MotionProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "").replace(/^m-/, "");
    if (!hash) return;
    const id = window.setTimeout(() => scrollToSection(hash as SectionKey, false), 120);
    return () => window.clearTimeout(id);
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
