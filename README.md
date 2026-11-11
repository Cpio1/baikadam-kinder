# «Байкадам» балабақшасы — сайт

Next.js (App Router) + TypeScript + Tailwind CSS 4 + Motion + Lucide.

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production-сборка
```

## Фотографии

Положите файлы в `public/images/` — при `npm run dev` / `npm run build` скрипт
`scripts/detect-photos.mjs` сам найдёт их и запишет размеры в `src/data/photos.generated.json`.

| Файл | Где используется |
| --- | --- |
| `public/images/main-page.png` (или .webp/.jpg/.jpeg) | Главный экран (Hero) |
| `public/images/logo.png` | Логотип в шапке и подвале (PNG с прозрачным фоном) |
| `public/images/about.*` (необязательно) | Фото раздела «Біз туралы»; если нет — берётся первое фото галереи |
| `public/images/gallery/*` | Галерея (сортировка по имени: 01.jpg, 02.jpg …) |

Если файлов нет, вместо них показывается аккуратная иллюстрация — ничего не ломается.
`main-page2.*` намеренно не используется.

## Структура

- `src/data/kindergarten.ts` — все тексты и контакты (единый источник данных).
- `src/components/desktop/*` — композиция для экранов ≥ 1024px.
- `src/components/mobile/*` — отдельная композиция для телефонов (< 1024px).
- `src/components/shared/*` — общие элементы (заголовки, декор, лайтбокс, WhatsApp-кнопка, карта).

## Vercel

Импортируйте папку как проект Next.js — настройки по умолчанию подходят.
Для корректных Open Graph ссылок можно задать `NEXT_PUBLIC_SITE_URL` (например, `https://baikadam.kz`).
