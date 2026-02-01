import { Metadata } from 'next';
import HomeClient from '@/components/HomeClient';

export const metadata: Metadata = {
  title: 'TuMaestro.es | Clases Particulares, Apuntes y Juegos Educativos',
  description: 'Plataforma educativa integral: Clases particulares, juegos interactivos y biblioteca de recursos con cuentacuentos y dictados para reforzar la lectura y escritura.',
  alternates: {
    canonical: 'https://tumaestro.es',
  },
};

export default function Home() {
  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TuMaestro.es',
    url: 'https://tumaestro.es',
    description: 'Plataforma líder en educación con profesores, recursos y juegos interactivos.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://tumaestro.es/profesores?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TuMaestro.es',
    url: 'https://tumaestro.es',
    logo: 'https://tumaestro.es/icon.svg',
    sameAs: [
      'https://www.facebook.com/tumaestro.es',
      'https://www.instagram.com/tumaestro.es',
      'https://twitter.com/tumaestro_es'
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
      />
      <HomeClient />
    </>
  );
}
