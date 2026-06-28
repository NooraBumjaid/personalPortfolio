import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { MotionSection, MotionStagger, MotionItem } from "@/components/motion/Motion";
import { useLocale } from "@/lib/i18n";

export function AboutSection() {
  const { site, education, languages, ui } = useLocale();

  return (
    <section id="about" className="section-padding scroll-mt-28 border-t border-cyber-border/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <MotionSection>
          <SectionHeader
            label={ui.aboutLabel}
            title={ui.aboutTitle}
            highlight={ui.aboutHighlight}
            description={site.aboutLead}
          />
        </MotionSection>

        <MotionSection delay={0.1} className="mt-12 max-w-4xl">
          <p className="text-lg leading-relaxed text-cyber-muted">{site.profile}</p>
        </MotionSection>

        <MotionStagger className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {site.aboutHighlights.map((item) => (
            <MotionItem key={item}>
              <div className="flex items-start gap-3 rounded-xl border border-cyber-border/60 bg-white/[0.02] px-4 py-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyber-accent" />
                <span className="text-sm text-cyber-text">{item}</span>
              </div>
            </MotionItem>
          ))}
        </MotionStagger>

        <MotionStagger className="mt-10 grid gap-6 md:grid-cols-2">
          <MotionItem>
            <GlassCard className="h-full p-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-accent">
                {ui.education}
              </h3>
              <ul className="mt-4 space-y-4">
                {education.map((item) => (
                  <li key={item.degree}>
                    <p className="font-semibold text-cyber-text">{item.degree}</p>
                    <p className="mt-1 text-sm text-cyber-cyan">{item.institution}</p>
                    <p className="mt-1 font-mono text-xs text-cyber-muted">{item.period}</p>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </MotionItem>

          <MotionItem>
            <GlassCard className="h-full p-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-accent">
                {ui.spokenLanguages}
              </h3>
              <ul className="mt-4 space-y-3">
                {languages.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center justify-between rounded-lg border border-cyber-border/60 bg-white/[0.02] px-4 py-3"
                  >
                    <span className="text-sm font-medium text-cyber-text">{item.name}</span>
                    <span className="font-mono text-xs text-cyber-muted">{item.level}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </MotionItem>
        </MotionStagger>
      </div>
    </section>
  );
}
