import { Medal, MessageCircleHeart, Music2, Palette } from "lucide-react";
import type { ActivityKey } from "@/data/kindergarten";

const icons = { karate: Medal, dance: Music2, clay: Palette, speech: MessageCircleHeart } as const;

export function ActivityIcon({ name, className = "" }: { name: ActivityKey; className?: string }) {
  const Icon = icons[name];
  return <Icon className={className} aria-hidden="true" strokeWidth={2} />;
}

/** Цветовые акценты карточек кружков. */
export const activityTheme: Record<ActivityKey, { badge: string; card: string; dot: string }> = {
  karate: { badge: "bg-blue text-white", card: "bg-white", dot: "text-sky-deep" },
  dance: { badge: "bg-sand text-brown", card: "bg-sand-soft", dot: "text-sand-deep" },
  clay: { badge: "bg-brown text-white", card: "bg-white", dot: "text-sand-deep" },
  speech: { badge: "bg-sky text-blue", card: "bg-sky-soft", dot: "text-sky-deep" },
};
