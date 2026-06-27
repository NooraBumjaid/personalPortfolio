import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { DocumentLinksGrid } from "@/components/ui/DocumentLink";
import { MotionSection, MotionStagger, MotionItem } from "@/components/motion/Motion";
import { awards } from "@/lib/site-config";

const awardIcons = {
  trophy: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M5 3h14M9 3v2a3 3 0 006 0V3M7 21h10M12 17v4M8 7h8l-1 8H9L8 7z"
    />
  ),
  medal: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 15a3 3 0 100-6 3 3 0 000 6zM8.5 8.5L6 3h12l-2.5 5.5M8.5 15.5L6 21h12l-2.5-5.5"
    />
  ),
  star: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 3l2.4 4.86L20 9.27l-4 3.9.94 5.5L12 16.77 7.06 18.67 8 13.17 4 9.27l5.6-.41L12 3z"
    />
  ),
};

export function AwardsSection() {
  return (
    <section id="awards" className="section-padding scroll-mt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <MotionSection>
          <SectionHeader
            label="Awards"
            title="Achievements"
            highlight="& recognition"
            description="Competitive awards and recognitions across technology, robotics, and academic excellence."
          />
        </MotionSection>

        <MotionStagger className="mt-12 grid gap-6 lg:grid-cols-3">
          {awards.map((award) => (
            <MotionItem key={award.title}>
              <GlassCard hover className="flex h-full flex-col p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyber-accent/20 to-cyber-purple/20 text-cyber-accent">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {awardIcons[award.icon as keyof typeof awardIcons] ?? awardIcons.star}
                  </svg>
                </div>
                <h3 className="text-lg font-semibold leading-snug text-cyber-text">{award.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-cyber-muted">
                  {award.description}
                </p>
                {award.documents && award.documents.length > 0 ? (
                  <DocumentLinksGrid documents={award.documents} className="mt-auto" />
                ) : null}
              </GlassCard>
            </MotionItem>
          ))}
        </MotionStagger>
      </div>
    </section>
  );
}
