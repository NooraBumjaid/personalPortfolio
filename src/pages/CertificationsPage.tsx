import { Button } from "@/components/ui/Button";
import { CertificationsList } from "@/components/certifications/CertificationsList";
import { FadeIn, PageTransition } from "@/components/motion/FadeIn";
import { useLocale } from "@/lib/i18n";
import { useDocumentTitle } from "@/lib/use-document-title";

export function CertificationsPage() {
  const { certifications, ui } = useLocale();

  useDocumentTitle(`${ui.documentTitleCertifications} | ${ui.documentTitleSuffix}`);

  return (
    <PageTransition>
      <div className="relative overflow-hidden pt-28 pb-20">
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid bg-gradient-radial opacity-60" />
        <div className="pointer-events-none absolute left-1/4 top-24 hidden h-64 w-64 rounded-full bg-cyber-accent/5 blur-3xl md:block" />
        <div className="pointer-events-none absolute bottom-16 right-1/4 hidden h-72 w-72 rounded-full bg-cyber-purple/5 blur-3xl md:block" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn onMount className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-sm uppercase tracking-widest text-cyber-accent">
              {ui.certificationsPageTag}
            </p>
            <h1 className="mt-2 section-heading">
              {ui.certificationsPageTitle}{" "}
              <span className="cyber-gradient-text">{ui.certificationsPageHighlight}</span>
            </h1>
            <p className="section-subheading mx-auto mt-4 max-w-2xl">
              {ui.certificationsPageDescription}
            </p>

            <div className="mt-6 flex justify-center">
              <span className="rounded-full border border-cyber-border bg-white/5 px-4 py-1.5 font-mono text-xs text-cyber-muted">
                {ui.certificationsCount(certifications.length)}
              </span>
            </div>

            <div className="mt-8 flex justify-center">
              <Button href="/#certifications" variant="secondary" size="md">
                <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                {ui.backToHome}
              </Button>
            </div>
          </FadeIn>

          <FadeIn onMount className="mt-14">
            <CertificationsList />
          </FadeIn>
        </div>
      </div>
    </PageTransition>
  );
}
