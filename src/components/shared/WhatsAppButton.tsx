"use client";

import { motion } from "motion/react";
import { contacts } from "@/data/kindergarten";
import { WhatsAppIcon } from "./BrandIcons";

/** Плавающая кнопка WhatsApp (видна на всех экранах). */
export function WhatsAppButton() {
  return (
    <motion.a
      href={contacts.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp арқылы жазу"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_12px_28px_-8px_rgb(31_168_85/0.6)] lg:bottom-6 lg:right-6 lg:size-[3.6rem]"
    >
      <span className="absolute inset-0 rounded-full bg-whatsapp opacity-40 motion-safe:animate-ping [animation-duration:2.6s]" aria-hidden="true" />
      <WhatsAppIcon className="relative size-7" />
    </motion.a>
  );
}
