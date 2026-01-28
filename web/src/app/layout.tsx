import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from 'next/script';
import { Suspense } from "react";
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
  metadataBase: new URL('https://tumaestro.es'),
  title: {
    template: '%s | TuMaestro.es',
    default: 'TuMaestro.es | Encuentra Profesores Particulares y Recursos Educativos',
  },
  description: "La plataforma educativa más completa: Profesores particulares verificados, material didáctico gratuito, juegos interactivos para primaria y secundaria, y apuntes de calidad para todas las materias.",
  keywords: [
    'clases particulares', 'profesores online', 'material didactico', 'apuntes gratis', 'juegos educativos',
    'aprender jugando', 'recursos primaria', 'recursos secundaria', 'ejercicios resueltos', 'tumaestro',
    'geografia interactiva', 'matematicas para niños', 'profesores españa'
  ],
  authors: [{ name: 'TuMaestro.es Team' }],
  creator: 'TuMaestro.es',
  publisher: 'TuMaestro.es',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://tumaestro.es',
    siteName: 'TuMaestro.es',
    title: 'TuMaestro.es | Clases Particulares y Recursos Educativos',
    description: 'Encuentra profesores particulares verificados, material didáctico gratuito y juegos interactivos.',
    images: [
      {
        url: '/og-image.jpg', // Make sure this exists or I should suggest creating it
        width: 1200,
        height: 630,
        alt: 'TuMaestro.es - Tu portal de educación',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TuMaestro.es | Educación de Calidad',
    description: 'Profesores, recursos y juegos interactivos en una sola plataforma.',
    images: ['/og-image.jpg'],
  },

  category: 'education',
};

import CookieConsent from "@/components/CookieConsent";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Header from "@/components/Header";
import { LanguageProvider } from "@/context/LanguageContext";
import PageBackground from "@/components/PageBackground";
import ContentWrapper from "@/components/ContentWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <PageBackground />
          <Header />
          <ContentWrapper>
            {children}
          </ContentWrapper>
          <CookieConsent />
        </LanguageProvider>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
      </body>
    </html>
  );
}
