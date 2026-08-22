import { brand } from "@/content/content";
import { cn } from "@/lib/utils";

export function Wordmark({
  size = "md",
  stacked = false,
  className,
}: {
  size?: "sm" | "md" | "lg" | "xl";
  stacked?: boolean;
  className?: string;
}) {
  const sizes = {
    sm: "text-lg sm:text-xl",
    md: "text-2xl sm:text-3xl",
    lg: "text-4xl sm:text-6xl",
    xl: "text-5xl sm:text-8xl",
  } as const;

  return (
    <div
      className={cn(
        "font-title leading-[0.85] select-none",
        stacked ? "flex flex-col" : "flex items-baseline gap-2",
        className,
      )}
      aria-label={`${brand.name} ${brand.sub}`}
    >
      <span className={cn(sizes[size], "text-primary tracking-[0.18em]")}>{brand.name}</span>
      <span
        className={cn(
          stacked ? sizes[size] : "text-[0.62em]",
          "tracking-[0.42em] text-foreground/90",
        )}
      >
        {brand.sub}
      </span>
    </div>
  );
}
