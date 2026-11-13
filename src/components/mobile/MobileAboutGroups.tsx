"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Baby, Clock3, Languages, UsersRound } from "lucide-react";
import { aboutFacts, aboutPhoto, aboutVideo, groups, sectionText, site } from "@/data/kindergarten";
import { frameRatio } from "@/lib/photoShape";
import { Squiggle } from "../shared/FloatingShapes";
import { GroupBadgeIcon, GroupDecor, groupTheme } from "../shared/GroupMotif";
import { AboutVideo } from "../shared/AboutVideo";
import { AboutIllustration } from "../shared/Placeholders";
import { Reveal } from "../shared/Reveal";
import { SectionHeading } from "../shared/SectionHeading";

const factIcons = { age: Baby, groups: UsersRound, lang: Languages, schedule: Clock3 } as const;
const cardShapes = ["rounded-[2.25rem_2.25rem_2.25rem_0.8rem]", "rounded-[0.8rem_2.25rem_2.25rem_2.25rem]", "rounded-[2.25rem_0.8rem_2.25rem_2.25rem]"];

export function MobileAboutGroups() {
  const ratio = frameRatio(aboutPhoto, 1, 1.5, 1.25);

  return (
    <section id="m-about" data-section="about" aria-labelledby="about-title-m" className="relative overflow-x-clip py-14">
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-28 -z-10 h-72 w-2/3 rounded-l-[160px] bg-sand-soft" />

      <div className="mx-auto max-w-[560px] px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow={sectionText.about.eyebrow} title={sectionText.about.title} id="about-title-m" />
        </Reveal>

        {aboutVideo ? (
          <Reveal delay={0.05} className="relative mt-7">
            {/* Вертикальное видео 9:16 по центру: ширина ограничена высотой экрана — кадр виден целиком */}
            <div className="relative mx-auto" style={{ width: "min(84%, 340px, calc(72svh * 9 / 16))" }}>
              <div aria-hidden="true" className="absolute -left-6 -top-4 size-24 rounded-full bg-sky" />
              <div aria-hidden="true" className="absolute -bottom-4 -right-5 size-20 rounded-full bg-sand" />
              <AboutVideo
                video={aboutVideo}
                className="rounded-[2.5rem_1rem_2.5rem_1rem] border-[5px] border-white shadow-lift"
                controlsClassName="bottom-3.5 left-3.5"
              />
              <div className="absolute -right-3 top-5 flex items-baseline gap-1 rounded-full bg-blue px-3.5 py-1.5 text-white shadow-lift">
                <span className="font-display text-[1.05rem] font-black">1,5–6</span>
                <span className="text-[0.75rem] font-bold text-sky">жас</span>
              </div>
            </div>
          </Reveal>
        ) : (
        <Reveal delay={0.05} className="relative mt-6">
            <div className="relative overflow-hidden rounded-[2.5rem_1rem_2.5rem_1rem] shadow-lift" style={{ aspectRatio: ratio }}>
              {aboutPhoto ? (
                <Image
                  src={aboutPhoto.src}
                  width={aboutPhoto.width}
                  height={aboutPhoto.height}
                  alt="«Байкадам» балабақшасындағы күнделікті өмір"
                  sizes="(max-width: 560px) 100vw, 560px"
                  placeholder={aboutPhoto.blurDataURL ? "blur" : "empty"}
                  blurDataURL={aboutPhoto.blurDataURL}
                  className="h-full w-full object-cover"
                />
              ) : (
                <AboutIllustration />
              )}
            </div>
            <div className="absolute -bottom-5 right-4 flex items-baseline gap-1 rounded-full bg-blue px-4 py-2 text-white shadow-lift">
              <span className="font-display text-[1.15rem] font-black">1,5–6</span>
              <span className="text-[0.8rem] font-bold text-sky">жас</span>
            </div>
          </Reveal>
        )}

        <Reveal>
          <p className="mt-9 text-[0.98rem] leading-[1.7] text-ink-soft">{site.about}</p>
        </Reveal>

        <ul className="mt-6 grid grid-cols-2 gap-2.5">
          {aboutFacts.map((fact, i) => {
            const Icon = factIcons[fact.key];
            const wide = fact.key === "schedule";
            return (
              <motion.li
                key={fact.key}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={`flex items-center gap-2.5 border border-sky-deep/50 bg-white p-3 ${wide ? "col-span-2" : ""} ${
                  i % 2 === 0 ? "rounded-[1.4rem_1.4rem_1.4rem_0.5rem]" : "rounded-[1.4rem_0.5rem_1.4rem_1.4rem]"
                }`}
              >
                <span className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${i % 3 === 0 ? "bg-sky text-blue" : "bg-sand text-brown"}`}>
                  <Icon className="size-[1.1rem]" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.72rem] font-semibold leading-tight text-ink-soft">{fact.label}</span>
                  <span className="block text-[0.9rem] font-extrabold leading-snug text-ink">{fact.value}</span>
                </span>
              </motion.li>
            );
          })}
        </ul>

        {/* --- Группы внутри раздела «Біз туралы» --- */}
        <Reveal className="mt-12 flex items-center gap-3">
          <h3 className="font-display text-[1.45rem] font-extrabold text-ink">{sectionText.about.groupsTitle}</h3>
          <Squiggle className="w-16 text-sand-deep" />
        </Reveal>

        <ul className="mt-5 flex flex-col gap-4">
          {groups.map((group, i) => {
            const t = groupTheme[group.key];
            return (
              <motion.li
                key={group.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <article className={`group relative overflow-hidden p-5 shadow-soft ${t.card} ${cardShapes[i]}`}>
                  <GroupDecor group={group.key} />
                  <div className="relative flex items-center gap-3.5">
                    <span className={`flex size-13 shrink-0 items-center justify-center shape-blob shadow-soft ${t.badge}`}>
                      <GroupBadgeIcon group={group.key} className="size-6" />
                    </span>
                    <div className="min-w-0">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-[0.72rem] font-bold ${t.level}`}>{group.level}</span>
                      <h4 className={`mt-1 font-display text-[1.3rem] font-black leading-tight ${t.title}`}>«{group.name}»</h4>
                    </div>
                  </div>
                  <p className={`relative mt-3 pr-6 text-[0.93rem] leading-relaxed ${t.text}`}>{group.description}</p>
                </article>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
