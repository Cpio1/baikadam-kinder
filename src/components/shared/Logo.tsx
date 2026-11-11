import Image from "next/image";
import { photos } from "@/data/kindergarten";

/** Логотип: если есть public/images/logo.png — показываем его (без фона), иначе фирменный знак. */
export function Logo({ size = 44, light = false }: { size?: number; light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      {photos.logo ? (
        <Image
          src={photos.logo.src}
          width={photos.logo.width}
          height={photos.logo.height}
          alt="«Байкадам» балабақшасының логотипі"
          className="w-auto object-contain"
          style={{ height: size }}
          sizes={`${Math.round((size * photos.logo.width) / photos.logo.height) * 2}px`}
          quality={85}
          loading="eager"
        />
      ) : (
        <LogoMark size={size} />
      )}
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.2rem] font-black tracking-tight ${light ? "text-white" : "text-ink"}`}>Байкадам</span>
        <span className={`mt-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] ${light ? "text-sky-deep" : "text-brown"}`}>
          балабақшасы
        </span>
      </span>
    </span>
  );
}

function LogoMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" className="shrink-0">
      <path d="M24 2c12 0 22 8.5 22 21.5S36.5 46 24 46 2 37 2 24 12 2 24 2Z" fill="#e1f0f8" />
      <path d="M11 30c3-7 8-11 13-11s10 4 13 11" fill="none" stroke="#386e98" strokeWidth="3.4" strokeLinecap="round" />
      <circle cx="24" cy="14" r="5.5" fill="#f0e2cf" stroke="#795b48" strokeWidth="2" />
      <path d="M15 34.5h18" stroke="#795b48" strokeWidth="3" strokeLinecap="round" />
      <path d="M36.5 9.5l.9 2 2.1.3-1.6 1.4.4 2.1-1.8-1.1-1.9 1.1.4-2.1-1.5-1.4 2.1-.3Z" fill="#386e98" />
    </svg>
  );
}
