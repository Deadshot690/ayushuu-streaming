import { motion } from "framer-motion";
import { Check, Info, Play, Plus } from "lucide-react";
import type { MediaItem } from "@/content/content";
import { useExperience } from "@/lib/experience";
import { cn } from "@/lib/utils";

export function MediaCard({
  item,
  index = 0,
  wide = false,
}: {
  item: MediaItem;
  index?: number;
  wide?: boolean;
}) {
  const { play, openDetail, toggleMyList, inMyList, progress } = useExperience();
  const p = progress[item.id];
  const pct = p && p.duration ? Math.min(100, (p.time / p.duration) * 100) : 0;
  const saved = inMyList(item.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
      className={cn(
        "group relative shrink-0 snap-start",
        wide ? "w-[17rem] sm:w-[21rem]" : "w-[9.5rem] sm:w-[12rem]",
      )}
    >
      <button
        onClick={() => openDetail(item.id)}
        className="block w-full text-left focus-visible:outline-none"
        aria-label={`Open ${item.title}`}
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-lg border border-border/60 bg-surface transition duration-500",
            "group-hover:-translate-y-1 group-hover:border-primary/60 group-hover:shadow-[var(--shadow-card)]",
            wide ? "aspect-video" : "aspect-[2/3]",
          )}
        >
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent opacity-80" />

          <div className="absolute inset-x-0 bottom-0 p-3">
            <p className="font-title text-sm tracking-[0.12em] sm:text-base">{item.title}</p>
            <p className="mt-0.5 text-[0.65rem] tracking-[0.18em] text-subtle uppercase">
              {item.type === "episode"
                ? `S${String(item.season).padStart(2, "0")} E${String(item.episode).padStart(2, "0")}`
                : item.genre}
            </p>
          </div>

          {pct > 1 && (
            <div className="absolute inset-x-0 bottom-0 h-[3px] bg-muted">
              <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
            </div>
          )}
        </div>
      </button>

      <div className="pointer-events-none absolute inset-x-0 -bottom-1 flex items-center justify-center gap-2 opacity-0 transition duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
        <button
          onClick={() => play(item.id)}
          aria-label={`Play ${item.title}`}
          className="rounded-full bg-primary p-2 text-primary-foreground shadow-[var(--shadow-glow)] transition hover:bg-primary-glow"
        >
          <Play className="h-3.5 w-3.5 fill-current" />
        </button>
        <button
          onClick={() => toggleMyList(item.id)}
          aria-label={saved ? "Remove from My List" : "Add to My List"}
          className="rounded-full border border-border bg-card/90 p-2 backdrop-blur transition hover:border-primary"
        >
          {saved ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
        </button>
        <button
          onClick={() => openDetail(item.id)}
          aria-label={`More about ${item.title}`}
          className="rounded-full border border-border bg-card/90 p-2 backdrop-blur transition hover:border-primary"
        >
          <Info className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
