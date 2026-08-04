import { useState } from "react";
import { Reveal } from "../lib/reveal";
import { CodeBlock } from "./CodeBlock";
import { Section } from "./Section";

type TabId = "cli" | "csharp" | "json";

const TABS: { id: TabId; label: string }[] = [
  { id: "cli", label: "CLI" },
  { id: "csharp", label: "C#" },
  { id: "json", label: "JSON" },
];

const CLI_CODE = `# install the unified CLI
dotnet tool install -g MaximeLB.OfficeEditor.Cli

# JSON in → documents out
officeeditor generate deck.json --output deck.pptx
officeeditor generate report.json --output report.docx --theme corporate
officeeditor generate workbook.json --output workbook.xlsx

# detect & merge template variables
officeeditor detect template.docx
officeeditor merge template.pptx data.json output.pptx`;

const CSHARP_CODE = `using var deck = PresentationBuilder.Create("slides.pptx");

deck.AddSlide();
deck.CurrentSlide
    .AddTitle("Q4 Review")
    .AddSubtitle("Sales");

deck.Save();

// same layout feeds every export
byte[] pdf    = deck.ExportToPdf();
byte[][] pngs = deck.ExportThumbnails(new() { Ppi = 150 });`;

const JSON_CODE = `{
  "version": "2.0",
  "slides": [
    {
      "archetype": "kpi_row",
      "content": {
        "title": "Q4 traction",
        "kpis": [
          { "value": "€18.4M", "label": "ARR", "delta": "+42%" },
          { "value": "1,284",  "label": "Sites live" },
          { "value": "4.1%",   "label": "Logo churn" }
        ]
      }
    }
  ]
}`;

const TAB_CONTENT: Record<
  TabId,
  { code: string; lang: "csharp" | "json" | "bash"; title: string }
> = {
  cli: { code: CLI_CODE, lang: "bash", title: "terminal" },
  csharp: { code: CSHARP_CODE, lang: "csharp", title: "Program.cs" },
  json: { code: JSON_CODE, lang: "json", title: "kpi-row slide" },
};

const PACKAGES = [
  "MaximeLB.PptxEditor.Core",
  "MaximeLB.DocxEditor.Core",
  "MaximeLB.XlsxEditor.Core",
  "MaximeLB.TypstBridge.Managed",
];

export default function Quickstart() {
  const [tab, setTab] = useState<TabId>("cli");
  const active = TAB_CONTENT[tab];

  return (
    <Section
      id="quickstart"
      eyebrow="quickstart"
      title="From zero to a rendered document in a minute"
    >
      <Reveal>
        <div className="flex gap-6 border-b border-ink-700">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`-mb-px border-b-2 px-1 pb-3 font-mono text-sm transition-colors ${
                tab === t.id
                  ? "border-amber-500 text-amber-400"
                  : "border-transparent text-mute hover:text-paper"
              }`}
              aria-pressed={tab === t.id}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="mt-6">
          <CodeBlock code={active.code} lang={active.lang} title={active.title} />
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {PACKAGES.map((pkg) => (
            <span
              key={pkg}
              className="rounded-md border border-ink-700 px-3 py-1.5 font-mono text-xs text-mute"
            >
              <span className="mr-1.5 text-amber-500">◆</span>
              {pkg} <span className="text-faint">0.7.0</span>
            </span>
          ))}
          <a
            href="https://www.nuget.org/packages?q=MaximeLB"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 font-mono text-xs text-amber-400 transition-colors hover:text-amber-300"
          >
            on NuGet →
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
