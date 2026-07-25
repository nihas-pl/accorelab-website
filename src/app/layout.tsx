import type { Metadata } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AmplitudeAnalytics } from "@/components/AmplitudeAnalytics";

import { Providers } from "@/app/providers";

/* Primary typeface — Mont (local). Used site-wide for display, body, labels. */
const mont = localFont({
  src: "../../public/font/Mont-Regular.ttf",
  weight: "400",
  display: "swap",
  variable: "--font-mont",
});

const jetbrains = JetBrains_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Accorelab — Custom ERP & software development",
  description:
    "Accorelab designs and ships the software your business runs on — custom ERP, web and mobile products, and AI-powered automation, built by a team that owns the outcome.",
  icons: { icon: "/logo-blue.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${mont.variable} ${jetbrains.variable}`}>
      <body>
        <Providers>
          {children}
          <ScrollReveal />
          <AmplitudeAnalytics />
        </Providers>
      </body>
    </html>
  );
}
