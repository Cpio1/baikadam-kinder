/**
 * Сканирует public/images и записывает найденные фотографии (путь, размеры, blur-превью)
 * в src/data/photos.generated.json. Запускается автоматически перед `npm run dev` и `npm run build`.
 *
 *   public/images/main-page.(png|webp|jpg|jpeg)  — главная фотография (Hero)
 *   public/images/logo.png                       — логотип (PNG с прозрачным фоном)
 *   public/images/about.(png|webp|jpg|jpeg)      — фото раздела «Біз туралы» (необязательно)
 *   public/images/gallery/*                      — фотографии галереи
 *   public/videos/main-page2.mp4 (+ -poster.jpg)  — видео раздела «Біз туралы»
 *
 * main-page.* ищется и в public/images, и в public/images/gallery.
 * Служебные файлы (main-page, main-page2, logo, about, og-image) в галерею не попадают.
 * Если какого-то файла нет, сайт показывает аккуратное оформление-заглушку.
 */
import { access, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const IMAGES = path.join(root, "public", "images");
const EXTENSIONS = [".png", ".webp", ".jpg", ".jpeg"];
const RESERVED = ["main-page", "main-page2", "logo", "about", "og-image"];

async function list(dir) {
  try {
    return (await readdir(dir)).filter((f) => !f.startsWith("."));
  } catch {
    return [];
  }
}

async function describe(dir, file, publicPrefix, withBlur = true) {
  const full = path.join(dir, file);
  try {
    const meta = await sharp(full).metadata();
    if (!meta.width || !meta.height) return null;
    const rotated = (meta.orientation ?? 1) >= 5;
    let blurDataURL;
    if (withBlur) {
      const buf = await sharp(full).rotate().resize(16, 16, { fit: "inside" }).webp({ quality: 40 }).toBuffer();
      blurDataURL = `data:image/webp;base64,${buf.toString("base64")}`;
    }
    return {
      src: `${publicPrefix}/${encodeURIComponent(file)}`,
      width: rotated ? meta.height : meta.width,
      height: rotated ? meta.width : meta.height,
      ...(blurDataURL ? { blurDataURL } : {}),
    };
  } catch (err) {
    console.warn(`[photos] ${file}: не удалось прочитать (${err.message}) — пропущено.`);
    return null;
  }
}

async function findNamed(baseName, { blur = true, dirs = [[IMAGES, "/images"]] } = {}) {
  const order = EXTENSIONS; // PNG в приоритете (сохраняет прозрачность и исходное качество)
  for (const [dir, prefix] of dirs) {
    const files = (await list(dir))
      .filter((f) => path.basename(f, path.extname(f)).toLowerCase() === baseName)
      .filter((f) => order.includes(path.extname(f).toLowerCase()))
      .sort((a, b) => order.indexOf(path.extname(a).toLowerCase()) - order.indexOf(path.extname(b).toLowerCase()));
    for (const f of files) {
      const d = await describe(dir, f, prefix, blur);
      if (d) return d;
    }
  }
  return null;
}

const isPhoto = (f) => EXTENSIONS.includes(path.extname(f).toLowerCase());
const isReserved = (f) => RESERVED.includes(path.basename(f, path.extname(f)).toLowerCase());
const exists = (p) => access(p).then(() => true, () => false);
const byName = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

const galleryDir = path.join(IMAGES, "gallery");
let gallery = [];
for (const f of (await list(galleryDir)).filter(isPhoto).filter((f) => !isReserved(f)).sort(byName)) {
  const d = await describe(galleryDir, f, "/images/gallery");
  if (d) gallery.push(d);
}
// Если папка gallery пуста — берём остальные фото из public/images (кроме служебных).
if (gallery.length === 0) {
  const loose = (await list(IMAGES))
    .filter(isPhoto)
    .filter((f) => !isReserved(f))
    .sort(byName);
  for (const f of loose) {
    const d = await describe(IMAGES, f, "/images");
    if (d) gallery.push(d);
  }
}

// Видео: браузерный MP4 (H.264), сконвертированный из исходного main-page2.MOV (HEVC).
const VIDEOS = path.join(root, "public", "videos");
let video = null;
if (await exists(path.join(VIDEOS, "main-page2.mp4"))) {
  video = { src: "/videos/main-page2.mp4", width: 720, height: 1280 };
  if (await exists(path.join(VIDEOS, "main-page2-poster.jpg"))) {
    const meta = await sharp(path.join(VIDEOS, "main-page2-poster.jpg")).metadata();
    video = { src: "/videos/main-page2.mp4", poster: "/videos/main-page2-poster.jpg", width: meta.width, height: meta.height };
  }
}

const result = {
  main: await findNamed("main-page", { dirs: [[IMAGES, "/images"], [galleryDir, "/images/gallery"]] }),
  logo: await findNamed("logo", { blur: false }),
  about: await findNamed("about"),
  video,
  gallery,
};

const show = (d) => (d ? `${d.src} ${d.width}×${d.height}` : "не найдено");
console.log(`[photos] main-page: ${show(result.main)}`);
console.log(`[photos] logo: ${show(result.logo)}`);
console.log(`[photos] about: ${show(result.about)}`);
console.log(`[photos] video: ${video ? `${video.src} ${video.width}×${video.height}` : "не найдено"}`);
console.log(`[photos] gallery: ${gallery.length} фото`);

await writeFile(path.join(root, "src", "data", "photos.generated.json"), JSON.stringify(result, null, 2) + "\n");
