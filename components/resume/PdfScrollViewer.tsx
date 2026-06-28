import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

GlobalWorkerOptions.workerSrc = pdfWorker;

interface PdfScrollViewerProps {
  src: string;
  title: string;
  className?: string;
}

export function PdfScrollViewer({ src, title, className }: PdfScrollViewerProps) {
  const { ui } = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function renderPdf() {
      const mount = containerRef.current;
      if (!mount) return;

      try {
        setLoading(true);
        setError(null);
        mount.innerHTML = "";

        const pdf = await getDocument({ url: src }).promise;
        if (cancelled) return;

        const containerWidth = mount.clientWidth || window.innerWidth - 32;

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          if (cancelled) return;

          const baseViewport = page.getViewport({ scale: 1 });
          const scale = Math.min(containerWidth / baseViewport.width, 1.5);
          const viewport = page.getViewport({ scale });
          const outputScale = window.devicePixelRatio || 1;
          const scaledViewport = page.getViewport({ scale: scale * outputScale });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          if (!context) continue;

          canvas.width = scaledViewport.width;
          canvas.height = scaledViewport.height;
          canvas.style.width = `${viewport.width}px`;
          canvas.style.height = `${viewport.height}px`;
          canvas.className = "max-w-full rounded-lg border border-cyber-border bg-white shadow-sm";
          canvas.setAttribute("aria-label", `${title} — page ${pageNum}`);

          const wrapper = document.createElement("div");
          wrapper.className = "mb-4 flex justify-center px-2 last:mb-0 sm:px-4";
          wrapper.appendChild(canvas);
          mount.appendChild(wrapper);

          await page.render({
            canvasContext: context,
            viewport: scaledViewport,
            canvas,
          }).promise;
        }

        if (!cancelled) setLoading(false);
      } catch {
        if (!cancelled) {
          setError(ui.cvLoadError);
          setLoading(false);
        }
      }
    }

    renderPdf();

    return () => {
      cancelled = true;
    };
  }, [src, title, ui.cvLoadError]);

  return (
    <div className={cn("relative flex w-full flex-col", className)}>
      {loading ? (
        <p className="absolute inset-0 flex items-center justify-center text-sm text-cyber-muted">
          {ui.loadingCv}
        </p>
      ) : null}
      {error ? (
        <p className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-red-400">
          {error}
        </p>
      ) : null}
      <div
        ref={containerRef}
        className={cn(
          "min-h-0 flex-1 overflow-y-auto py-4",
          loading || error ? "opacity-0" : "opacity-100"
        )}
      />
    </div>
  );
}
