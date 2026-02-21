import { Metadata } from 'next';
import HomeClient from '@/components/HomeClient';

export const metadata: Metadata = {
  title: 'TuMaestro.es | Clases Particulares, Material Didáctico y Juegos Educativos',
  description: 'La plataforma educativa líder: Encuentra profesores particulares, descarga material didáctico gratis y disfruta de cuentos infantiles narrados en 4 idiomas y juegos educativos interactivos.',
  keywords: ['clases particulares', 'profesores particulares', 'material didactico gratis', 'cuentos infantiles multiidioma', 'juegos educativos online', 'ejercicios resueltos primaria', 'aprender jugando', 'cuentacuentos gratis'],
  alternates: {
    canonical: 'https://tumaestro.es',
  },
  openGraph: {
    title: 'TuMaestro.es | Clases Particulares y Recursos Educativos Gratis',
    description: 'Encuentra profesores particulares verificados y accede a la mejor biblioteca de recursos educativos interactivos.',
    url: 'https://tumaestro.es',
    siteName: 'TuMaestro.es',
    images: [
      {
        url: 'https://tumaestro.es/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TuMaestro.es - Revolución Educativa',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TuMaestro.es | Aprende Jugando y Mejora tus Notas',
    description: 'Profesores particulares y material didáctico innovador en una sola plataforma.',
    images: ['https://tumaestro.es/og-image.jpg'],
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
      target: 'https://tumaestro.es/clases?q={search_term_string}',
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

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': '¿Qué ofrece TuMaestro.es?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Ofrecemos clases particulares con profesores verificados, material didáctico gratuito para descargar y juegos educativos interactivos para primaria y secundaria.'
        }
      },
      {
        '@type': 'Question',
        'name': '¿Los cuentos infantiles son gratuitos?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Sí, todos nuestros cuentos clásicos están disponibles de forma gratuita con narraciones de voz en español, inglés, francés y alemán.'
        }
      },
      {
        '@type': 'Question',
        'name': '¿Cómo puedo encontrar un profesor particular?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Puedes usar nuestro buscador de profesores en la sección de Clases, filtrar por asignatura y ciudad, y contactar directamente con el docente que mejor se adapte a tus necesidades.'
        }
      }
    ]
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <HomeClient />
    </>
  );
}
