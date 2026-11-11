import { Camera } from "lucide-react";
import { Cloud, Flower, Heart, Sparkle, Star, Sun } from "./FloatingShapes";

/** Иллюстрация вместо главной фотографии, пока main-page.* не добавлен. */
export function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <div className={`relative h-full w-full overflow-hidden bg-gradient-to-b from-sky via-sky-soft to-sand-soft ${className}`} aria-hidden="true">
      <Sun className="absolute right-[14%] top-[10%] w-[18%] text-sand-deep animate-spin-slow" />
      <Cloud className="absolute left-[8%] top-[16%] w-[26%] text-white animate-drift" />
      <Cloud className="absolute right-[30%] top-[30%] w-[16%] text-white/80 animate-drift [animation-delay:-6s]" />
      <svg viewBox="0 0 300 220" className="absolute inset-x-[10%] bottom-[10%] w-[80%]">
        <ellipse cx="150" cy="206" rx="140" ry="12" fill="#e2cdb1" opacity="0.6" />
        <rect x="70" y="92" width="160" height="112" rx="14" fill="#ffffff" />
        <path d="M54 100 150 30l96 70" fill="#386e98" />
        <path d="M54 100 150 30l96 70" fill="none" stroke="#2c5a7f" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx="150" cy="78" r="13" fill="#f0e2cf" stroke="#795b48" strokeWidth="3" />
        <rect x="88" y="122" width="34" height="30" rx="8" fill="#e1f0f8" />
        <rect x="178" y="122" width="34" height="30" rx="8" fill="#e1f0f8" />
        <path d="M134 204v-40a16 16 0 0 1 32 0v40Z" fill="#795b48" />
        <circle cx="160" cy="184" r="2.5" fill="#f0e2cf" />
        <circle cx="40" cy="186" r="16" fill="#6c9cc2" />
        <rect x="38" y="186" width="4" height="20" fill="#795b48" />
        <circle cx="262" cy="182" r="20" fill="#9cc3de" />
        <rect x="260" y="182" width="4" height="24" fill="#795b48" />
      </svg>
      <Star className="absolute left-[18%] top-[44%] w-[5%] text-blue-soft animate-twinkle" />
      <Sparkle className="absolute right-[10%] top-[48%] w-[4%] text-brown-soft animate-twinkle [animation-delay:-1.4s]" />
    </div>
  );
}

/** Заглушка для фото раздела «Біз туралы». */
export function AboutIllustration({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-sand-soft via-sand to-sky ${className}`} aria-hidden="true">
      <div className="absolute inset-0 dots-pattern opacity-50" />
      <div className="relative flex items-end gap-3">
        <Heart className="w-14 text-blue-soft animate-float" />
        <Sun className="w-20 text-brown-soft/70 animate-spin-slow" />
        <Flower className="w-14 text-blue animate-float [animation-delay:-2s]" />
      </div>
      <Cloud className="absolute left-[10%] top-[12%] w-[30%] text-white/90 animate-drift" />
      <Star className="absolute right-[14%] bottom-[16%] w-6 text-blue-soft animate-twinkle" />
    </div>
  );
}

/** Пустое состояние галереи. */
export function GalleryEmpty({ title, text }: { title: string; text: string }) {
  return (
    <div className="relative mx-auto flex max-w-xl flex-col items-center overflow-hidden rounded-[2.5rem_1.25rem_2.5rem_1.25rem] border-2 border-dashed border-sky-deep bg-white/70 px-6 py-12 text-center">
      <Cloud className="absolute -left-4 top-4 w-24 text-sky" aria-hidden="true" />
      <Star className="absolute right-6 top-6 w-5 text-sand-deep animate-twinkle" aria-hidden="true" />
      <span className="relative mb-4 flex size-16 items-center justify-center shape-blob bg-sky text-blue">
        <Camera className="size-7" aria-hidden="true" />
      </span>
      <p className="relative font-display text-lg font-extrabold text-ink">{title}</p>
      <p className="relative mt-2 max-w-sm text-[0.95rem] text-ink-soft">{text}</p>
    </div>
  );
}
