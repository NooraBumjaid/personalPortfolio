import { Link, usePathname } from "@/lib/router";
import { useEffect, useState } from "react";
import { useLocale } from "@/lib/i18n";
import { withBasePath } from "@/lib/paths";
import { cn } from "@/lib/utils";

function LanguageToggle({ className }: { className?: string }) {
  const { toggleLocale, ui } = useLocale();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className={cn(
        "rounded-lg border border-cyber-border px-3 py-2 font-mono text-xs font-medium text-cyber-muted transition-colors hover:border-cyber-accent/30 hover:bg-white/5 hover:text-cyber-accent",
        className
      )}
      aria-label={ui.languageToggleAria}
    >
      {ui.languageToggle}
    </button>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { navLinks, site, ui } = useLocale();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (!isHome) return;

    const sectionIds = navLinks
      .filter((link) => link.href.startsWith("#"))
      .map((link) => link.href.replace("#", ""));

    const getDocumentTop = (element: HTMLElement) =>
      element.getBoundingClientRect().top + window.scrollY;

    const updateActiveSection = () => {
      const offset = 120;
      let current = "home";

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element && window.scrollY + offset >= getDocumentTop(element)) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    setActiveSection("home");

    const frame = requestAnimationFrame(updateActiveSection);
    window.addEventListener("scroll", updateActiveSection, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, [isHome, pathname, navLinks]);

  const getHref = (href: string) => {
    if (href.startsWith("/")) return href;
    if (isHome) return href;
    return `${withBasePath("/")}${href}`;
  };

  const isLinkActive = (href: string) => {
    if (href.startsWith("/")) return pathname === href;
    if (!isHome) return false;
    return activeSection === href.replace("#", "");
  };

  const renderNavLink = (link: (typeof navLinks)[number], onNavigate?: () => void) => {
    const active = isLinkActive(link.href);
    const className = cn(
      "relative shrink-0 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors xl:px-2.5 xl:py-2 xl:text-[13px] 2xl:px-3 2xl:text-sm",
      onNavigate ? "block px-4 py-3" : "",
      active
        ? "bg-cyber-accent/10 text-cyber-accent"
        : "text-cyber-muted hover:text-cyber-text",
      onNavigate && !active ? "hover:bg-white/5" : ""
    );

    if (link.href.startsWith("/")) {
      return (
        <Link href={link.href} className={className} onClick={onNavigate}>
          {link.label}
        </Link>
      );
    }

    return (
      <a href={getHref(link.href)} className={className} onClick={onNavigate}>
        {link.label}
      </a>
    );
  };

  return (
    <header className="fixed top-0 z-50 w-full">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="nav-bar mt-4 flex min-w-0 items-center gap-6 rounded-2xl border border-cyber-border px-4 py-3 sm:px-6 lg:gap-8">
          <Link href="/" className="group flex shrink-0 items-center gap-2.5">
            <span className="font-mono text-sm font-bold text-cyber-accent">NB</span>
            <span className="hidden whitespace-nowrap text-sm font-medium leading-none tracking-tight text-cyber-text sm:block">
              {site.shortName}
            </span>
          </Link>

          <div className="hidden min-w-0 flex-1 items-center justify-end gap-3 lg:flex">
            <ul className="flex min-w-0 max-w-full flex-wrap items-center justify-end gap-x-0.5 gap-y-0.5 xl:gap-x-1">
              {navLinks.map((link) => (
                <li key={link.href} className="shrink-0">
                  {renderNavLink(link)}
                </li>
              ))}
            </ul>
            <LanguageToggle className="shrink-0" />
          </div>

          <div className="ms-auto flex shrink-0 items-center gap-2 lg:hidden">
            <LanguageToggle />
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-cyber-muted hover:bg-white/5 hover:text-cyber-text"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={ui.toggleMenu}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div className="nav-bar mt-2 max-h-[70vh] overflow-y-auto rounded-2xl border border-cyber-border p-4 lg:hidden">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>{renderNavLink(link, () => setMobileOpen(false))}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
