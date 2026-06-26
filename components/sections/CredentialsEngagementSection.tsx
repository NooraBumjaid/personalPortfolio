import { Link } from "@/lib/router";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { MotionSection, MotionStagger, MotionItem } from "@/components/motion/Motion";
import { certifications, leadership } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const cards = [
  {
    id: "certifications",
    href: "/certifications",
    label: "Certifications",
    title: "Professional",
    highlight: "credentials",
    description: "Industry-aligned certifications and workshops in cybersecurity, software development, and project management.",
    count: `${certifications.length} certifications`,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
      />
    ),
  },
  {
    id: "activities",
    href: "/activities",
    label: "Leadership & Activities",
    title: "Community",
    highlight: "engagement",
    description: "Leadership roles, volunteering, and extracurricular activities beyond the classroom.",
    count: `${leadership.length} activities`,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
      />
    ),
  },
];

export function CredentialsEngagementSection() {
  return (
    <section id="certifications" className="section-padding scroll-mt-28 border-t border-cyber-border/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <MotionSection>
          <SectionHeader
            label="Beyond Academics"
            title="Credentials &"
            highlight="community"
            description="Explore professional certifications and leadership activities in dedicated pages."
          />
        </MotionSection>

        <MotionStagger className="mt-12 grid gap-6 md:grid-cols-2">
          {cards.map((card) => (
            <MotionItem key={card.href}>
              <div id={card.id} className="scroll-mt-28 h-full">
              <Link
                href={card.href}
                className="group block h-full"
              >
                <GlassCard
                  hover
                  className={cn(
                    "flex h-full flex-col p-6 transition-all duration-300 md:p-8",
                    "group-hover:border-cyber-accent/40"
                  )}
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyber-accent/10 text-cyber-accent transition-colors group-hover:bg-cyber-accent/15">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {card.icon}
                    </svg>
                  </div>

                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-accent">
                    {card.label}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-cyber-text">
                    {card.title}{" "}
                    <span className="cyber-gradient-text">{card.highlight}</span>
                  </h3>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-cyber-muted">
                    {card.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-cyber-border/60 pt-5">
                    <span className="font-mono text-xs text-cyber-muted">{card.count}</span>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-cyber-accent transition-transform group-hover:translate-x-1">
                      View details
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </GlassCard>
              </Link>
              </div>
            </MotionItem>
          ))}
        </MotionStagger>
      </div>
    </section>
  );
}
