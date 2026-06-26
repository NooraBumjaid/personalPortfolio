import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { MotionSection, MotionStagger, MotionItem } from "@/components/motion/Motion";
import { experience } from "@/lib/site-config";

export function ExperienceSection() {
  return (
    <section id="experience" className="section-padding scroll-mt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <MotionSection>
          <SectionHeader
            label="Experience"
            title="Professional"
            highlight="experience"
            description="Practical exposure through internship and professional workplace environments."
          />
        </MotionSection>

        <MotionStagger className="mt-12 space-y-6">
          {experience.map((item) => (
            <MotionItem key={item.organization}>
              <GlassCard hover className="p-6 md:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-cyber-accent">
                      {item.period}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-cyber-text">{item.role}</h3>
                    <p className="mt-1 text-cyber-cyan">{item.organization}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-cyber-muted">{item.description}</p>
                {"highlights" in item && item.highlights?.length ? (
                  <ul className="mt-4 space-y-2.5">
                    {item.highlights.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-cyber-muted">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyber-accent" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {item.responsibilities ? (
                  <div className="mt-5">
                    <p className="mb-3 text-sm font-medium text-cyber-text">Key Responsibilities</p>
                    <div className="flex flex-wrap gap-2">
                      {item.responsibilities.map((task) => (
                        <span
                          key={task}
                          className="rounded-lg border border-cyber-border/60 bg-white/[0.03] px-3 py-1.5 text-xs text-cyber-muted"
                        >
                          {task}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </GlassCard>
            </MotionItem>
          ))}
        </MotionStagger>
      </div>
    </section>
  );
}
