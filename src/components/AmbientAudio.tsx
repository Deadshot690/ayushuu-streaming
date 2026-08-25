import { useEffect, useRef } from "react";
import { music } from "@/content/content";
import { useExperience } from "@/lib/experience";

export function AmbientAudio() {
  const { muted, playingId } = useExperience();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.5;

    if (muted || playingId !== null) {
      audio.pause();
    } else {
      audio.play().catch(() => {
        const handleInteraction = () => {
          if (!muted && !playingId) {
            void audio.play().catch(() => {});
          }
          window.removeEventListener("click", handleInteraction);
          window.removeEventListener("keydown", handleInteraction);
        };
        window.addEventListener("click", handleInteraction, { once: true });
        window.addEventListener("keydown", handleInteraction, { once: true });
      });
    }
  }, [muted, playingId]);

  return <audio ref={audioRef} src={music.theme} loop preload="auto" className="hidden" />;
}
