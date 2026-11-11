import type { Photo } from "@/data/kindergarten";

/** Соотношение сторон рамки, близкое к фото, чтобы обрезка была минимальной. */
export function frameRatio(photo: Photo | null, min: number, max: number, fallback: number) {
  if (!photo) return fallback;
  return Math.min(max, Math.max(min, photo.width / photo.height));
}

/** Одинаковый sizes в desktop и mobile Hero → браузер загружает один и тот же файл. */
export const HERO_SIZES = "(min-width: 1024px) 560px, 100vw";

/** Раскладывает фото по колонкам «в самую короткую» — ровная masonry-сетка без обрезки. */
export function splitColumns<T extends { width: number; height: number }>(items: T[], columns: number, offset = 0) {
  const cols: { item: T; index: number }[][] = Array.from({ length: columns }, () => []);
  const heights = new Array(columns).fill(0);
  items.forEach((item, i) => {
    const target = heights.indexOf(Math.min(...heights));
    cols[target].push({ item, index: i + offset });
    heights[target] += item.height / item.width;
  });
  return cols;
}
