/**
 * Сканирует public/images и записывает найденные фотографии (путь, размеры, blur-превью)
 * в src/data/photos.generated.json. Запускается автоматически перед `npm run dev` и `npm run build`.
 *
 *   public/images/main-page.(png|webp|jpg|jpeg)  — главная фотография (Hero)
 *   public/images/logo.png                       — логотип (PNG с прозрачным фоном)
 *   public/images/about.(png|webp|jpg|jpeg)      — фото раздела «Біз туралы» (необязательно)
 *   public/images/gallery/*                      — фотографии галереи
 *
 * Если какого-то файла нет, сайт показывает аккуратное оформление-заглушку.
 * main-page2.* намеренно не используется.
 */
import { readdir, writeFile } from "node:fs/promises";
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

async function findNamed(baseName, { blur = true } = {}) {
  const order = EXTENSIONS; // PNG в приоритете (сохраняет прозрачность и исходное качество)
  const files = (await list(IMAGES))
    .filter((f) => path.basename(f, path.extname(f)).toLowerCase() === baseName)
    .filter((f) => order.includes(path.extname(f).toLowerCase()))
    .sort((a, b) => order.indexOf(path.extname(a).toLowerCase()) - order.indexOf(path.extname(b).toLowerCase()));
  for (const f of files) {
    const d = await describe(IMAGES, f, "/images", blur);
    if (d) return d;
  }
  return null;
}

const isPhoto = (f) => EXTENSIONS.includes(path.extname(f).toLowerCase());
const byName = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

const galleryDir = path.join(IMAGES, "gallery");
let gallery = [];
for (const f of (await list(galleryDir)).filter(isPhoto).sort(byName)) {
  const d = await describe(galleryDir, f, "/images/gallery");
  if (d) gallery.push(d);
}
// Если папка gallery пуста — берём остальные фото из public/images (кроме служебных).
if (gallery.length === 0) {
  const loose = (await list(IMAGES))
    .filter(isPhoto)
    .filter((f) => !RESERVED.includes(path.basename(f, path.extname(f)).toLowerCase()))
    .sort(byName);
  for (const f of loose) {
    const d = await describe(IMAGES, f, "/images");
    if (d) gallery.push(d);
  }
}

const result = {
  main: await findNamed("main-page"),
  logo: await findNamed("logo", { blur: false }),
  about: await findNamed("about"),
  gallery,
};

const show = (d) => (d ? `${d.src} ${d.width}×${d.height}` : "не найдено");
console.log(`[photos] main-page: ${show(result.main)}`);
console.log(`[photos] logo: ${show(result.logo)}`);
console.log(`[photos] about: ${show(result.about)}`);
console.log(`[photos] gallery: ${gallery.length} фото`);

await writeFile(path.join(root, "src", "data", "photos.generated.json"), JSON.stringify(result, null, 2) + "\n");
