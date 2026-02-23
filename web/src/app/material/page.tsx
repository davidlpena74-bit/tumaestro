import { Metadata } from 'next';
import RecursosClient from '@/components/RecursosClient';

export const metadata: Metadata = {
    title: 'Material Didáctico y Cuentos Infantiles Gratis | Tu Maestro',
    description: 'Descarga apuntes, ejercicios y recursos educativos. Accede a cuentos clásicos infantiles narrados en 4 idiomas y dictados interactivos para primaria y secundaria.',
    keywords: ['apuntes gratis', 'material didactico', 'cuentos infantiles multiidioma', 'ejercicios resueltos', 'recursos educativos', 'primaria', 'secundaria', 'cuentos narrados gratis', 'juegos lectura', 'audiocuentos gratis'],
    alternates: {
        canonical: 'https://tumaestro.es/material',
    },
    openGraph: {
        title: 'Material Didáctico y Cuentos Infantiles | Tu Maestro',
        description: 'La mejor colección gratuita de apuntes, ejercicios y cuentos clásicos narrados en varios idiomas (Español, Inglés, Francés, Alemán).',
        url: 'https://tumaestro.es/material',
        siteName: 'Tu Maestro',
        images: [
            {
                url: 'https://tumaestro.es/og-image-material.jpg', // Placeholder for relevant image
                width: 1200,
                height: 630,
                alt: 'Colección de Recursos Educativos y Cuentos de Tu Maestro',
            },
        ],
        locale: 'es_ES',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Material Educativo y Audiocuentos Gratis',
        description: 'Descarga ejercicios y disfruta de cuentos clásicos gratis para potenciar el aprendizaje.',
        images: ['https://tumaestro.es/og-image-material.jpg'],
    },
};

export default function RecursosPage() {
    // Definimos los esquemas de datos estructurados para potenciar el SEO de recursos
    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Inicio',
                'item': 'https://tumaestro.es/'
            },
            {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Material Didáctico',
                'item': 'https://tumaestro.es/material'
            }
        ]
    };

    const CollectionPageLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        'name': 'Material Didáctico y Cuentos',
        'description': 'Librería de recursos educativos gratuitos con descargables, herramientas interactivas, y una extensa colección de audiocuentos traducidos.',
        'url': 'https://tumaestro.es/material',
        'publisher': {
            '@type': 'Organization',
            'name': 'Tu Maestro'
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(CollectionPageLd) }}
            />
            <RecursosClient />
        </>
    );
}
