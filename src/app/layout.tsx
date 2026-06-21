import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getPersonJsonLd, siteMetadata } from "@/lib/site";
import { ThemeProvider } from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-geist-sans" });

const themeInitScript = `(function(){try{var t=localStorage.getItem("portfolio-theme");if(t==="light")document.documentElement.classList.add("light");}catch(e){}})();`;

export const metadata: Metadata = siteMetadata;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-[var(--bg-canvas)] antialiased">
        <a href="#main" className="skip-link">Skip to content</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getPersonJsonLd()) }} />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
