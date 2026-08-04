const RESOURCES: { label: string; href: string }[] = [
  {
    label: "GitHub",
    href: "https://github.com/MaximeLeBesnerais/OfficeEditor",
  },
  {
    label: "NuGet packages",
    href: "https://www.nuget.org/packages?q=MaximeLB",
  },
  { label: "PPTX generation schema", href: "/schemas/deck-2.0.json" },
  {
    label: "Report a security issue",
    href: "https://github.com/MaximeLeBesnerais/OfficeEditor/security",
  },
];

const SURFACES: string[] = [
  "officeeditor CLI (dotnet tool)",
  "ASP.NET Core API",
  "MCP stdio host",
  "Fluent C# builders",
];

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-ink-700 bg-ink-900/40">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-lg font-semibold">
              <span className="text-paper">Office</span>
              <span className="text-amber-500">Editor</span>
            </p>
            <p className="mt-2 text-sm text-mute">
              One JSON in. Real Office files out.
            </p>
            <p className="mt-2 font-mono text-xs text-faint">
              v0.7.0 · MIT License
            </p>
          </div>

          <div>
            <h3 className="font-mono text-xs tracking-widest text-faint uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              {RESOURCES.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-mute hover:text-amber-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs tracking-widest text-faint uppercase">
              Surfaces
            </h3>
            <ul className="mt-4 space-y-2">
              {SURFACES.map((surface) => (
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
          <p className="text-xs text-faint">© 2026 Maxime Le Besnerais</p>
          <a href="#" className="text-xs text-mute hover:text-amber-400">
            ↑ top
          </a>
          <p className="font-mono text-xs text-faint">
            schemas resolve at officeeditor.dev/schemas/. Machine-readable,
            forever
          </p>
        </div>
      </div>
    </footer>
  );
}
