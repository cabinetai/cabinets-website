import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { getGitHubStars } from "@/lib/github";
import { getAllEntries } from "@/lib/registry";
import { MobileMenu } from "./mobile-menu";
import { NavSearch } from "./nav-search";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export async function Navbar() {
  const stars = await getGitHubStars();
  // Slim payload for the typeahead — everything else stays on the server.
  const searchItems = (await getAllEntries()).map((e) => ({
    slug: e.slug,
    name: e.meta.name,
    description: e.meta.description,
    emoji: e.agents[0]?.emoji || "🗄️",
  }));
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-baseline gap-2">
          {/* real Cabinet lockup — same asset + Instrument Serif wordmark as
              cabinet-website's navbar */}
          <Image
            src="/brand/cabinet-drawers-logo.png"
            alt=""
            width={20}
            height={28}
            className="h-7 w-auto self-center object-contain"
            priority
          />
          <span className="whitespace-nowrap text-xl font-brand italic tracking-tight">
            Cabinet
          </span>
          <span className="font-code text-[11px] uppercase tracking-wider text-text-tertiary">
            Registry
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-6">
          <NavSearch items={searchItems} />
          <Link
            href="/"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Browse
          </Link>
          <Link
            href="/about"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            About
          </Link>
          <Link
            href="/spec"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Spec
          </Link>
          <a
            href={siteConfig.githubRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-text-secondary hover:border-border-dark hover:text-text-primary transition-all"
          >
            <GitHubIcon className="h-4 w-4" />
            <Star className="h-3 w-3 fill-current text-amber-500" />
            <span className="text-xs font-medium">{stars ?? 0}</span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <MobileMenu stars={stars} />
      </div>
    </nav>
  );
}
