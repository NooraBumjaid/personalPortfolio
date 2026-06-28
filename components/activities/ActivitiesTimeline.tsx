import { GlassCard } from "@/components/ui/GlassCard";
import { DocumentLinksGrid } from "@/components/ui/DocumentLink";
import { MotionStagger, MotionItem } from "@/components/motion/Motion";
import { useLocale } from "@/lib/i18n";

export function ActivitiesTimeline() {
  const { leadership } = useLocale();

  return (
    <div className="relative">
      <div className="absolute start-4 top-0 hidden h-full w-px bg-gradient-to-b from-cyber-accent/40 via-cyber-border to-transparent md:start-1/2 md:block" />

      <MotionStagger className="space-y-6">
        {leadership.map((item, index) => (
          <MotionItem key={item.role + item.period}>
            <div
              className={`relative md:flex ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}
            >
              <div className="absolute start-4 top-6 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-cyber-accent bg-cyber-bg md:start-1/2 md:block rtl:translate-x-1/2" />
              <GlassCard hover className="w-full p-5 md:w-[calc(50%-2rem)] md:ms-0">
                <p className="font-mono text-xs text-cyber-accent">{item.period}</p>
                <h3 className="mt-2 text-lg font-semibold text-cyber-text">{item.role}</h3>
                <p className="mt-1 text-sm text-cyber-cyan">{item.organization}</p>
                <p className="mt-3 text-sm leading-relaxed text-cyber-muted">{item.description}</p>
                {item.documents && item.documents.length > 0 ? (
                  <DocumentLinksGrid documents={item.documents} className="mt-2" />
                ) : null}
              </GlassCard>
            </div>
          </MotionItem>
        ))}
      </MotionStagger>
    </div>
  );
}
