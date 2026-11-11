"use client";

import { AnimatePresence, motion } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { contacts, ctaText, navItems } from "@/data/kindergarten";
import { handleAnchorClick } from "@/lib/navigation";
import { useActiveSection } from "@/lib/useActiveSection";
import { InstagramIcon, WhatsAppIcon } from "../shared/BrandIcons";
import { Cloud, Star } from "../shared/FloatingShapes";
import { Logo } from "../shared/Logo";

export function MobileHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 h-16 transition-[background-color,box-shadow] duration-300 ${
          scrolled || open ? "bg-white/92 shadow-[0_6px_20px_-14px_rgb(35_63_89/0.4)] backdrop-blur-md" : "bg-bg/80 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[640px] items-center justify-between px-4">
          <a href="#home" onClick={handleAnchorClick("home", close)} aria-label="«Байкадам» балабақшасы — басты бет">
            <Logo size={38} />
          </a>
          <div className="flex items-center gap-2">
            <a href={contacts.phoneHref} aria-label={`Қоңырау шалу: ${contacts.phoneDisplay}`} className="flex size-11 items-center justify-center rounded-full bg-sand text-brown">
              <Phone className="size-[1.15rem]" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Мәзірді жабу" : "Мәзірді ашу"}
              className="flex size-11 items-center justify-center rounded-full bg-blue text-white shadow-[0_8px_18px_-8px_rgb(56_110_152/0.7)]"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={open ? "x" : "menu"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                  {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-ink/25 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              aria-hidden="true"
            />
            <motion.nav
              key="panel"
              id="mobile-menu"
              aria-label="Негізгі мәзір"
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-3 top-[4.5rem] z-50 mx-auto max-h-[calc(100svh-5.5rem)] max-w-[620px] overflow-y-auto overflow-x-hidden rounded-[2rem_2rem_2rem_0.9rem] bg-white p-4 shadow-lift"
            >
              <Cloud aria-hidden="true" className="absolute -right-6 -top-3 w-28 text-sky" />
              <Star aria-hidden="true" className="absolute right-24 top-6 w-4 text-sand-deep" />
              <ul className="relative flex flex-col gap-1">
                {navItems.map((item, i) => {
                  const isActive = active === item.key;
                  return (
                    <motion.li key={item.key} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i + 0.06 }}>
                      <a
                        href={`#${item.key}`}
                        onClick={handleAnchorClick(item.key, close)}
                        aria-current={isActive ? "true" : undefined}
                        className={`flex min-h-12 items-center gap-3 rounded-2xl px-4 text-[1.05rem] font-bold transition-colors ${
                          isActive ? "bg-sky text-blue" : "text-ink active:bg-sky-soft"
                        }`}
                      >
                        <span className={`size-2 rounded-full ${isActive ? "bg-blue" : "bg-sand-deep"}`} aria-hidden="true" />
                        {item.label}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
              <div className="relative mt-4 grid grid-cols-[1fr_auto] gap-2 border-t border-sky pt-4">
                <a
                  href={contacts.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-whatsapp px-4 text-[0.98rem] font-bold text-white"
                >
                  <WhatsAppIcon className="size-5" />
                  {ctaText.whatsapp}
                </a>
                <a
                  href={contacts.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex size-12 items-center justify-center rounded-full bg-sand text-brown"
                >
                  <InstagramIcon className="size-5" />
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
