import type { SectionKey } from "@/data/kindergarten";

/**
 * На странице одновременно есть desktop- и mobile-композиции (одна скрыта через CSS),
 * поэтому ищем видимый элемент раздела по атрибуту data-section.
 * Отступ под фиксированную шапку задаётся через scroll-margin-top в globals.css.
 */
export function findVisibleSection(key: SectionKey | string): HTMLElement | null {
  const nodes = document.querySelectorAll<HTMLElement>(`[data-section="${key}"]`);
  for (const node of nodes) {
    if (node.getClientRects().length > 0) return node;
  }
  return null;
}

export function scrollToSection(key: SectionKey, smooth = true) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (key === "home") {
    window.scrollTo({ top: 0, behavior: smooth && !reduce ? "smooth" : "auto" });
  } else {
    const el = findVisibleSection(key);
    if (!el) return;
    el.scrollIntoView({ behavior: smooth && !reduce ? "smooth" : "auto", block: "start" });
  }
  if (window.location.hash !== `#${key}`) {
    window.history.replaceState(null, "", key === "home" ? window.location.pathname : `#${key}`);
  }
}

/** onClick для ссылок вида <a href="#about">. */
export function handleAnchorClick(key: SectionKey, after?: () => void) {
  return (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    after?.();
    scrollToSection(key);
  };
}
