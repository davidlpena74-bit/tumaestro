import { Suspense } from 'react';
import { Metadata } from 'next';
import MapaEuropaClient from './MapaEuropaClient';

export const metadata: Metadata = {
    title: 'Mapa de Europa Interactivo - Juego de Geografía | Tu Maestro',
    description: 'Aprende los países de Europa con este juego interactivo. Ubica todas las naciones del continente europeo y mejora tus conocimientos de geografía.',
    keywords: ['mapa de europa', 'geografía europa', 'juego de países', 'aprender europa', 'mapa interactivo europa'],
    alternates: {
        canonical: 'https://tumaestro.es/actividades/mapa-europa',
    },
};

export default function EuropeMapPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Game',
        'name': 'Mapa Interactivo de Europa',
        'description': 'Identifica y ubica los países del continente europeo en este mapa interactivo.',
        'genre': 'Geography Game',
        'breadcrumb': {
            '@type': 'BreadcrumbList',
            'itemListElement': [
                {
                    '@type': 'ListItem',
                    'position': 1,
                    'name': 'Inicio',
                    'item': 'https://tumaestro.es'
                },
                {
                    '@type': 'ListItem',
                    'position': 2,
                    'name': 'Actividades',
                    'item': 'https://tumaestro.es/actividades'
                },
                {
                    '@type': 'ListItem',
                    'position': 3,
                    'name': 'Mapa de Europa',
                    'item': 'https://tumaestro.es/actividades/mapa-europa'
                }
            ]
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Suspense fallback={null}>
                <MapaEuropaClient />
            </Suspense>
        </>
    );
}
