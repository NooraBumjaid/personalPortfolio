import { Button } from "@/components/ui/Button";
import { ResumeViewer } from "@/components/resume/ResumeViewer";
import { FadeIn, PageTransition } from "@/components/motion/FadeIn";
import { useLocale } from "@/lib/i18n";
import { useDocumentTitle } from "@/lib/use-document-title";

export function ResumePage() {
  const { ui } = useLocale();

  useDocumentTitle(`${ui.documentTitleResume} | ${ui.documentTitleSuffix}`);

  return (
    <PageTransition>
      <div className="pt-28 pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <FadeIn onMount className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-sm uppercase tracking-widest text-cyber-accent">
              {"// resume"}
            </p>
            <h1 className="mt-2 section-heading">
              <span className="cyber-gradient-text">{ui.resumePageTitle}</span>
            </h1>
            <p className="section-subheading mx-auto mt-4">{ui.resumePageDescription}</p>
            <div className="mt-8 flex justify-center">
              <Button href="/" variant="secondary" size="md">
                <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                {ui.backToHome}
              </Button>
            </div>
          </FadeIn>

          <FadeIn onMount className="mt-10">
            <ResumeViewer tall />
          </FadeIn>
        </div>
      </div>
    </PageTransition>
  );
}
