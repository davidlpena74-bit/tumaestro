import { Suspense } from 'react';
import { Metadata } from 'next';
import MapaAsiaClient from './MapaAsiaClient';

export const metadata: Metadata = {
    title: 'Mapa de Asia - Juego de Geografía | TuMaestro.es',
    description: 'Juego de geografía interactivo para aprender los países de Asia. Desktop y móvil.',
};

export default function AsiaMapPage() {
    return (
        <Suspense fallback={null}>
            <MapaAsiaClient />
        </Suspense>
    );
}
