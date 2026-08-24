"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

interface ScreenshotPreviewProps {
  slug: string;
  pageName: string; // the subpath shown in the address bar, e.g. "approval-packet"
}

export function ScreenshotPreview({ slug, pageName }: ScreenshotPreviewProps) {
  const [loaded, setLoaded] = useState(false);

  // Try .jpg first; .jpeg is used by the two MCP-captured shots
  const src = `/screenshots/${slug}.jpg`;

  return (
    <div
      className="rounded-xl overflow-hidden border border-border shadow-lg"
      style={{ background: "#1a1a1e" }}
    >
      {/* Browser chrome */}
      <div
        className="flex items-center gap-3 px-4 py-2.5 border-b"
        style={{ background: "#111114", borderColor: "#2a2a30" }}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>

        {/* Address bar */}
        <div
          className="flex-1 flex items-center gap-2 rounded-md px-3 py-1 text-xs font-mono"
          style={{ background: "#1e1e24", color: "#8888a0" }}
        >
          <span style={{ color: "#5a5a70" }}>cabinet /</span>
          <span style={{ color: "#b0b0c8" }}>{pageName}</span>
        </div>

        {/* Open link */}
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 p-1 rounded hover:bg-white/10 transition-colors"
          style={{ color: "#5a5a70" }}
          title="Open screenshot"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Screenshot */}
      <div className="relative w-full aspect-[1440/900]">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: "#111114" }}>
            <div className="w-6 h-6 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
          </div>
        )}
        <Image
          src={src}
          alt={`${slug} app preview`}
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover object-top"
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}
