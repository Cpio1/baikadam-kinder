import type { NextConfig } from "next";

/**
 * Статический экспорт для GitHub Pages включается переменной окружения:
 *
 *   GITHUB_PAGES=true NEXT_PUBLIC_BASE_PATH=/baikadam-kinder npm run build   → out/
 *
 * NEXT_PUBLIC_BASE_PATH — префикс, под которым сайт опубликован
 * (https://cpio1.github.io/baikadam-kinder/). Для собственного домена
 * просто не задавайте его (или задайте пустым) — компоненты менять не нужно,
 * все локальные пути формируются через withBasePath() в src/lib/basePath.ts.
 */
const isStaticExport = process.env.GITHUB_PAGES === "true" || process.env.STATIC_EXPORT === "true";
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: "export" as const, trailingSlash: true } : {}),
  ...(basePath ? { basePath } : {}),
  images: {
    // Оптимизатор изображений требует Node.js-сервер, поэтому в статическом экспорте он отключён.
    unoptimized: isStaticExport,
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
