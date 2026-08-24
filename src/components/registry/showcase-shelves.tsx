import Image from "next/image";
import Link from "next/link";
import { SHELVES, type ShowcaseTemplate } from "@/lib/showcase";
import { SectionLabel } from "@/components/ui/section-label";

/**
 * "Fresh from the workshop" — the curated new-template drop, arranged as
 * themed shelves. Each card's face is a vivid accent gradient with the
 * template's logos; hovering reveals a real screenshot of the template's
 * app (captured from a live install rendering its EXAMPLE data).
 *
 * Pure CSS hover (group-hover) — no client JS, so the whole section stays a
 * server component and costs nothing in the bundle. On touch devices there
 * is no hover: the gradient face IS the card, and the screenshot waits on
 * the detail page — nothing essential hides behind the hover.
 */

function TemplateCard({ t }: { t: ShowcaseTemplate }) {
  return (
    <Link href={`/cabinet/${t.slug}`} className="group block">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300 group-hover:shadow-xl">
        {/* Vivid face */}
        <div
          className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
          style={{ background: `linear-gradient(135deg, ${t.from}, ${t.to})` }}
          aria-hidden
        >
          {/* soft parchment glow so the gradient reads warm, not neon */}
          <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_15%_0%,rgba(250,246,241,0.28),transparent_55%)]" />
          <Image
            src={`/brand/ui/${t.icon}.png`}
            alt=""
            width={96}
            height={96}
            className="absolute left-4 top-4 h-24 w-24 object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.25)]"
          />
          {t.logos.length > 0 && (
            <span className="absolute right-4 top-4 flex gap-1.5">
              {t.logos.map((l) => (
                <span
                  key={l}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/92 shadow-sm"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- tiny static svg, no sizing gymnastics needed */}
                  <img src={`/logos/${l}.svg`} alt="" className="h-4.5 w-4.5" width={18} height={18} />
                </span>
              ))}
            </span>
          )}
          <span className="absolute bottom-4 left-5 right-5 font-display text-2xl italic leading-tight text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.18)]">
            {t.name}
          </span>
        </div>
        {/* Screenshot reveal */}
        <div className="absolute inset-0 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <Image
            src={t.shot}
            alt={`${t.name} app preview`}
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover object-top scale-[1.02] transition-transform duration-500 group-hover:scale-100"
          />
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-text-secondary font-body-serif">
        {t.tagline}
      </p>
    </Link>
  );
}

export function ShowcaseShelves() {
  return (
    <section id="fresh" className="mx-auto max-w-6xl px-6 pt-20">
      <SectionLabel>New this week</SectionLabel>
      <h2 className="mt-2 font-display text-4xl sm:text-5xl italic text-text-primary leading-[1.08]">
        Fresh from the workshop.
      </h2>
      <p className="mt-3 max-w-xl text-base text-text-secondary font-body-serif">
        Fourteen new cabinets, carved for first-timers. Pick one, connect one
        account, and wake up tomorrow to a page it already wrote for you.
      </p>

      <div className="mt-12 space-y-20">
        {/* Intro stays left on every shelf: alternating sides with asymmetric
            columns crushed the cards into the narrow track, and a steady
            editorial rhythm scans better anyway. */}
        {SHELVES.map((shelf) => (
          <div
            key={shelf.key}
            className="grid items-start gap-8 lg:grid-cols-[1fr_1.8fr]"
          >
            {/* Shelf intro + art */}
            <div className="lg:sticky lg:top-24">
              <h3 className="font-display text-3xl italic text-text-primary">
                {shelf.title}
              </h3>
              <p className="mt-2 text-sm text-text-secondary font-body-serif max-w-xs">
                {shelf.sub}
              </p>
              <div className="mt-5 overflow-hidden rounded-2xl">
                <Image
                  src={shelf.art}
                  alt=""
                  width={600}
                  height={338}
                  className="w-full object-cover"
                />
              </div>
            </div>
            {/* Cards */}
            <div className="grid gap-6 sm:grid-cols-2">
              {shelf.templates.map((t) => (
                <TemplateCard key={t.slug} t={t} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
