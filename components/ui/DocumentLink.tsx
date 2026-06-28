import { cn } from "@/lib/utils";
import { withBasePath } from "@/lib/paths";

interface DocumentLinkProps {
  label: string;
  url: string;
}

export function getDocumentGridClassName(count: number) {
  if (count === 2) {
    return "flex flex-nowrap items-center justify-center gap-3 sm:gap-4";
  }

  return "flex flex-wrap justify-center gap-3";
}

interface DocumentLinksGridProps {
  documents: { label: string; url: string }[];
  className?: string;
}

export function DocumentLinksGrid({ documents, className }: DocumentLinksGridProps) {
  return (
    <div className={cn("w-full px-3 pt-4 pb-2 sm:px-4", className)}>
      <div className={cn(getDocumentGridClassName(documents.length), "mx-auto w-fit max-w-full")}>
        {documents.map((doc) => (
          <DocumentLink key={doc.label} label={doc.label} url={doc.url} />
        ))}
      </div>
    </div>
  );
}

export function DocumentLink({ label, url }: DocumentLinkProps) {
  return (
    <a
      href={withBasePath(url)}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex max-w-full shrink-0 items-center gap-2 overflow-hidden rounded-full border border-cyber-accent/30 bg-gradient-to-r from-cyber-accent/[0.08] via-white/[0.04] to-transparent py-1 ps-1 pe-3.5 shadow-[0_2px_10px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyber-accent/60 hover:from-cyber-accent/[0.14] hover:shadow-[0_6px_18px_rgba(34,211,238,0.16),inset_0_1px_0_rgba(255,255,255,0.12)] active:scale-[0.98] sm:gap-2.5 sm:py-1.5 sm:ps-1.5 sm:pe-4"
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyber-accent/25 to-cyber-purple/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] ring-1 ring-cyber-accent/25 transition-all duration-300 group-hover:from-cyber-accent/35 group-hover:to-cyber-purple/20 group-hover:ring-cyber-accent/45 sm:h-7 sm:w-7">
        <svg
          className="h-3 w-3 text-cyber-accent transition-transform duration-300 group-hover:scale-110 sm:h-3.5 sm:w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </span>
      <span className="whitespace-nowrap text-[10px] font-semibold tracking-wide text-cyber-text transition-colors duration-300 group-hover:text-cyber-accent sm:text-xs">
        {label}
      </span>
    </a>
  );
}
