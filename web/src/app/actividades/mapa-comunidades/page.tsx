import { Suspense } from 'react';
import { Metadata } from 'next';
import MapaComunidadesClient from './MapaComunidadesClient';

export const metadata: Metadata = {
    title: 'Mapa de Comunidades Autónomas - Juego de Geografía | TuMaestro.es',
    description: 'Juego interactivo para aprender las Comunidades Autónomas de España. Pon a prueba tus conocimientos de geografía política de forma divertida y gratuita.',
    keywords: ['comunidades autónomas', 'mapa españa', 'geografía española', 'juego interactivo', 'aprender regiones', 'educación primaria'],
    alternates: {
        canonical: 'https://tumaestro.es/actividades/mapa-comunidades',
    },
};

export default function MapaComunidadesPage() {
    return (
        <Suspense fallback={null}>
            <MapaComunidadesClient />
        </Suspense>
    );
}
