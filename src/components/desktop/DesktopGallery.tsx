"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ChevronDown, Expand } from "lucide-react";
import { sectionText } from "@/data/kindergarten";
import { ImageLightbox } from "../shared/ImageLightbox";
import { GalleryEmpty } from "../shared/Placeholders";
import { Reveal } from "../shared/Reveal";
import { SectionHeading } from "../shared/SectionHeading";
import { useGallery } from "../shared/useGallery";

/**
 * Desktop-галерея: компактная сетка 3 колонки с одинаковыми карточками 4:3.
 * Ширина сетки ограничена (≤ 920px), поэтому 2 ряда + заголовок помещаются даже на 1366×768.
 * Полностью фото видно в полноэкранном просмотре (object-contain).
 */
export function DesktopGallery() {
  const g = useGallery();
  const t = sectionText.gallery;

  return (
    <section id="gallery" data-section="gallery" aria-labelledby="gallery-title-d" className="relative overflow-x-clip bg-sand-soft py-14 xl:py-16">
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true" className="absolute inset-x-0 -top-px h-8 w-full text-bg">
        <path fill="currentColor" d="M0 0h1440v28c-200 28-380 30-560 12S520 6 340 18 120 40 0 26Z" />
      </svg>

      <div className="relative mx-auto max-w-[1200px] px-6 xl:px-8">
        <Reveal>
          <SectionHeading align="center" eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} id="gallery-title-d" />
        </Reveal>

        {/* Высота 2 рядов ≈ половине ширины сетки → ширина зависит от высоты экрана, чтобы всё помещалось на 1366×768 */}
        <div className="mx-auto mt-8" style={{ maxWidth: "min(920px, max(720px, calc((100svh - 330px) * 2)))" }}>
          {g.all.length === 0 ? (
            <Reveal>
              <GalleryEmpty title={t.emptyTitle} text={t.emptyText} />
            </Reveal>
          ) : (
            <ul className="grid grid-cols-3 gap-4 xl:gap-5">
              {g.visible.map((photo, i) => (
                <motion.li
                  key={photo.src}
                  initial={{ opacity: 0, y: 18, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="min-w-0"
                >
                  <button
                    type="button"
                    onClick={() => g.open(i)}
                    aria-label={`${i + 1}-фотоны үлкейтіп қарау`}
                    className="group relative block aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] bg-sand shadow-soft ring-1 ring-white/70 transition duration-300 hover:-translate-y-1 hover:shadow-lift focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue"
                  >
                    <Image
                      src={photo.src}
                      fill
                      alt={`Балабақша өмірінен сәт — ${i + 1}-фото`}
                      sizes="(min-width: 1280px) 300px, 30vw"
                      placeholder={photo.blurDataURL ? "blur" : "empty"}
                      blurDataURL={photo.blurDataURL}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="absolute bottom-3 right-3 flex size-9 translate-y-1 items-center justify-center rounded-full bg-white/90 text-blue opacity-0 shadow-soft transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <Expand className="size-4" aria-hidden="true" />
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>
          )}

          {g.hasMore && (
            <div className="mt-7 flex justify-center">
              <button
                type="button"
                onClick={g.toggle}
                aria-expanded={g.expanded}
                className="group inline-flex items-center gap-2 rounded-full border-2 border-blue/20 bg-white px-6 py-3 text-[0.95rem] font-bold text-blue shadow-soft transition hover:-translate-y-0.5 hover:border-blue/40"
              >
                {g.expanded ? t.less : `${t.more} (${g.all.length - g.visible.length})`}
                <ChevronDown className={`size-4 transition-transform duration-300 ${g.expanded ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>

      <ImageLightbox photos={g.visible} index={g.lightbox} onClose={g.close} onIndexChange={g.setLightbox} />
    </section>
  );
}
