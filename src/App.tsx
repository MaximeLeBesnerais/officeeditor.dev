import Hero from "./components/Hero";
import StatStrip from "./components/StatStrip";
import Pipeline from "./components/Pipeline";
import Features from "./components/Features";
import AgentSection from "./components/AgentSection";
import Quickstart from "./components/Quickstart";
import Benchmarks from "./components/Benchmarks";
import Footer from "./components/Footer";

function TopBar() {
  return (
    <header className="absolute inset-x-0 top-0 z-10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#" className="text-lg font-semibold tracking-tight">
          <span className="text-paper">Office</span>
          <span className="text-amber-500">Editor</span>
        </a>
        <nav className="flex items-center gap-6 font-mono text-xs text-mute">
          <a href="#how-it-works" className="hidden transition-colors hover:text-amber-400 sm:inline">
            how it works
          </a>
          <a href="#features" className="hidden transition-colors hover:text-amber-400 sm:inline">
            features
          </a>
          <a href="#agents" className="hidden transition-colors hover:text-amber-400 sm:inline">
            agents
          </a>
          <a href="#benchmarks" className="hidden transition-colors hover:text-amber-400 sm:inline">
            benchmarks
          </a>
          <a
            href="https://github.com/MaximeLeBesnerais/OfficeEditor"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-ink-700 px-3 py-1.5 text-paper transition-colors hover:border-amber-500/60 hover:text-amber-400"
          >
            GitHub ↗
          </a>
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  return (
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
  );
}
