"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Baby, Clock3, Languages, UsersRound } from "lucide-react";
import { aboutFacts, aboutPhoto, groups, sectionText, site } from "@/data/kindergarten";
import { frameRatio } from "@/lib/photoShape";
import { Cloud, DotsGrid, Floating, Sparkle, Squiggle, Star } from "../shared/FloatingShapes";
import { GroupBadgeIcon, GroupDecor, groupTheme } from "../shared/GroupMotif";
import { AboutIllustration } from "../shared/Placeholders";
import { Reveal } from "../shared/Reveal";
import { SectionHeading } from "../shared/SectionHeading";

const factIcons = { age: Baby, groups: UsersRound, lang: Languages, schedule: Clock3 } as const;

/** Формы карточек групп — каждая своя. */
const cardShapes = [
  "rounded-[3rem_3rem_3rem_1rem]",
  "rounded-[999px_999px_2.5rem_2.5rem] pt-16",
  "rounded-[1.5rem_4.5rem_1.5rem_4.5rem]",
];

export function DesktopAboutGroups() {
  const ratio = frameRatio(aboutPhoto, 0.8, 1.3, 0.95);

  return (
    <section id="about" data-section="about" aria-labelledby="about-title-d" className="relative overflow-x-clip py-20 xl:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-24 h-[480px] w-[44%] rounded-r-[220px] bg-sand-soft" />
      </div>

      <div className="mx-auto max-w-[1200px] px-6 xl:px-8">
        {/* --- О садике --- */}
        <div className="grid grid-cols-[0.92fr_1.08fr] items-center gap-12 xl:gap-16">
          <Reveal x={-30} y={0} className="relative mx-auto w-full max-w-[460px]">
            <div aria-hidden="true" className="absolute -right-5 -top-5 h-full w-full rounded-[3.5rem_1.5rem_3.5rem_1.5rem] border-2 border-dashed border-blue-soft/50" />
            <div
              className="relative overflow-hidden rounded-[3.5rem_1.5rem_3.5rem_1.5rem] shadow-lift"
              style={{ aspectRatio: ratio }}
            >
              {aboutPhoto ? (
                <Image
                  src={aboutPhoto.src}
                  width={aboutPhoto.width}
                  height={aboutPhoto.height}
                  alt="«Байкадам» балабақшасындағы күнделікті өмір"
                  sizes="(min-width: 1024px) 460px, 100vw"
                  placeholder={aboutPhoto.blurDataURL ? "blur" : "empty"}
                  blurDataURL={aboutPhoto.blurDataURL}
                  className="h-full w-full object-cover"
                />
              ) : (
                <AboutIllustration />
              )}
            </div>
            <div className="absolute -bottom-7 -right-7 flex size-32 flex-col items-center justify-center rounded-full bg-blue text-center text-white shadow-lift">
              <span className="font-display text-[1.6rem] font-black leading-none">1,5–6</span>
              <span className="mt-1 text-[0.8rem] font-bold text-sky">жас</span>
            </div>
            <Floating className="-left-10 -top-8 w-24 text-sky" slow>
              <Cloud />
            </Floating>
          </Reveal>

          <div>
            <Reveal>
              <SectionHeading eyebrow={sectionText.about.eyebrow} title={sectionText.about.title} id="about-title-d" />
              <p className="mt-5 max-w-[34rem] text-[1.05rem] leading-[1.75] text-ink-soft">{site.about}</p>
            </Reveal>

            <ul className="mt-8 grid grid-cols-2 gap-3.5">
              {aboutFacts.map((fact, i) => {
                const Icon = factIcons[fact.key];
                return (
                  <motion.li
                    key={fact.key}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -4 }}
                    className={`flex items-start gap-3 border border-sky-deep/50 bg-white p-4 shadow-soft ${
                      ["rounded-[1.75rem_1.75rem_1.75rem_0.6rem]", "rounded-[1.75rem_0.6rem_1.75rem_1.75rem]", "rounded-[0.6rem_1.75rem_1.75rem_1.75rem]", "rounded-[1.75rem_1.75rem_0.6rem_1.75rem]"][i]
                    }`}
                  >
                    <span className={`flex size-10 shrink-0 items-center justify-center rounded-2xl ${i % 3 === 0 ? "bg-sky text-blue" : "bg-sand text-brown"}`}>
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-[0.78rem] font-semibold text-ink-soft">{fact.label}</span>
                      <span className="mt-0.5 block text-[0.98rem] font-extrabold leading-snug text-ink">{fact.value}</span>
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* --- Группы (внутри этого же раздела) --- */}
        <div className="relative mt-24 xl:mt-28">
          <Reveal className="flex items-end justify-between gap-6">
            <div className="flex items-center gap-4">
              <h3 className="font-display text-[1.75rem] font-extrabold text-ink xl:text-[2rem]">{sectionText.about.groupsTitle}</h3>
              <Squiggle className="w-24 text-sand-deep" />
            </div>
            <Sparkle className="mb-2 size-6 text-blue-soft animate-twinkle" aria-hidden="true" />
          </Reveal>

          <ul className="mt-10 grid grid-cols-3 items-stretch gap-6 xl:gap-8">
            {groups.map((group, i) => {
              const t = groupTheme[group.key];
              return (
                <motion.li
                  key={group.key}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className={i === 1 ? "lg:-mt-6" : "lg:mt-4"}
                >
                  <motion.article
                    whileHover={{ y: -8, scale: 1.015 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className={`group relative flex h-full flex-col overflow-hidden p-8 shadow-soft transition-shadow duration-300 hover:shadow-lift ${t.card} ${cardShapes[i]}`}
                  >
                    <GroupDecor group={group.key} />
                    <span className={`relative flex size-16 items-center justify-center shape-blob ${t.badge} shadow-soft ${i === 1 ? "mx-auto" : ""}`}>
                      <GroupBadgeIcon group={group.key} className="size-8" />
                    </span>
                    <div className={`relative mt-6 ${i === 1 ? "text-center" : ""}`}>
                      <span className={`inline-block rounded-full px-3 py-1 text-[0.78rem] font-bold ${t.level}`}>{group.level}</span>
                      <h4 className={`mt-3 font-display text-[1.6rem] font-black ${t.title}`}>«{group.name}»</h4>
                      <p className={`mt-2.5 text-[0.98rem] leading-relaxed ${t.text}`}>{group.description}</p>
                    </div>
                  </motion.article>
                </motion.li>
              );
            })}
          </ul>

          <DotsGrid className="absolute -right-6 -top-4 -z-10 h-24 w-40 opacity-60" />
          <Floating className="-left-8 bottom-10 -z-10 w-5 text-sand-deep" delay={-2}>
            <Star />
          </Floating>
        </div>
      </div>
    </section>
  );
}
