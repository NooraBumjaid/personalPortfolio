import { withBasePath } from "@/lib/paths";
import { cn } from "@/lib/utils";

interface ImageDocument {
  label: string;
  url: string;
}

interface ImageDocumentsGridProps {
  documents: ImageDocument[];
  className?: string;
  fit?: "cover" | "contain";
  size?: "thumb" | "page";
}

export function isImageDocumentUrl(url: string) {
  return /\.(jpe?g|png|webp|gif)$/i.test(url);
}

export function ImageDocumentsGrid({
  documents,
  className,
  fit = "cover",
  size = "thumb",
}: ImageDocumentsGridProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2", size === "page" && "lg:grid-cols-2", className)}>
      {documents.map((doc, index) => {
        const isLastOnOwnRow = documents.length % 2 === 1 && index === documents.length - 1;

        return (
        <a
          key={doc.url}
          href={withBasePath(doc.url)}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group overflow-hidden rounded-xl border border-cyber-border/60 bg-white/[0.03] transition-colors hover:border-cyber-accent/40",
            isLastOnOwnRow && "sm:col-span-2 sm:mx-auto sm:w-full sm:max-w-[calc(50%-0.5rem)]"
          )}
        >
          <img
            src={withBasePath(doc.url)}
            alt={doc.label}
            className={cn(
              "w-full transition-transform duration-300 group-hover:scale-[1.02]",
              size === "page" ? "max-h-[36rem] min-h-[18rem]" : "h-40 sm:h-36",
              fit === "contain" ? "bg-white object-contain" : "bg-cyber-surface object-cover object-center"
            )}
          />
          <p className="px-3 py-2 text-xs font-medium text-cyber-muted group-hover:text-cyber-accent sm:text-sm">
            {doc.label}
          </p>
        </a>
        );
      })}
    </div>
  );
}
