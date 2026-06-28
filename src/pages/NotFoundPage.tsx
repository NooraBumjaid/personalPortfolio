import { Link } from "@/lib/router";
import { useLocale } from "@/lib/i18n";

export function NotFoundPage() {
  const { ui } = useLocale();

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-24 text-center">
      <p className="font-mono text-sm text-cyber-accent">{ui.notFoundCode}</p>
      <h1 className="mt-4 text-4xl font-bold">{ui.notFoundTitle}</h1>
      <p className="mt-3 max-w-md text-cyber-muted">{ui.notFoundDescription}</p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-cyber-accent px-6 py-3 text-sm font-medium text-cyber-bg transition-colors hover:bg-cyber-accent-dim"
      >
        {ui.returnHome}
      </Link>
    </div>
  );
}
