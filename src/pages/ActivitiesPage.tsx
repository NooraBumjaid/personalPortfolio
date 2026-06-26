import { Button } from "@/components/ui/Button";
import { ActivitiesTimeline } from "@/components/activities/ActivitiesTimeline";
import { FadeIn, PageTransition } from "@/components/motion/FadeIn";
import { useDocumentTitle } from "@/lib/use-document-title";

export function ActivitiesPage() {
  useDocumentTitle("Activities | Noora Bumjaid");

  return (
    <PageTransition>
      <div className="pt-28 pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn onMount className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-sm uppercase tracking-widest text-cyber-accent">
                {"// activities"}
              </p>
              <h1 className="mt-2 section-heading">
                Community <span className="cyber-gradient-text">engagement</span>
              </h1>
              <p className="section-subheading mt-4 max-w-2xl">
                Leadership, volunteering, and extracurricular activities beyond the classroom.
              </p>
            </div>
            <Button href="/#activities" variant="ghost" size="md">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Back to Home
            </Button>
          </FadeIn>

          <FadeIn onMount className="mt-12">
            <ActivitiesTimeline />
          </FadeIn>
        </div>
      </div>
    </PageTransition>
  );
}
