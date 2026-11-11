"use client";

import { useCallback, useState } from "react";
import { GALLERY_INITIAL, photos } from "@/data/kindergarten";

/** Общая логика галереи для desktop и mobile. */
export function useGallery() {
  const all = photos.gallery;
  const [expanded, setExpanded] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const visible = expanded ? all : all.slice(0, GALLERY_INITIAL);
  const close = useCallback(() => setLightbox(null), []);
  return {
    all,
    visible,
    expanded,
    hasMore: all.length > GALLERY_INITIAL,
    toggle: () => setExpanded((v) => !v),
    lightbox,
    open: setLightbox,
    close,
    setLightbox,
  };
}
