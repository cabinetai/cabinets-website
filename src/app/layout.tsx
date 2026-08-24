import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

// One family everywhere: Geist carries display, body, and UI (rendered stack:
// Geist, "Geist Fallback", system-ui, sans-serif — next/font emits the
// size-adjusted fallback face automatically). Weight and tracking, not a
// second family, do the display work. Mono stays for code and terminals only.
const geist = Geist({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

// Same wordmark serif as cabinet-website — used only for the Cabinet brand
// lockup in the navbar.
const instrumentSerif = Instrument_Serif({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Cabinet Registry — Browse & Install Cabinet Templates",
  description:
    "A public registry of Cabinet templates — portable, file-system native operating units for AI-powered business functions. Browse, explore, and install ready-made cabinets.",
  icons: {
    // The navbar's drawers logo, padded square (public/favicon.png is
    // generated from public/brand/cabinet-drawers-logo.png with sharp).
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Cabinet Registry — Browse & Install Cabinet Templates",
    description:
      "Browse and install portable cabinet templates for AI-powered business operations.",
    type: "website",
    url: "https://cabinets.sh",
    images: [
      {
        url: "https://cabinets.sh/og.png",
        width: 1200,
        height: 630,
        alt: "Cabinet Registry — Browse & Install Cabinet Templates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cabinet Registry — Browse & Install Cabinet Templates",
    description:
      "Browse and install portable cabinet templates for AI-powered business operations.",
    images: ["https://cabinets.sh/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
