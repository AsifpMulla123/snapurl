import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SnapURL — See who clicks your links",
  description:
    "Shorten any link and get real analytics — referrer, location, device, and timing — free, from your very first click.",
  keywords: ["url shortener", "link analytics", "link tracking", "short links"],
  openGraph: {
    title: "SnapURL — See who clicks your links",
    description:
      "Shorten any link and get real analytics — referrer, location, device, and timing — free, from your very first click.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SnapURL — See who clicks your links",
    description:
      "Shorten any link and get real analytics — referrer, location, device, and timing.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
