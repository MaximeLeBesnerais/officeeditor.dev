import Hero from "./components/Hero";
import StatStrip from "./components/StatStrip";
import Pipeline from "./components/Pipeline";
import Features from "./components/Features";
import AgentSection from "./components/AgentSection";
import Quickstart from "./components/Quickstart";
import Benchmarks from "./components/Benchmarks";
import Footer from "./components/Footer";
import { I18nProvider, useLocale, useT, type Locale } from "./lib/i18n";

const LOCALES: { id: Locale; label: string }[] = [
  { id: "en", label: "EN" },
  { id: "fr", label: "FR" },
  { id: "zh", label: "中文" },
];

function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  return (
    <div className="flex items-center rounded-md border border-ink-700 font-mono text-xs">
      {LOCALES.map((l, i) => (
        <button
          key={l.id}
          onClick={() => setLocale(l.id)}
          aria-pressed={locale === l.id}
          className={`px-2 py-1.5 transition-colors ${
            i > 0 ? "border-l border-ink-700" : ""
          } ${
            locale === l.id ? "text-amber-400" : "text-mute hover:text-paper"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

function TopBar() {
  const t = useT();
  return (
    <header className="absolute inset-x-0 top-0 z-10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#" className="text-lg font-semibold tracking-tight">
          <span className="text-paper">Office</span>
          <span className="text-amber-500">Editor</span>
        </a>
        <nav className="flex items-center gap-6 font-mono text-xs text-mute">
          <a href="#how-it-works" className="hidden transition-colors hover:text-amber-400 sm:inline">
            {t.nav.howItWorks}
          </a>
          <a href="#features" className="hidden transition-colors hover:text-amber-400 sm:inline">
            {t.nav.features}
          </a>
          <a href="#agents" className="hidden transition-colors hover:text-amber-400 sm:inline">
            {t.nav.agents}
          </a>
          <a href="#benchmarks" className="hidden transition-colors hover:text-amber-400 sm:inline">
            {t.nav.benchmarks}
          </a>
          <LanguageSwitcher />
          <a
            href={t.meta.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-ink-700 px-3 py-1.5 text-paper transition-colors hover:border-amber-500/60 hover:text-amber-400"
          >
            {t.nav.github}
          </a>
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <div className="relative min-h-screen overflow-x-clip">
        <TopBar />
        <main>
          <Hero />
          <StatStrip />
          <Pipeline />
          <Features />
          <AgentSection />
          <Quickstart />
          <Benchmarks />
        </main>
        <Footer />
      </div>
    </I18nProvider>
  );
}
