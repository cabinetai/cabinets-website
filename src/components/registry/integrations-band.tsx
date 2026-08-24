import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import Link from "next/link";
import { INTEGRATION_LOGOS } from "@/lib/showcase";
import { SectionLabel } from "@/components/ui/section-label";
import type { RegistryEntry } from "@/types";

/**
 * The integrations section: the wooden-tile artwork and brand marks up top,
 * then every integration cabinet from the registry as a logo-led card.
 * Logo-led on purpose — these cabinets ship without cover art, and the one
 * question this section answers is "does it work with the thing I use?",
 * which a recognizable product mark answers faster than any illustration.
 */

/** slug → logo basename under /public/logos, where a real mark exists. */
const SLUG_LOGOS: Record<string, string> = {
  "asana-tasks": "asana",
  "figma-week": "figma",
  "github-dev-brief": "github",
  "gitlab-dev-brief": "gitlab",
  "gmail-inbox": "gmail",
  "google-calendar-week": "google-calendar",
  "jira-tasks": "jira",
  "linear-cycle": "linear",
  "microsoft-365-brief": "microsoft-365",
  "notion-library": "notion",
  "notion-project-status": "notion",
  "sharepoint-week": "sharepoint",
  "slack-digest": "slack",
  "stripe-daily": "stripe",
  "teams-digest": "microsoft-teams",
  "tiktok-queue": "tiktok",
  "whatsapp-digest": "whatsapp",
};

/** Same hover-glimpse as the showcase shelves: cards whose cabinet has a
 *  captured app screenshot reveal it on hover. Checked on disk at build time
 *  so a newly captured shot lights up its card with no code change. */
function appShot(slug: string): string | undefined {
  const rel = `/screenshots/apps/${slug}.webp`;
  return existsSync(join(process.cwd(), "public", rel)) ? rel : undefined;
}

function IntegrationCard({ entry, shot }: { entry: RegistryEntry; shot?: string }) {
  const logo = SLUG_LOGOS[entry.slug];
  const emoji = entry.agents[0]?.emoji || "🗄️";
  return (
    <Link
      href={`/cabinet/${entry.slug}`}
      className="wood-card group relative flex flex-col overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1"
    >
      {/* product mark engraved straight into the plank — no tile, no recess */}
      <span className="flex h-16 w-16 items-center justify-center transition-transform duration-300 group-hover:-rotate-2 group-hover:scale-105">
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element -- tiny static svg
          <img
            src={`/logos/${logo}.svg`}
            alt=""
            className="engraved h-12 w-12"
            width={48}
            height={48}
          />
        ) : (
          <span className="engraved text-[40px] leading-none">{emoji}</span>
        )}
      </span>
      <h3 className="mt-5 font-display text-[26px] leading-tight text-text-primary transition-colors group-hover:text-accent-warm">
        {entry.meta.name}
      </h3>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-text-secondary line-clamp-2">
        {entry.meta.description}
      </p>
      {shot && (
        <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Image
            src={shot}
            alt={`${entry.meta.name} app preview`}
            fill
            sizes="(max-width: 640px) 100vw, 400px"
            className="object-cover object-top"
          />
        </span>
      )}
    </Link>
  );
}

export function IntegrationsBand({ entries }: { entries: RegistryEntry[] }) {
  return (
    // id is NOT "integrations" — the Browse list's Integrations group owns
    // that anchor (category cards link to it), and duplicate ids break both.
    <section id="connect" className="mt-24 bg-bg-warm scroll-mt-16">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionLabel>Integrations</SectionLabel>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl italic text-text-primary leading-[1.08]">
              Plugged into the accounts you already live in.
            </h2>
            <p className="mt-4 max-w-md text-base text-text-secondary font-body-serif">
              Reads Gmail. Watches GitLab. Summarizes WhatsApp. Every cabinet
              names the one account it needs — connect it once in Cabinet, and
              the agents do the reading on your machine, not someone
              else&rsquo;s cloud.
            </p>
            <div className="mt-7 flex max-w-md flex-wrap gap-2.5">
              {INTEGRATION_LOGOS.map((l) => (
                <span
                  key={l.file}
                  className="flex items-center gap-2 rounded-full bg-bg-card px-3.5 py-1.5 text-sm text-text-secondary shadow-sm"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- tiny static svg */}
                  <img src={`/logos/${l.file}.svg`} alt="" className="h-4 w-4" width={16} height={16} />
                  {l.name}
                </span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-lg">
            <Image
              src="/generated/integrations-hero.webp"
              alt="Carved wooden tiles with colorful app glyphs"
              width={1200}
              height={675}
              className="w-full object-cover"
            />
          </div>
        </div>

        {entries.length > 0 && (
          <>
            <div className="mt-14 flex items-baseline justify-between gap-4">
              <h3 className="font-display text-3xl sm:text-4xl text-text-primary">
                One cabinet per service.
              </h3>
              <span className="font-code text-xs text-text-muted">
                {entries.length} integration cabinets
              </span>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {entries.map((e) => (
                <IntegrationCard key={e.slug} entry={e} shot={appShot(e.slug)} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
