import { Suspense } from 'react';
import { Metadata } from 'next';
import MapaAfricaClient from './MapaAfricaClient';

export const metadata: Metadata = {
    title: 'Mapa de África - Juego de Geografía | TuMaestro.es',
    description: 'Aprende los países de África con este mapa interactivo. Ubica las 54 naciones del continente africano y mejora tu geografía.',
};

export default function AfricaMapPage() {
    return (
        <Suspense fallback={null}>
            <MapaAfricaClient />
        </Suspense>
    );
}
