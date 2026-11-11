"use client";

import { motion } from "motion/react";
import { activities, sectionText } from "@/data/kindergarten";
import { ActivityIcon, activityTheme } from "../shared/ActivityIcon";
import { Cloud } from "../shared/FloatingShapes";
import { Reveal } from "../shared/Reveal";
import { SectionHeading } from "../shared/SectionHeading";

export function MobileActivities() {
  return (
    <section id="m-activities" data-section="activities" aria-labelledby="activities-title-m" className="relative overflow-x-clip bg-sky/60 py-14">
      <svg viewBox="0 0 400 30" preserveAspectRatio="none" aria-hidden="true" className="absolute inset-x-0 -top-px h-6 w-full text-bg">
        <path fill="currentColor" d="M0 0h400v10c-50 14-100 16-150 8S120 2 70 8 20 20 0 14Z" />
      </svg>
      <Cloud aria-hidden="true" className="absolute -right-4 top-10 w-20 text-white/90" />

      <div className="relative mx-auto max-w-[560px] px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow={sectionText.activities.eyebrow} title={sectionText.activities.title} subtitle={sectionText.activities.subtitle} id="activities-title-m" />
        </Reveal>

        <ul className="mt-7 flex flex-col gap-3">
          {activities.map((a, i) => {
            const t = activityTheme[a.key];
            const even = i % 2 === 0;
            return (
              <motion.li
                key={a.key}
                initial={{ opacity: 0, x: even ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className={even ? "mr-3" : "ml-3"}
              >
                <article
                  className={`flex items-start gap-3.5 p-4 shadow-soft ${t.card} ${
                    even ? "rounded-[2rem_2rem_2rem_0.75rem]" : "rounded-[2rem_0.75rem_2rem_2rem]"
                  }`}
                >
                  <span className={`flex size-12 shrink-0 items-center justify-center shape-blob ${t.badge}`}>
                    <ActivityIcon name={a.key} className="size-[1.35rem]" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-[1.12rem] font-extrabold text-ink">{a.title}</h3>
                    <p className="mt-1 text-[0.9rem] leading-relaxed text-ink-soft">{a.description}</p>
                  </div>
                </article>
              </motion.li>
            );
          })}
        </ul>
      </div>

      <svg viewBox="0 0 400 30" preserveAspectRatio="none" aria-hidden="true" className="absolute inset-x-0 -bottom-px h-6 w-full text-bg">
        <path fill="currentColor" d="M0 30h400V16c-40-12-90-14-140-6S130 26 80 22 20 10 0 14Z" />
      </svg>
    </section>
  );
}
