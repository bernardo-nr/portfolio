import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Bernardo Núñez",
    template: "%s — Bernardo Núñez",
  },
  description:
    "Multifaceted designer with 17 years in tech. Product, UX, and industrial design work from startups to Google.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-white font-sans text-black">
        <div className="mx-auto w-full max-w-[1280px] px-4 pb-16 md:px-6">
          <SiteHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
