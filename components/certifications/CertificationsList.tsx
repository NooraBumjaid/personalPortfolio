import { GlassCard } from "@/components/ui/GlassCard";
import { DocumentLink } from "@/components/ui/DocumentLink";
import { MotionStagger, MotionItem } from "@/components/motion/Motion";
import { useLocale } from "@/lib/i18n";

type CertItem = {
  name: string;
  issuer: string;
  year: string;
  shortName?: string;
  document?: string;
  inProgress?: boolean;
  description?: string;
  group?: string;
};

function isInProgress(cert: CertItem) {
  return Boolean(cert.inProgress);
}

function isProfessional(cert: CertItem) {
  return cert.group === "professional";
}

function CertCard({ cert }: { cert: CertItem }) {
  const { ui } = useLocale();
  const inProgress = isInProgress(cert);

  return (
    <GlassCard hover className="flex h-full flex-col p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyber-accent/10 text-cyber-accent">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
        </div>
        {inProgress ? (
          <span className="rounded-full border border-cyber-accent/40 bg-cyber-accent/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-cyber-accent">
            {ui.inProgress}
          </span>
        ) : null}
      </div>
      <h3 className="text-base font-semibold leading-snug text-cyber-text">
        {cert.shortName ?? cert.name}
      </h3>
      <p className="mt-2 text-sm text-cyber-cyan">{cert.issuer}</p>
      <p className="mt-2 font-mono text-xs text-cyber-muted">{cert.year}</p>
      {cert.description ? (
        <p className="mt-3 text-sm leading-relaxed text-cyber-muted">{cert.description}</p>
      ) : null}
      {cert.document ? (
        <div className="mt-auto px-3 pb-2 pt-4">
          <div className="flex justify-center">
            <DocumentLink label={ui.viewCertificate} url={cert.document} />
          </div>
        </div>
      ) : null}
    </GlassCard>
  );
}

export function CertificationsList() {
  const { certifications, ui } = useLocale();
  const items = certifications as CertItem[];
  const professional = items.filter(isProfessional);
  const courses = items.filter((cert) => !isProfessional(cert));

  return (
    <div className="space-y-14">
      {professional.length ? (
        <section>
          <h2 className="text-center font-mono text-xs uppercase tracking-[0.2em] text-cyber-accent">
            {ui.certProfessionalTitle}
          </h2>
          <MotionStagger className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {professional.map((cert) => (
              <MotionItem key={cert.name} className="h-full">
                <CertCard cert={cert} />
              </MotionItem>
            ))}
          </MotionStagger>
        </section>
      ) : null}

      {courses.length ? (
        <section>
          <h2 className="text-center font-mono text-xs uppercase tracking-[0.2em] text-cyber-accent">
            {ui.certCoursesTitle}
          </h2>
          <MotionStagger className="mt-6 flex flex-wrap justify-center gap-4">
            {courses.map((cert) => (
              <MotionItem
                key={cert.name}
                className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)]"
              >
                <CertCard cert={cert} />
              </MotionItem>
            ))}
          </MotionStagger>
        </section>
      ) : null}
    </div>
  );
}
