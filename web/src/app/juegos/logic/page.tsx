import { Suspense } from 'react';
import { Metadata } from 'next';
import LogicClient from './LogicClient';

export const metadata: Metadata = {
    title: 'Acertijos y Juegos de Lógica | Tu Maestro',
    description: 'Mejora tu razonamiento lógico con nuestra colección de acertijos y juegos interactivos desafiantes.',
    keywords: ['juegos de lógica', 'acertijos para niños', 'razonamiento lógico', 'juegos mentales', 'desafíos intelectuales'],
    alternates: {
        canonical: 'https://tumaestro.es/juegos/logic',
    },
};

export default function LogicPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Game',
        'name': 'Desafío de Lógica',
        'description': 'Un juego interactivo de acertijos y lógica para todas las edades.',
        'genre': 'Puzzle',
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
                    'name': 'Juegos',
                    'item': 'https://tumaestro.es/juegos'
                },
                {
                    '@type': 'ListItem',
                    'position': 3,
                    'name': 'Lógica',
                    'item': 'https://tumaestro.es/juegos/logic'
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
                <LogicClient />
            </Suspense>
        </>
    );
}

