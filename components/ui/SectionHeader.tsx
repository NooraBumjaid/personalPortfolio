import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  title: string;
  highlight?: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  label,
  title,
  highlight,
  description,
  className,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        align === "center" && "mx-auto max-w-2xl text-center",
        className
      )}
    >
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-accent">
        {label}
      </p>
      <h2 className="section-heading mt-3">
        {title}
        {highlight ? (
          <>
            {" "}
            <span className="cyber-gradient-text">{highlight}</span>
          </>
        ) : null}
      </h2>
      {description ? (
        <p className="section-subheading mt-4">{description}</p>
      ) : null}
    </div>
  );
}
