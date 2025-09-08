"use client";

import React, { useState, useEffect, useRef } from "react";

export interface BGMProps {
  src?: string;
  autoPlay?: boolean;
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
    autoPlay?: boolean;
    loop?: boolean;
    volume?: number;
  } = {}
) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { autoPlay = true, loop = true, volume = 0.3 } = options;

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!src) return;

    const audio = new Audio(src);
    audio.loop = loop;
    audio.volume = volume;
    audio.preload = "auto";

    audio.addEventListener("play", () => setIsPlaying(true));
    audio.addEventListener("pause", () => setIsPlaying(false));

    audioRef.current = audio;

    if (autoPlay) {
      const playAudio = async () => {
        try {
          await audio.play();
        } catch (err) {
          // Autoplay failed, audio ready for manual play
        }
      };
      playAudio();
    }

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [src, loop, volume, autoPlay]);

  const play = async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
    } catch (err) {
      // Play failed
    }
  };

  const pause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  return {
    isPlaying,
    play,
    pause,
    toggle,
  };
};

export const BGM: React.FC<BGMProps> = ({ src, autoPlay = true, loop = true, volume = 0.3 }) => {
  useBGM(src, { autoPlay, loop, volume });
  return null;
};

export const BGMToggle: React.FC<BGMToggleProps> = ({ isPlaying, onToggle, className = "" }) => {
  return (
    <button
      onClick={onToggle}
      className={`fixed top-4 right-4 z-50 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm border border-gray-300 flex items-center justify-center hover:bg-black/30 transition-colors duration-200 ${className}`}
      aria-label={isPlaying ? "배경음악 일시정지" : "배경음악 재생"}
      title={isPlaying ? "배경음악 일시정지" : "배경음악 재생"}
    >
      {!isPlaying ? (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
        </svg>
      )}
    </button>
  );
};

export const BGMPlayer: React.FC<{
  src?: string;
  autoPlay?: boolean;
  loop?: boolean;
  volume?: number;
  className?: string;
}> = (props) => {
  const { isPlaying, toggle } = useBGM(props.src, {
    autoPlay: props.autoPlay,
    loop: props.loop,
    volume: props.volume,
  });

  return (
    <>
      <BGM {...props} />
      <BGMToggle isPlaying={isPlaying} onToggle={toggle} className={props.className} />
    </>
  );
};

export default BGM;
