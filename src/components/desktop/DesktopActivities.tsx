"use client";

import { motion } from "motion/react";
import { activities, sectionText } from "@/data/kindergarten";
import { ActivityIcon, activityTheme } from "../shared/ActivityIcon";
import { Cloud, Floating, Sparkle } from "../shared/FloatingShapes";
import { Reveal } from "../shared/Reveal";
import { SectionHeading } from "../shared/SectionHeading";

const shapes = [
  "rounded-[2.5rem_2.5rem_2.5rem_0.75rem]",
  "rounded-[0.75rem_2.5rem_2.5rem_2.5rem]",
  "rounded-[2.5rem_0.75rem_2.5rem_2.5rem]",
  "rounded-[2.5rem_2.5rem_0.75rem_2.5rem]",
];

export function DesktopActivities() {
  return (
    <section id="activities" data-section="activities" aria-labelledby="activities-title-d" className="relative overflow-x-clip bg-sky/60 py-20 xl:py-24">
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true" className="absolute inset-x-0 -top-px h-10 w-full text-bg">
        <path fill="currentColor" d="M0 0h1440v20c-160 30-320 40-480 26S640 0 480 6 160 50 0 30Z" />
      </svg>
      <Floating className="left-[6%] top-20 w-28 text-white/90" slow>
        <Cloud />
      </Floating>
      <Floating className="right-[8%] top-28 w-20 text-white/80" delay={-4}>
        <Cloud />
      </Floating>

      <div className="relative mx-auto max-w-[1200px] px-6 xl:px-8">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow={sectionText.activities.eyebrow}
            title={sectionText.activities.title}
            subtitle={sectionText.activities.subtitle}
            id="activities-title-d"
          />
        </Reveal>

        <ul className="mt-14 grid grid-cols-4 gap-5 xl:gap-7">
          {activities.map((a, i) => {
            const t = activityTheme[a.key];
            return (
              <motion.li
                key={a.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={i % 2 === 1 ? "pt-10" : ""}
              >
                <motion.article
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`group relative h-full overflow-hidden px-6 pb-7 pt-6 shadow-soft transition-shadow duration-300 hover:shadow-lift ${t.card} ${shapes[i]}`}
                >
                  <span aria-hidden="true" className={`absolute -right-6 -top-6 size-24 rounded-full bg-current opacity-40 transition-transform duration-500 group-hover:scale-125 ${t.dot}`} />
                  <span className={`relative flex size-14 items-center justify-center shape-blob shadow-soft transition-transform duration-500 group-hover:-rotate-6 ${t.badge}`}>
                    <ActivityIcon name={a.key} className="size-6" />
                  </span>
                  <h3 className="relative mt-5 font-display text-[1.3rem] font-extrabold text-ink">{a.title}</h3>
                  <p className="relative mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{a.description}</p>
                  <Sparkle aria-hidden="true" className="absolute bottom-5 right-5 size-3.5 text-blue-soft/50 transition-transform duration-500 group-hover:rotate-90" />
                </motion.article>
              </motion.li>
            );
          })}
        </ul>
      </div>

      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true" className="absolute inset-x-0 -bottom-px h-10 w-full text-bg">
        <path fill="currentColor" d="M0 60h1440V30c-160-24-320-30-480-16S640 50 480 46 160 10 0 28Z" />
      </svg>
    </section>
  );
}
