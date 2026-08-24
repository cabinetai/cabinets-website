"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

export interface NavSearchItem {
  slug: string;
  name: string;
  description: string;
  emoji: string;
}

/** One dropdown row: cover thumb (emoji when the cover is missing —
 *  integration cabinets ship without art), name, one-line description. */
function ResultRow({ item, onPick }: { item: NavSearchItem; onPick: () => void }) {
  const [coverBroken, setCoverBroken] = useState(false);
  return (
    <Link
      href={`/cabinet/${item.slug}`}
      onClick={onPick}
      className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-bg-warm"
    >
      <span className="relative h-10 w-16 shrink-0 overflow-hidden rounded-md bg-bg-warm">
        {coverBroken ? (
          <span className="flex h-full w-full items-center justify-center text-lg">
            {item.emoji}
          </span>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element -- tiny thumb, plain img keeps the onError fallback simple
          <img
            src={`/covers/${item.slug}.jpg`}
            alt=""
            className="h-full w-full object-cover"
            onError={() => setCoverBroken(true)}
          />
        )}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-text-primary">
          {item.name}
        </span>
        <span className="block truncate text-xs text-text-secondary">
          {item.description}
        </span>
      </span>
    </Link>
  );
}

/** Navbar typeahead over every cabinet. Enter (or the footer row) hands the
 *  term to the full "Every cabinet, on one shelf." list via /?q=…#browse. */
export function NavSearch({ items }: { items: NavSearchItem[] }) {
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const results = q
    ? items
        .filter(
          (i) =>
            i.name.toLowerCase().includes(q) ||
            i.description.toLowerCase().includes(q)
        )
        // name-starts-with > name-includes > description-only; stable sort
        // keeps the registry's size order within each tier
        .sort((a, b) => {
          const score = (i: NavSearchItem) => {
            const n = i.name.toLowerCase();
            return n.startsWith(q) ? 2 : n.includes(q) ? 1 : 0;
          };
          return score(b) - score(a);
        })
    : [];
  const shown = results.slice(0, 6);

  const browseHref = `/?q=${encodeURIComponent(query.trim())}#browse`;

  return (
    <form
      action="/"
      className="relative hidden md:block"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = browseHref;
      }}
      onBlur={(e) => {
        // Close only when focus leaves the whole widget, not on row clicks.
        if (!e.currentTarget.contains(e.relatedTarget)) setQuery("");
      }}
    >
      <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-tertiary" />
      <input
        name="q"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search cabinets..."
        autoComplete="off"
        className="w-44 rounded-full border border-border bg-bg-card py-1.5 pl-8 pr-3 text-sm text-text-primary placeholder:text-text-muted transition-all focus:w-60 focus:border-accent focus:outline-none"
      />
      {q && (
        <div className="absolute right-0 top-full z-50 mt-2 w-96 rounded-xl border border-border bg-bg-card p-2 shadow-xl">
          {shown.map((i) => (
            <ResultRow key={i.slug} item={i} onPick={() => setQuery("")} />
          ))}
          {results.length === 0 && (
            <p className="px-2 py-3 text-sm text-text-tertiary">
              No cabinets match &ldquo;{query.trim()}&rdquo;.
            </p>
          )}
          {results.length > shown.length && (
            <Link
              href={browseHref}
              onClick={() => setQuery("")}
              className="block rounded-lg px-2 py-2 text-xs font-medium text-accent transition-colors hover:bg-bg-warm"
            >
              {`All ${results.length} results`} &rarr;
            </Link>
          )}
        </div>
      )}
    </form>
  );
}
