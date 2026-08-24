import { createFileRoute } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { episodes, series } from "@/content/content";
import { useExperience } from "@/lib/experience";
import { EpisodeCard } from "@/components/EpisodeCard";

export const Route = createFileRoute("/series")({
  head: () => ({
    meta: [
      { title: "The Story of Ayushuu — Series" },
      {
        name: "description",
        content: "One season, eight chapters about the girl who makes ordinary days cinematic.",
      },
      { property: "og:title", content: "The Story of Ayushuu — Series" },
      {
        property: "og:description",
        content: "Season 1: eight chapters of chaos, kindness and inside jokes.",
      },
    ],
  }),
  component: SeriesPage,
});

function SeriesPage() {
  const { play } = useExperience();

  return (
    <div>
      <section className="relative min-h-[60svh] overflow-hidden">
        <img
          src={series.backdrop}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-fade absolute inset-0" />
        <div className="hero-fade-side absolute inset-0" />
        <div className="relative flex min-h-[60svh] flex-col justify-end px-4 pb-10 sm:px-10 sm:pb-14">
          <p className="text-[0.65rem] tracking-[0.5em] text-primary uppercase">Original Series</p>
          <h1 className="mt-3 max-w-3xl font-title text-4xl leading-[0.95] tracking-[0.06em] sm:text-6xl">
            {series.title}
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">{series.description}</p>
          <button
            onClick={() => play(episodes[0]!.id)}
            className="mt-6 flex w-fit items-center gap-2 rounded bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-glow"
          >
            <Play className="h-4 w-4 fill-current" /> Play Episode 1
          </button>
        </div>
      </section>

      <div className="px-4 py-12 sm:px-10">
        <h2 className="font-display text-2xl">Season 1</h2>
        <div className="mt-6 space-y-3">
          {episodes.map((e, i) => (
            <EpisodeCard key={e.id} item={e} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
