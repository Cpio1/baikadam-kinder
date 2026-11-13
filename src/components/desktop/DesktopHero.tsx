"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowDown, Baby, Languages, UsersRound, UtensilsCrossed } from "lucide-react";
import { contacts, ctaText, heroHighlights, photos, site } from "@/data/kindergarten";
import { handleAnchorClick } from "@/lib/navigation";
import { frameRatio, HERO_SIZES } from "@/lib/photoShape";
import { WhatsAppIcon } from "../shared/BrandIcons";
import { Cloud, DotsGrid, Floating, Heart, Sparkle, Star } from "../shared/FloatingShapes";
import { HeroIllustration } from "../shared/Placeholders";

const highlightIcons = { age: Baby, groups: UsersRound, meals: UtensilsCrossed, lang: Languages } as const;
const ease = [0.22, 1, 0.36, 1] as const;


export function DesktopHero() {
  // main-page — горизонтальное фото 4:3: рамка повторяет его пропорции, чтобы дети в кадре не обрезались.
  const ratio = frameRatio(photos.main, 0.82, 1.34, 0.92);

  return (
    <section id="home" data-section="home" aria-labelledby="hero-title-d" className="relative overflow-x-clip pt-[72px]">
      {/* фон */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-24 h-[620px] w-[620px] shape-blob bg-sky/70" />
        <div className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-sand/45 blur-2xl" />
      </div>

      <div className="mx-auto grid min-h-[calc(100svh-72px)] max-w-[1200px] grid-cols-[1.05fr_1fr] items-center gap-10 px-6 py-10 xl:gap-16 xl:px-8 2xl:min-h-[min(calc(100svh-72px),860px)]">
        {/* Левая колонка */}
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-sand-deep/70 bg-white/80 px-3.5 py-1.5 text-[0.85rem] font-bold text-brown"
          >
            <Heart className="size-3.5 text-brown-soft" />
            {site.tagline}
          </motion.p>

          <motion.h1
            id="hero-title-d"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="mt-5 font-display text-[2.6rem] font-black leading-[1.05] tracking-[-0.02em] text-ink xl:text-[3.1rem] 2xl:text-[3.6rem]"
          >
            «Байкадам»
            <span className="relative mt-1 block text-blue">
              балабақшасы
              <svg viewBox="0 0 300 18" aria-hidden="true" className="absolute -bottom-3 left-0 w-[min(100%,330px)] text-sand-deep">
                <path d="M3 12C60 3 150 2 297 10" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease }}
            className="mt-7 max-w-[30rem] text-[1.05rem] leading-relaxed text-ink-soft xl:text-[1.125rem]"
          >
            {site.heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href={contacts.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full bg-blue py-3.5 pl-4 pr-6 text-[0.98rem] font-bold text-white shadow-[0_14px_28px_-12px_rgb(56_110_152/0.8)] transition hover:-translate-y-0.5 hover:bg-blue-dark"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-white/18">
                <WhatsAppIcon className="size-[1.15rem]" />
              </span>
              {ctaText.contact}
            </a>
            <a
              href="#about"
              onClick={handleAnchorClick("about")}
              className="group inline-flex items-center gap-2 rounded-full border-2 border-sand-deep bg-white px-6 py-3.5 text-[0.98rem] font-bold text-brown transition hover:-translate-y-0.5 hover:border-brown-soft"
            >
              {ctaText.explore}
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            </a>
          </motion.div>

          <ul className="mt-9 grid max-w-[34rem] grid-cols-2 gap-2.5">
            {heroHighlights.map((h, i) => {
              const Icon = highlightIcons[h.key];
              return (
                <motion.li
                  key={h.key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.65 + i * 0.08, ease }}
                  className={`flex items-center gap-3 bg-white/90 py-2.5 pl-2.5 pr-4 shadow-[0_6px_18px_-12px_rgb(35_63_89/0.35)] ${
                    i % 2 === 0 ? "rounded-[1.4rem_0.7rem_1.4rem_1.4rem]" : "rounded-[0.7rem_1.4rem_1.4rem_1.4rem]"
                  }`}
                >
                  <span className={`flex size-9 shrink-0 items-center justify-center rounded-full ${i % 2 ? "bg-sand text-brown" : "bg-sky text-blue"}`}>
                    <Icon className="size-[1.1rem]" aria-hidden="true" />
                  </span>
                  <span className="text-[0.92rem] font-bold text-ink">{h.text}</span>
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* Правая колонка — фото */}
        <div className="relative mx-auto w-full max-w-[520px] xl:max-w-[540px]">
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: -6 }}
            transition={{ duration: 1, delay: 0.2, ease }}
            className="absolute -inset-4 shape-blob-2 bg-gradient-to-br from-sky-deep to-sky"
          />
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease }}
            className="absolute -bottom-6 -right-5 h-40 w-40 rounded-full bg-sand"
          />
          <DotsGrid className="absolute -left-10 top-6 h-28 w-28 opacity-70" />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className={`relative mx-auto overflow-hidden border-[6px] border-white shadow-lift ${ratio > 1.1 ? "shape-blob-soft" : "shape-blob"}`}
            style={{ aspectRatio: ratio, width: `min(100%, max(360px, calc((100svh - 170px) * ${ratio})), ${Math.round(560 * ratio)}px)` }}
          >
            {photos.main ? (
              <Image
                src={photos.main.src}
                width={photos.main.width}
                height={photos.main.height}
                alt="«Байкадам» балабақшасындағы балалар"
                sizes={HERO_SIZES}
                loading="eager"
                fetchPriority="high"
                quality={85}
                placeholder={photos.main.blurDataURL ? "blur" : "empty"}
                blurDataURL={photos.main.blurDataURL}
                className="h-full w-full object-cover"
              />
            ) : (
              <HeroIllustration />
            )}
          </motion.div>

          {/* Плашка */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease }}
            className="absolute -left-8 bottom-10 flex items-center gap-3 rounded-[1.5rem_1.5rem_1.5rem_0.5rem] bg-white px-4 py-3 shadow-lift"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-sky font-display text-lg font-black text-blue">3</span>
            <span className="text-[0.85rem] font-bold leading-tight text-ink">
              топ
              <span className="block font-semibold text-ink-soft">қазақ тілінде</span>
            </span>
          </motion.div>

          <Floating className="-right-2 top-2 w-24 text-white drop-shadow-sm" delay={0}>
            <Cloud />
          </Floating>
          <Floating className="-left-6 top-1/4 w-16 text-white" delay={-3} slow>
            <Cloud />
          </Floating>
          <Floating className="right-10 -top-6 w-6 text-blue-soft" delay={-1}>
            <Star className="animate-twinkle" />
          </Floating>
          <Floating className="-right-6 bottom-1/3 w-5 text-brown-soft" delay={-2.5}>
            <Sparkle className="animate-twinkle" />
          </Floating>
        </div>
      </div>
    </section>
  );
}
