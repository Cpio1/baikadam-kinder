import { ExternalLink, MapPin } from "lucide-react";
import { contacts, ctaText } from "@/data/kindergarten";

/**
 * Карточка карты. 2ГИС не предоставляет стабильный iframe по этой ссылке,
 * поэтому показываем иллюстрированную карту с кнопкой открытия 2ГИС.
 */
export function MapCard({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href={contacts.twoGis}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${ctaText.open2Gis}: ${contacts.address2GisFull}`}
      className={`group relative block overflow-hidden bg-sky-soft shadow-soft transition-shadow duration-300 hover:shadow-lift ${
        compact ? "h-64 rounded-[2rem_2rem_2rem_0.9rem]" : "h-full min-h-[380px] rounded-[3rem_1.25rem_3rem_1.25rem]"
      }`}
    >
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <rect width="400" height="300" fill="#eef7fc" />
        <path d="M-10 210c60-20 110-10 160 10s110 30 260-10v110H-10Z" fill="#e1f0f8" />
        <circle cx="330" cy="70" r="48" fill="#f0e2cf" opacity="0.55" />
        <ellipse cx="70" cy="80" rx="54" ry="34" fill="#d9ead2" opacity="0.7" />
        <g stroke="#ffffff" strokeLinecap="round" fill="none">
          <path d="M-10 120 410 160" strokeWidth="16" />
          <path d="M140 -10 190 310" strokeWidth="14" />
          <path d="M290 -10 250 310" strokeWidth="10" />
          <path d="M-10 250 410 220" strokeWidth="9" />
        </g>
        <g stroke="#c9e1f0" strokeLinecap="round" fill="none" strokeDasharray="2 10">
          <path d="M-10 120 410 160" strokeWidth="2.5" />
          <path d="M140 -10 190 310" strokeWidth="2.5" />
        </g>
        <path d="M60 280c40-60 80-60 120-110s80-50 92-110" stroke="#386e98" strokeWidth="3" strokeDasharray="6 8" fill="none" opacity="0.45" />
      </svg>

      <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2">
        <span className="absolute left-1/2 top-full size-6 -translate-x-1/2 -translate-y-1 rounded-full bg-blue/25 motion-safe:animate-ping" aria-hidden="true" />
        <span className="relative flex size-14 items-center justify-center rounded-full rounded-br-none bg-blue text-white shadow-lift rotate-45 transition-transform duration-300 group-hover:-translate-y-1">
          <MapPin className="size-6 -rotate-45" aria-hidden="true" />
        </span>
      </div>

      <div className={`absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-[1.5rem] bg-white/95 p-3 shadow-soft backdrop-blur ${compact ? "" : "inset-x-5 bottom-5 p-4"}`}>
        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-sky text-blue">
          <MapPin className="size-5" aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[0.72rem] font-bold uppercase tracking-wider text-brown">2ГИС</span>
          <span className="block truncate text-[0.92rem] font-bold text-ink">{contacts.address2Gis}</span>
        </span>
        <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-blue px-3.5 py-2 text-[0.82rem] font-bold text-white transition-colors group-hover:bg-blue-dark">
          {compact ? "Ашу" : ctaText.open2Gis}
          <ExternalLink className="size-3.5" aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}
