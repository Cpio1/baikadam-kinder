"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { sectionText } from "@/data/kindergarten";
import { ImageLightbox } from "../shared/ImageLightbox";
import { GalleryEmpty } from "../shared/Placeholders";
import { Reveal } from "../shared/Reveal";
import { SectionHeading } from "../shared/SectionHeading";
import { useGallery } from "../shared/useGallery";

/**
 * Mobile-галерея: сетка 2 колонки, одинаковые карточки 4:5, небольшие отступы.
 * Карточки занимают ровно ширину контейнера (min-w-0) — без горизонтальной прокрутки от 320px.
 */
export function MobileGallery() {
  const g = useGallery();
  const t = sectionText.gallery;

  return (
    <section id="m-gallery" data-section="gallery" aria-labelledby="gallery-title-m" className="relative overflow-x-clip bg-sand-soft py-11">
      <svg viewBox="0 0 400 30" preserveAspectRatio="none" aria-hidden="true" className="absolute inset-x-0 -top-px h-5 w-full text-bg">
        <path fill="currentColor" d="M0 0h400v14c-60 12-110 10-160 2S120 4 70 10 20 18 0 12Z" />
      </svg>

      <div className="relative mx-auto max-w-[560px] px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} id="gallery-title-m" />
        </Reveal>

        <div className="mt-6">
          {g.all.length === 0 ? (
            <Reveal>
              <GalleryEmpty title={t.emptyTitle} text={t.emptyText} />
            </Reveal>
          ) : (
            <ul className="grid grid-cols-2 gap-2.5">
              {g.visible.map((photo, i) => (
                <motion.li
                  key={photo.src}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: (i % 2) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="min-w-0"
                >
                  <button
                    type="button"
                    onClick={() => g.open(i)}
                    aria-label={`${i + 1}-фотоны үлкейтіп қарау`}
                    className="relative block aspect-[4/5] w-full overflow-hidden rounded-[1.15rem] bg-sand shadow-soft ring-1 ring-white/70 transition-transform active:scale-[0.97]"
                  >
                    <Image
                      src={photo.src}
                      fill
                      alt={`Балабақша өмірінен сәт — ${i + 1}-фото`}
                      sizes="(max-width: 560px) 50vw, 270px"
                      placeholder={photo.blurDataURL ? "blur" : "empty"}
                      blurDataURL={photo.blurDataURL}
                      className="object-cover"
                    />
                  </button>
                </motion.li>
              ))}
            </ul>
          )}

          {g.hasMore && (
            <button
              type="button"
              onClick={g.toggle}
              aria-expanded={g.expanded}
              className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-blue/20 bg-white px-4 text-[0.95rem] font-bold text-blue shadow-soft active:scale-[0.98]"
            >
              {g.expanded ? t.less : `${t.more} (${g.all.length - g.visible.length})`}
              <ChevronDown className={`size-4 shrink-0 transition-transform duration-300 ${g.expanded ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <ImageLightbox photos={g.visible} index={g.lightbox} onClose={g.close} onIndexChange={g.setLightbox} />
    </section>
  );
}
