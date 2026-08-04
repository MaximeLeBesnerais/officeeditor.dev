import { useT } from "../lib/i18n";

const RESOURCE_LINKS = [
  {
    key: "github",
    // resolved per-locale from t.meta.repoUrl (GitCode mirror for zh)
    href: null,
  },
  {
    key: "nuget",
    href: "https://www.nuget.org/packages?q=MaximeLB",
  },
  { key: "schema", href: "/schemas/deck-2.0.json" },
  {
    key: "security",
    href: "https://github.com/MaximeLeBesnerais/OfficeEditor/security",
  },
] as const;

export default function Footer() {
  const t = useT();
  return (
    <footer className="mt-8 border-t border-ink-700 bg-ink-900/40">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-lg font-semibold">
              <span className="text-paper">Office</span>
              <span className="text-amber-500">Editor</span>
            </p>
            <p className="mt-2 text-sm text-mute">{t.footer.tagline}</p>
            <p className="mt-2 font-mono text-xs text-faint">
              {t.footer.version}
            </p>
          </div>

          <div>
            <h3 className="font-mono text-xs tracking-widest text-faint uppercase">
              {t.footer.resourcesTitle}
            </h3>
            <ul className="mt-4 space-y-2">
              {RESOURCE_LINKS.map((link) => {
                const href = link.href ?? t.meta.repoUrl;
                return (
                  <li key={link.key}>
                    <a
                      href={href}
                      className="text-sm text-mute hover:text-amber-400"
                    >
                      {t.footer.resources[link.key]}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs tracking-widest text-faint uppercase">
              {t.footer.surfacesTitle}
            </h3>
            <ul className="mt-4 space-y-2">
              {t.footer.surfaces.map((surface) => (
                <li
                  key={surface}
                  className="flex items-center gap-2 text-sm text-mute"
                >
                  <span className="h-1.5 w-1.5 shrink-0 bg-amber-500" />
                  {surface}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-ink-800 pt-6">
          <p className="text-xs text-faint">{t.footer.copyright}</p>
          <a href="#" className="text-xs text-mute hover:text-amber-400">
            {t.footer.backToTop}
          </a>
          <p className="font-mono text-xs text-faint">
            {t.footer.schemaTagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
