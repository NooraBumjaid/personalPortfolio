import { ReactNode } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MotionSection, MotionStagger, MotionItem } from "@/components/motion/Motion";
import { skillCategories } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const categoryMeta: Record<
  string,
  {
    description: string;
    gradient: string;
    glow: string;
    icon: ReactNode;
  }
> = {
  Cybersecurity: {
    description: "Analysis, assessment, and secure design frameworks",
    gradient: "from-cyber-accent/20 via-cyber-cyan/10 to-transparent",
    glow: "group-hover:shadow-cyber-accent/10",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    ),
  },
  Programming: {
    description: "Languages used across academic and project work",
    gradient: "from-cyber-purple/20 via-violet-500/10 to-transparent",
    glow: "group-hover:shadow-cyber-purple/10",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
      />
    ),
  },
  "Web Development": {
    description: "Frontend and backend web technologies",
    gradient: "from-sky-500/20 via-cyber-cyan/10 to-transparent",
    glow: "group-hover:shadow-sky-500/10",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.264.26-2.465.732-3.553"
      />
    ),
  },
  Tools: {
    description: "Platforms and utilities for development and productivity",
    gradient: "from-emerald-500/15 via-cyber-accent/10 to-transparent",
    glow: "group-hover:shadow-emerald-500/10",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03a2.25 2.25 0 013.182 0l1.83 1.83a2.25 2.25 0 010 3.182l-3.03 2.496M11.42 15.17L4.5 8.25A2.652 2.652 0 016.75 4.5l1.83 1.83a2.25 2.25 0 010 3.182L4.5 8.25"
      />
    ),
  },
};

export function SkillsSection() {
  const categories = Object.values(skillCategories);

  return (
    <section
      id="skills"
      className="section-padding relative scroll-mt-28 overflow-hidden border-t border-cyber-border/50"
    >
      <div className="pointer-events-none absolute inset-0 bg-cyber-surface/30" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 rounded-full bg-cyber-accent/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <MotionSection>
          <SectionHeader
            label="Skills"
            title="Technical"
            highlight="competencies"
            description="Core skills across cybersecurity, programming, web development, and professional tools."
          />
        </MotionSection>

        <MotionStagger className="mt-12 grid gap-5 md:grid-cols-2">
          {categories.map((category) => {
            const meta = categoryMeta[category.label];
            const skillCount = category.skills.length;

            return (
              <MotionItem key={category.label}>
                <article
                  className={cn(
                    "skill-category-card group relative h-full overflow-hidden rounded-2xl border border-cyber-border/70 p-6 transition-all duration-300",
                    "hover:-translate-y-1 hover:border-cyber-accent/25",
                    meta?.glow && `hover:shadow-xl ${meta.glow}`
                  )}
                >
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60 transition-opacity duration-300 group-hover:opacity-100",
                      meta?.gradient ?? "from-white/5 to-transparent"
                    )}
                  />

                  <div className="relative text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyber-border/60 bg-cyber-bg/50 text-cyber-accent backdrop-blur-sm transition-colors group-hover:border-cyber-accent/30 group-hover:bg-cyber-accent/10">
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          {meta?.icon}
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-mono text-sm uppercase tracking-[0.18em] text-cyber-accent">
                          {category.label}
                        </h3>
                        {meta?.description ? (
                          <p className="mx-auto mt-1.5 max-w-sm text-sm leading-relaxed text-cyber-muted">
                            {meta.description}
                          </p>
                        ) : null}
                      </div>
                      <span className="rounded-full border border-cyber-border/60 bg-cyber-bg/40 px-2.5 py-1 font-mono text-[11px] text-cyber-muted">
                        {skillCount} skills
                      </span>
                    </div>

                    <div className="mt-6 flex flex-wrap justify-center gap-2.5">
                      {category.skills.map((skill) => (
                        <span key={skill} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </MotionItem>
            );
          })}
        </MotionStagger>
      </div>
    </section>
  );
}
