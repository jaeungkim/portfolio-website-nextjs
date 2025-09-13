"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Play, Volume2 } from "lucide-react";

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

const SoundwaveIcon = ({ isPlaying }: { isPlaying: boolean }) => {
  const bars = 5;
  const barW = 2;
  const gap = 1;
  const baseY = 1;
  const baseH = 6;
  const vbW = bars * barW + (bars - 1) * gap;
  const vbH = 8;

  const keyframes = [1, 3, 0.6, 2.5, 1.1, 2.2, 0.8, 1.8, 1];
  const dur = 3;
  const stagger = 0.1;

  return (
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: 0.75 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="w-4 h-4 flex items-center justify-center"
    >
      {isPlaying ? (
        <motion.svg
          viewBox={`0 0 ${vbW} ${vbH}`}
          role="img"
          aria-label="Soundwave"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-neutral-100"
        >
          <g fill="currentColor">
            {Array.from({ length: bars }).map((_, i) => {
              const x = i * (barW + gap);
              return (
                <motion.rect
                  key={i}
                  x={x}
                  y={baseY}
                  width={barW}
                  height={baseH}
                  rx={1}
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "bottom",
                  }}
                  animate={{ scaleY: keyframes }}
                  transition={{
                    duration: dur,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * stagger,
                    repeatType: "reverse",
                  }}
                />
              );
            })}
          </g>
        </motion.svg>
      ) : (
        <Play className="w-4 h-4 text-neutral-100" />
      )}
    </motion.div>
  );
};

export function BGMToggle({
  isPlaying,
  onToggle,
  className = "",
}: BGMToggleProps) {
  return (
    <motion.button
      onClick={onToggle}
      className={`absolute top-3 right-3 z-50 size-6 rounded-full bg-black/20 border border-neutral-500 flex items-center justify-center backdrop-blur-sm ${
        className || ""
      }`}
      aria-label={isPlaying ? "일시정지" : "재생"}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <SoundwaveIcon isPlaying={isPlaying} />
    </motion.button>
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
