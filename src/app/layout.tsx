import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "../fonts/Geist-Variable.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "../fonts/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

const spaceGrotesk = localFont({
  src: "../fonts/SpaceGrotesk-Variable.woff2",
  variable: "--font-space-grotesk",
  weight: "300 700",
  display: "swap",
});

/** Runs before first paint so the colour theme never flashes. */
const themeBootstrap = `(function(){try{var k='tokenizer-theme';var s=localStorage.getItem(k);var t=s||(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export const metadata: Metadata = {
  title: "Custom Tokenizer | GenAI with JavaScript",
  description:
    "An animated playground for a custom BPE tokenizer: train a vocabulary from any corpus, watch merges happen live, and encode/decode text with visualised token streams.",
  keywords: [
    "tokenizer",
    "BPE",
    "byte pair encoding",
    "GenAI",
    "JavaScript",
    "NLP",
    "vocabulary",
  ],
  authors: [{ name: "Ama" }],
  openGraph: {
    title: "Custom Tokenizer · watch a tokenizer learn language",
    description:
      "Train, encode and decode with a from-scratch byte-pair tokenizer — visualised with live merge logs and animated token streams.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eef1fb" },
    { media: "(prefers-color-scheme: dark)", color: "#05070f" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
