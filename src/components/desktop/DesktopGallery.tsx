"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Expand } from "lucide-react";
import { sectionText } from "@/data/kindergarten";
import { splitColumns } from "@/lib/photoShape";
import { Floating, Heart, Star } from "../shared/FloatingShapes";
import { ImageLightbox } from "../shared/ImageLightbox";
import { GalleryEmpty } from "../shared/Placeholders";
import { Reveal } from "../shared/Reveal";
import { SectionHeading } from "../shared/SectionHeading";
import { useGallery } from "../shared/useGallery";

const radii = [
  "rounded-[2.5rem_1rem_2.5rem_1rem]",
  "rounded-[1rem_2.5rem_1rem_2.5rem]",
  "rounded-[2rem]",
  "rounded-[2.75rem_2.75rem_1rem_2.75rem]",
  "rounded-[1rem_2.75rem_2.75rem_2.75rem]",
  "rounded-[2.25rem_2.25rem_2.25rem_0.75rem]",
];

export function DesktopGallery() {
  const g = useGallery();
  const t = sectionText.gallery;

  return (
    <section id="gallery" data-section="gallery" aria-labelledby="gallery-title-d" className="relative overflow-x-clip bg-sand-soft py-20 xl:py-24">
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true" className="absolute inset-x-0 -top-px h-10 w-full text-bg">
        <path fill="currentColor" d="M0 0h1440v28c-200 28-380 30-560 12S520 6 340 18 120 40 0 26Z" />
      </svg>
      <Floating className="left-[5%] top-24 w-6 text-blue-soft" delay={-1}>
        <Star className="animate-twinkle" />
      </Floating>
      <Floating className="right-[6%] top-32 w-7 text-brown-soft/60" delay={-3}>
        <Heart />
      </Floating>

      <div className="relative mx-auto max-w-[1200px] px-6 xl:px-8">
        <Reveal>
          <SectionHeading align="center" eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} id="gallery-title-d" />
        </Reveal>

        <div className="mt-12">
          {g.all.length === 0 ? (
            <Reveal>
              <GalleryEmpty title={t.emptyTitle} text={t.emptyText} />
            </Reveal>
          ) : (
            <div className="grid grid-cols-3 items-start gap-5 xl:gap-6">
              {splitColumns(g.visible, 3).map((col, c) => (
                <ul key={c} className="flex flex-col gap-5 xl:gap-6">
                  <AnimatePresence initial={false}>
                    {col.map(({ item: photo, index: i }, j) => (
                      <motion.li
                        key={photo.src}
                        initial={{ opacity: 0, y: 30, scale: 0.97 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.6, delay: c * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <button
                          type="button"
                          onClick={() => g.open(i)}
                          aria-label={`${i + 1}-фотоны үлкейтіп қарау`}
                          className={`group relative block w-full overflow-hidden bg-sand shadow-soft transition-shadow duration-300 hover:shadow-lift ${radii[(c * 2 + j) % radii.length]}`}
                        >
                          <Image
                            src={photo.src}
                            width={photo.width}
                            height={photo.height}
                            alt={`Балабақша өмірінен сәт — ${i + 1}-фото`}
                            sizes="(min-width: 1280px) 384px, 33vw"
                            placeholder={photo.blurDataURL ? "blur" : "empty"}
                            blurDataURL={photo.blurDataURL}
                            className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                          />
                          <span className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                          <span className="absolute bottom-4 right-4 flex size-10 translate-y-2 items-center justify-center rounded-full bg-white/90 text-blue opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                            <Expand className="size-4" aria-hidden="true" />
                          </span>
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              ))}
            </div>
          )}

          {g.hasMore && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={g.toggle}
                aria-expanded={g.expanded}
                className="group inline-flex items-center gap-2 rounded-full border-2 border-blue/20 bg-white px-7 py-3.5 text-[0.98rem] font-bold text-blue shadow-soft transition hover:-translate-y-0.5 hover:border-blue/40"
              >
                {g.expanded ? t.less : t.more}
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
