"use client";

import type { navItems } from "@/data/kindergarten";
import { handleAnchorClick } from "@/lib/navigation";

export function FooterNavLink({ item }: { item: (typeof navItems)[number] }) {
  return (
    <a href={`#${item.key}`} onClick={handleAnchorClick(item.key)} className="text-[0.92rem] text-white/75 transition-colors hover:text-white">
      {item.label}
    </a>
  );
}
