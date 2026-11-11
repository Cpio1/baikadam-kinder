"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowDown, Baby, Languages, UsersRound, UtensilsCrossed } from "lucide-react";
import { contacts, ctaText, heroHighlights, photos, site } from "@/data/kindergarten";
import { handleAnchorClick } from "@/lib/navigation";
import { frameRatio, HERO_SIZES } from "@/lib/photoShape";
import { WhatsAppIcon } from "../shared/BrandIcons";
import { Cloud, Heart, Sparkle, Star } from "../shared/FloatingShapes";
import { HeroIllustration } from "../shared/Placeholders";

const icons = { age: Baby, groups: UsersRound, meals: UtensilsCrossed, lang: Languages } as const;
const ease = [0.22, 1, 0.36, 1] as const;

export function MobileHero() {
  // Вертикальная «арка»: соотношение подстраивается под фото, чтобы обрезка была минимальной.
  const ratio = frameRatio(photos.main, 0.78, 1.05, 0.84);

  return (
    <section id="m-home" data-section="home" aria-labelledby="hero-title-m" className="relative overflow-x-clip pt-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] rounded-b-[45%] bg-gradient-to-b from-sky/80 to-transparent" />

      <div className="mx-auto max-w-[560px] px-4 pb-4 pt-7 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="mx-auto flex w-fit items-center gap-1.5 rounded-full border border-sand-deep/70 bg-white/85 px-3 py-1.5 text-[0.8rem] font-bold text-brown"
        >
          <Heart className="size-3 text-brown-soft" />
          {site.tagline}
        </motion.p>

        <motion.h1
          id="hero-title-m"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease }}
          className="mt-4 text-center font-display text-[2.05rem] font-black leading-[1.08] tracking-[-0.015em] text-ink min-[390px]:text-[2.3rem]"
        >
          «Байкадам» <span className="text-blue">балабақшасы</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease }}
          className="mx-auto mt-3.5 max-w-[22rem] text-center text-[0.98rem] leading-relaxed text-ink-soft"
        >
          {site.heroSubtitle}
        </motion.p>

        {/* Фото в форме арки */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease }}
          className="relative mx-auto mt-7 w-[86%] max-w-[380px]"
        >
          <div aria-hidden="true" className="absolute -inset-2.5 rounded-[999px_999px_2.6rem_2.6rem] bg-white shadow-lift" />
          <div aria-hidden="true" className="absolute -bottom-4 -left-5 size-20 rounded-full bg-sand" />
          <div aria-hidden="true" className="absolute -right-4 top-1/3 size-10 rounded-full bg-sky-deep" />
          <div className="relative overflow-hidden rounded-[999px_999px_2.25rem_2.25rem]" style={{ aspectRatio: ratio }}>
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
          </div>
          <Cloud aria-hidden="true" className="absolute -left-7 top-6 w-16 text-white drop-shadow-sm animate-float" />
          <Star aria-hidden="true" className="absolute -right-1 -top-1 w-5 text-blue-soft animate-twinkle" />
          <Sparkle aria-hidden="true" className="absolute -right-3 bottom-10 w-3.5 text-brown-soft animate-twinkle [animation-delay:-1.5s]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease }}
          className="mt-9 flex flex-col gap-3"
        >
          <a
            href={contacts.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-blue px-6 text-[1.02rem] font-bold text-white shadow-[0_14px_26px_-12px_rgb(56_110_152/0.85)] active:scale-[0.98]"
          >
            <WhatsAppIcon className="size-5" />
            {ctaText.contact}
          </a>
          <a
            href="#about"
            onClick={handleAnchorClick("about")}
            className="flex min-h-13 items-center justify-center gap-2 rounded-full border-2 border-sand-deep bg-white px-6 text-[1rem] font-bold text-brown active:scale-[0.98]"
          >
            {ctaText.explore}
            <ArrowDown className="size-4" aria-hidden="true" />
          </a>
        </motion.div>

        <ul className="mt-6 grid grid-cols-2 gap-2.5">
          {heroHighlights.map((h, i) => {
            const Icon = icons[h.key];
            return (
              <motion.li
                key={h.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.07, ease }}
                className={`flex items-center gap-2.5 bg-white p-2.5 shadow-[0_6px_18px_-12px_rgb(35_63_89/0.4)] ${
                  i % 2 === 0 ? "rounded-[1.25rem_0.6rem_1.25rem_1.25rem]" : "rounded-[0.6rem_1.25rem_1.25rem_1.25rem]"
                }`}
              >
                <span className={`flex size-9 shrink-0 items-center justify-center rounded-full ${i === 1 || i === 2 ? "bg-sand text-brown" : "bg-sky text-blue"}`}>
                  <Icon className="size-[1.05rem]" aria-hidden="true" />
                </span>
                <span className="text-[0.84rem] font-bold leading-tight text-ink">{h.text}</span>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
