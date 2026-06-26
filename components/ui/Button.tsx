import { Link } from "@/lib/router";
import { cn } from "@/lib/utils";
import { withBasePath } from "@/lib/paths";
import { ReactNode } from "react";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
  external?: boolean;
  download?: boolean;
}

const variants = {
  primary:
    "bg-cyber-accent text-cyber-bg hover:bg-cyber-accent-dim shadow-lg shadow-cyber-accent/20",
  secondary:
    "border border-cyber-accent/40 text-cyber-accent hover:bg-cyber-accent/10 hover:border-cyber-accent/60",
  ghost:
    "border border-cyber-border text-cyber-muted hover:border-cyber-accent/40 hover:text-cyber-accent hover:bg-white/5",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

function resolveHref(href: string, external?: boolean) {
  if (external || href.startsWith("#") || href.startsWith("mailto:")) return href;
  if (href.startsWith("/")) return withBasePath(href);
  return href;
}

export function Button({
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  children,
  className,
  external,
  download,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-accent/50",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    const resolvedHref = resolveHref(href, external);

    if (external || download || href.startsWith("#") || href.startsWith("mailto:")) {
      return (
        <a
          href={resolvedHref}
          className={classes}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          download={download}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
