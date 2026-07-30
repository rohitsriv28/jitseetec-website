import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://jitseetec-website.vercel.app",
  ),
  title:
    "JitSeeTec Pvt. Ltd. | End-to-End Digital Solutions & Software Development",
  description:
    "JitSeeTec is a modern software development company dedicated to helping startups, SMEs, and enterprises transform ideas into scalable digital products.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "JitSeeTec Pvt. Ltd. | End-to-End Digital Solutions",
    description:
      "JitSeeTec is a modern software development company dedicated to helping startups, SMEs, and enterprises transform ideas into scalable digital products.",
    url: "https://jitseetec-website.vercel.app",
    siteName: "JitSeeTec",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "JitSeeTec",
    statusBarStyle: "black-translucent",
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
      className={`${plusJakartaSans.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#0B1623] text-white font-sans selection:bg-[#0E7C86] selection:text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
