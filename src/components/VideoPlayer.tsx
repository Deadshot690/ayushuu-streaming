import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Settings,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { brand, episodes, type MediaItem } from "@/content/content";
import { useExperience } from "@/lib/experience";
import { Wordmark } from "@/components/Wordmark";

function fmt(s: number) {
  if (!isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export function VideoPlayer({ item }: { item: MediaItem }) {
  const { closePlayer, saveProgress, progress, play, setCreditsOpen } = useExperience();
  const videoRef = useRef<HTMLVideoElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  const isReel = !item.video;
  const stills = item.reel?.length ? item.reel : [item.backdrop];

  const start = Math.min(progress[item.id]?.time ?? 0, item.duration - 1);
  const [current, setCurrent] = useState(Math.max(start, 0));
  const [duration, setDuration] = useState(item.duration || 1);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.7);
  const [fullscreen, setFullscreen] = useState(false);
  const [controls, setControls] = useState(true);
  const [failed, setFailed] = useState(false);
  const [titleCard, setTitleCard] = useState(true);
  const [nextPrompt, setNextPrompt] = useState(false);

  const nextEpisode =
    item.type === "episode" ? episodes.find((e) => (e.episode ?? 0) === (item.episode ?? 0) + 1) : undefined;

  // Title card
  useEffect(() => {
    const t = setTimeout(() => setTitleCard(false), 2600);
    return () => clearTimeout(t);
  }, [item.id]);

  // Virtual clock for reel playback
  useEffect(() => {
    if (!isReel || !playing || titleCard) return;
    const id = setInterval(() => {
      setCurrent((c) => Math.min(c + 0.25, duration));
    }, 250);
    return () => clearInterval(id);
  }, [isReel, playing, duration, titleCard]);

  // Persist progress
  useEffect(() => {
    const id = setInterval(() => saveProgress(item.id, current, duration), 1500);
    return () => clearInterval(id);
  }, [item.id, current, duration, saveProgress]);

  useEffect(() => {
    if (duration && current / duration > 0.9) setNextPrompt(true);
  }, [current, duration]);

  const finish = useCallback(() => {
    saveProgress(item.id, duration, duration);
    if (item.type === "episode" && !nextEpisode) {
      closePlayer();
      setCreditsOpen(true);
    } else {
      closePlayer();
    }
  }, [closePlayer, duration, item.id, item.type, nextEpisode, saveProgress, setCreditsOpen]);

  useEffect(() => {
    if (current >= duration && duration > 0) finish();
  }, [current, duration, finish]);

  // Controls auto-hide
  useEffect(() => {
    if (!controls) return;
    const t = setTimeout(() => setControls(false), 3200);
    return () => clearTimeout(t);
  }, [controls, current]);

  // Video element sync
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = muted;
    v.volume = volume;
    if (playing) void v.play().catch(() => setPlaying(false));
    else v.pause();
  }, [playing, muted, volume]);

  const seek = (t: number) => {
    setCurrent(t);
    setNextPrompt(false);
    if (videoRef.current) videoRef.current.currentTime = t;
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await shellRef.current?.requestFullscreen();
        setFullscreen(true);
      } else {
        await document.exitFullscreen();
        setFullscreen(false);
      }
    } catch {
      /* fullscreen unavailable */
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePlayer();
      if (e.key === " ") {
        e.preventDefault();
        setPlaying((p) => !p);
      }
      if (e.key === "ArrowRight") seek(Math.min(current + 10, duration));
      if (e.key === "ArrowLeft") seek(Math.max(current - 10, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const pct = duration ? (current / duration) * 100 : 0;
  const stillIndex = Math.min(stills.length - 1, Math.floor((current / Math.max(duration, 1)) * stills.length));

  return (
    <motion.div
      ref={shellRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-70 bg-background"
      onMouseMove={() => setControls(true)}
      onTouchStart={() => setControls(true)}
    >
      {/* Stage */}
      <div className="absolute inset-0 grain overflow-hidden">
        {failed ? (
          <div className="flex h-full items-center justify-center px-6 text-center">
            <p className="font-display text-lg text-muted-foreground">
              This memory is temporarily unavailable.
            </p>
          </div>
        ) : item.video ? (
          <video
            ref={videoRef}
            src={item.video}
            poster={item.backdrop}
            playsInline
            className="h-full w-full object-contain"
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || item.duration)}
            onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
            onEnded={finish}
            onError={() => setFailed(true)}
          />
        ) : (
          <AnimatePresence mode="sync">
            <motion.img
              key={stills[stillIndex]}
              src={stills[stillIndex]}
              alt={item.title}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1.14 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 1.2 }, scale: { duration: 24, ease: "linear" } }}
              className="absolute inset-0 h-full w-full object-cover"
              onError={() => setFailed(true)}
            />
          </AnimatePresence>
        )}
        <div className="pointer-events-none absolute inset-0 bg-background/25" />
      </div>

      {/* Title card overlay */}
      <AnimatePresence>
        {titleCard && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 bg-background"
          >
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <Wordmark size="md" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="text-center"
            >
              {item.type === "episode" && (
                <p className="text-xs tracking-[0.5em] text-subtle">
                  S{String(item.season).padStart(2, "0")} E{String(item.episode).padStart(2, "0")}
                </p>
              )}
              <h2 className="mt-3 font-display text-2xl sm:text-4xl">{item.title}</h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next episode prompt */}
      <AnimatePresence>
        {nextPrompt && nextEpisode && !titleCard && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute right-4 bottom-28 z-20 w-[min(22rem,85vw)] rounded-lg border border-border bg-card/90 p-4 backdrop-blur-md"
          >
            <p className="text-xs tracking-[0.3em] text-subtle">NEXT EPISODE</p>
            <div className="mt-3 flex gap-3">
              <img
                src={nextEpisode.image}
                alt=""
                loading="lazy"
                className="h-14 w-24 rounded object-cover"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{nextEpisode.title}</p>
                <p className="text-xs text-muted-foreground">{nextEpisode.durationLabel}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => play(nextEpisode.id)}
                className="rounded bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-glow"
              >
                Play Next
              </button>
              <button
                onClick={() => setNextPrompt(false)}
                className="rounded border border-border px-3 py-1.5 text-sm text-muted-foreground transition hover:text-foreground"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <AnimatePresence>
        {controls && !titleCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-30 flex flex-col justify-between"
          >
            <div className="flex items-start justify-between bg-gradient-to-b from-background/90 to-transparent p-4 sm:p-6">
              <button
                onClick={closePlayer}
                aria-label="Close player"
                className="flex items-center gap-2 text-muted-foreground transition hover:text-foreground"
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="hidden text-sm sm:inline">Back to {brand.name}</span>
              </button>
              <button onClick={closePlayer} aria-label="Close" className="text-muted-foreground hover:text-foreground">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-3 bg-gradient-to-t from-background via-background/70 to-transparent px-4 pt-16 pb-5 sm:px-8 sm:pb-7">
              <div>
                <p className="font-display text-lg sm:text-2xl">{item.title}</p>
                {item.type === "episode" && (
                  <p className="text-xs tracking-[0.3em] text-subtle">
                    S{String(item.season).padStart(2, "0")} E{String(item.episode).padStart(2, "0")}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="w-10 shrink-0 text-xs text-muted-foreground tabular-nums">{fmt(current)}</span>
                <div className="relative h-6 flex-1">
                  <input
                    type="range"
                    min={0}
                    max={duration}
                    step={0.5}
                    value={current}
                    aria-label="Seek"
                    onChange={(e) => seek(Number(e.target.value))}
                    className="absolute inset-0 h-6 w-full cursor-pointer opacity-0"
                  />
                  <div className="pointer-events-none absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                    <div
                      className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-primary glow-primary"
                      style={{ left: `calc(${pct}% - 7px)` }}
                    />
                  </div>
                </div>
                <span className="w-10 shrink-0 text-xs text-muted-foreground tabular-nums">{fmt(duration)}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 sm:gap-5">
                  <button
                    onClick={() => setPlaying((p) => !p)}
                    aria-label={playing ? "Pause" : "Play"}
                    className="grid h-11 w-11 place-items-center rounded-full bg-foreground/10 transition hover:bg-foreground/20"
                  >
                    {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </button>
                  <button
                    onClick={() => seek(Math.max(current - 10, 0))}
                    aria-label="Skip back 10 seconds"
                    className="text-muted-foreground transition hover:text-foreground"
                  >
                    <RotateCcw className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => seek(Math.min(current + 10, duration))}
                    aria-label="Skip forward 10 seconds"
                    className="text-muted-foreground transition hover:text-foreground"
                  >
                    <RotateCw className="h-5 w-5" />
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setMuted((m) => !m)}
                      aria-label={muted ? "Unmute" : "Mute"}
                      className="text-muted-foreground transition hover:text-foreground"
                    >
                      {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={muted ? 0 : volume}
                      aria-label="Volume"
                      onChange={(e) => {
                        setVolume(Number(e.target.value));
                        setMuted(Number(e.target.value) === 0);
                      }}
                      className="hidden h-1 w-24 accent-[oklch(0.53_0.22_25.5)] sm:block"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-5">
                  <button aria-label="Settings" className="text-muted-foreground transition hover:text-foreground">
                    <Settings className="h-5 w-5" />
                  </button>
                  <button
                    onClick={toggleFullscreen}
                    aria-label="Fullscreen"
                    className="text-muted-foreground transition hover:text-foreground"
                  >
                    {fullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
