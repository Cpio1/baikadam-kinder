import type { GroupKey } from "@/data/kindergarten";
import { Flower, Heart, Sparkle, Star, Sun } from "./FloatingShapes";

/** Визуальные темы карточек групп. */
export const groupTheme: Record<
  GroupKey,
  { card: string; title: string; text: string; badge: string; level: string }
> = {
  zhurekshe: {
    card: "bg-sky",
    title: "text-ink",
    text: "text-ink-soft",
    badge: "bg-white text-blue",
    level: "bg-white/80 text-blue",
  },
  kunshuak: {
    card: "bg-sand",
    title: "text-ink",
    text: "text-[#5d4a3c]",
    badge: "bg-white text-brown",
    level: "bg-white/75 text-brown",
  },
  kulynshak: {
    card: "bg-blue",
    title: "text-white",
    text: "text-white/85",
    badge: "bg-white text-blue",
    level: "bg-white/15 text-white",
  },
};

/** Большой значок группы. */
export function GroupBadgeIcon({ group, className = "" }: { group: GroupKey; className?: string }) {
  if (group === "zhurekshe") return <Heart className={`text-[#7fb0d5] ${className}`} />;
  if (group === "kunshuak") return <Sun className={`text-[#d9a066] ${className}`} />;
  return <Flower className={`text-blue-soft ${className}`} />;
}

/** Небольшие декоративные элементы внутри карточки. */
export function GroupDecor({ group }: { group: GroupKey }) {
  if (group === "zhurekshe") {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Heart className="absolute right-6 top-6 w-7 text-white/90 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-12" />
        <Heart className="absolute right-16 top-14 w-4 text-[#9cc3de] transition-transform duration-500 group-hover:translate-x-1" />
        <Heart className="absolute bottom-6 right-8 w-5 text-white/70" />
      </div>
    );
  }
  if (group === "kunshuak") {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Sun className="absolute -right-6 -top-6 w-28 text-white/55 animate-spin-slow" />
        <Sparkle className="absolute bottom-7 right-8 w-4 text-brown-soft/60 animate-twinkle" />
      </div>
    );
  }
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className="absolute -right-8 -top-8 size-28 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-110" />
      <span className="absolute right-10 top-16 size-5 rounded-full bg-sand/80 transition-transform duration-500 group-hover:-translate-y-1" />
      <span className="absolute bottom-8 right-6 size-3 rounded-full bg-sky/80" />
      <Star className="absolute right-20 top-6 w-4 text-sky animate-twinkle" />
    </div>
  );
}
