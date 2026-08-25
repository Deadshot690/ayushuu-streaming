import { motion } from "framer-motion";
import { Info, Play } from "lucide-react";
import { hero } from "@/content/content";
import { useExperience } from "@/lib/experience";

export function Hero() {
  const { play, openDetail } = useExperience();

  return (
    <section className="grain relative min-h-[86svh] w-full overflow-hidden sm:min-h-[92svh]">
      <div className="absolute inset-0">
        {hero.video ? (
          <video
            src={hero.video}
            poster={hero.image}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          <img
            src={hero.image}
            alt=""
            aria-hidden
            className="ken-burns h-full w-full object-cover object-top"
          />
        )}
        <div className="hero-fade-side absolute inset-0" />
        <div className="hero-fade absolute inset-0" />
      </div>

      <div className="relative flex min-h-[86svh] flex-col justify-end px-4 pb-16 sm:min-h-[92svh] sm:px-10 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="text-[0.65rem] tracking-[0.5em] text-primary sm:text-xs">{hero.label}</p>
          <p className="mt-3 text-[0.65rem] tracking-[0.4em] text-subtle sm:text-xs">
            {hero.kicker}
          </p>
          <h1 className="mt-3 font-title text-4xl leading-[0.95] tracking-[0.06em] sm:text-7xl">
            {hero.title}
          </h1>
          <p className="mt-4 text-xs tracking-[0.25em] text-subtle uppercase">{hero.meta}</p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {hero.description}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              onClick={() => play(hero.playId)}
              className="flex items-center gap-2 rounded bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:bg-primary-glow sm:text-base"
            >
              <Play className="h-4 w-4 fill-current" /> Play
            </button>
            <button
              onClick={() => openDetail(hero.playId)}
              className="flex items-center gap-2 rounded border border-border bg-card/70 px-6 py-3 text-sm font-semibold backdrop-blur transition hover:border-primary sm:text-base"
            >
              <Info className="h-4 w-4" /> More Info
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
