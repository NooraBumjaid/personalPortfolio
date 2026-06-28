import { cn } from "@/lib/utils";

interface PdfScrollViewerProps {
  src: string;
  title: string;
  className?: string;
}

/**
 * Native browser PDF embed — avoids PDF.js font/glyph bugs with FlowCV exports.
 * Always LTR: the CV PDF is English regardless of site locale.
 */
export function PdfScrollViewer({ src, title, className }: PdfScrollViewerProps) {
  return (
    <div dir="ltr" className={cn("relative w-full", className)}>
      <iframe
        src={`${src}#view=FitH`}
        title={title}
        className="absolute inset-0 h-full w-full border-0 bg-white"
      />
    </div>
  );
}
