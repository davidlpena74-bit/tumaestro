import { Metadata } from 'next';
import ActividadesClient from '@/components/ActividadesClient';

export const metadata: Metadata = {
    title: 'Actividades Educativas y Mapas Interactivos | Tu Maestro',
    description: 'Aprende jugando: mapas interactivos de geografía, anatomía 3D, rompecabezas de matemáticas y actividades interactivas para complementar el estudio escolar.',
    keywords: ['juegos educativos', 'mapas interactivos', 'geografia niños', 'juegos matematicas primaria', 'aprender jugando', 'anatomia 3d educacion', 'actividades interactivas'],
    alternates: {
        canonical: 'https://tumaestro.es/actividades',
    },
    openGraph: {
        title: 'Juegos y Actividades Educativas | Tu Maestro',
        description: 'Pon a prueba tus conocimientos con nuestros mapas interactivos de ríos, provincias y capitales, además de juegos de biología y matemáticas.',
        url: 'https://tumaestro.es/actividades',
        siteName: 'Tu Maestro',
        images: [
            {
                url: 'https://tumaestro.es/og-image-actividades.jpg',
                width: 1200,
                height: 630,
                alt: 'Juegos y Actividades Educativas en Tu Maestro',
            },
        ],
        locale: 'es_ES',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Juegos Educativos Interactivos | Tu Maestro',
        description: 'Aprende matemáticas, geografía y biología jugando con nuestras actividades inmersivas.',
        images: ['https://tumaestro.es/og-image-actividades.jpg'],
    },
};

export default function ActividadesPage() {
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
                'name': 'Actividades Educativas',
                'item': 'https://tumaestro.es/actividades'
            }
        ]
    };

    const WebPageLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': 'Juegos y Actividades Interactivas',
        'description': 'Plataforma de gamificación con mapas de geografía, esquemas de anatomía y acertijos diseñados para estudiantes.',
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(WebPageLd) }}
            />
            <ActividadesClient />
        </>
    );
}
