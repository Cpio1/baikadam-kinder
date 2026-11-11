"use client";

import { motion } from "motion/react";
import { Clock3, MapPin, MapPinned, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { contacts, ctaText, sectionText } from "@/data/kindergarten";
import { InstagramIcon, WhatsAppIcon } from "../shared/BrandIcons";
import { Cloud, Floating, Star } from "../shared/FloatingShapes";
import { MapCard } from "../shared/MapCard";
import { Reveal } from "../shared/Reveal";
import { SectionHeading } from "../shared/SectionHeading";

function Row({ icon, label, children, tone = "sky", i }: { icon: ReactNode; label: string; children: ReactNode; tone?: "sky" | "sand"; i: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start gap-4"
    >
      <span className={`flex size-11 shrink-0 items-center justify-center shape-blob ${tone === "sky" ? "bg-sky text-blue" : "bg-sand text-brown"}`}>{icon}</span>
      <span className="min-w-0 pt-0.5">
        <span className="block text-[0.78rem] font-bold uppercase tracking-wider text-brown-soft">{label}</span>
        <span className="mt-0.5 block text-[1rem] font-bold leading-snug text-ink">{children}</span>
      </span>
    </motion.li>
  );
}

export function DesktopContacts() {
  const t = sectionText.contacts;
  return (
    <section id="contacts" data-section="contacts" aria-labelledby="contacts-title-d" className="relative overflow-x-clip py-20 xl:py-24">
      <Floating className="right-[4%] top-16 w-24 text-sky" slow>
        <Cloud />
      </Floating>

      <div className="mx-auto max-w-[1200px] px-6 xl:px-8">
        <div className="grid grid-cols-[1.15fr_1fr] items-stretch gap-10 xl:gap-14">
          <div className="relative">
            <Reveal>
              <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} id="contacts-title-d" />
            </Reveal>

            <div className="relative mt-8 rounded-[2.5rem_1rem_2.5rem_2.5rem] bg-white p-7 shadow-soft xl:p-8">
              <Star aria-hidden="true" className="absolute -right-2 -top-2 size-6 text-sand-deep animate-twinkle" />
              <ul className="grid grid-cols-2 gap-x-6 gap-y-6">
                <Row i={0} icon={<Phone className="size-5" aria-hidden="true" />} label="Телефон">
                  <a href={contacts.phoneHref} className="transition-colors hover:text-blue">
                    {contacts.phoneDisplay}
                  </a>
                </Row>
                <Row i={1} tone="sand" icon={<Clock3 className="size-5" aria-hidden="true" />} label="Жұмыс уақыты">
                  {contacts.scheduleDays}, <span className="whitespace-nowrap">{contacts.scheduleHours}</span>
                </Row>
                <Row i={2} tone="sand" icon={<MapPin className="size-5" aria-hidden="true" />} label="Мекенжай">
                  {contacts.address}
                </Row>
                <Row i={3} icon={<MapPinned className="size-5" aria-hidden="true" />} label="2ГИС-та көрсетілген мекенжай">
                  {contacts.address2Gis}
                </Row>
                <Row i={4} icon={<InstagramIcon className="size-5" />} label="Instagram">
                  <a href={contacts.instagram} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue">
                    {contacts.instagramHandle}
                  </a>
                </Row>
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={contacts.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full bg-whatsapp px-5 py-3 text-[0.95rem] font-bold text-white shadow-[0_12px_26px_-12px_rgb(31_168_85/0.8)] transition hover:-translate-y-0.5 hover:brightness-105"
                >
                  <WhatsAppIcon className="size-5" />
                  {ctaText.whatsapp}
                </a>
                <a
                  href={contacts.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-sand-deep bg-white px-5 py-3 text-[0.95rem] font-bold text-brown transition hover:-translate-y-0.5 hover:border-brown-soft"
                >
                  <InstagramIcon className="size-[1.1rem]" />
                  {ctaText.instagram}
                </a>
                <a
                  href={contacts.twoGis}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-sky-deep bg-white px-5 py-3 text-[0.95rem] font-bold text-blue transition hover:-translate-y-0.5 hover:border-blue-soft"
                >
                  <MapPinned className="size-[1.1rem]" aria-hidden="true" />
                  2ГИС
                </a>
              </div>
            </div>
          </div>

          <Reveal x={30} y={0} className="relative min-h-[420px]">
            <MapCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
