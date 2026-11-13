"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Video } from "@/data/kindergarten";

type Props = {
  video: Video;
  /** Форма и размеры рамки (скругления, ширина). Пропорции рамки = пропорции видео — кадр не обрезается. */
  className?: string;
  /** Положение и размер кнопок управления — отдельно для desktop и mobile. */
  controlsClassName?: string;
  size?: "md" | "lg";
};

/**
 * Видео без звука по умолчанию (muted + autoPlay + loop + playsInline — так его разрешают
 * автоматически воспроизводить и iOS, и Android). Звук включается кнопкой (жест пользователя).
 * Вне экрана видео ставится на паузу, чтобы не расходовать трафик и батарею.
 */
export function AboutVideo({ video, className = "", controlsClassName = "", size = "md" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userPaused.current) el.play().catch(() => setPlaying(false));
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggleSound = () => {
    const el = ref.current;
    if (!el) return;
    const next = !el.muted;
    el.muted = next;
    setMuted(next);
    // На телефонах (режим энергосбережения) автозапуск может быть заблокирован — запускаем по нажатию.
    // Если браузер не разрешил звук, возвращаемся к беззвучному воспроизведению, а не останавливаем видео.
    if (el.paused) {
      userPaused.current = false;
      el.play().catch(() => {
        el.muted = true;
        setMuted(true);
        el.play().catch(() => {});
      });
    }
  };

  const togglePlay = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      userPaused.current = false;
      el.play().catch(() => {});
    } else {
      userPaused.current = true;
      el.pause();
    }
  };

  const btn =
    size === "lg"
      ? "size-12 [&_svg]:size-5"
      : "size-11 [&_svg]:size-[1.15rem]";

  return (
    <div className={`relative overflow-hidden bg-sky-deep ${className}`} style={{ aspectRatio: `${video.width} / ${video.height}` }}>
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        src={video.src}
        poster={video.poster}
        muted
        autoPlay
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        aria-label="«Байкадам» балабақшасы туралы бейне"
      />

      {/* лёгкое затемнение снизу, чтобы кнопки читались на любом кадре */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink/35 to-transparent" />

      <div className={`absolute flex items-center gap-2 ${controlsClassName}`}>
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Бейнені тоқтату" : "Бейнені қосу"}
          className={`flex items-center justify-center rounded-full bg-white/90 text-blue shadow-soft backdrop-blur transition hover:bg-white active:scale-95 ${btn}`}
        >
          {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" className="translate-x-px" />}
        </button>
        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={!muted}
          aria-label={muted ? "Дыбысты қосу" : "Дыбысты өшіру"}
          className={`group inline-flex items-center gap-2 rounded-full py-2.5 pl-3 pr-4 font-bold shadow-soft backdrop-blur transition active:scale-95 ${
            muted ? "bg-white/90 text-blue hover:bg-white" : "bg-blue text-white hover:bg-blue-dark"
          } ${size === "lg" ? "text-[0.92rem] [&_svg]:size-5" : "text-[0.85rem] [&_svg]:size-[1.1rem]"}`}
        >
          {muted ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
          <span>{muted ? "Дыбысты қосу" : "Дыбысты өшіру"}</span>
        </button>
      </div>
    </div>
  );
}
