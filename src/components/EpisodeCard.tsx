import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { MediaItem } from "@/content/content";
import { useExperience } from "@/lib/experience";

export function EpisodeCard({ item, index }: { item: MediaItem; index: number }) {
  const { play, progress } = useExperience();
  const p = progress[item.id];
  const pct = p && p.duration ? Math.min(100, (p.time / p.duration) * 100) : 0;

  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.35) }}
      onClick={() => play(item.id)}
      className="group flex w-full items-center gap-4 rounded-lg border border-border/60 bg-surface/50 p-3 text-left transition hover:border-primary/60 hover:bg-elevated sm:gap-6 sm:p-4"
    >
      <span className="w-6 shrink-0 text-center font-title text-xl text-subtle sm:text-3xl">
        {item.episode}
      </span>

      <div className="relative aspect-video w-28 shrink-0 overflow-hidden rounded sm:w-44">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 transition group-hover:opacity-100">
          <Play className="h-6 w-6 fill-current" />
        </div>
        {pct > 1 && (
          <div className="absolute inset-x-0 bottom-0 h-[3px] bg-muted">
            <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <p className="truncate font-semibold">{item.title}</p>
          <span className="shrink-0 text-xs text-subtle">{item.durationLabel}</span>
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
      </div>
    </motion.button>
  );
}
