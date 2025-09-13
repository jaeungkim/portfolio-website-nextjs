"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause } from "lucide-react";

export interface BGMProps {
  src?: string;
  loop?: boolean;
  volume?: number;
  className?: string;
}

export interface BGMToggleProps {
  isPlaying: boolean;
  onToggle: () => void;
  className?: string;
}

export const useBGM = (
  src?: string,
  options: {
    loop?: boolean;
    volume?: number;
  } = {}
) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { loop = true, volume = 0.3 } = options;

  useEffect(() => {
    if (!src) return;

    const audio = new Audio(src);
    audio.loop = loop;
    audio.volume = volume;
    audio.preload = "auto";

    audio.addEventListener("play", () => setIsPlaying(true));
    audio.addEventListener("pause", () => setIsPlaying(false));

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [src, loop, volume]);

  function play() {
    if (!audioRef.current) return;
    audioRef.current.play().catch((err) => {
      console.error("Audio playback failed:", err);
    });
  }

  function pause() {
    if (!audioRef.current) return;
    audioRef.current.pause();
  }

  function toggle() {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }

  return {
    isPlaying,
    play,
    pause,
    toggle,
  };
};

export function BGM({ src, loop = true, volume = 0.3 }: BGMProps) {
  useBGM(src, { loop, volume });
  return null;
}

export function BGMToggle({
  isPlaying,
  onToggle,
  className = "",
}: BGMToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`absolute top-3 right-3 z-50 size-6 rounded-full bg-black/20 border border-neutral-500 flex items-center justify-center ${
        className || ""
      }`}
      aria-label={isPlaying ? "일시정지" : "재생"}
    >
      {!isPlaying ? (
        <Play className="w-3 h-3 text-neutral-100" />
      ) : (
        <Pause className="w-3 h-3 text-neutral-100" />
      )}
    </button>
  );
}

export function BGMPlayer({
  src,
  loop,
  volume,
  className,
}: {
  src?: string;
  loop?: boolean;
  volume?: number;
  className?: string;
}) {
  const { isPlaying, toggle } = useBGM(src, { loop, volume });

  return (
    <>
      <BGM src={src} loop={loop} volume={volume} />
      <BGMToggle
        isPlaying={isPlaying}
        onToggle={toggle}
        className={className}
      />
    </>
  );
}

export default BGM;
