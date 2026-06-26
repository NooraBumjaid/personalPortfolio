import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface OpenForWorkBadgeProps {
  variant?: "inline" | "banner";
  className?: string;
}

function StatusDot() {
  return (
    <span className="relative flex h-2.5 w-2.5 shrink-0">
      <span className="absolute hidden h-full w-full animate-ping rounded-full bg-cyber-accent opacity-60 md:inline-flex" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyber-accent md:shadow-[0_0_10px_rgba(0,255,170,0.9)]" />
    </span>
  );
}

export function OpenForWorkBadge({
  variant = "inline",
  className,
}: OpenForWorkBadgeProps) {
  if (!siteConfig.openForWork) return null;

  if (variant === "banner") {
    return (
      <div
        className={cn(
          "glass-card relative overflow-hidden border-cyber-accent/25 p-6 md:p-8",
          className
        )}
      >
        <div className="pointer-events-none absolute -right-16 -top-16 hidden h-48 w-48 rounded-full bg-cyber-accent/10 blur-3xl md:block" />
        <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-cyber-accent/30 bg-cyber-accent/10 px-4 py-1.5">
              <StatusDot />
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-cyber-accent">
                {siteConfig.openForWorkLabel}
              </span>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-cyber-muted md:text-base">
              {siteConfig.openForWorkDescription}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 md:justify-end">
            {siteConfig.openForWorkTypes.map((type) => (
              <span
                key={type}
                className="rounded-full border border-cyber-border bg-white/5 px-3 py-1 font-mono text-[11px] text-cyber-muted"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-cyber-accent/30 bg-cyber-accent/10 px-4 py-1.5",
        className
      )}
    >
      <StatusDot />
      <span className="font-mono text-xs font-semibold uppercase tracking-widest text-cyber-accent">
        {siteConfig.openForWorkLabel}
      </span>
    </span>
  );
}
