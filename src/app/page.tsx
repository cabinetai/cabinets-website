import path from "path";
import Image from "next/image";
import sharp from "sharp";
import { getAllEntries, SECTION_ORDER, INTEGRATIONS_SECTION } from "@/lib/registry";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HomeHero } from "@/components/registry/home-hero";
import { ShowcaseShelves } from "@/components/registry/showcase-shelves";
import { IntegrationsBand } from "@/components/registry/integrations-band";
import { CabinetList } from "@/components/registry/cabinet-list";
import { SectionLabel } from "@/components/ui/section-label";

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// A dark shade of the cover's dominant color, as "r, g, b" — used for the title.
async function coverColor(slug: string): Promise<string> {
  try {
    const { dominant } = await sharp(
      path.join(process.cwd(), "public/covers", `${slug}.jpg`)
    ).stats();
    const { r, g, b } = dominant;
    return `${Math.round(r * 0.42)}, ${Math.round(g * 0.42)}, ${Math.round(b * 0.42)}`;
  } catch {
    return "40, 40, 40";
  }
}

export default async function HomePage() {
  const entries = await getAllEntries();
  const integrationEntries = entries.filter(
    (e) => e.section === INTEGRATIONS_SECTION
  );

  // entries are sorted by size, so the first match is the category's biggest
  // cabinet — use its cover as the category image.
  const categories = (
    await Promise.all(
      SECTION_ORDER.map(async (name) => {
        const inSection = entries.filter((e) => e.section === name);
        const cover = inSection[0]?.slug;
        // Integration cabinets ship without cover art — the category card
        // uses the wooden-tiles artwork and the brand's wood accent instead.
        const isIntegrations = name === INTEGRATIONS_SECTION;
        return {
          name,
          slug: slugify(name),
          count: inSection.length,
          image: isIntegrations
            ? "/generated/integrations-hero.webp"
            : cover
              ? `/covers/${cover}.jpg`
              : null,
          color: isIntegrations
            ? "139, 94, 60"
            : cover
              ? await coverColor(cover)
              : "40, 40, 40",
        };
      })
    )
  ).filter((c) => c.count > 0);

  return (
    <>
      <Navbar />

      <main className="flex-1">
        <HomeHero
          cabinetCount={entries.length}
          integrationCount={integrationEntries.length}
        />
        <ShowcaseShelves />
        {/* "Open the drawers." and "What is a Cabinet?" moved to /about — the
            homepage sells templates; the mental model is a second read. */}
        <IntegrationsBand entries={integrationEntries} />

        {/* Categories */}
        <section id="categories" className="mx-auto max-w-4xl px-6 pt-16">
          <SectionLabel>Categories</SectionLabel>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl italic text-text-primary mb-8 leading-[1.08]">
            Browse by category.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((c) => (
              <a key={c.slug} href={`#${c.slug}`} className="group block">
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-bg-warm card-hover">
                  {c.image && (
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 400px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <h3
                  className="mt-3 font-display text-3xl sm:text-4xl italic leading-tight"
                  style={{ color: `rgb(${c.color})` }}
                >
                  {c.name}
                </h3>
                <span className="font-code text-sm text-text-muted">
                  {c.count} cabinet{c.count === 1 ? "" : "s"}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Browse */}
        <section id="browse" className="mx-auto max-w-4xl px-6 py-16">
          <SectionLabel>Browse</SectionLabel>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl italic text-text-primary mb-8 leading-[1.08]">
            Every cabinet, on one shelf.
          </h2>
          <CabinetList entries={entries} categories={categories} />
        </section>
      </main>

      <Footer />
    </>
  );
}
