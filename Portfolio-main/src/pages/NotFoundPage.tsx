import { Link } from "@/lib/router";

export function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-24 text-center">
      <p className="font-mono text-sm text-cyber-accent">{"404 // not found"}</p>
      <h1 className="mt-4 text-4xl font-bold">Page not found</h1>
      <p className="mt-3 max-w-md text-cyber-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-cyber-accent px-6 py-3 text-sm font-medium text-cyber-bg transition-colors hover:bg-cyber-accent-dim"
      >
        Return home
      </Link>
    </div>
  );
}
