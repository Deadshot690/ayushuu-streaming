import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { allItems } from "@/content/content";
import { useExperience } from "@/lib/experience";
import { MediaCard } from "@/components/MediaCard";

export function SearchOverlay() {
  const { setSearchOpen } = useExperience();
  const [q, setQ] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSearchOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return allItems.slice(0, 12);
    return allItems.filter((i) =>
      [i.title, i.description, i.genre, ...i.categories].join(" ").toLowerCase().includes(term),
    );
  }, [q]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-60 overflow-y-auto bg-background/95 backdrop-blur-xl"
    >
      <div className="mx-auto w-[min(64rem,94vw)] py-10 sm:py-16">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <Search className="h-5 w-5 text-subtle" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search memories, moments, chapters…"
            className="w-full bg-transparent font-display text-xl outline-none placeholder:text-subtle sm:text-3xl"
          />
          <button onClick={() => setSearchOpen(false)} aria-label="Close search" className="p-2">
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-4 text-xs tracking-[0.3em] text-subtle uppercase">
          {q.trim() ? `${results.length} result${results.length === 1 ? "" : "s"}` : "Suggestions"}
        </p>

        {results.length === 0 ? (
          <p className="mt-14 text-center font-display text-lg text-muted-foreground">
            No memories found — but she'd probably make one out of this too.
          </p>
        ) : (
          <div className="mt-6 flex flex-wrap gap-4">
            {results.map((item, i) => (
              <MediaCard key={item.id} item={item} index={i} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
