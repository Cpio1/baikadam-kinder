"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { sectionText, type Photo } from "@/data/kindergarten";
import { splitColumns } from "@/lib/photoShape";
import { ImageLightbox } from "../shared/ImageLightbox";
import { GalleryEmpty } from "../shared/Placeholders";
import { Reveal } from "../shared/Reveal";
import { SectionHeading } from "../shared/SectionHeading";
import { useGallery } from "../shared/useGallery";

const radii = ["rounded-[1.6rem_0.6rem_1.6rem_1.6rem]", "rounded-[0.6rem_1.6rem_1.6rem_1.6rem]", "rounded-[1.6rem_1.6rem_0.6rem_1.6rem]", "rounded-[1.6rem_1.6rem_1.6rem_0.6rem]"];

function Tile({ photo, index, onOpen, className, sizes }: { photo: Photo; index: number; onOpen: () => void; className: string; sizes: string }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${index + 1}-фотоны үлкейтіп қарау`}
      className={`relative block w-full overflow-hidden bg-sand shadow-soft active:scale-[0.98] transition-transform ${className}`}
    >
      <Image
        src={photo.src}
        width={photo.width}
        height={photo.height}
        alt={`Балабақша өмірінен сәт — ${index + 1}-фото`}
        sizes={sizes}
        placeholder={photo.blurDataURL ? "blur" : "empty"}
        blurDataURL={photo.blurDataURL}
        className="h-auto w-full"
      />
    </button>
  );
}

export function MobileGallery() {
  const g = useGallery();
  const t = sectionText.gallery;
  const [first, ...rest] = g.visible;

  return (
    <section id="m-gallery" data-section="gallery" aria-labelledby="gallery-title-m" className="relative overflow-x-clip bg-sand-soft py-14">
      <svg viewBox="0 0 400 30" preserveAspectRatio="none" aria-hidden="true" className="absolute inset-x-0 -top-px h-6 w-full text-bg">
        <path fill="currentColor" d="M0 0h400v14c-60 12-110 10-160 2S120 4 70 10 20 18 0 12Z" />
      </svg>

      <div className="relative mx-auto max-w-[560px] px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} id="gallery-title-m" />
        </Reveal>

        <div className="mt-7">
          {g.all.length === 0 ? (
            <Reveal>
              <GalleryEmpty title={t.emptyTitle} text={t.emptyText} />
            </Reveal>
          ) : (
            <>
              {first && (
                <Reveal>
                  <Tile photo={first} index={0} onOpen={() => g.open(0)} className="rounded-[2rem_2rem_2rem_0.75rem]" sizes="(max-width: 560px) 100vw, 560px" />
                </Reveal>
              )}
              {rest.length > 0 && (
                <div className="mt-3 grid grid-cols-2 items-start gap-3">
                  {splitColumns(rest, 2, 1).map((col, c) => (
                    <ul key={c} className="flex flex-col gap-3">
                      {col.map(({ item: photo, index: i }, j) => (
                        <motion.li
                          key={photo.src}
                          initial={{ opacity: 0, y: 18 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ duration: 0.5, delay: c * 0.06 }}
                        >
                          <Tile photo={photo} index={i} onOpen={() => g.open(i)} className={radii[(c * 2 + j) % radii.length]} sizes="(max-width: 560px) 50vw, 280px" />
                        </motion.li>
                      ))}
                    </ul>
                  ))}
                </div>
              )}
            </>
          )}

          {g.hasMore && (
            <button
              type="button"
              onClick={g.toggle}
              aria-expanded={g.expanded}
              className="mt-4 flex min-h-13 w-full items-center justify-center gap-2 rounded-full border-2 border-blue/20 bg-white text-[1rem] font-bold text-blue shadow-soft active:scale-[0.98]"
            >
              {g.expanded ? t.less : t.more}
              <ChevronDown className={`size-4 transition-transform duration-300 ${g.expanded ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <ImageLightbox photos={g.visible} index={g.lightbox} onClose={g.close} onIndexChange={g.setLightbox} />
    </section>
  );
}
