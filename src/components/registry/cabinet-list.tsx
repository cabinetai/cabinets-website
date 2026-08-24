"use client";

import { useState, useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ChevronRight } from "lucide-react";
import { StarButton } from "./star-button";
import type { RegistryEntry } from "@/types";

function CabinetListItem({ entry }: { entry: RegistryEntry }) {
  // Integration cabinets (and a few others) ship without cover art; a broken
  // image icon reads as neglect, an emoji tile reads as intent.
  const [coverBroken, setCoverBroken] = useState(false);
  const emoji = entry.agents[0]?.emoji || "🗄️";
  return (
    <Link
      href={`/cabinet/${entry.slug}`}
      className="group flex items-center gap-4 rounded-xl border border-border bg-bg-card pr-5 py-3 pl-3 card-hover"
    >
      <div className="relative shrink-0 w-24 sm:w-32 aspect-[16/9] overflow-hidden rounded-lg bg-bg-warm">
        {coverBroken ? (
          <span className="flex h-full w-full items-center justify-center text-2xl">
            {emoji}
          </span>
        ) : (
          <Image
            src={`/covers/${entry.slug}.jpg`}
            alt={entry.meta.name}
            fill
            sizes="128px"
            className="object-cover"
            onError={() => setCoverBroken(true)}
          />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="mb-1 font-sans text-base font-semibold text-text-primary group-hover:text-accent transition-colors truncate">
          {entry.meta.name}
        </h3>
        <p className="text-sm text-text-secondary font-sans line-clamp-1">
          {entry.meta.description}
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <StarButton slug={entry.slug} size="sm" />
        <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
      </div>
    </Link>
  );
}

interface CabinetListProps {
  entries: RegistryEntry[];
  categories: { name: string; slug: string }[];
}

// Seed from the navbar search: /?q=…#browse lands here with the term. Read
// as an external store so the static-export prerender ("" on the server)
// hydrates cleanly into the URL's value on the client.
const subscribeNever = () => () => {};
const readUrlQuery = () =>
  new URLSearchParams(window.location.search).get("q") ?? "";

export function CabinetList({ entries, categories }: CabinetListProps) {
  const urlQuery = useSyncExternalStore(subscribeNever, readUrlQuery, () => "");
  const [typed, setTyped] = useState<string | null>(null);
  const query = typed ?? urlQuery;
  const setQuery = setTyped;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter(
      (e) =>
        e.meta.name.toLowerCase().includes(q) ||
        e.meta.description.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [entries, query]);

  // Group into sections in the given order; any section with no cabinets is skipped.
  const sections = useMemo(
    () =>
      categories
        .map((c) => ({
          ...c,
          items: filtered.filter((e) => e.section === c.name),
        }))
        .filter((s) => s.items.length > 0),
    [filtered, categories]
  );

  const searching = query.trim().length > 0;

  return (
    <div>
      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search cabinets..."
          className="w-full rounded-lg border border-border bg-bg-card pl-9 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
        />
      </div>

      {searching ? (
        // Flat results across all sections while searching.
        <div className="space-y-3">
          {filtered.map((entry) => (
            <CabinetListItem key={entry.slug} entry={entry} />
          ))}
        </div>
      ) : (
        // Collapsible section groups by default.
        <div className="space-y-4">
          {sections.map((s) => (
            <details key={s.name} id={s.slug} open className="group/section scroll-mt-24">
              <summary className="flex cursor-pointer items-center gap-2 list-none py-2 select-none">
                <ChevronRight className="h-4 w-4 text-text-muted transition-transform group-open/section:rotate-90" />
                <h3 className="font-sans text-base font-semibold text-text-primary">
                  {s.name}
                </h3>
                <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-code text-text-muted">
                  {s.items.length}
                </span>
              </summary>
              <div className="space-y-3 pt-2">
                {s.items.map((entry) => (
                  <CabinetListItem key={entry.slug} entry={entry} />
                ))}
              </div>
            </details>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="mt-12 text-center">
          <p className="text-text-tertiary font-body-serif">No cabinets match your search.</p>
        </div>
      )}
    </div>
  );
}
