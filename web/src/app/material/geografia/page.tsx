import { Metadata } from 'next';
import GeografiaClient from '@/components/resources/GeografiaClient';
import { Map, Globe2, Landmark } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Recursos de Geografía - Mapas Interactivos y Apuntes | Tu Maestro',
    description: 'Explora nuestra biblioteca de geografía: mapas interactivos de España, Europa y América, además de esquemas y materiales de estudio gratuitos para todos los niveles.',
    keywords: ['geografia interactiva', 'mapas interactivos españa', 'mapas interactivos europa', 'recursos educativos geografia', 'aprender geografia jugando'],
    alternates: {
        canonical: 'https://tumaestro.es/material/geografia',
    },
};

const SECTIONS = [
    {
        id: 'espana',
        title: 'Geografía de España',
        icon: <Map className="w-8 h-8 text-emerald-400" />,
        resources: [
            { title: 'Mapa Interactivo: Provincias', type: 'Game', link: '/actividades/mapa-provincias', category: 'Geografía' },
            { title: 'Mapa Interactivo: Comunidades Autónomas', type: 'Game', link: '/actividades/mapa-comunidades', category: 'Geografía' },
            { title: 'Mapa Interactivo: Ríos de España', type: 'Game', link: '/actividades/mapa-rios', category: 'Hidrografía' },
            { title: 'Climas de España: Esquema Completo', type: 'PDF', category: 'PAU / Bachillerato', isDownload: true },
        ]
    },
    {
        id: 'europa',
        title: 'Geografía de Europa',
        icon: <Globe2 className="w-8 h-8 text-blue-400" />,
        resources: [
            { title: 'Mapa Interactivo: Países de Europa', type: 'Game', link: '/actividades/mapa-europa', category: 'Geografía Política' },
            { title: 'Ríos de Europa: Reto Interactivo', type: 'Game', link: '/actividades/rios-europa', category: 'Hidrografía' },
            { title: 'Capitales de Europa: Quiz', type: 'Game', link: '/actividades/capitales-europa', category: 'Cultura General' },
            { title: 'La Unión Europea: Instituciones y Países', type: 'PDF', category: 'Geografía Política', isDownload: true },
        ]
    },
    {
        id: 'america',
        title: 'Geografía de América',
        icon: <Landmark className="w-8 h-8 text-amber-400" />,
        resources: [
            { title: 'Mapa Interactivo: Países de América', type: 'Game', link: '/actividades/mapa-america', category: 'Geografía Política' },
            { title: 'Relieve de América: Cordilleras y Llanuras', type: 'PDF', category: 'Geografía Física', isDownload: true },
            { title: 'Capitales de América Latina', type: 'Quiz', category: 'Geografía Política' },
            { title: 'Hidrografía: El Amazonas y grandes ríos', type: 'Doc', category: 'Hidrografía', isDownload: true },
        ]
    },
    {
        id: 'africa',
        title: 'Geografía de África',
        icon: <Globe2 className="w-8 h-8 text-orange-400" />,
        resources: [
            { title: 'Mapa Interactivo: Países de África', type: 'Game', link: '/actividades/mapa-africa', category: 'Geografía Política' },
            { title: 'Relieve Africano y Grandes Lagos', type: 'PDF', category: 'Geografía Física', isDownload: true },
        ]
    },
    {
        id: 'asia-oceania',
        title: 'Asia y Oceanía',
        icon: <Globe2 className="w-8 h-8 text-violet-400" />,
        resources: [
            { title: 'Mapa Interactivo: Asia', type: 'Game', link: '/actividades/mapa-asia', category: 'Geografía Política' },
            { title: 'Economía: Los tigres asiáticos', type: 'PDF', category: 'Geografía Humana', isDownload: true },
        ]
    }
];

export default function GeografiaPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        'name': 'Recursos de Geografía - Tu Maestro',
        'description': 'Biblioteca de recursos educativos interactivos y materiales de geografía.',
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
                    'name': 'Material',
                    'item': 'https://tumaestro.es/material'
                },
                {
                    '@type': 'ListItem',
                    'position': 3,
                    'name': 'Geografía',
                    'item': 'https://tumaestro.es/material/geografia'
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
            <GeografiaClient sections={SECTIONS} />
        </>
    );
}
