import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from 'next/script';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | TuMaestro.es',
    default: 'TuMaestro.es | Clases Particulares y Recursos Educativos',
  },
  description: "Plataforma líder en educación. Encuentra profesores particulares verificados, descarga material didáctico gratuito y aprende con juegos interactivos.",
  keywords: ['clases particulares', 'profesores online', 'material didactico', 'apuntes', 'juegos educativos', 'tumaestro'],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://tumaestro.es',
    siteName: 'TuMaestro.es',
  },
};

import CookieConsent from "@/components/CookieConsent";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || 'G-D9YEL7YQ1W';

  // Debug GA
  if (typeof window !== 'undefined') {
    console.log('TuMaestro GA ID:', GA_ID);
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <CookieConsent />

        {/* Google Analytics Manual Implementation */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
