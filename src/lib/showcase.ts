/**
 * Curated homepage showcase: the fresh template drop, arranged as themed
 * shelves, plus the integrations band. Editorial content — hand-picked and
 * hand-written, deliberately NOT derived from the registry at build time:
 * the point of the section is a human voice saying "start here".
 *
 * `slug` must exist in registry/ (links go to /cabinet/<slug>).
 * `shot` is a pre-captured screenshot of the template's live app, taken from
 * a real install rendering the template's EXAMPLE data.
 */

/** Brand accent palette — mirrors cabinet-app's brand-palette.ts. */
export const ACCENTS = {
  terracotta: "#E2725B",
  amber: "#E08A3C",
  gold: "#E0B23C",
  green: "#6FA45A",
  teal: "#4FA39A",
  blue: "#5B8FD6",
} as const;

export interface ShowcaseTemplate {
  slug: string;
  name: string;
  /** One punchy sentence, spoken to a person who has never used AI. */
  tagline: string;
  /** Wooden icon basename under /public/brand/ui. */
  icon: string;
  /** Two accent hexes for the card's gradient face. */
  from: string;
  to: string;
  /** Logo basenames under /public/logos — only where the template honestly reads that source. */
  logos: string[];
  /** Screenshot under /public/screenshots/apps. */
  shot: string;
}

export interface Shelf {
  key: string;
  /** Big serif line. */
  title: string;
  sub: string;
  art: string;
  templates: ShowcaseTemplate[];
}

