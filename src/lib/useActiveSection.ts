"use client";

import { useEffect, useState } from "react";
import { navItems, type SectionKey } from "@/data/kindergarten";
import { findVisibleSection } from "./navigation";

/** Определяет раздел, который сейчас находится под шапкой, — для подсветки пункта меню. */
export function useActiveSection(): SectionKey {
  const [active, setActive] = useState<SectionKey>("home");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const line = window.innerHeight * 0.35;
        let current: SectionKey = "home";
        for (const item of navItems) {
          const el = findVisibleSection(item.key);
          if (el && el.getBoundingClientRect().top <= line) current = item.key;
        }
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = "contacts";
        setActive(current);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return active;
}
