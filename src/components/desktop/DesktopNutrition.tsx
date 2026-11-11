"use client";

import { motion } from "motion/react";
import { Apple, Carrot, Soup, Sandwich } from "lucide-react";
import { nutrition, sectionText } from "@/data/kindergarten";
import { Floating, Flower, Sparkle, Star } from "../shared/FloatingShapes";
import { Reveal } from "../shared/Reveal";
import { SectionHeading } from "../shared/SectionHeading";

const mealIcons = [Sandwich, Apple, Soup, Carrot];

function MealCard({ index, label, side }: { index: number; label: string; side: "left" | "right" }) {
  const Icon = mealIcons[index];
  const warm = index % 2 === 1;
  return (
    <motion.li
      initial={{ opacity: 0, x: side === "left" ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay: 0.15 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`group flex items-center gap-4 bg-white p-4 pr-6 shadow-soft transition-shadow hover:shadow-lift ${
        side === "left" ? "flex-row-reverse rounded-[2rem_0.75rem_0.75rem_2rem] text-right" : "rounded-[0.75rem_2rem_2rem_0.75rem]"
      } ${side === "left" && index % 2 === 1 ? "mr-10" : ""} ${side === "right" && index % 2 === 1 ? "ml-10" : ""}`}
    >
      <span className={`flex size-14 shrink-0 items-center justify-center shape-blob ${warm ? "bg-sand text-brown" : "bg-sky text-blue"}`}>
        <Icon className="size-6 transition-transform duration-500 group-hover:rotate-12" aria-hidden="true" />
      </span>
      <span className="flex-1">
        <span className="block font-display text-[0.8rem] font-black tracking-wider text-brown-soft">0{index + 1}</span>
        <span className="block font-display text-[1.15rem] font-extrabold text-ink">{label}</span>
      </span>
    </motion.li>
  );
}

export function DesktopNutrition() {
  const left = nutrition.meals.slice(0, 2);
  const right = nutrition.meals.slice(2);
  return (
    <section id="nutrition" data-section="nutrition" aria-labelledby="nutrition-title-d" className="relative overflow-x-clip py-20 xl:py-24">
      <div className="mx-auto max-w-[1200px] px-6 xl:px-8">
        <Reveal>
          <SectionHeading align="center" eyebrow={sectionText.nutrition.eyebrow} title={nutrition.title} subtitle={nutrition.text} id="nutrition-title-d" />
          <p className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full bg-sand px-5 py-2.5 font-display text-[1.05rem] font-extrabold text-brown shadow-warm">
            <Sparkle className="size-4" aria-hidden="true" />
            {nutrition.accent}
          </p>
        </Reveal>

        <div className="relative mt-14 grid grid-cols-[1fr_auto_1fr] items-center gap-8 xl:gap-12">
          <ul className="flex flex-col gap-6">
            {left.map((m, i) => (
              <MealCard key={m.key} index={i} label={m.label} side="left" />
            ))}
          </ul>

          {/* Центральный визуальный элемент — «тарелка» */}
          <Reveal scale={0.9} y={0} className="relative">
            <div className="relative flex size-[300px] items-center justify-center xl:size-[340px]">
              <div aria-hidden="true" className="absolute inset-0 rounded-full border-2 border-dashed border-sand-deep animate-spin-slow" />
              <div aria-hidden="true" className="absolute inset-5 rounded-full bg-gradient-to-br from-sand to-sand-soft shadow-warm" />
              <div className="relative flex size-[62%] flex-col items-center justify-center rounded-full bg-white text-center shadow-soft">
                <span className="text-[0.85rem] font-bold uppercase tracking-[0.14em] text-brown-soft">күніне</span>
                <span className="font-display text-[4.4rem] font-black leading-[0.95] text-blue">4</span>
                <span className="font-display text-[1.15rem] font-extrabold text-ink">мезгіл</span>
              </div>
              <Floating className="-top-2 left-8 w-9 text-blue-soft" delay={-1}>
                <Flower />
              </Floating>
              <Floating className="bottom-2 right-6 w-6 text-brown-soft" delay={-3}>
                <Star />
              </Floating>
              <Floating className="right-0 top-10 w-4 text-blue" delay={-2}>
                <Sparkle className="animate-twinkle" />
              </Floating>
            </div>
          </Reveal>

          <ul className="flex flex-col gap-6">
            {right.map((m, i) => (
              <MealCard key={m.key} index={i + 2} label={m.label} side="right" />
            ))}
          </ul>
        </div>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[820px] -translate-x-1/2 -translate-y-[30%] rounded-[50%] bg-sky/50 blur-3xl" />
    </section>
  );
}
