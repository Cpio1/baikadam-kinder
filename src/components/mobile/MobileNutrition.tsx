"use client";

import { motion } from "motion/react";
import { Apple, Carrot, Sandwich, Soup } from "lucide-react";
import { nutrition, sectionText } from "@/data/kindergarten";
import { Flower, Sparkle } from "../shared/FloatingShapes";
import { Reveal } from "../shared/Reveal";
import { SectionHeading } from "../shared/SectionHeading";

const mealIcons = [Sandwich, Apple, Soup, Carrot];

export function MobileNutrition() {
  return (
    <section id="m-nutrition" data-section="nutrition" aria-labelledby="nutrition-title-m" className="relative overflow-x-clip py-14">
      <div className="mx-auto max-w-[560px] px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow={sectionText.nutrition.eyebrow} title={nutrition.title} id="nutrition-title-m" />
        </Reveal>

        {/* Акцент: тарелка + текст */}
        <Reveal className="relative mt-6 flex items-center gap-4 overflow-hidden rounded-[2.5rem_1rem_2.5rem_2.5rem] bg-sand p-4 shadow-warm">
          <Flower aria-hidden="true" className="absolute -right-3 -top-3 w-14 text-white/60" />
          <div className="relative flex size-[5.5rem] shrink-0 items-center justify-center rounded-full border-2 border-dashed border-brown-soft/40">
            <div className="flex size-[4.4rem] flex-col items-center justify-center rounded-full bg-white shadow-soft">
              <span className="font-display text-[2rem] font-black leading-none text-blue">4</span>
              <span className="text-[0.65rem] font-extrabold uppercase tracking-wider text-brown">мезгіл</span>
            </div>
          </div>
          <div className="relative min-w-0">
            <p className="font-display text-[1.12rem] font-extrabold leading-tight text-brown">{nutrition.accent}</p>
            <p className="mt-1.5 text-[0.86rem] leading-snug text-[#5d4a3c]">{nutrition.text}</p>
          </div>
        </Reveal>

        {/* Вертикальная «дорожка» приёмов пищи */}
        <ol className="relative mt-6 space-y-3 pl-6">
          <span aria-hidden="true" className="absolute bottom-6 left-[0.6rem] top-6 w-0.5 rounded-full bg-[repeating-linear-gradient(to_bottom,#c9e1f0_0_6px,transparent_6px_12px)]" />
          {nutrition.meals.map((m, i) => {
            const Icon = mealIcons[i];
            const warm = i % 2 === 1;
            return (
              <motion.li
                key={m.key}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="relative"
              >
                <span aria-hidden="true" className={`absolute -left-6 top-1/2 size-3.5 -translate-y-1/2 rounded-full border-[3px] border-bg ${warm ? "bg-brown-soft" : "bg-blue"}`} />
                <div className={`flex items-center gap-3 bg-white p-3 pr-4 shadow-soft ${warm ? "rounded-[0.6rem_1.6rem_1.6rem_1.6rem]" : "rounded-[1.6rem_1.6rem_1.6rem_0.6rem]"}`}>
                  <span className={`flex size-11 shrink-0 items-center justify-center shape-blob ${warm ? "bg-sand text-brown" : "bg-sky text-blue"}`}>
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-display text-[1.02rem] font-extrabold text-ink">{m.label}</span>
                  <span className="ml-auto font-display text-[0.85rem] font-black text-brown-soft/70">0{i + 1}</span>
                </div>
              </motion.li>
            );
          })}
        </ol>
        <Sparkle aria-hidden="true" className="ml-auto mt-3 size-4 text-blue-soft/60" />
      </div>
    </section>
  );
}
