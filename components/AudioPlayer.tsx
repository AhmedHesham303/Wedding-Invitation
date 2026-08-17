"use client";

import { useState, useRef, useEffect } from "react";
import { Music } from "lucide-react";
import { WEDDING_DETAILS } from "@/app/_config/constants";

interface AudioPlayerProps {
  autoPlayTrigger?: boolean;
}

export default function AudioPlayer({ autoPlayTrigger }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log("Autoplay blocked by browser:", err);
        });
    }
  }, [autoPlayTrigger]);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={WEDDING_DETAILS.audioFilePath} loop />

      <button
        onClick={toggleAudio}
        className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/80 border border-amber-500/40 text-amber-300 text-xs font-medium backdrop-blur-md shadow-lg hover:border-amber-400 transition-all cursor-pointer"
      >
        <Music
          className={`w-4 h-4 ${isPlaying ? "animate-spin text-amber-400" : "text-neutral-400"}`}
        />
        <span>{isPlaying ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}</span>
      </button>
    </>
  );
}
