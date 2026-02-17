import { Suspense } from 'react';
import { Metadata } from 'next';
import MapaOceaniaClient from './MapaOceaniaClient';

export const metadata: Metadata = {
    title: 'Mapa de Oceanía - Juego de Geografía | TuMaestro.es',
    description: 'Juego de geografía interactivo para aprender los países de Oceanía. Desktop y móvil.',
};

export default function OceaniaMapPage() {
    return (
        <Suspense fallback={null}>
            <MapaOceaniaClient />
        </Suspense>
    );
}
