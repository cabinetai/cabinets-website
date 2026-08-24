import Link from "next/link";
import { TerminalBlock } from "@/components/ui/terminal-block";

/**
 * The compact homepage hero. The scroll-driven Human→AI transposition now
 * lives on /about: it is a beautiful explanation, and explanations belong
 * where a reader chooses them — the homepage's job is to put templates on
 * screen within one scroll. Editorial and centered: one headline, one
 * command, two ways in. Live counts come from the registry so the proof
 * line never drifts from the shelves below it.
 */
export function HomeHero({
  cabinetCount,
  integrationCount,
}: {
  cabinetCount: number;
  integrationCount: number;
}) {
  return (
    <section className="relative border-b border-border">
      <div className="dot-grid absolute inset-0 opacity-20" aria-hidden />
      <div className="relative mx-auto max-w-3xl px-6 pb-20 pt-24 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-card px-3.5 py-1.5 text-sm text-text-secondary shadow-sm">
          <span className="h-2 w-2 rounded-full bg-[#6FA45A]" />
          Open directory
        </span>
        <h1 className="mt-6 font-display text-5xl leading-[1.06] text-text-primary sm:text-6xl">
          Plug-and-play <em className="text-accent">AI teams</em>
          <br />
          for <em className="text-accent">real work.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-secondary font-body-serif">
          Each cabinet is a complete AI team — agents, jobs, and knowledge.
          Clone a directory. Run a company.
        </p>
        <div className="mx-auto mt-8 max-w-md text-left">
          <TerminalBlock command="npx cabinets add gmail-inbox" label="try it now" />
        </div>
        <div className="mt-8 flex items-center justify-center gap-6">
          <a
            href="#fresh"
            className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-warm"
          >
            See what&rsquo;s new
          </a>
          <Link
            href="/about"
            className="text-sm font-semibold text-text-secondary transition-colors hover:text-accent"
          >
            How cabinets work &rarr;
          </Link>
        </div>
        {/* One template literal, not JSX text runs — sidesteps JSX whitespace
            collapsing entirely so the separators keep their spaces. */}
        <p className="mt-10 font-code text-xs tracking-wide text-text-muted">
          {`${cabinetCount} cabinets · ${integrationCount} integrations · MIT-licensed templates`}
        </p>
      </div>
    </section>
  );
}
