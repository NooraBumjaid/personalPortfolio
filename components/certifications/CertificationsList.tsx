import { GlassCard } from "@/components/ui/GlassCard";
import { DocumentLink } from "@/components/ui/DocumentLink";
import { MotionStagger, MotionItem } from "@/components/motion/Motion";
import { certifications } from "@/lib/site-config";

export function CertificationsList() {
  return (
    <MotionStagger className="flex flex-wrap justify-center gap-4">
      {certifications.map((cert) => (
        <MotionItem
          key={cert.name}
          className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)]"
        >
          <GlassCard hover className="flex h-full flex-col p-5">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-cyber-accent/10 text-cyber-accent">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <h3 className="text-base font-semibold leading-snug text-cyber-text">
              {cert.shortName ?? cert.name}
            </h3>
            <p className="mt-2 text-sm text-cyber-cyan">{cert.issuer}</p>
            <p className="mt-2 font-mono text-xs text-cyber-muted">{cert.year}</p>
            {"document" in cert && cert.document ? (
              <div className="mt-auto px-3 pb-2 pt-4">
                <div className="flex justify-center">
                  <DocumentLink label="View Certificate" url={cert.document} />
                </div>
              </div>
            ) : null}
          </GlassCard>
        </MotionItem>
      ))}
    </MotionStagger>
  );
}
