import { createFileRoute } from "@tanstack/react-router";
import { byCategory, rows } from "@/content/content";
import { useExperience } from "@/lib/experience";
import { Hero } from "@/components/Hero";
import { ContentRow } from "@/components/ContentRow";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anne Originals — Home" },
      {
        name: "description",
        content:
          "Browse the Anne Cinematic Universe: original films, one season of chapters and a birthday special.",
      },
      { property: "og:title", content: "Anne Originals — Home" },
      {
        property: "og:description",
        content: "Original films, chapters and memories — streaming exclusively for Anne.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { continueWatching } = useExperience();

  return (
    <>
      <Hero />
      <div className="relative z-10 -mt-16 sm:-mt-24">
        {continueWatching.length > 0 && (
          <ContentRow title="Continue Watching" items={continueWatching} wide />
        )}
        {rows.map((r) => (
          <ContentRow key={r.key} title={r.title} items={byCategory(r.key)} />
        ))}
      </div>
    </>
  );
}

