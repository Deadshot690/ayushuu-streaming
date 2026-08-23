import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { MediaItem } from "@/content/content";
import { MediaCard } from "@/components/MediaCard";

export function ContentRow({
  title,
  items,
  wide = false,
}: {
  title: string;
  items: MediaItem[];
  wide?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  if (!items.length) return null;

  const scrollBy = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.85), behavior: "smooth" });
  };

  return (
    <section className="group/row relative py-4 sm:py-6">
      <div className="mb-3 flex items-baseline justify-between px-4 sm:px-10">
        <h2 className="font-display text-lg tracking-wide sm:text-2xl">{title}</h2>
      </div>

      <button
        onClick={() => scrollBy(-1)}
        aria-label="Scroll left"
        className="absolute top-1/2 left-1 z-20 hidden -translate-y-1/2 rounded-full border border-border bg-card/80 p-2 opacity-0 backdrop-blur transition group-hover/row:opacity-100 hover:border-primary sm:block"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => scrollBy(1)}
        aria-label="Scroll right"
        className="absolute top-1/2 right-1 z-20 hidden -translate-y-1/2 rounded-full border border-border bg-card/80 p-2 opacity-0 backdrop-blur transition group-hover/row:opacity-100 hover:border-primary sm:block"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div
        ref={ref}
        className="scrollbar-none flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pt-2 pb-8 sm:gap-4 sm:px-10"
      >
        {items.map((item, i) => (
          <MediaCard key={`${title}-${item.id}`} item={item} index={i} wide={wide} />
        ))}
      </div>
    </section>
  );
}
