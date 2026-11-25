/**
 * Префикс публикации сайта (например, "/baikadam-kinder" для GitHub Pages).
 * Пустая строка — сайт в корне домена (собственный домен, Vercel, локальная разработка).
 * Значение подставляется при сборке из NEXT_PUBLIC_BASE_PATH и совпадает с basePath в next.config.ts.
 */
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");

/**
 * Добавляет basePath к локальному пути из public/ ("/images/…", "/videos/…").
 * Не трогает внешние ссылки (https:, wa.me, …), data:/blob: URL, якоря (#…) и
 * пути, у которых префикс уже есть, поэтому вызывать повторно безопасно.
 */
export function withBasePath(path: string): string {
  if (!basePath || !path.startsWith("/") || path.startsWith("//")) return path;
  if (path === basePath || path.startsWith(`${basePath}/`)) return path;
  return `${basePath}${path}`;
}
