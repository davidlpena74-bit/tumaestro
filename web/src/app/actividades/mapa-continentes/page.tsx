
import { Suspense } from 'react';
import { Metadata } from 'next';
import MapaContinentesClient from './MapaContinentesClient';

export const metadata: Metadata = {
    title: 'Continentes del Mundo - Juego de Geografía | TuMaestro.es',
    description: 'Aprende a identificar los continentes del mundo con este mapa interactivo. Una actividad ideal para primaria.',
};

export default function ContinentesMapPage() {
    return (
        <Suspense fallback={null}>
            <MapaContinentesClient />
        </Suspense>
    );
}
