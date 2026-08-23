import { useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Play, Plus, X } from "lucide-react";
import { byId, castCredits, episodes } from "@/content/content";
import { useExperience } from "@/lib/experience";
import { MediaCard } from "@/components/MediaCard";
import { EpisodeCard } from "@/components/EpisodeCard";

export function DetailModal({ id }: { id: string }) {
  const { closeDetail, play, toggleMyList, inMyList } = useExperience();
  const item = byId(id);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDetail();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [closeDetail]);

  if (!item) return null;
  const saved = inMyList(item.id);
  const related = (item.related ?? []).map(byId).filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-60 overflow-y-auto bg-background/85 backdrop-blur-sm"
      onClick={closeDetail}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="mx-auto my-6 w-[min(56rem,94vw)] overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)]"
      >
        <div className="relative aspect-video w-full">
          <img src={item.backdrop} alt={item.title} className="h-full w-full object-cover" />
          <div className="hero-fade absolute inset-0" />
          <button
            onClick={closeDetail}
            aria-label="Close"
            className="absolute top-3 right-3 rounded-full bg-background/70 p-2 backdrop-blur transition hover:bg-background"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
            <h2 className="font-title text-3xl tracking-[0.06em] sm:text-5xl">{item.title}</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={() => play(item.id)}
                className="flex items-center gap-2 rounded bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-glow"
              >
                <Play className="h-4 w-4 fill-current" /> Play
              </button>
              <button
                onClick={() => toggleMyList(item.id)}
                className="flex items-center gap-2 rounded border border-border bg-card/80 px-5 py-2.5 text-sm font-semibold backdrop-blur transition hover:border-primary"
              >
                {saved ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {saved ? "In My List" : "My List"}
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-5 sm:grid-cols-3 sm:p-8">
          <div className="sm:col-span-2">
            <div className="flex flex-wrap items-center gap-3 text-xs tracking-[0.2em] text-subtle uppercase">
              <span>{item.year}</span>
              <span>{item.durationLabel}</span>
              <span className="rounded border border-border px-2 py-0.5">{item.rating}</span>
              <span>HD</span>
            </div>
            <p className="mt-4 leading-relaxed text-muted-foreground">{item.description}</p>
          </div>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="inline text-subtle">Genre: </dt>
              <dd className="inline">{item.genre}</dd>
            </div>
            {castCredits.map((c) => (
              <div key={c.role}>
                <dt className="inline text-subtle">{c.role}: </dt>
                <dd className="inline">{c.name}</dd>
              </div>
            ))}
          </dl>
        </div>

        {item.type === "episode" && (
          <div className="px-5 pb-8 sm:px-8">
            <h3 className="mb-4 font-display text-xl">Episodes</h3>
            <div className="space-y-3">
              {episodes.map((e, i) => (
                <EpisodeCard key={e.id} item={e} index={i} />
              ))}
            </div>
          </div>
        )}

        {related.length > 0 && (
          <div className="px-5 pb-8 sm:px-8">
            <h3 className="mb-4 font-display text-xl">More Like This</h3>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
              {related.map((r, i) => r && <MediaCard key={r.id} item={r} index={i} />)}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
