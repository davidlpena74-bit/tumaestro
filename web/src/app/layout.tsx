import type { Metadata } from "next";
import { Geist, Geist_Mono, Architects_Daughter } from "next/font/google";
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

const handwriting = Architects_Daughter({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-handwriting",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tumaestro.es'),
  title: {
    template: '%s | TuMaestro.es',
    default: 'TuMaestro.es | Encuentra Profesores Particulares y Recursos Educativos',
  },
  description: "La plataforma educativa más completa: Profesores particulares, material didáctico gratuito, juegos infantiles y cuentos narrados en 4 idiomas gratis para primaria y secundaria.",
  keywords: [
    'clases particulares', 'profesores online', 'material didactico', 'cuentos infantiles idiomas', 'juegos educativos gratis',
    'aprender jugando', 'recursos primaria', 'dictados online gratis', 'ejercicios resueltos', 'tumaestro',
    'geografia interactiva', 'cuentos narrados gratis', 'profesores españa'
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
import { BackgroundProvider } from "@/context/BackgroundContext";
import PageBackground from "@/components/PageBackground";
import ContentWrapper from "@/components/ContentWrapper";

import { ToastProvider } from "@/context/ToastContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${handwriting.variable} antialiased`}
      >
        <Script id="suppress-abort-error" strategy="beforeInteractive">
          {`
            if (typeof window !== 'undefined') {
              window.addEventListener('unhandledrejection', function(event) {
                var reason = event.reason || {};
                var msg = reason.message || (typeof reason === 'string' ? reason : '');
                if (reason.name === 'AbortError' || msg.includes('aborted without reason') || msg.includes('signal is aborted')) {
                  event.preventDefault();
                }
              });

              var originalConsoleError = console.error;
              console.error = function() {
                var argsStr = Array.from(arguments).map(function(a) { 
                  return typeof a === 'string' ? a : (a && a.message ? a.message : ''); 
                }).join(' ');
                
                if (argsStr.includes('aborted without reason') || argsStr.includes('signal is aborted') || argsStr.includes('AbortError')) {
                  return;
                }
                originalConsoleError.apply(console, arguments);
              };
            }
          `}
        </Script>
        <LanguageProvider>
          <BackgroundProvider>
            <ToastProvider>
              <PageBackground />
              <Header />
              <ContentWrapper>
                {children}
              </ContentWrapper>
            </ToastProvider>
          </BackgroundProvider>
          <CookieConsent />
        </LanguageProvider>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <Script src="https://cdn.lordicon.com/lordicon.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
