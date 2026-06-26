import { Link } from "@/lib/router";
import { siteConfig, navLinks } from "@/lib/site-config";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-cyber-border bg-cyber-surface/50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-semibold text-cyber-text">{siteConfig.shortName}</p>
            <p className="mt-2 text-sm text-cyber-muted">{siteConfig.title}</p>
            <p className="mt-1 text-sm text-cyber-muted">{siteConfig.subtitle}</p>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-cyber-accent">
              Navigation
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-cyber-muted transition-colors hover:text-cyber-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-cyber-accent">
              Connect
            </p>
            <ul className="space-y-2 text-sm text-cyber-muted">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-cyber-accent">
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-cyber-accent">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-cyber-accent">
                  GitHub
                </a>
              </li>
              <li>
                <Link href="/resume" className="transition-colors hover:text-cyber-accent">
                  View CV
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-cyber-border pt-8 text-center">
          <p className="text-xs text-cyber-muted">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
