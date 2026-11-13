"use client";

import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import type { Photo } from "@/data/kindergarten";

type Props = {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

const noopSubscribe = () => () => {};

/** Полноэкранный просмотр фото: Escape, стрелки, свайп, счётчик. */
export function ImageLightbox({ photos, index, onClose, onIndexChange }: Props) {
  const open = index !== null && photos[index] !== undefined;
  const [direction, setDirection] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  // true только на клиенте (портал в document.body), без setState в эффекте.
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  const go = useCallback(
    (step: number) => {
      if (index === null || photos.length < 2) return;
      setDirection(step);
      onIndexChange((index + step + photos.length) % photos.length);
    },
    [index, photos.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus?.();
    };
  }, [open, onClose, go]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -400) go(1);
    else if (info.offset.x > 60 || info.velocity.x > 400) go(-1);
  };

  if (!mounted) return null;
  const photo = open ? photos[index!] : null;

  return createPortal(
    <AnimatePresence>
      {open && photo && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Фотосуретті қарау"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#16283a]/92 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 pt-[max(1rem,env(safe-area-inset-top))] lg:px-8 lg:pt-6">
            <span className="rounded-full bg-white/12 px-3.5 py-1.5 text-sm font-bold text-white tabular-nums">
              {index! + 1} / {photos.length}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Жабу"
              className="flex size-11 items-center justify-center rounded-full bg-white/90 text-blue shadow-soft transition hover:bg-white active:scale-95"
            >
              <X className="size-6" />
            </button>
          </div>

          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={photo.src}
              custom={direction}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 60, scale: 0.97 }),
                center: { opacity: 1, x: 0, scale: 1 },
                exit: (d: number) => ({ opacity: 0, x: d * -60, scale: 0.97 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              drag={photos.length > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.5}
              onDragEnd={onDragEnd}
              onClick={(e) => e.stopPropagation()}
              className="relative flex w-full touch-pan-y items-center justify-center px-3 lg:px-28"
            >
              <Image
                src={photo.src}
                width={photo.width}
                height={photo.height}
                alt={`Балабақша өмірінен сәт — ${index! + 1}-фото`}
                sizes="100vw"
                quality={85}
                draggable={false}
                placeholder={photo.blurDataURL ? "blur" : "empty"}
                blurDataURL={photo.blurDataURL}
                className="h-auto max-h-[calc(100svh-10.5rem)] w-auto max-w-full select-none rounded-[1.25rem] object-contain shadow-2xl lg:max-h-[calc(100svh-8rem)]"
              />
            </motion.div>
          </AnimatePresence>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Алдыңғы фото"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-[calc(50%-4.25rem)] flex size-12 items-center justify-center rounded-full bg-white/90 text-blue shadow-soft transition hover:bg-white active:scale-95 lg:bottom-auto lg:left-6 lg:top-1/2 lg:-translate-y-1/2"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                aria-label="Келесі фото"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[calc(50%-4.25rem)] flex size-12 items-center justify-center rounded-full bg-white/90 text-blue shadow-soft transition hover:bg-white active:scale-95 lg:bottom-auto lg:right-6 lg:top-1/2 lg:-translate-y-1/2"
              >
                <ChevronRight className="size-6" />
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
