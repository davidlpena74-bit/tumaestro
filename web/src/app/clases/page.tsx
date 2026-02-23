import { Metadata } from 'next';
import ProfesoresClient from '@/components/ProfesoresClient';

export const metadata: Metadata = {
    title: 'Profesores Particulares y Clases de Refuerzo | Tu Maestro',
    description: 'Encuentra al profesor particular ideal cerca de ti o a nivel nacional online. Explora perfiles docentes verificados para clases de repaso, idiomas y apoyo escolar.',
    keywords: ['profesores particulares', 'clases de refuerzo', 'apoyo escolar', 'profesores de matematicas', 'profesores de ingles online', 'clases particulares a domicilio', 'educacion personalizada'],
    alternates: {
        canonical: 'https://tumaestro.es/clases',
    },
    openGraph: {
        title: 'Encuentra Profesores Particulares | Tu Maestro',
        description: 'La forma más segura y rápida de contactar con profesores de apoyo escolar verificados de todas las materias.',
        url: 'https://tumaestro.es/clases',
        siteName: 'Tu Maestro',
        images: [
            {
                url: 'https://tumaestro.es/og-image-clases.jpg',
                width: 1200,
                height: 630,
                alt: 'Encuentra a tu profesor ideal en Tu Maestro',
            },
        ],
        locale: 'es_ES',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Profesores Particulares de Confianza | Tu Maestro',
        description: 'Encuentra apoyo escolar y clases particulares adaptadas a tus necesidades. Más de 1000 docentes verificados te esperan.',
        images: ['https://tumaestro.es/og-image-clases.jpg'],
    },
};

export default function ProfesoresPage() {
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
                'name': 'Clases y Profesores',
                'item': 'https://tumaestro.es/clases'
            }
        ]
    };

    const WebPageLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': 'Buscador de Profesores Particulares',
        'description': 'Explora la red de docentes y profesionales de la educación dispuestos a dar clases particulares online o presenciales.',
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
            <ProfesoresClient />
        </>
    );
}
