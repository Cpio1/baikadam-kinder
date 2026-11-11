"use client";

import { motion } from "motion/react";
import { Clock3, MapPin, MapPinned, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { contacts, ctaText, sectionText } from "@/data/kindergarten";
import { InstagramIcon, WhatsAppIcon } from "../shared/BrandIcons";
import { MapCard } from "../shared/MapCard";
import { Reveal } from "../shared/Reveal";
import { SectionHeading } from "../shared/SectionHeading";

function Item({ icon, label, children, tone = "sky" }: { icon: ReactNode; label: string; children: ReactNode; tone?: "sky" | "sand" }) {
  return (
    <li className="flex items-start gap-3 py-3.5">
      <span className={`flex size-10 shrink-0 items-center justify-center shape-blob ${tone === "sky" ? "bg-sky text-blue" : "bg-sand text-brown"}`}>{icon}</span>
      <span className="min-w-0 pt-0.5">
        <span className="block text-[0.72rem] font-bold uppercase tracking-wider text-brown-soft">{label}</span>
        <span className="mt-0.5 block break-words text-[0.97rem] font-bold leading-snug text-ink">{children}</span>
      </span>
    </li>
  );
}

export function MobileContacts() {
  const t = sectionText.contacts;
  return (
    <section id="m-contacts" data-section="contacts" aria-labelledby="contacts-title-m" className="relative overflow-x-clip py-14">
      <div className="mx-auto max-w-[560px] px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} id="contacts-title-m" />
        </Reveal>

        {/* WhatsApp — главный акцент */}
        <motion.a
          href={contacts.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          whileTap={{ scale: 0.98 }}
          className="mt-6 flex min-h-15 items-center gap-3 rounded-[1.75rem_1.75rem_1.75rem_0.6rem] bg-whatsapp px-4 py-3 text-white shadow-[0_14px_28px_-12px_rgb(31_168_85/0.75)]"
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-white/20">
            <WhatsAppIcon className="size-6" />
          </span>
          <span className="flex-1">
            <span className="block text-[1.05rem] font-extrabold leading-tight">{ctaText.whatsapp}</span>
            <span className="block text-[0.82rem] font-semibold text-white/85">{contacts.phoneDisplay}</span>
          </span>
        </motion.a>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <a href={contacts.phoneHref} className="flex min-h-13 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-blue px-2 text-[0.9rem] min-[360px]:text-[0.95rem] font-bold text-white active:scale-[0.98]">
            <Phone className="size-[1.1rem]" aria-hidden="true" />
            {ctaText.call}
          </a>
          <a
            href={contacts.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-13 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border-2 border-sand-deep bg-white px-2 text-[0.9rem] min-[360px]:text-[0.95rem] font-bold text-brown active:scale-[0.98]"
          >
            <InstagramIcon className="size-[1.1rem]" />
            {ctaText.instagram}
          </a>
        </div>

        <Reveal className="mt-5">
          <ul className="divide-y divide-sky rounded-[2rem_0.75rem_2rem_2rem] bg-white px-4 py-1 shadow-soft">
            <Item icon={<Phone className="size-[1.1rem]" aria-hidden="true" />} label="Телефон">
              <a href={contacts.phoneHref}>{contacts.phoneDisplay}</a>
            </Item>
            <Item tone="sand" icon={<Clock3 className="size-[1.1rem]" aria-hidden="true" />} label="Жұмыс уақыты">
              {contacts.scheduleDays}, <span className="whitespace-nowrap">{contacts.scheduleHours}</span>
            </Item>
            <Item tone="sand" icon={<MapPin className="size-[1.1rem]" aria-hidden="true" />} label="Мекенжай">
              {contacts.address}
            </Item>
            <Item icon={<MapPinned className="size-[1.1rem]" aria-hidden="true" />} label="2ГИС-та көрсетілген мекенжай">
              {contacts.address2Gis}
            </Item>
            <Item icon={<InstagramIcon className="size-[1.1rem]" />} label="Instagram">
              <a href={contacts.instagram} target="_blank" rel="noopener noreferrer">
                {contacts.instagramHandle}
              </a>
            </Item>
          </ul>
        </Reveal>

        <Reveal className="mt-5">
          <MapCard compact />
        </Reveal>
      </div>
    </section>
  );
}
