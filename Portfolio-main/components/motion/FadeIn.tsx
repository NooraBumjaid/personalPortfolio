import { ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  onMount?: boolean;
}

const directionClass = {
  up: "fade-in-up",
  down: "fade-in-down",
  left: "fade-in-left",
  right: "fade-in-right",
  none: "fade-in-none",
};

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.35,
  onMount = false,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (onMount) {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-40px", threshold: 0.05 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [onMount]);

  return (
    <div
      ref={ref}
      className={cn("fade-in", directionClass[direction], visible && "fade-in-visible", className)}
      style={{
        transitionDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    >
      {children}
    </div>
  );
}

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <div className={cn("page-enter", className)}>
      {children}
    </div>
  );
}