export const SHELVES: Shelf[] = [
  {
    key: "mornings",
    title: "Mornings, handled.",
    sub: "Wake up to one page that already read everything for you.",
    art: "/generated/shelf-mornings.webp",
    templates: [
      {
        slug: "gmail-inbox",
        name: "Gmail Inbox",
        tagline: "Your inbox, read overnight — one page of what actually needs you.",
        icon: "zap",
        from: ACCENTS.terracotta,
        to: "#E4006D",
        logos: ["gmail"],
        shot: "/screenshots/apps/gmail-inbox.webp",
      },
      {
        slug: "good-morning",
        name: "Good Morning",
        tagline: "Mail, calendar, money — everything you've connected, one morning page.",
        icon: "sparkles",
        from: ACCENTS.amber,
        to: ACCENTS.gold,
        logos: ["gmail", "google-calendar"],
        shot: "/screenshots/apps/good-morning.webp",
      },
      {
        slug: "news-desk",
        name: "News Desk",
        tagline: "Your news sites, read every morning and analyzed the way you would.",
        icon: "globe",
        from: ACCENTS.blue,
        to: ACCENTS.teal,
        logos: [],
        shot: "/screenshots/apps/news-desk.webp",
      },
      {
        slug: "morning-mail",
        name: "Morning Mail",
        tagline: "Any inbox, read before coffee. Most days the answer is “nothing”.",
        icon: "coffee",
        from: "#C9A47A",
        to: ACCENTS.amber,
        logos: ["gmail", "microsoft-365"],
        shot: "/screenshots/apps/morning-mail.webp",
      },
    ],
  },
  {
    key: "money",
    title: "Money, minded.",
    sub: "Charges, renewals and receipts — watched so you don't have to.",
    art: "/generated/shelf-money.webp",
    templates: [
      {
        slug: "subscription-audit",
        name: "Subscription Audit",
        tagline: "Once a month: every recurring charge, what crept up, what you forgot.",
        icon: "filecheck",
        from: ACCENTS.gold,
        to: ACCENTS.amber,
        logos: ["gmail", "stripe"],
        shot: "/screenshots/apps/subscription-audit.webp",
      },
      {
        slug: "money-morning",
        name: "Money Morning",
        tagline: "Yesterday's money in plain words — what came in, what failed, who left.",
        icon: "coins",
        from: ACCENTS.green,
        to: ACCENTS.teal,
        logos: ["stripe", "gmail"],
        shot: "/screenshots/apps/money-morning.webp",
      },
    ],
  },
  {
    key: "home",
    title: "Home, running.",
    sub: "The family calendar, the meals, the week — off your mind, on a page.",
    art: "/generated/shelf-home.webp",
    templates: [
      {
        slug: "family-hq",
        name: "Family HQ",
        tagline: "School terms, warranties, the car — one board the whole house trusts.",
        icon: "building",
        from: ACCENTS.terracotta,
        to: ACCENTS.amber,
        logos: ["google-calendar"],
        shot: "/screenshots/apps/family-hq.webp",
      },
      {
        slug: "meal-planner",
        name: "Meal Planner",
        tagline: "Saturday morning: a week of dinners planned around what you actually eat.",
        icon: "scroll",
        from: ACCENTS.green,
        to: ACCENTS.gold,
        logos: [],
        shot: "/screenshots/apps/meal-planner.webp",
      },
      {
        slug: "food-diary",
        name: "Food Diary",
        tagline: "Tell it what you ate in plain words. It keeps the honest ledger.",
        icon: "book",
        from: ACCENTS.teal,
        to: ACCENTS.green,
        logos: [],
        shot: "/screenshots/apps/food-diary.webp",
      },
      {
        slug: "week-ahead",
        name: "Week Ahead",
        tagline: "Sunday evening: next week laid out on one page, collisions flagged.",
        icon: "calendar",
        from: ACCENTS.blue,
        to: "#7B6FD6",
        logos: ["google-calendar"],
        shot: "/screenshots/apps/week-ahead.webp",
      },
    ],
  },
  {
    key: "work",
    title: "Work, shipped.",
    sub: "Clients, applications, deploys — a clerk for each, reporting daily.",
    art: "/generated/shelf-work.webp",
    templates: [
      {
        slug: "freelance-desk",
        name: "Freelance Desk",
        tagline: "Invoices, proposals and silence from clients — chased every morning.",
        icon: "document",
        from: ACCENTS.amber,
        to: ACCENTS.terracotta,
        logos: ["gmail", "stripe"],
        shot: "/screenshots/apps/freelance-desk.webp",
      },
      {
        slug: "job-hunt",
        name: "Job Hunt",
        tagline: "Every application tracked, every follow-up drafted, nothing goes stale.",
        icon: "target",
        from: ACCENTS.blue,
        to: ACCENTS.teal,
        logos: ["gmail"],
        shot: "/screenshots/apps/job-hunt.webp",
      },
      {
        slug: "gitlab-dev-brief",
        name: "GitLab Dev Brief",
        tagline: "What you shipped and what's waiting on you — across GitLab, daily.",
        icon: "cpu",
        from: "#FC6D26",
        to: ACCENTS.amber,
        logos: ["gitlab"],
        shot: "/screenshots/apps/gitlab-dev-brief.webp",
      },
      {
        slug: "web-studio",
        name: "Web Studio",
        tagline: "Describe a site in a sentence. Review a working page by Monday.",
        icon: "feather",
        from: ACCENTS.teal,
        to: ACCENTS.blue,
        logos: ["github"],
        shot: "/screenshots/apps/web-studio.webp",
      },
      {
        slug: "competitor-watch",
        name: "Competitor Watch",
        tagline: "Every rival scanned daily — what moved, flagged before your standup.",
        icon: "chart",
        from: ACCENTS.gold,
        to: ACCENTS.terracotta,
        logos: [],
        shot: "/screenshots/apps/competitor-watch.webp",
      },
    ],
  },
];

/** The integrations band: sources Cabinet agents read today. */
export const INTEGRATION_LOGOS: { name: string; file: string }[] = [
  { name: "Gmail", file: "gmail" },
  { name: "Google Calendar", file: "google-calendar" },
  { name: "Google Drive", file: "google-drive" },
  { name: "Microsoft 365", file: "microsoft-365" },
  { name: "GitLab", file: "gitlab" },
  { name: "GitHub", file: "github" },
  { name: "WhatsApp", file: "whatsapp" },
  { name: "Telegram", file: "telegram" },
  { name: "TikTok", file: "tiktok" },
  { name: "Notion", file: "notion" },
  { name: "Slack", file: "slack" },
  { name: "Instagram", file: "instagram" },
];
