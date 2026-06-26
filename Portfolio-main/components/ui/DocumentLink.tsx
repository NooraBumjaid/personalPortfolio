import { cn } from "@/lib/utils";
import { withBasePath } from "@/lib/paths";

interface DocumentLinkProps {
  label: string;
  url: string;
  fullWidth?: boolean;
}

export function getDocumentGridClassName(count: number) {
  if (count === 1) return "flex justify-center";
  if (count === 2) return "grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3";
  return "grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3";
}

interface DocumentLinksGridProps {
  documents: { label: string; url: string }[];
  className?: string;
}

export function DocumentLinksGrid({ documents, className }: DocumentLinksGridProps) {
  return (
    <div className={cn(getDocumentGridClassName(documents.length), className)}>
      {documents.map((doc) => (
        <DocumentLink
          key={doc.label}
          label={doc.label}
          url={doc.url}
          fullWidth={documents.length > 1}
        />
      ))}
    </div>
  );
}

export function DocumentLink({ label, url, fullWidth = true }: DocumentLinkProps) {
  return (
    <a
      href={withBasePath(url)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex min-h-[4.5rem] min-w-0 flex-col items-center justify-center gap-1.5 rounded-lg border border-cyber-border bg-white/5 px-2 py-3 text-center transition-colors hover:border-cyber-accent/40 hover:bg-cyber-accent/10 sm:min-h-[5rem] sm:px-3",
        fullWidth ? "w-full" : "w-full max-w-[11rem] sm:w-auto sm:min-w-[8.5rem]"
      )}
    >
      <svg
        className="h-4 w-4 shrink-0 text-cyber-accent"
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
      <span className="w-full max-w-full truncate px-1 text-center text-[11px] font-medium text-cyber-accent sm:text-sm">
        {label}
      </span>
    </a>
  );
}
