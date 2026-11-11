"use client";

import { motion } from "motion/react";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { contacts, ctaText, navItems } from "@/data/kindergarten";
import { handleAnchorClick } from "@/lib/navigation";
import { useActiveSection } from "@/lib/useActiveSection";
import { WhatsAppIcon } from "../shared/BrandIcons";
import { Logo } from "../shared/Logo";

export function DesktopHeader() {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 h-[72px] transition-[background-color,box-shadow] duration-300 ${
        scrolled ? "bg-white/88 shadow-[0_6px_24px_-14px_rgb(35_63_89/0.35)] backdrop-blur-md" : "bg-bg/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between gap-6 px-6 xl:px-8">
        <a href="#home" onClick={handleAnchorClick("home")} aria-label="«Байкадам» балабақшасы — басты бет" className="shrink-0">
          <Logo size={42} />
        </a>

        <nav aria-label="Негізгі мәзір">
          <ul className="flex items-center gap-0.5 rounded-full border border-sky-deep/60 bg-white/80 p-1 shadow-[0_4px_16px_-10px_rgb(35_63_89/0.25)]">
            {navItems.map((item) => {
              const isActive = active === item.key;
              return (
                <li key={item.key} className="relative">
                  {isActive && (
                    <motion.span
                      layoutId="desktop-nav-pill"
                      className="absolute inset-0 rounded-full bg-sky"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <a
                    href={`#${item.key}`}
                    onClick={handleAnchorClick(item.key)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative block whitespace-nowrap rounded-full px-2.5 py-2 text-[0.86rem] font-bold transition-colors xl:px-3.5 ${
                      isActive ? "text-blue" : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <a href={contacts.phoneHref} className="hidden items-center gap-2 text-[0.9rem] font-bold text-ink transition-colors hover:text-blue xl:flex">
            <span className="flex size-8 items-center justify-center rounded-full bg-sand text-brown">
              <Phone className="size-4" aria-hidden="true" />
            </span>
            {contacts.phoneDisplay}
          </a>
          <a
            href={contacts.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-blue px-4 py-2.5 text-[0.88rem] font-bold text-white shadow-[0_8px_18px_-8px_rgb(56_110_152/0.7)] transition hover:-translate-y-0.5 hover:bg-blue-dark"
          >
            <WhatsAppIcon className="size-4" />
            <span>{ctaText.contact}</span>
          </a>
        </div>
      </div>
    </motion.header>
  );
}
