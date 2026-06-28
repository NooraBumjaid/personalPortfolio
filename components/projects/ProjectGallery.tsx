import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { withBasePath } from "@/lib/paths";
import { ProjectGalleryImage } from "@/lib/projects";
import { useLocale } from "@/lib/i18n";

interface ProjectGalleryProps {
  title?: string;
  projectTitle: string;
  items: ProjectGalleryImage[];
}

export function ProjectGallery({
  title,
  projectTitle,
  items,
}: ProjectGalleryProps) {
  const { ui } = useLocale();
  const galleryTitle = title ?? ui.roleBasedViews;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  const close = useCallback(() => setActiveIndex(null), []);

  const showPrevious = useCallback(() => {
    setActiveIndex((index) => (index !== null && index > 0 ? index - 1 : index));
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((index) =>
      index !== null && index < items.length - 1 ? index + 1 : index
    );
  }, [items.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, close, showNext, showPrevious]);

  const active = activeIndex !== null ? items[activeIndex] : null;

  return (
    <>
      <GlassCard className="overflow-hidden p-6 md:p-8">
        <h2 className="mb-4 font-mono text-sm uppercase tracking-wider text-cyber-accent">
          {galleryTitle}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {items.map((item, index) => (
            <div key={item.label}>
              <p className="mb-3 text-sm font-medium text-cyber-text">{item.label}</p>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group relative w-full overflow-hidden rounded-xl border border-cyber-border bg-cyber-surface text-left transition-colors hover:border-cyber-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-accent/50"
                aria-label={`View larger image: ${item.label}`}
              >
                <img
                  src={withBasePath(item.url)}
                  alt={`${projectTitle} — ${item.label}`}
                  className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <span className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-t from-cyber-bg/80 via-transparent to-transparent pb-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="rounded-full border border-cyber-border/60 bg-cyber-bg/80 px-3 py-1 text-xs text-cyber-muted backdrop-blur-sm">
                    {ui.clickToEnlarge}
                  </span>
                </span>
              </button>
            </div>
          ))}
        </div>
      </GlassCard>

      <AnimatePresence>
        {active && activeIndex !== null ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={active.label}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          >
            <button
              type="button"
              className="absolute inset-0 bg-cyber-bg/90 backdrop-blur-sm"
              onClick={close}
              aria-label="Close image viewer"
            />

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 flex max-h-[90vh] w-full max-w-6xl flex-col"
            >
              <div className="mb-3 flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-cyber-text sm:text-base">{active.label}</p>
                <button
                  type="button"
                  onClick={close}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyber-border bg-cyber-surface text-cyber-muted transition-colors hover:border-cyber-accent/40 hover:text-cyber-accent"
                  aria-label="Close"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-cyber-border bg-cyber-surface shadow-2xl">
                <img
                  src={withBasePath(active.url)}
                  alt={`${projectTitle} — ${active.label}`}
                  className="h-auto max-h-[calc(90vh-5rem)] w-full object-contain"
                />
              </div>

              {items.length > 1 ? (
                <div className="mt-4 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={showPrevious}
                    disabled={activeIndex === 0}
                    className="rounded-xl border border-cyber-border bg-cyber-surface px-4 py-2 text-sm text-cyber-muted transition-colors hover:border-cyber-accent/40 hover:text-cyber-accent disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {ui.previous}
                  </button>
                  <p className="text-xs text-cyber-muted">
                    {activeIndex + 1} / {items.length}
                  </p>
                  <button
                    type="button"
                    onClick={showNext}
                    disabled={activeIndex === items.length - 1}
                    className="rounded-xl border border-cyber-border bg-cyber-surface px-4 py-2 text-sm text-cyber-muted transition-colors hover:border-cyber-accent/40 hover:text-cyber-accent disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {ui.next}
                  </button>
                </div>
              ) : null}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
